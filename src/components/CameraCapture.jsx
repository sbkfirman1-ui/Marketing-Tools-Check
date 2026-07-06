import React, { useRef, useState, useEffect } from 'react';
import { Camera, RefreshCw, X, AlertTriangle, Image as ImageIcon } from 'lucide-react';

export default function CameraCapture({ onCapture, onClose }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const [devices, setDevices] = useState([]);
  const [currentDeviceIndex, setCurrentDeviceIndex] = useState(0);
  const [isFallback, setIsFallback] = useState(false);

  // Initialize camera
  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, [currentDeviceIndex]);

  const startCamera = async () => {
    setError(null);
    stopCamera();

    try {
      // Get list of video input devices
      const allDevices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = allDevices.filter(device => device.kind === 'videoinput');
      setDevices(videoDevices);

      const constraints = {
        video: {
          facingMode: videoDevices.length > 0 ? undefined : 'environment',
          deviceId: videoDevices[currentDeviceIndex]?.deviceId
            ? { exact: videoDevices[currentDeviceIndex].deviceId }
            : undefined,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Gagal mengakses kamera. Silakan periksa izin kamera browser Anda.');
      setIsFallback(true);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const switchCamera = () => {
    if (devices.length > 1) {
      setCurrentDeviceIndex((prevIndex) => (prevIndex + 1) % devices.length);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      // Match canvas dimensions with video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert to Base64 JPEG with good quality
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      onCapture(dataUrl);
      stopCamera();
    }
  };

  const handleFallbackUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onCapture(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-md p-4">
      <div className="relative w-full max-w-lg bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-baksed-orange animate-pulse" />
            <span className="font-bold text-sm sm:text-base tracking-wide">Ambil Foto Aktual</span>
          </div>
          <button 
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="p-1.5 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Camera Feed Area */}
        <div className="relative flex-1 bg-black flex items-center justify-center min-h-[300px] max-h-[500px]">
          {!isFallback && !error ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="p-6 text-center space-y-4 max-w-sm">
              <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto text-amber-500">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <p className="text-sm text-slate-300">
                {error || 'Kamera tidak dapat diaktifkan. Gunakan mode unggah gambar langsung sebagai cadangan.'}
              </p>
              <label className="inline-flex items-center gap-2 bg-baksed-blue hover:bg-baksed-dark text-white font-bold py-2.5 px-5 rounded-xl cursor-pointer shadow-md text-sm transition-all active:scale-[0.98] mx-auto">
                <ImageIcon className="w-4 h-4" />
                Pilih Foto dari Galeri / Kamera HP
                <input 
                  type="file" 
                  accept="image/*" 
                  capture="environment" 
                  className="hidden" 
                  onChange={handleFallbackUpload} 
                />
              </label>
            </div>
          )}

          {/* Guide Overlay */}
          {!isFallback && !error && (
            <div className="absolute inset-0 pointer-events-none border-[24px] border-black/30 flex items-center justify-center">
              <div className="w-4/5 h-4/5 border-2 border-dashed border-white/50 rounded-xl"></div>
            </div>
          )}
        </div>

        {/* Controls */}
        {!isFallback && !error && (
          <div className="p-6 bg-slate-900 border-t border-slate-800 flex items-center justify-around">
            {/* Camera Switcher */}
            {devices.length > 1 ? (
              <button
                onClick={switchCamera}
                className="p-3 bg-slate-800 hover:bg-slate-700 text-white rounded-full transition-colors active:scale-95"
                title="Ganti Kamera"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            ) : (
              <div className="w-11"></div> // placeholder
            )}

            {/* Shutter Button */}
            <button
              onClick={capturePhoto}
              className="w-16 h-16 bg-white hover:bg-slate-100 rounded-full border-4 border-slate-800 shadow-xl flex items-center justify-center transition-transform active:scale-90"
              title="Tangkap Foto"
            >
              <div className="w-12 h-12 bg-baksed-orange rounded-full"></div>
            </button>

            {/* Manual Upload Fallback Toggle */}
            <button
              onClick={() => {
                stopCamera();
                setIsFallback(true);
              }}
              className="p-3 bg-slate-800 hover:bg-slate-700 text-white rounded-full transition-colors active:scale-95"
              title="Gunakan Unggah File"
            >
              <ImageIcon className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Hidden Canvas */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}
