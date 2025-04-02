
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Prerequisites
1. **Ensure Ngrok is configured on your machine:**  
    - **Download and install Ngrok:** [Ngrok Official Site](https://ngrok.com/download)  
    - **Create a free Ngrok account:**  Sign up at [Ngrok Signup](https://dashboard.ngrok.com/signup) to obtain an authentication token.  
    - **Authenticate your Ngrok installation** using the following command (replace `YOUR_AUTH_TOKEN` with the actual token from your Ngrok dashboard):  
    ```bash
      ngrok config add-authtoken <YOUR_AUTH_TOKEN>
    ```
    - **Verify that Ngrok is installed by running**
     ```bash
      ngrok --version
    ```

2. **Node.js & npm:** Make sure Node.js and npm are installed on your machine.  
   Verify using:  
   ```bash
   node -v  
   npm -v
   ```

## Project Setup

### 1. Frontend Setup

- Copy `.env_frontend_sample` under `frontend/m1-react-quickstart` using following command and update access key in the newly created .env file.
  
- ```bash
  cp .env_frontend_sample frontend/m1-react-quickstart/.env
  ```

- In your terminal, navigate to the `frontend/m1-react-quickstart` folder.

- ```bash
  cd frontend/m1-react-quickstart
  ```

- Run the following command to install dependencies:

- ```bash
   npm install
  ```

- Once the dependencies are installed, start the frontend application with:
  ```bash
  npm start
  ```
- The application will run on [http://localhost:3000](http://localhost:3000) and the UI will be visible in your browser.

### 2. Backend Setup (Node Server)

- Open a new terminal tab and copy `.env_node_sample` under `node` using following command and update client id and secret key.
  
- ```bash
  cp .env_node_sample node/.env
  ```
- Navigate to the `node` folder.
- ```bash
  cd node
   ```
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
- Double-check your `.env` files for accuracy and ensure that your `M1_CLIENT_ID` , `M1_CLIENT_SECRET` and `REACT_APP_ACCESS_KEY` are correctly added.


