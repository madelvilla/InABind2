import React, { useState } from 'react';
import './Newsletter.css';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate email
        if (!email) {
            setError('Email is required');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Invalid email address');
            return;
        }

        setError('');

        // Submit email
        try {
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setSuccessMessage('Thank you for subscribing!');
                setEmail(''); 
            } else {
                console.error('Failed to subscribe');
            }
        } catch (error) {
            console.error('Error subscribing:', error);
        }
    };

    return (
        <div className="newsletter">
            <h2>Sign up to our newsletter</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input
                        type="email"
                        value={email}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                    <div className="error">{error}</div>
                </div>
                <button type="submit">Subscribe</button>
            </form>
            {successMessage && <div className="success-message">{successMessage}</div>}
        </div>
    );
};

export default Newsletter;
