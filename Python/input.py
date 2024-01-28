import json

book_preference = json.load(open('./user_resource/book_preference.json', 'r'))

user_favorite_books = book_preference["user_favorite_books"]
user_favorite_authors = book_preference["user_favorite_authors"]
user_topics_of_interest = book_preference["user_topics_of_interest"]

# print(user_favorite_books, user_favorite_authors, user_topics_of_interest)
# user_favorite_books = "harry potter, cool, 84 days around the world"
# user_favorite_authors ="tesla, cooleen hoover, aya hoodod"
# user_topics_of_interest ="gothic, fiction, fantasy"
