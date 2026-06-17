from groq import Groq
from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware

app=FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
load_dotenv()
client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

class type(BaseModel):
    text:str
def ai(query):
    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system",
                    "content": "summarize the whole text in four bullet point"
                },
                {
                    "role": "user",
                    "content": query
                }
            ]
        )
        return response.choices[0].message.content

    except Exception as e:
        return f"Error: {str(e)}"

@app.get("/")
def home():
    return {"status":"hello.... "}

@app.post("/summarizer")
def ai_sum(user_txt:type): 
    result= ai(user_txt.text)
    
    return{"result":result}


    