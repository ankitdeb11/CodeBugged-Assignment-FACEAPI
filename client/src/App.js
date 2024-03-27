
import './App.css';
import * as faceapi from 'face-api.js';
import React, { useState, useRef, useEffect } from 'react';
import LandingPage from './components/pages/landingPage/LandingPage';


function App() {

  // const [initializing, setInitializing] = useState(false);
  // const videoRef = useRef();
  // const canvasRef = useRef();
  // const videoHeight = 480;
  // const videoWidth = 640;

  // useEffect(() => {
  //   const loadModels = async () => {
  //     const MODEL_URL = process.env.PUBLIC_URL + '/models';
  //     setInitializing(true);
  //     Promise.all([
  //       faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
  //       faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
  //       faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
  //       faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),


  //     ]).then(startVideo);
  //   }
  //   loadModels();
  // }, [])


  // const startVideo = () => {
  //   navigator.getUserMedia(
  //     { video: true },
  //     stream => videoRef.current.srcObject = stream,
  //     error => console.error('getUserMedia error:', error)
  //   );
  // };




  return (
    <>
      {/* <span>{initializing ? 'Initializing' : 'Ready'}</span>
      <video ref={videoRef} autoPlay muted height={videoHeight} width={videoWidth} />
      <canvas ref={canvasRef} /> */}

      <LandingPage />
    </>
  );
}

export default App;



