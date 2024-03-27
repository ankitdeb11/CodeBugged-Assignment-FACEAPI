import React from 'react';
import './login.css';

const Login = () => {
    return (
        <div className="login-container">
            <div className="form-box">
                <form action="">
                    <h2>Login</h2>

                    <div className="inputbox">
                        <i class="uil uil-envelope login-icon"></i>
                        <input type="email" id="email" required />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="inputbox">
                        <i class="uil uil-keyhole-square login-icon"></i>
                        <input type="password" id="password" required />
                        <label htmlFor="password">Password</label>
                    </div>

                    <div className="forget">
                        <input type="checkbox" id="checkbox-register" />
                        <label>Remember Me?</label>
                        <a href="hash">Forget Password</a>
                    </div>

                    <button id='btn-login'>Log in</button>

                    <div className="register">
                        <p>Don't have an account? <a href="register">Register</a> </p>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login