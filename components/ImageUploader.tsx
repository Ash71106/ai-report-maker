import React, { useState, useCallback, useRef, useEffect } from 'react';
import { UploadIcon, CameraIcon } from './icons';

interface ImageUploaderProps {
  onImageSelect: (file: File, dataUrl: string) => void;
  imagePreviewUrl: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, imagePreviewUrl }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Function to stop the camera stream
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  }, []);

  // Effect to manage camera stream
  useEffect(() => {
    if (isCameraOpen) {
      setCameraError(null);
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => {
          console.error("Camera error:", err);
          setCameraError("Could not access camera. Please check permissions.");
          setIsCameraOpen(false);
        });
    } else {
      stopCamera();
    }

    // Cleanup on component unmount
    return () => {
      stopCamera();
    };
  }, [isCameraOpen, stopCamera]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelect(file, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
       const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelect(file, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageSelect]);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleTakePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        canvas.toBlob(blob => {
          if (blob) {
            const file = new File([blob], 'capture.jpg', { type: 'image/jpeg' });
            onImageSelect(file, dataUrl);
          }
        }, 'image/jpeg');
      }
      setIsCameraOpen(false); // Close camera view after taking photo
    }
  };

  return (
    <div className="w-full space-y-4">
      <div 
        className="w-full p-4 border-2 border-dashed border-gray-600 rounded-lg text-center transition-colors min-h-[180px] flex justify-center items-center"
        onDrop={!isCameraOpen && !imagePreviewUrl ? handleDrop : undefined}
        onDragOver={!isCameraOpen && !imagePreviewUrl ? handleDragOver : undefined}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />
        {imagePreviewUrl ? (
          <img src={imagePreviewUrl} alt="Preview" className="max-h-64 w-auto mx-auto rounded-md object-contain" />
        ) : isCameraOpen ? (
          <div className="w-full flex flex-col items-center gap-4">
            <video ref={videoRef} autoPlay playsInline className="w-full h-auto rounded-md max-h-64 object-contain bg-black"></video>
            <button
              onClick={handleTakePhoto}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-500 transition-colors"
            >
              <CameraIcon className="w-5 h-5" />
              Take Photo
            </button>
          </div>
        ) : (
          <div 
            className="flex flex-col items-center justify-center space-y-2 text-gray-400 cursor-pointer"
            onClick={handleUploadClick}
          >
            <UploadIcon className="w-12 h-12" />
            <p className="font-semibold">Click to upload or drag & drop</p>
            <p className="text-sm">PNG, JPG, or WEBP</p>
          </div>
        )}
      </div>

      {!imagePreviewUrl && (
         <button
            onClick={() => setIsCameraOpen(!isCameraOpen)}
            className="w-full text-cyan-400 hover:text-cyan-300 hover:underline font-semibold py-2 rounded-lg transition-colors text-sm"
        >
            {isCameraOpen ? 'Switch to File Upload' : 'Use Camera Instead'}
        </button>
      )}

      {cameraError && <p className="text-sm text-red-400 text-center">{cameraError}</p>}
    </div>
  );
};

export default ImageUploader;