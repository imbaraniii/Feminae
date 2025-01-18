import os
import asyncio
from dotenv import load_dotenv
from pymongo import MongoClient
import google.generativeai as genai
from tavily import TavilyClient
from crawl4ai import AsyncWebCrawler
import requests

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
mongo_client = MongoClient(os.getenv("MONGO_DB_CLIENT"))
db = mongo_client["medical_records_db"]
collection = db["patients"]

model = genai.GenerativeModel(
    model_name="gemini-2.0-flash-exp",
    generation_config={
        "temperature": 1,
        "top_p": 0.95,
        "top_k": 40,
        "max_output_tokens": 8192,
        "response_mime_type": "text/plain",
    },
)

async def crawl_url(url):
    try:
        async with AsyncWebCrawler(verbose=True) as crawler:
            result = await crawler.arun(url=url)
            return result.markdown
    except Exception as e:
        print(f"Error crawling {url}: {e}")
        return None

async def web_scrap_avail_links(avail_links, mrn):
    tasks = [crawl_url(url) for url in avail_links[ :6]]
    results = await asyncio.gather(*tasks)

    with open(f"scrapped_{mrn}.txt", "w", encoding="utf-8") as file:
        for result in results:
            if result:
                file.write(result + "\n")

def get_query_urls(user_query):
    api_key = os.getenv('CUSTOM_SEARCH_API')
    search_engine_id = os.getenv("SEARCH_ENGINE_ID")

    base_url = "https://www.googleapis.com/customsearch/v1"

    params = {
        'key': api_key,
        'cx': search_engine_id,
        'q': user_query
    }

    response = requests.get(base_url, params=params)
    url = []

    if response.status_code == 200:
        response_json = response.json()
        if 'items' in response_json:
            links = response_json['items']
            for item in links:
                print(item['link'])
                url.append(item['link'])
        else:
            print("No 'items' key in response:", response_json)
    else:
        print("Search request failed:", response.status_code, response.text)

    return url

def get_patient_by_mrn(mrn_number):
    patient = collection.find_one({"MRN Number": mrn_number})
    if patient:
        patient["_id"] = str(patient["_id"])
    return patient

# def split_content(content, max_length=2000):
#     return [content[i:i + max_length] for i in range(0, len(content), max_length)]

# def summarize_chunks(medical_rec, content_chunks, user_query):
#     chat_session = model.start_chat(history=[])
#     summarized_chunks = []
#     for i, chunk in enumerate(content_chunks):
#         combined_prompts = [
#             {
#                 "role": "user",
#                 "content": f"Imagine you're a nutritionist with expertise in all types of medical conditions. {medical_rec}, this is a patient's medical history in JSON format. Based on that, you'll need to understand their medical records. For any subsequent prompts I give, you must tailor your response according to the restrictions and requirements outlined in the patient's medical records. Consider this as PROMPT-1. Do not provide any type of introduction or conclusion for the generated content by your side."
#             },
#             {
#                 "role": "user",
#                 "content": f"Consider this as PROMPT-2: {chunk}. This is part {i+1} of the webscraped content I gathered based on the user query: {user_query}. Summarize the following content into the smallest possible form while retaining all key points and providing essential details. Your summary must be concise, clear, and cover every detail strictly from the provided content without adding or omitting any information. Provide sufficient context to help the user understand, but do not introduce or conclude the response."
#             }
#         ]

#         chat_completion = chat_session.send_message(combined_prompts[1]["content"])
#         summarized_chunks.append(chat_completion.text.strip())

#     return " ".join(summarized_chunks)

def diag_summary(user_query, medical_rec, summarized_content):
    chat_session = model.start_chat(history=[])
    final_prompt = [
        {
            "role": "user",
            "content": f"Imagine you're a nutritionist with expertise in all types of medical conditions. {medical_rec}, this is a patient's medical history in JSON format. Based on that, you'll need to understand their medical records. For any subsequent prompts I give, you must tailor your response according to the restrictions and requirements outlined in the patient's medical records. {summarized_content}: This is the webscraped content I gathered based on the user query: {user_query}. Summarize the following content into the smallest possible form while retaining all key points and providing essential details. Your summary must be concise, clear, and cover every detail strictly from the provided content without adding or omitting any information. Provide sufficient context to help the user understand. Provide the response in 4 sections: 1. About the condition, 2. Prevention strategies, 3. Medication options, and 4. Nutritional advice, ensuring clarity and completeness. Do not provide any type of introduction or conclusion for the generated content by your side."
        }
    ]

    chat_completion = chat_session.send_message(final_prompt[0]["content"])
    return chat_completion.text.strip()

def dietplan_summary(user_query, medical_rec, summarized_content):
    chat_session = model.start_chat(history=[])
    final_prompt = [
        {
            "role": "user",
            "content": f"Imagine you're a nutritionist with expertise in all types of medical conditions. {medical_rec}, this is a patient's medical history in JSON format. Based on that, you'll need to understand their medical records. For any subsequent prompts I give, you must tailor your response according to the restrictions and requirements outlined in the patient's medical records. {summarized_content}: This is the webscraped content I gathered based on the user query: {user_query}. Summarize the following content into the smallest possible form while retaining all key points and providing essential details. Your summary must be concise, clear, and cover every detail strictly from the provided content without adding or omitting any information and provide me the diet plan which will best fit the user's food preference and will help them to cure the medical issue that they have. Provide sufficient context to help the user understand. Provide the response in 4 sections: Breakfast, Lunch, Evening, Dinner. Provide these sections for each day that the user asked for. Do not provide any type of introduction or conclusion for the generated content by your side."
        }
    ]

    chat_completion = chat_session.send_message(final_prompt[0]["content"])
    return chat_completion.text.strip()

def llm_infer(medical_rec, webscraped_content, user_query):
    # content_chunks = split_content(webscraped_content)
    # summarized_content = summarize_chunks(medical_rec, content_chunks, user_query)
    final_response = diag_summary(user_query, medical_rec, webscraped_content)
    return final_response

def diet_plan_call(medical_rec, webscraped_content, user_query):
    # content_chunks = split_content(webscraped_content)
    # summarized_content = summarize_chunks(medical_rec, content_chunks, user_query)
    final_response = dietplan_summary(user_query, medical_rec, webscraped_content)
    return final_response

# # Main execution flow
# if __name__ == "__main__":
#     mrd_number_input = input("Enter MRN Number: ")
#     patient_data = get_patient_by_mrn(mrd_number_input)

#     if patient_data:
#         print("Patient found:")
#         print(patient_data)

#         user_query = input("Enter your query: ")
#         query_urls = get_query_urls(user_query)

#         if query_urls:
#             asyncio.run(web_scrap_avail_links(query_urls))

#             with open("scrapped.txt", "r", encoding="utf-8") as file:
#                 webscraped_content = file.read()

#             result = llm_infer(patient_data, webscraped_content, user_query)

#             print("Model's response:")
#             print(result)
#         else:
#             print("No valid URLs found for the given query.")
#     else:
#         print("MRN Number not found. Please check the number and try again.")
