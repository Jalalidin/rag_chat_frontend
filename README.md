# RAG Chat Application - Frontend

This repository contains the frontend code for the RAG Chat application. RAG Chat is a web application that leverages Retrieval-Augmented Generation (RAG) to provide users with an interactive and intelligent chat experience. Users can upload documents, manage them, and engage in real-time conversations with an AI assistant powered by configurable Large Language Models (LLMs).

## Features

-   **Authentication:** Secure user login and registration using token-based authentication (JWT).
-   **Document Management:**
    -   Upload multiple documents (PDF, TXT, etc.) with a drag-and-drop interface.
    -   View a list of uploaded documents with their status (queued, processing, completed, failed).
    -   Delete uploaded documents.
-   **Chat Interface:**
    -   Create and manage multiple chat sessions.
    -   Engage in real-time chat with the AI assistant.
    -   View chat history with infinite scrolling.
    -   Display source documents used for generating AI responses.
-   **LLM Configuration:**
    -   Create and manage custom LLM configurations.
    -   Select from supported models (e.g., OpenAI, Gemini, Mistral).
    -   Set a default LLM configuration.
-   **Responsive Design:** Adapts to different screen sizes and devices (desktops, tablets, mobile phones).

## Technology Stack

-   **Language:** JavaScript (ES6+) with TypeScript
-   **Framework:** React
-   **State Management:** Zustand
-   **UI Library:** Custom components with Tailwind CSS
-   **Styling:** Tailwind CSS
-   **Build Tool:** Vite
-   **HTTP Client:** Axios
-   **Icons:** Lucide React

## Prerequisites

-   Node.js (v18 or higher)
-   npm or yarn

## Getting Started

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd rag-frontend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Configure the backend API URL:**

    The frontend communicates with a backend API. By default, it proxies requests to `http://localhost:8000`. You can change this in `vite.config.ts` if your backend is running on a different port or host.

4. **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    This will start the development server and open the application in your default browser (usually at `http://localhost:5173`).

## Building for Production

To build the application for production, run:
