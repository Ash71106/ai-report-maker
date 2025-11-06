# AI Issue Reporter

An AI-powered application to detect problems in photos, generate an analysis report with location, and prepare an email to the appropriate management personnel.

This tool streamlines the process of identifying and reporting maintenance, safety, or structural issues. Simply take a photo, and the AI will handle the analysis and documentation.

## Features

-   **📸 Multi-Source Image Input**: Upload images via drag-and-drop, file selection, or capture photos directly using your device's camera.
-   **📍 Geolocation Tagging**: Automatically captures your current GPS coordinates to pinpoint the issue's location.
-   **🧠 AI-Powered Analysis**: Utilizes Google's Gemini API to analyze the image and identify potential problems.
-   **📄 Comprehensive Reporting**: Generates a structured report that includes:
    -   A concise problem title.
    -   A detailed description of the issue and its risks.
    -   A suggested priority level (Low, Medium, High).
    -   Actionable remediation steps.
    -   A suggested corporate recipient (e.g., "Facilities Manager").
-   **📧 One-Click Email Generation**: Pre-fills a `mailto:` link with the recipient, subject, and a professionally formatted body containing the full report, ready to be sent from your default email client.
-   **✨ Modern & Responsive UI**: A clean, user-friendly interface built with React and Tailwind CSS that works seamlessly across devices.
-   ** feedback**: Provides clear loading and error states to keep the user informed throughout the process.

## How It Works

1.  **Grant Permissions**: Upon loading, the application will request access to your location to accurately tag the report.
2.  **Upload an Image**: Use the uploader to select an image file or click "Use Camera Instead" to take a live photo of the issue.
3.  **Generate Report**: With an image uploaded and location acquired, click the "Generate Report" button.
4.  **AI Analysis**: The app sends the image and your location data to the Gemini API. The AI analyzes the content and generates a detailed issue report.
5.  **Review & Send**: The complete report is displayed on the screen. After reviewing it, click "Send Report via Email" to open your email client with the pre-populated report.

## Tech Stack

-   **Frontend**: React, TypeScript
-   **Styling**: Tailwind CSS
-   **AI Model**: Google Gemini API (`@google/genai`)
-   **Module System**: ES Modules with Import Maps

## Setup and Running Locally

This project is configured to run in an environment where the Gemini API key is securely managed.

1.  **API Key**: The application requires a Google Gemini API key. It is accessed via `process.env.API_KEY`. Ensure this environment variable is set in your deployment environment.
2.  **Permissions**: For full functionality, the application requires browser permissions for **Geolocation** and **Camera** access.
3.  **Run**: Serve the `index.html` file using any static file server. The application is a pure client-side app and requires no backend server.

## Project Structure

```
/
├── components/          # Reusable React components
│   ├── icons.tsx        # SVG icon components
│   ├── ImageUploader.tsx # Component for image upload and camera
│   ├── Loader.tsx       # Loading spinner component
│   └── ReportDisplay.tsx# Component to show the analysis report
├── services/            # API interaction logic
│   └── geminiService.ts # Service for interacting with the Gemini API
├── App.tsx              # Main application component
├── index.html           # Main HTML file
├── index.tsx            # Entry point for the React app
├── metadata.json        # Application metadata for permissions
├── types.ts             # TypeScript type definitions
└── README.md            # This file
```
