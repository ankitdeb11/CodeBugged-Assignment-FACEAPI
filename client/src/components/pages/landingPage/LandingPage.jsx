import './landingPage.css';
import * as faceapi from 'face-api.js';
import React, { useState, useRef, useEffect } from 'react';

const LandingPage = () => {


    // myStates
    const [initializing, setInitializing] = useState(false);
    const [detecting, setDetecting] = useState(false);
    const [intervalId, setIntervalId] = useState(null); // tracking interval ID for clearing

    const videoRef = useRef();
    const canvasRef = useRef();
    const videoWidth = 614;
    const videoHeight = 403;

    useEffect(() => {
        const loadModels = async () => {
            const MODEL_URL = process.env.PUBLIC_URL + '/models';
            setInitializing(true);
            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
            ]).then(() => setInitializing(false));
        }
        loadModels();
    }, [])

    const startVideo = () => {
        navigator.getUserMedia(
            { video: true },
            stream => {
                videoRef.current.srcObject = stream;
                setDetecting(true);
            },
            error => console.error('getUserMedia error:', error)
        );
    };

    const handleVideoOnPlay = () => {
        let intervalId;
        const handleLoadedData = () => {
            intervalId = setInterval(async () => {
                if (!detecting || initializing) {
                    return;
                }

                canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
                const displaySize = {
                    width: videoWidth,
                    height: videoHeight
                }

                faceapi.matchDimensions(canvasRef.current, displaySize)

                const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();

                const resizeDetections = faceapi.resizeResults(detections, displaySize);

                // Only clear the canvas if detections are present
                if (resizeDetections.length > 0) {
                    canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
                }

                //drawing canvas for detections on the face
                faceapi.draw.drawDetections(canvasRef.current, resizeDetections);
                faceapi.draw.drawFaceLandmarks(canvasRef.current, resizeDetections);
                faceapi.draw.drawFaceExpressions(canvasRef.current, resizeDetections);

                console.log(detections);
            }, 100);
        };

        // Wait for video to finish loading before starting interval
        videoRef.current.addEventListener('loadeddata', handleLoadedData);

        return () => {
            clearInterval(intervalId);
            videoRef.current.removeEventListener('loadeddata', handleLoadedData);
        }; // Cleanup on unmount
    };



    const stopVideo = () => {
        const stream = videoRef.current.srcObject;
        if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
        }
        if (intervalId) {
            clearInterval(intervalId);
        }
        setDetecting(false);
    };


    return (
        <div className="container">

            <div className="header">
                <span>{initializing ? 'Welcome to Face Recognition Web App! Please wait...' : 'We are Ready for You!'}</span>
            </div>

            <div className="top">
                <div className="browse-search">
                    <div className="search">
                        <input className='input-url' type="text" />
                    </div>
                    <div className="browse-div">
                        <button className="btn-browse">Browse</button>
                    </div>
                </div>
            </div>

            <div className="mid">
                <div className="detect-area">
                    Click on Detect to start the process
                    <i class="uil uil-angle-right-b"></i>
                    <button className="btn-detect" onClick={startVideo}>Detect</button>
                </div>

                <div className="stop-area">
                    Click here to halt the process
                    <i class="uil uil-angle-right-b"></i>
                    <button className="btn-stop" onClick={stopVideo}>Stop</button>
                </div>
            </div>

            <div className="bottom">
                <div className="image-container">
                    Hello, I am the image here. Thanks!
                </div>
                <div className="video-container">
                    <video ref={videoRef} autoPlay muted height={videoHeight} width={videoWidth} onPlay={handleVideoOnPlay} />
                    <canvas width={491} height={323} className='canvas-main' ref={canvasRef} />
                </div>
            </div>

            <div className="footer">
                <div className="capture-details">
                    I have all the capture details here. Yay!
                </div>
            </div>
        </div>
    )
}

export default LandingPage
