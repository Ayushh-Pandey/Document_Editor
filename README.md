# Document Editor

A collaborative document editor where you can create, edit, and share documents in real-time.

## What it does

This is a web-based document editor that lets multiple people work on the same document at the same time. You can write, format text, add images, and export your work as a PDF.

## Tech Stack

**Frontend:**
- React
- Material UI for the interface
- Quill for text editing
- Socket.io for real-time updates

**Backend:**
- Node.js with Express
- MongoDB for storing documents
- Socket.io for live collaboration
- Cloudinary for storing images

## Getting Started

### With Docker (easier way)

1. Clone this repo
2. Create a `backend.env` file in the `server` folder with these variables:
```
MONGO_INITDB_ROOT_USERNAME=your_mongodb_username
MONGO_INITDB_ROOT_PASSWORD=your_mongodb_password
ME_CONFIG_MONGODB_URL=mongodb://your_mongodb_usernam:your_mongodb_password@mongo:27017/
ME_CONFIG_BASICAUTH_ENABLED=true
ME_CONFIG_BASICAUTH_USERNAME=your_mongodb_username
ME_CONFIG_BASICAUTH_PASSWORD=your_mongodb_password
MONGODB_URL=your_mongodb_connection_url
PORT=5000
CLOUDINARY_UPLOAD_CLOUNDNAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
3. Create a `.env` file in the client folder with variables:
```
REACT_APP_API_URL=your_backend_api_url
```   
4. Run `docker-compose up`
5. Open http://localhost:3000

### Without Docker
**First Clone this repo then**

**Backend:**
1. Go to the `server` folder
2. Run `npm install`
3. Create a `backend.env` file with these
```
MONGODB_URL=your_mongodb_connection_url
PORT=5000
CLOUDINARY_UPLOAD_CLOUNDNAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
4. Run `npm start`

**Frontend:**
1. Go to the `client` folder
2. Run `npm install`
3. Run `npm start`

## Features

- Write and format documents with a rich text editor
- Multiple people can edit the same document at once
- Upload and insert images
- Export documents as PDF
- Auto-save your work
- Real-time syncing between users

## Ports

- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- MongoDB: localhost:27017
- Mongo Express (database viewer): http://localhost:8081

## Notes

Make sure you have Docker installed if you're using the docker-compose method. Otherwise you'll need Node.js and MongoDB installed locally.
