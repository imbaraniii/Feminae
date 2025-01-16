import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings
from langchain_community.chat_models import ChatOpenAI
from langchain.chains import RetrievalQA
from langchain.retrievers import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import FlashrankRerank
import google.generativeai as genai
from dotenv import load_dotenv
import asyncio
from webscrap import get_query_urls, web_scrap_avail_links, get_patient_by_mrn, llm_infer, diet_plan_call
from fastapi.responses import JSONResponse, FileResponse
from pdf_gen import summarize_chat_history, write_pdf
import json

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

embeddings = OpenAIEmbeddings()
vectorstore = Chroma(persist_directory="./hybrid_db", embedding_function=embeddings)

llm = ChatOpenAI(model_name="gpt-4o-mini")

compressor = FlashrankRerank()
retriever = ContextualCompressionRetriever(
    base_compressor=compressor,
    base_retriever=vectorstore.as_retriever(search_kwargs={"k": 10})
)

qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=retriever,
    return_source_documents=True
)

farewells = ["bye", "goodbye", "see you", "take care", "thank you", "thanks"]

def check_query(query, history=None, patient_data=None):
    chat_session = genai.GenerativeModel(
        model_name="gemini-2.0-flash-exp",
        generation_config={
            "temperature": 1,
            "top_p": 0.95,
            "top_k": 40,
            "max_output_tokens": 8192,
            "response_mime_type": "text/plain",
        },
    ).start_chat(history=[])

    prompt1 = [
        {
            "role": "user",
            "content": f"Respond strictly in the JSON-compliant dictionary format: {{'greet': True/False, 'med_diag': True/False, 'diet_plan': True/False, 'pro': True/False, 'is_med': True/False, 'is_rem': True/False}}, where 'greet' is True if the query is related to any type of greetings. 'med_diag' is True if the query relates to medical diagnosis or treatment, 'diet_plan' should be True only if the query specifically asks about a diet plan for a patient and False if it involves asking about nutritional values or contents of a food item; 'pro' is True if it contains keywords like 'I', 'I'm', 'I am', 'my', 'myself', 'you', 'yourself' and etc. 'is_med' is True if the query concerns about General medical conditions of the patient or any medical queries or any queries related to FOOD, including personal questions or even questions about the chatbot or about the User. 'is_rem' is True if the query concerns about any remainders that is supposed to be put in a calendar. Exclude queries about writing medical-related computer code or anything like that from being categorized as medical. This is the query: {query}"
        }
    ]

    prompt2 = [
        {
            "role": "user",
            "content": f"Guidelines to Start with: 1. You are strictly supposed to answer to only those queries which deal with Medical queries or Food related Queries or Personal Welbeing of the patient. 2. If the query deals with any other queries, please respond gently to the user that you cannot to respond to that query. 3. If the query references past interactions, analyze the provided chat history: {history} to understand the specific conversation. Provide an accurate, context-aware response based on the relevant details. 4. For queries about previous discussions, evaluate the history carefully and identify key points. Respond intelligently with a precise and relevant answer that aligns with the user's intent. Provide a precise and accurate response by recalling and interpreting the relevant part of the history. Consider yourself as an expert in understanding the medical data of a patient. I'll provide you a query and the patients' medical records. Do not provide the response in the markdown. Go through the medical records and understand the each and every aspect of the patient's medical history and the patients' current situation. Provide the most genuine response for their query. Do not provide any introductory and concluding statements from your side. This is the user query: {query} and this is the patients' details: {patient_data}. You are strictly supposed to answer to only those queries which deal with Medical queries for Food related Queries or Personal Welbeing of the patient. If the query deals with any other queries, please respond smartly and gently to the user about the same."
        }
    ]

    if not patient_data:
        chat_completion = chat_session.send_message(prompt1[0]["content"])
        raw_response = chat_completion.text.strip()
        if raw_response.startswith("```") and raw_response.endswith("```"):
            raw_response = raw_response.split("\n", 1)[1].rsplit("\n", 1)[0].strip()

        try:
            response = json.loads(raw_response)
            if not isinstance(response, dict):
                raise ValueError("Response is not a dictionary.")
            
        except (json.JSONDecodeError, ValueError) as e:
            print("Error decoding response:", e)
            print("Raw response content:", raw_response)
            raise ValueError("Invalid response format from Gemini.")
        return response
    
    else:
        chat_completion = chat_session.send_message(prompt2[0]["content"])
        return chat_completion.text.strip()


