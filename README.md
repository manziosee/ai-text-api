# **AI Text API**

This is a backend API that interacts with OpenAI's GPT-3.5-turbo model to process user input and generate AI responses. The API is built using **Node.js**, **Express**, and **Swagger** for documentation.

---

## **Features**
- **Chat Endpoint**: Send a message to the AI and receive a response.
- **Swagger Documentation**: Interactive API documentation.
- **Environment Variables**: Secure configuration using `.env`.
- **CORS Support**: Allows cross-origin requests for frontend integration.

---

## **Table of Contents**
1. [Prerequisites](#prerequisites)
2. [Setup](#setup)
3. [Running the Project](#running-the-project)
4. [API Endpoints](#api-endpoints)
5. [Swagger Documentation](#swagger-documentation)
6. [Deployment](#deployment)
7. [Folder Structure](#folder-structure)
8. [Technologies Used](#technologies-used)

---

## **Prerequisites**
Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- An [OpenAI API Key](https://platform.openai.com/signup)

---

## **Setup**
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/ai-text-api.git
   cd ai-text-api
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env` file**:
   - In the root of the project, create a `.env` file.
   - Add your OpenAI API key and port configuration:
     ```env
     OPENAI_API_KEY=your_openai_api_key
     PORT=3000
     ```

---

## **Running the Project**
1. **Start the server**:
   ```bash
   npm start
   ```

2. **Development mode** (with hot-reloading):
   ```bash
   npm run dev
   ```

3. **Access the API**:
   - The API will be running at `http://localhost:3000`.

---

## **API Endpoints**
### **Send a Message**
- **URL**: `/api/chat/send`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "message": "Hello, how are you?"
  }
  ```
- **Response**:
  ```json
  {
    "response": "I'm just a computer program, but I'm here to help! How can I assist you today?"
  }
  ```

---

## **Swagger Documentation**
The API is documented using Swagger. You can access the interactive documentation at:
- **URL**: `http://localhost:3000/api-docs`

---

## **Deployment**
### **Deploy to Render**
1. Push your code to a GitHub repository.
2. Go to [Render](https://render.com/) and create a new **Web Service**.
3. Connect your GitHub repository.
4. Add the following environment variables:
   - `OPENAI_API_KEY`: Your OpenAI API key.
   - `PORT`: Set to `10000` (or any port supported by Render).
5. Deploy the app.

---

## **Folder Structure**
```
ai-text-api/
├── src/
│   ├── controllers/          # Logic for handling API requests
│   ├── routes/               # API route definitions
│   ├── services/             # Business logic (e.g., OpenAI integration)
│   ├── utils/                # Utility functions
│   ├── app.js                # Express app configuration
│   └── server.js             # Server entry point
├── swagger.yaml              # Swagger API documentation
├── .env                      # Environment variables
├── .gitignore                # Files to ignore in Git
├── package.json              # Project dependencies and scripts
└── README.md                 # Project documentation
```

---

## **Technologies Used**
- **Node.js**: JavaScript runtime for building the backend.
- **Express**: Web framework for creating the API.
- **Axios**: HTTP client for making requests to OpenAI.
- **Swagger**: API documentation tool.
- **Dotenv**: Loads environment variables from `.env`.
- **CORS**: Enables cross-origin resource sharing.

---

## **Contributing**
If you'd like to contribute to this project, follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeatureName`).
5. Open a pull request.

---

## **License**
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## **Support**
If you encounter any issues or have questions, feel free to open an issue on the [GitHub repository](https://github.com/your-username/ai-text-api/issues).

---

Enjoy building with the **AI Text API**! 🚀