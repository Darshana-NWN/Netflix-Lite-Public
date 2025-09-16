# Netflix-Lite

A simple Netflix-like web application built with FastAPI backend and React frontend. The app fetches popular movies from The Movie Database (TMDB), allows users to like movies, and stores liked movies in MongoDB.

## Features

- Browse popular movies from TMDB
- Search for movies
- View detailed movie information
- Like and save movies to MongoDB
- Responsive React frontend
- FastAPI backend with CORS support
- Docker containerization for easy deployment

## Prerequisites

Before running the application, ensure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) (recommended for easy setup)
- [Node.js](https://nodejs.org/) (v16 or higher) and npm (for manual frontend setup)
- [Python](https://www.python.org/) (3.10 or higher) and pip (for manual backend setup)
- [MongoDB](https://www.mongodb.com/try/download/community) (local installation) or a [MongoDB Atlas](https://www.mongodb.com/atlas) account (cloud)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Netflix-Lite.git
cd Netflix-Lite
```

Replace `your-username` with your GitHub username.

### 2. Obtain API Keys

#### TMDB API Key

1. Go to [The Movie Database (TMDB)](https://www.themoviedb.org/) and create a free account.
2. Navigate to your account settings: [API Settings](https://www.themoviedb.org/settings/api).
3. Request an API key (it's free for personal use).
4. Copy your API key (v3 auth key).

#### MongoDB Connection String

Choose one of the following options:

**Option A: Local MongoDB**

1. Install MongoDB Community Server from the [official website](https://www.mongodb.com/try/download/community).
2. Start MongoDB (default port 27017).
3. Use the connection string: `mongodb://localhost:27017`

**Option B: MongoDB Atlas (Cloud)**

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas).
2. Create a new cluster (free tier available).
3. Set up database access (create a user) and network access (allow your IP or 0.0.0.0/0 for testing).
4. Get your connection string from the "Connect" button (it will look like: `mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority`).

### 3. Environment Setup

Create a `.env` file in the `backend/` directory:

```bash
cd backend
touch .env
```

Add the following content to `backend/.env`:

```
TMDB_API_KEY=your_tmdb_api_key_here
MONGO_CONNECTION_STRING=your_mongodb_connection_string_here
```

Replace `your_tmdb_api_key_here` with your TMDB API key and `your_mongodb_connection_string_here` with your MongoDB connection string.

**Note:** The `.env` file is already in `.gitignore` to keep your keys secure.

### 4. Running the Application

#### Option A: Using Docker (Recommended)

This is the easiest way to run the application locally.

1. Ensure Docker and Docker Compose are installed and running.
2. From the project root directory, run:

   ```bash
   docker-compose up --build
   ```

3. Wait for the containers to build and start.
4. Open your browser and go to:

   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:8000`

5. To stop the application, press `Ctrl+C` in the terminal.

#### Option B: Running Manually

If you prefer to run components separately:

**Backend (FastAPI):**

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Create a virtual environment:

   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:

   - Windows (PowerShell): `.\venv\Scripts\Activate.ps1`
   - Windows (Command Prompt): `venv\Scripts\activate.bat`
   - macOS/Linux: `source venv/bin/activate`

4. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

5. Run the backend server:

   ```bash
   uvicorn main:app --reload
   ```

6. The backend will be available at `http://127.0.0.1:8000`.

**Frontend (React):**

1. Open a new terminal and navigate to the frontend directory:

   ```bash
   cd frontend/client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. The frontend will open at `http://localhost:3000` and connect to the backend.

### 5. Code Changes for Local Development

If you're running locally and encounter connection issues:

#### Backend Changes (CORS)

1. Open `backend/main.py`.
2. In the `origins` list, uncomment `"http://localhost:3000"` and comment out any production URLs:
   ```python
   origins = [
       "http://localhost:3000",  # Uncomment this for local development
       # "http://your-production-domain.com",  # Comment out for local
   ]
   ```

#### Frontend Changes (API URLs)

The frontend code has hardcoded API URLs that point to the production server. For local development, you need to switch these to localhost:

1. **In `frontend/client/src/App.js`:**

   - Comment out the production URL and uncomment the localhost URL for popular movies and search:

     ```javascript
     // Production (comment out):
     // const response = await axios.get("http://56.228.18.148:8000/api/popular-movies");

     // Local development (uncomment):
     const response = await axios.get(
       "http://localhost:8000/api/popular-movies"
     );
     ```

     Do the same for the search API call.

2. **In `frontend/client/src/components/MovieDetails.js`:**

   - Comment out the production URLs and uncomment the localhost URLs for movie details and liking:

     ```javascript
     // Production (comment out):
     // const response = await axios.get(`http://56.228.18.148:8000/api/movie/${id}`);

     // Local development (uncomment):
     const response = await axios.get(`http://localhost:8000/api/movie/${id}`);
     ```

     Do the same for the like API call.

3. **In `frontend/client/src/components/MovieCard.js`:**
   - Comment out the production URL and uncomment the localhost URL for liking movies:

     ```javascript
     // Production (comment out):
     // const response = await axios.post("http://56.228.18.148:8000/api/movies/like", movie);

     // Local development (uncomment):
     const response = await axios.post(
       "http://localhost:8000/api/movies/like",
       movie
     );
     ```

**Note:** These changes are already prepared in the code with commented localhost versions. Just swap the comments as needed.

## Usage

1. Open `http://localhost:3000` in your web browser.
2. Browse popular movies fetched from TMDB.
3. Use the search bar to find specific movies.
4. Click on a movie card to view details.
5. Click the "Like" button to save movies to your MongoDB database.

## API Endpoints

The backend provides the following API endpoints:

- `GET /` - Welcome message
- `GET /api/popular-movies` - Fetch popular movies
- `GET /api/search-movies?query=<search_term>` - Search for movies
- `GET /api/movie/{movie_id}` - Get detailed information for a specific movie
- `POST /api/movies/like` - Like and save a movie (expects JSON payload with movie data)

## Deployment

For production deployment (e.g., to AWS EC2):

1. Set up an AWS EC2 instance with Docker installed.
2. Clone your repository on the instance.
3. Update the CORS origins in `backend/main.py` to include your production domain.
4. Set environment variables or use a `.env` file on the server.
5. Run `docker-compose up -d` to start in detached mode.
6. Configure a reverse proxy (e.g., Nginx) if needed.
7. Ensure your security groups allow traffic on ports 80/443 for the frontend and 8000 for the backend (or use a load balancer).

## Troubleshooting

- **Docker build fails**: Ensure your Python version matches the one in `backend/Dockerfile` (currently 3.10).
- **CORS errors**: Check and update the `origins` list in `backend/main.py`.
- **MongoDB connection issues**: Verify your connection string and ensure MongoDB is running (locally) or accessible (Atlas).
- **Ports already in use**: Change ports in `docker-compose.yml` or in the code.
- **TMDB API errors**: Confirm your API key is valid and has the correct permissions.
- **Frontend not loading**: Ensure the backend is running and accessible.

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Make your changes and commit: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
