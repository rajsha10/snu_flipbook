from singleclassrecommender import BookRecommendationSystem
from app import gemini_response
print("Response:")
print(gemini_response.text)
book_system = BookRecommendationSystem()
book_system.get_user_input()
book_system.filter_books_by_genre()