def create_prompt(query):
    return f"""
    Provide concise nutritional information about the following food: {query}. 
    Include details such as calories, macronutrients (protein, carbohydrates, fats), and any health benefits or concerns. 
    Format your response like a doctor's prescription, ensuring clarity and brevity.
    If the food is not related to diet or nutrition, respond with 'I'm not allowed to respond to that :) Hope you understand >_< '.
    """

@app.post("/summarize-chat")
async def handle_summarize(chat_history: List[Dict]):
    try:
        summarize_chat_history(chat_history)
        write_pdf()
        pdf_filename = "final_output.pdf"
        return JSONResponse(content={"message": "Summary generated successfully", "pdf_filename": pdf_filename}, status_code=200)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/get-pdf/{pdf_filename}")
async def get_pdf(pdf_filename: str):
    try:
        pdf_path = pdf_filename
        if os.path.exists(pdf_path):
            return FileResponse(
                pdf_path,
                media_type="application/pdf",
                filename="chat_summary.pdf"
            )
        else:
            raise HTTPException(status_code=404, detail="PDF not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/search")
async def search(query: str, mrn: str, history: str):
    if not query:
        raise HTTPException(status_code=400, detail="No question provided")

    if not mrn:
        raise HTTPException(status_code=400, detail="No MRN provided")

    query = query.lower()

    if query in farewells:
        response_message = "You're welcome! Have a great day!"
        return {"message": response_message, "webscraping": False}


    patient_data = get_patient_by_mrn(mrn.strip())

    type_of_query = check_query(query)
    print(type_of_query)
    print(type(type_of_query))

    if type_of_query['greet'] == True:
        response_message = f"Hello {patient_data['Name']}! How can I assist you today?"
        return {"message": response_message, "webscraping": False}

    if type_of_query['pro'] == True:
        final_response = check_query(query, json.loads(history), patient_data)
        return {
            "message": final_response,
            "webscraping": True,
        }

    elif type_of_query['is_med'] == False:
        response_message = "Please ask me questions from nutritional content, diet plan, or medical diagnosis."
        return {"message": response_message}

    elif type_of_query['med_diag'] == True:
        if type_of_query['pro'] == True:
            final_response = check_query(query, json.loads(history), patient_data)
            return {
                "message": final_response,
                "webscraping": True,
            }

        else:
            available_urls = get_query_urls(query)
            if not available_urls:
                response_message = "Sorry, I couldn't find relevant information for your medical query."
                return {"message": response_message, "webscraping": False}
            
            await web_scrap_avail_links(available_urls, mrn.strip())
            with open(f"scrapped_{mrn.strip()}.txt", "r", encoding="utf-8") as file:
                webscraped_content = file.read()
        
            final_response = llm_infer(patient_data, webscraped_content, query)

            return {
                "message": final_response,
                "webscraping": True,
            }

    elif type_of_query['diet_plan'] == True:
        print("In a diet plan call......")
        
        available_urls = get_query_urls(query)
        if not available_urls:
            response_message = "Sorry, I couldn't find relevant information for your query."
            return {"message": response_message}

        await web_scrap_avail_links(available_urls, mrn.strip())

        with open(f"scrapped_{mrn.strip()}.txt", "r", encoding="utf-8") as file:
            webscraped_content = file.read()

        final_response = diet_plan_call(patient_data, webscraped_content, query)
        return {
            "message": final_response,
            "sources": available_urls,
        }

    elif type_of_query['pro'] == True:
        final_response = check_query(query, json.loads(history), patient_data)
        return {
            "message": final_response,
            "webscraping": True,
        }

    # elif type_of_query['is_rem'] == True:
    else:
        result = qa_chain({"query": query})

        if result['result'] == "I don't know.":
            prompt = create_prompt(query)
            chat_session = genai.GenerativeModel(
                model_name="gemini-2.0-flash-exp",
                generation_config={
                    "temperature": 1,
                    "top_p": 0.95,
                    "top_k": 40,
                    "max_output_tokens": 8192,
                    "response_mime_type": "text/plain",
                },
            ).start_chat(history=[])

            gemini_response = chat_session.send_message(prompt)
            formatted_response = gemini_response.text.replace("*", "\n")
            return {
                "message": formatted_response,
                "ragRetrieval": True,
            }

        return {
            "message": result['result'],
            "sources": [doc.page_content for doc in result['source_documents']],
            "ragRetrieval": True,
        }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, port=3000)
