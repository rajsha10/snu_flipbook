import google.generativeai as genai
import os 
from input import user_favorite_books, user_favorite_authors, user_topics_of_interest

genai.configure(api_key=os.getenv("GOOGLE API KEY"))
generation_config = {"temperature": 0.9, "top_p": 1, "top_k": 1, "max_output_tokens": 2048}

model = genai.GenerativeModel("gemini-pro", generation_config=generation_config)

user_input_prompt = f"Given the favorite books {user_favorite_books} in the style of the author {user_favorite_authors}, recommend the top 5 closest books. Consider topics of interest: {user_topics_of_interest}."
gemini_response = model.generate_content(user_input_prompt)

print("Response:")
print(gemini_response.text)