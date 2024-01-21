import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import joblib
import random
from input import user_favorite_books, user_favorite_authors, user_topics_of_interest

class BookRecommendationSystem:
    def __init__(self):
        self.movies_data = [
            {"Movie Title": "Avatar: The Way of Water", "Genre": "Wildlife,Action,Sci-fi, Adventure"},
            {"Movie Title": "Uri: The Surgical Strike", "Genre": "Action, War, Indian Army, Non-Fiction"},
            {"Movie Title": "Shershaah", "Genre": "War, Biography, Action, Indian Army, Non-Fiction"},
            {"Movie Title": "Lootera", "Genre": "Romance, Historical Fiction, Crime"},
            {"Movie Title": "Piku", "Genre": "Drama, Comedy, Travelogue"},
            {"Movie Title": "Everything Everywhere All at Once", "Genre": "Sci-fi, Fantasy, Comedy, Drama, LGBTQ"},
            {"Movie Title": "Zindagi Na Milegi Dobaara", "Genre": "Travelogue, Romance, Comedy, Non-Fiction, Friendship"},
            {"Movie Title": "Life Of Pi", "Genre": "Adventure, Action, Survival, Wildlife"},
            {"Movie Title": "Andhadhun", "Genre": "Thriller, Fiction, Mystery, Suspense"},
            {"Movie Title": "Wolf of Wall Street", "Genre": "Financial Thriller, Comedy, Anti-Hero, Drama, Biography"},
            {"Movie Title": "The Big Short", "Genre": "Financial Thriller, Dark-Comedy, Noir, Tragedy"},
            {"Movie Title": "Ratatouille", "Genre": "Food, Children, Comedy ,Fiction"},
            {"Movie Title": "The Lunchbox", "Genre": "Food,  Novel, Romance, Comedy, Drama"},
            {"Movie Title": "Call Me By Your Name", "Genre": "LGBTQ, Coming-Of-Age, Romance, Drama"},
            {"Movie Title": "The Namesake", "Genre": "Coming-Of-Age, Culture, Family, Drama"},
            {"Movie Title": "Devi", "Genre": "Comedy, Cinema, Mystery, Drama"},
            {"Movie Title": "Peter Pan", "Genre": "Children, Fiction, Fantasy"}
        ]

        self.df = pd.read_csv('Python/Book details_tech.csv')
        self.selected_features = ['Book Title', 'Author Name', 'Genre/Categories']
        for feature in self.selected_features:
            self.df[feature] = self.df[feature].fillna('')
        self.combined_features = self.df['Book Title'] + ' ' + self.df['Author Name'] + ' ' + self.df['Genre/Categories']

        self.vectorizer = joblib.load('Python/tfidf_model.pkl')
        self.similarity = np.load('Python/similarity_matrix.npy')
        self.selected_genres = set()

    def preprocess_pricing_column(self):
        self.df['Pricing'] = self.df['Pricing'].str.replace(r'[^\d\-.,]', '', regex=True)
        self.df['Pricing'] = self.df['Pricing'].str.replace(',', '')
        self.df['Pricing'] = self.df['Pricing'].str.rstrip('-')

        try:
            self.df['Pricing'] = pd.to_numeric(self.df['Pricing'])
        except ValueError:
            print("Warning: Some prices could not be converted to numeric values. They will be excluded from price filtering.")

    def display_random_pairs(self):
        random_pairs = random.sample(self.movies_data, k=2)
        return random_pairs

    def get_user_selection(self, pair):
        print(f"\n1. {pair[0]['Movie Title']} ({pair[0]['Genre']})")
        print(f"2. {pair[1]['Movie Title']} ({pair[1]['Genre']})")

        while True:
            user_input = input("Select a movie (1 or 2): ")
            if user_input in ['1', '2']:
                return pair[int(user_input) - 1]
            else:
                print("Invalid input. Please enter 1 or 2.")

    def get_user_input(self):
        self.book_name = user_favorite_books[0].lower()

        try:
            self.max_price = float(input('Enter your maximum price (numeric value only): '))
        except ValueError:
            print("Invalid input for maximum price. Please enter a numeric value.")
            self.max_price = float('inf')

    def filter_books_by_genre(self):
        for _ in range(5):
            movie_pair = self.display_random_pairs()
            user_selection = self.get_user_selection(movie_pair)
            self.selected_genres.update(user_selection['Genre'].split(','))

        title_matches = self.df[self.df['Book Title'].str.lower().str.contains(self.book_name)]

        if title_matches.empty:
            print(f"No close match found for '{self.book_name}'.")
        else:
            index_of_the_book = title_matches.index[0]

            similarity_score = list(enumerate(self.similarity[index_of_the_book]))
            sorted_similar_books = sorted(similarity_score, key=lambda x: x[1], reverse=True)
            self.preprocess_pricing_column()

            filtered_books = self._filter_books_by_genre(sorted_similar_books)
            if not filtered_books:
                print("No books found based on selected genres. Displaying books based on titles and prices.")
                filtered_books = self._filter_books_by_price(sorted_similar_books)

            self.display_books(filtered_books)

    def _filter_books_by_genre(self, sorted_similar_books):
        filtered_books = []
        for book in sorted_similar_books:
            index = book[0]
            genres = self.df.loc[index, 'Genre/Categories'].lower().split(',')
            if any(genre.strip() in self.selected_genres for genre in genres):
                filtered_books.append(book)

        return filtered_books

    def _filter_books_by_price(self, sorted_similar_books):
        max_price_books = [book for book in sorted_similar_books if self.df.loc[book[0], 'Pricing'] <= self.max_price]
        return max_price_books

    def display_books(self, filtered_books):
        print('Books suggested for you within your criteria:\n')
        i = 1
        for book in filtered_books:
            index = book[0]
            title_from_index = self.df.loc[index, 'Book Title']
            if i < 6:
                print(i, '.', title_from_index)
                i += 1
