import './landingPage.css';
import * as faceapi from 'face-api.js';
import React, { useState, useRef, useEffect } from 'react';

const LandingPage = () => {

    const [initializing, setInitializing] = useState(false);
    const videoRef = useRef();
    const canvasRef = useRef();
    const videoHeight = 403;
    const videoWidth = 614;



    useEffect(() => {
        const loadModels = async () => {
            const MODEL_URL = process.env.PUBLIC_URL + '/models';
            setInitializing(true);
            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),


            ]).then(startVideo);
        }
        loadModels();
    }, [])


    const startVideo = () => {
        navigator.getUserMedia(
            { video: true },
            stream => videoRef.current.srcObject = stream,
            error => console.error('getUserMedia error:', error)
        );
    };





    const handleVideoOnePlay = () => {
        setInterval(async () => {
            if (initializing) {
                setInitializing(false);
            }

            console.log('Before detection');
            console.log('Video element:', videoRef.current);

            if (!videoRef.current) {
                console.error('Video element not found');
                return;
            }

            try {
                const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();

                console.log('Detections:', detections);
            } catch (error) {
                console.error('Error detecting faces:', error);
            }
        }, 100);
    }







    return (
        <div className="container">

            <div className="header">

                {/* un-comment it when testing  */}
                <span>{initializing ? 'Initializing...' : 'Ready'}</span>
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
                    <button className="btn-detect">Detect</button>
                </div>
            </div>

            <div className="bottom">

                <div className="image-container">
                    Hello, I am the image here. Thanks!
                </div>
                <div className="video-container">

                    <video ref={videoRef} autoPlay muted height={videoHeight} width={videoWidth} onPlay={handleVideoOnePlay} />
                    <canvas ref={canvasRef} />
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