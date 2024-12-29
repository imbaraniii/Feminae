
import markdown
from weasyprint import HTML


def summarize_chat_history(chat_history):
    from groq import Groq
    from dotenv import load_dotenv
    import os
    load_dotenv()

    client = Groq(
        api_key=os.getenv("GROQ_API_KEY")
    )

    token_summ = ""
    for i, chat in enumerate(chat_history):
        token_summ += f"{i}) " + chat['content'] + "\n"
        
    prompt = [
    {
        "role": "user",
        "content": f"""Imagine you're a professional medical report generator. 
        I'll provide a list of responses from a conversation, and I need you to create a clear and structured medical report based on the valid information provided. 
        -please donot include any other text in the response like..("here is the response").
        - Ignore responses that begin with warnings ('please'). 
        - Focus on summarizing only the relevant and valid medical details.
        - Maintain accuracy, and ensure the diet plan or health-related recommendations are preserved.
        - Format the output into structured *Markdown* with sections such as:
          - ## Medical History
          - ## Dietary Information
          - ## Physical Activity
          - ## Recommendations
          - ## Nutitional values
        - if there is no information about a specific section, do not include it here.
        
        Here are the responses: {token_summ}"""
    },
]

    chat_completion = client.chat.completions.create(
        messages=prompt,
        model="llama3-8b-8192",
    )

    with open("summ_chat_hist.md", 'w') as sch:
        sch.write(chat_completion.choices[0].message.content.strip())




import markdown

def convert_markdown_to_html(md_file, html_file):
    with open(md_file, 'r', encoding='utf-8') as f:
        md_content = f.read()

    # Convert Markdown to HTML
    html_content = markdown.markdown(md_content)

    # Generate the HTML template with styles
    html_template = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Medical Report</title>
        <style>
            /* Paged Media Rules */
            @page {{
                size: A4;
                margin: 1in; /* Default margins for subsequent pages */
            }}

            @page:first {{
                margin: 2in 1in 1in 1in; /* Larger top margin for the first page */
                @top-center {{
                    content: element(header); /* Include header only on the first page */
                }}
                @bottom-center {{
                    content: element(footer); /* Include footer only on the first page */
                }}
            }}

            /* General body styles */
            body {{
                font-family: Arial, sans-serif;
                margin: 0; /* Use @page for margins */
                color: #333;
                position: relative;
            }}

            /* Header for the first page */
            header {{
                position: running(header);
                text-align: center;
                font-size: 20px;
                font-weight: bold;
                border-bottom: 2px solid #4CAF50;
                padding: 10px;
            }}

            header h1 {{
                margin: 0;
                font-size: 24px;
                color: #4CAF50;
            }}

            header h2 {{
                margin: 5px 0 0;
                font-size: 16px;
                color: #555;
            }}

            /* Footer for the first page */
            footer {{
                position: running(footer);
                font-size: 12px;
                text-align: center;
                color: #888;
                border-top: 1px solid #ccc;
                padding-top: 10px;
            }}

            /* Watermark for the first page */
            .watermark {{
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 50px;
                color: rgba(200, 200, 200, 0.2);
                z-index: -1;
                text-transform: uppercase;
                letter-spacing: 5px;
            }}

            /* Content styling */
            main {{
                margin-top:0.1in; /* Space below the header on the first page */
            }}

            /* Borders for all pages */
            body {{
                border: 1px solid #4CAF50; /* Apply border to all pages */
                padding: 0.2in; /* Content padding */
            }}

            h2 {{
                color: #4CAF50;
                border-bottom: 1px solid #ddd;
                padding-bottom: 5px;
            }}

            p {{
                line-height: 1.6;
                margin-bottom: 10px;
            }}
        </style>
    </head>
    <body>
        <header>
            <h1>Medical Report</h1>
            <h2>Offered by NutrinO-RAG</h2>
        </header>

        <div class="watermark">Team Nooglers</div>

        <footer>
            Page {{ page }} of {{ total }}
        </footer>

        <main>
            {html_content}
        </main>
    </body>
    </html>
    """

    # Write the HTML template to the file
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(html_template)


def generate_pdf_from_html(html_file, output_pdf):
    HTML(html_file).write_pdf(output_pdf)
    


def write_pdf():
    
    
    # Convert Markdown to HTML
    md_file = "summ_chat_hist.md"
    html_file = "summ_chat_hist.html"
    convert_markdown_to_html(md_file, html_file)
    
    # Generate PDF
    output_pdf = "final_output.pdf"
    generate_pdf_from_html(html_file, output_pdf)
