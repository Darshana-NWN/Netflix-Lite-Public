# Stage 1: Use an official Python image as the base
# This is like starting with a clean kitchen that already has Python installed.
FROM python:3.10-slim

# Set the working directory inside the container
# This is where our code will live.
WORKDIR /app

# Copy the list of required packages
COPY requirements.txt .

# Install the packages
# This is the 'pip install' step, but inside the container.
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of our application code into the container
COPY . .

# Tell Docker what command to run when the container starts.
# This is the 'uvicorn' command we've been running manually.
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]