# Netflix-lite

A simple Netflix-like app with a FastAPI backend and React frontend. The backend fetches popular movies from TMDB and allows liking movies, stored in MongoDB. The frontend displays movies and handles likes.

## Prerequisites

- Docker and Docker Compose (for containerized setup)
- Node.js and npm (for manual frontend run)
- Python 3.10+ and pip (for manual backend run)
- MongoDB (local or cloud instance)
- TMDB API key (get from [TMDB](https://www.themoviedb.org/settings/api))
- SSH client (for connecting to AWS EC2 instance)

## SSH Connection to AWS EC2

If you're deploying to AWS EC2, you can connect to your instance using SSH:

### Prerequisites for SSH Connection

- AWS EC2 instance running
- SSH key pair (private key file)
- Public IP address of your EC2 instance

### Connecting via SSH

1. Ensure your SSH key has the correct permissions:

   ```bash
   chmod 400 /path/to/your/private-key.pem
   ```

2. Connect to your EC2 instance:

   ```bash
   ssh -i "/path/to/your/private-key.pem" ec2-user@your-ec2-public-ip
   ```

   Replace:

   - `/path/to/your/private-key.pem` with the path to your private key file
   - `your-ec2-public-ip` with your EC2 instance's public IP address

3. Once connected, you can navigate to your project directory :

   ```bash
   cd Netflix-Lite
   ```

4. Check the deployment sstatus:
   ```bash
   docker-compose ps
   ```

### Troubleshooting SSH Connection

- **Permission denied**: Ensure your private key file has 400 permissions (`chmod 400 key.pem`)
- **Connection refused**: Check if your EC2 instance is running and security groups allow SSH (port 22)
- **Host key verification failed**: Run `ssh-keyscan -H your-ec2-ip >> ~/.ssh/known_hosts`

## Environment Variables

Create a `.env` file in tthe `backend/` directory with:

```
TMDB_API_KEY=your_tmdb_api_key_here
MONGO_CONNECTION_STRING=your_mongodb_connection_string_here
```

## Running with Docker (Recommended)

1. Ensure Docker and Docker Compose are installed.
2. From the project root (`E:\Netflix-lite`), run:
   ```
   docker-compose up --build
   ```
3. The backend will run on `http://localhost:8000` and frontend on `http://localhost:3000`.

## Running Manually

### Backend (FastAPI)

1. Navigate to `backend/`:
   ```
   cd backend
   ```
2. Create and activate a virtual environment:
   ```
   python -m venv venv
   .\venv\Scripts\Activate.ps1  # Windows PowerShell
   # or venv\Scripts\activate.bat  # Windows Command Prompt
   ```
3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
4. Run the server:
   ```
   uvicorn main:app --reload
   ```
5. Backend will run on `http://127.0.0.1:8000`.

### Frontend (React)

1. Navigate to `frontend/client/`:
   ```
   cd frontend/client
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development serverr:
   ```
   npm start
   ```
4. Frontend will run on `http://localhost:3000` and open in your browser.

## Usage

- Open `http://localhost:3000` in your browser.
- View popular movies fetched from TMDB.
- Click "Like" on a movie to save it to MongoDB.
- Backend API endpoints:
  - `GET /`: Welcome message
  - `GET /api/popular-movies`: Fetch popular movies
  - `POST /api/movies/like`: Like a movie

## Troubleshooting

- If Docker build fails, ensure Python version in Dockerfile matches your requirements (e.g., use `python:3.10-slim`).
- For CORS issues, check origins in `backend/main.py`.
- Ensure MongoDB is running and connection string is correct.
- If ports are in use, change them in code or Docker Compose.
