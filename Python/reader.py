import os
import numpy as np
import pickle
from tfidf_model import create_tfidf_model
from singleclassrecommender import BookRecommendationSystem

script_dir = os.path.dirname(os.path.realpath(__file__))
npy_file_name = 'similarity_matrix.npy'
npy_file_path = os.path.join(script_dir, npy_file_name)
data = np.load(npy_file_path)
print(data)

pkl_file_name = 'tfidf_model.pkl'
pkl_file_path = os.path.join(script_dir, pkl_file_name)
book_system = BookRecommendationSystem()

with open(pkl_file_path, 'wb') as file:
    pickle.dump(book_system, file)
    
with open(pkl_file_path, 'rb') as file:
    loaded_book_system = pickle.load(file)
    
print(loaded_book_system)

loaded_book_system.get_user_input()
loaded_book_system.filter_books_by_genre()