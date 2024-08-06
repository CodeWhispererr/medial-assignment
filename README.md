
# Blog Post OG Image Generator

This project is a Node.js application that creates Open Graph (OG) images for blog posts and manages blog post content. It uses Express.js as the web framework, MongoDB for data storage, and AWS S3 for image hosting.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Setup](#setup)
3. [Environment Variables](#environment-variables)
4. [API Endpoints](#api-endpoints)
5. [Functionality Overview](#functionality-overview)
6. [Dependencies](#dependencies)

## Project Structure

The project follows the MVC (Model-View-Controller) pattern on the server side 
## Setup

1. Clone the repository
2. Install dependencies:
`cd server
npm i
nodemon ./server.js
cd medial-assignment
npm i
npm run dev`

4. Set up environment variables (see [Environment Variables](#environment-variables) section)
5. Start the server: npm start

## Environment Variables
Create a `.env` file in the root directory with the following variables:
PORT=5000
MONGO_URL=your_mongodb_connection_string
AWS_ACCESS_KEY=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
S3_REGION=your_s3_region
S3_BUCKET_NAME=your_s3_bucket_name

## API Endpoints

1. **Create Post**
   - URL: `/api/create-post`
   - Method: POST
   - Body: 
     ```json
     {
       "title": "Post Title",
       "content": "Post content with HTML"
     }
     ```
   - Response: Returns the URL of the generated OG image

2. **Get All Posts**
   - URL: `/api/posts`
   - Method: GET
   - Response: Returns an array of all posts

3. **Get Single Post**
   - URL: `/api/post/:id`
   - Method: GET
   - Response: Returns the details of a single post

4. **Upload Image**
   - URL: `/api/upload-image`
   - Method: POST
   - Body: Form-data with key 'image' and file as value
   - Response: Returns the URL of the uploaded image

## Functionality Overview

### OG Image Generation
- When a new post is created, an OG image is automatically generated.
- The image includes the post title, a snippet of the content, and the first image found in the post content (if any).
- The generated image is uploaded to AWS S3.

### Post Management
- Posts can be created, retrieved individually, or fetched as a list.
- Post data is stored in MongoDB.

### Image Upload
- Supports uploading images for use in blog posts.
- Uploaded images are stored locally in the `uploads/` directory.

## Dependencies

- express: Web application framework
- mongoose: MongoDB object modeling
- aws-sdk: AWS SDK for JavaScript
- multer: Middleware for handling multipart/form-data
- canvas: Node canvas library for image manipulation
- html-to-text: HTML to plain text conversion
- cors: Cross-Origin Resource Sharing middleware
- dotenv: Environment variable management
- nanoid: Unique ID generation


When a new post is created, the content is extracted from the request body.
The plain text version of the content is created using the HTML-to-text package to remove HTML tags and keep the text readable.
A canvas is created using the canvas package to draw the OG image
The canvas size is set to 1200x630 pixels, which is a standard size for OG images.

A background color is set for the canvas.
The title and the first part of the content are drawn onto the canvas.
If an image is present in the content, it is also drawn onto the canvas.

A logo is loaded and drawn onto the canvas in a designated position.
Generating the Image Buffer:

The canvas is converted into a PNG buffer.
Uploading to AWS S3:

The generated PNG buffer is uploaded to an AWS S3 bucket using the aws-sdk package.
A unique filename is generated for each image using the nanoid package to ensure no conflicts.
The uploaded image's URL is returned and stored in the MongoDB post document.
