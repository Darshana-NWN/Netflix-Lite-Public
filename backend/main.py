import os
import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pymongo import MongoClient
from bson import ObjectId


load_dotenv()

app = FastAPI()

origins = [
    "http://56.228.18.148:3000",
    #"http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

TMDB_API_KEY = os.getenv("TMDB_API_KEY")

MONGO_URI = os.getenv("MONGO_CONNECTION_STRING")
client = MongoClient(MONGO_URI)
db = client.get_database("netflix-lite")
liked_movies_collection = db.get_collection("liked_movies")

@app.get("/")
async def read_root():
    return {"message": "Welcome to Netfli-lite !"}

@app.get("/api/popular-movies")
async def get_popular_movies():
    url = f"https://api.themoviedb.org/3/movie/popular?api_key={TMDB_API_KEY}&language=en-US&page=1"
    try:
        response = requests.get(url)
        response.raise_for_status()

        return response.json()["results"]
    except requests.RequestException as e:
        return {"error": str(e), "status_code": 500}

@app.post("/api/movies/like")
async def like_movie(movie_data: dict):
    if liked_movies_collection.find_one({"id": movie_data.get("id")}):
        return {"message": "Movie already liked"}
    
    result = liked_movies_collection.insert_one(movie_data)

    if result.inserted_id:
        return {"message": "Movie liked successfully", "db_id": str(result.inserted_id)}
    else: 
        return {"error": "Failed to like movie", "status_code": 500}

@app.get("/api/search-movies")
async def search_movies(query: str):
    if not query:
        return {"error": "Query parameter is required", "status_code": 400}
    
    url = f"https://api.themoviedb.org/3/search/movie?api_key={TMDB_API_KEY}&language=en-US&query={query}&page=1"
    try:
        response = requests.get(url)
        response.raise_for_status()

        return response.json()["results"]
    except requests.RequestException as e:
        return {"error": str(e), "status_code": 500}

@app.get("/api/movie/{movie_id}")
async def get_movie_details(movie_id: int):
    url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key={TMDB_API_KEY}&language=en-US"
    try:
        response = requests.get(url)
        response.raise_for_status()

        return response.json()
    except requests.RequestException as e:
        return {"error": str(e), "status_code": 500}