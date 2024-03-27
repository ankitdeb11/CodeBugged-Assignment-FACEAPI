import React from 'react';
import './landingPage.css';

const LandingPage = () => {
    return (
        <div className="container">

            <div className="header">
                Welcome to Face Recognition Web App, with AI!
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
                <div className="video-container">
                    Hola!
                </div>
            </div>
        </div>
    )
}

export default LandingPage