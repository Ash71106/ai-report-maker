import React, { useState, useEffect, useCallback } from 'react';
import ImageUploader from './components/ImageUploader';
import ReportDisplay from './components/ReportDisplay';
import Loader from './components/Loader';
import { analyzeImageWithLocation } from './services/geminiService';
import { AnalysisReport, Location } from './types';
import { LocationIcon, CheckCircleIcon, ExclamationCircleIcon } from './components/icons';

const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [report, setReport] = useState<AnalysisReport | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setError(null);
        },
        (error) => {
          console.error("Error getting location:", error);
          setError("Could not retrieve location. Please enable location services.");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  const handleImageSelect = useCallback((file: File, dataUrl: string) => {
    setImageFile(file);
    setImagePreviewUrl(dataUrl);
    setReport(null); // Reset report when new image is selected
  }, []);
  
  const handleClearImage = () => {
    setImageFile(null);
    setImagePreviewUrl(null);
    setReport(null);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!imageFile || !imagePreviewUrl || !location) {
      setError("Please provide an image and allow location access.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setReport(null);

    try {
      const base64Data = imagePreviewUrl.split(',')[1];
      const result = await analyzeImageWithLocation(base64Data, imageFile.type, location);
      setReport(result);
    } catch (err) {
      console.error("Analysis failed:", err);
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred during analysis.";
      setError(`Analysis Failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const isReadyToAnalyze = imageFile && location;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500">
            AI Issue Reporter
          </h1>
          <p className="mt-2 text-lg text-gray-400">Upload a photo to automatically detect issues and generate a report.</p>
        </header>

        <main className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">1. Upload Image</h3>
              <ImageUploader onImageSelect={handleImageSelect} imagePreviewUrl={imagePreviewUrl} />
              {imagePreviewUrl && (
                <button onClick={handleClearImage} className="w-full text-sm text-red-400 hover:text-red-300 hover:underline">
                  Clear Image & Start Over
                </button>
              )}
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">2. Confirm Location</h3>
               <div className={`p-4 rounded-lg flex items-center space-x-3 ${location ? 'bg-green-900/50 border border-green-700' : 'bg-yellow-900/50 border border-yellow-700'}`}>
                {location ? <CheckCircleIcon className="w-8 h-8 text-green-400 flex-shrink-0" /> : <LocationIcon className="w-8 h-8 text-yellow-400 animate-pulse flex-shrink-0" />}
                <div>
                  <p className="font-semibold">{location ? 'Location Acquired' : 'Getting Location...'}</p>
                  <p className="text-sm text-gray-300">
                    {location ? `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}` : 'Please allow location access.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center pt-4">
            <button
              onClick={handleAnalyze}
              disabled={!isReadyToAnalyze || isLoading}
              className="px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-cyan-500 to-teal-600 rounded-lg shadow-lg hover:from-cyan-400 hover:to-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-cyan-300/50"
            >
              {isLoading ? 'Analyzing...' : 'Generate Report'}
            </button>
          </div>
          
          {error && (
            <div className="p-4 mt-6 bg-red-900/50 border border-red-700 text-red-300 rounded-lg flex items-center space-x-3">
              <ExclamationCircleIcon className="w-6 h-6"/>
              <span>{error}</span>
            </div>
          )}

          {isLoading && <Loader message="AI is analyzing the image and location..." />}
          
          {report && location && !isLoading && <ReportDisplay report={report} location={location} />}
        </main>
      </div>
    </div>
  );
};

export default App;