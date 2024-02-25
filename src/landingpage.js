import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

const LandingPage = () => {
    const navigate = useNavigate();

    const fadeIn = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        config: { duration: 1000 },
    });

    return (
        <animated.div style={fadeIn} className="landing-page container">
            <div className="content text-center mt-5">
                <h1 className="display-4">Welcome to Sociate!</h1>
                <p className="lead">Your social connection platform</p>
                <div className="buttons">
                    <button className="btn btn-primary mr-2" onClick={() => navigate('/login')}>Login</button>
                    <button className="btn btn-success" onClick={() => navigate('/signup')}>Signup</button>
                </div>
                <div className="about-app mt-5">
                    <h2>About This App</h2>
                    <p>
                        Sociate is a social connection platform where you can share posts, connect with others,
                        and explore a vibrant community.
                    </p>
                </div>
            </div>
        </animated.div>
    );
};

export default LandingPage;
