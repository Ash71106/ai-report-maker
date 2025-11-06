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
<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# AI Issue Reporter

An AI-powered application to detect problems in photos, generate an analysis report with location, and prepare an email to the appropriate management personnel. This tool streamlines reporting maintenance, safety, and structural issues — simply take a photo and the AI will generate the analysis and a pre-filled email.

## Features

- **📸 Multi-source image input**: Upload images via drag-and-drop, file selection, or capture photos using your device camera.
- **📍 Geolocation tagging**: Captures GPS coordinates to pinpoint the issue's location.
- **🧠 AI-powered analysis**: Uses Google's Gemini API to analyze images and identify potential problems.
- **📄 Comprehensive reporting**: Produces a structured report including a concise title, detailed description, priority suggestion (Low/Medium/High), remediation steps, and suggested corporate recipient.
- **📧 One-click email generation**: Pre-fills a `mailto:` link with recipient, subject, and a professionally formatted body containing the full report.
- **✨ Modern UI**: Built with React + TypeScript and Tailwind CSS for a responsive, accessible interface.

## How it works

1. Grant permissions: the app requests location (and camera if used) to tag the report.
2. Upload or capture an image using the uploader.
3. Click "Generate Report" to send the image + location to the Gemini API.
4. Review the generated report on-screen and click "Send Report via Email" to open your default email client with the pre-populated message.

## Tech stack

- Frontend: React + TypeScript
- Styling: Tailwind CSS
- AI: Google Gemini API (`@google/genai`)

## Run locally

**Prerequisites:** Node.js

1. Install dependencies:

    npm install

2. Set your Gemini API key (environment variable) — for local development set `GEMINI_API_KEY` in `.env.local` or your shell environment.

3. Run the dev server:

    npm run dev

Note: the app is a client-side application and requires browser permissions for Geolocation and Camera to use those features.

## Project structure

```
/
├── components/          # Reusable React components
│   ├── icons.tsx        # SVG icon components
│   ├── ImageUploader.tsx# Component for image upload and camera
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
