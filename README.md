
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Prerequisites
1. **Ensure Ngrok is configured on your machine:**  
   [Download and Set Up Ngrok](https://ngrok.com/download)
2. **Node.js & npm:** Make sure Node.js and npm are installed on your machine.  
   Verify using:  
   ```bash
   node -v  
   npm -v
   ```

## Project Setup

### 1. Frontend Setup
- Navigate to the `frontend/m1-react-quickstart` folder.
- Create a `.env` file in this folder with the following content:
  ```env
  REACT_APP_SERVER_URL=http://localhost:3000
  REACT_APP_M1_HOSTNAME=api.measureone.com
  REACT_APP_ACCESS_KEY=
  ```
- In your terminal, navigate to the same folder and run:
  ```bash
  npm install
  ```
- Once the dependencies are installed, start the frontend application with:
  ```bash
  npm start
  ```
- The application will run on [http://localhost:3000](http://localhost:3000) and the UI will be visible in your browser.

### 2. Backend Setup (Node Server)
- Navigate to the `node` folder.
- Create a `.env` file in this folder with the following content:
  ```env
  M1_API_URL=https://api.measureone.com
  M1_CLIENT_ID=<your_client_id>
  M1_CLIENT_SECRET=<your_client_secret>
  ```
- Open a new terminal tab and navigate to the `node` folder.
- Run the following command to install dependencies:
  ```bash
  npm install
  ```
- Once the installation is complete, start the server with:
  ```bash
  npm start
  ```
- The server will start successfully.

## Development Mode
- The React app will run in development mode and reload upon code changes.
- Visit [http://localhost:3000](http://localhost:3000) to view the frontend.
- The backend server will run independently from the frontend.
- Monitor the console for lint errors and warnings.

---
### Notes
- Ensure your Ngrok setup is properly configured to expose your local server if necessary.
- Double-check your `.env` files for accuracy and ensure that your `M1_CLIENT_ID` and `M1_CLIENT_SECRET` are correctly added.


