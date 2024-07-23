import React, { useState } from 'react';
import './Contact.css';

function Contact() {
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        message: ''
    });

    const [errors, setErrors] = useState({
        fname: '',
        lname: '',
        email: '',
        message: ''
    });

    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Validate input values
        switch (name) {
            case 'fname':
            case 'lname':
                if (!/^[a-zA-Z]+$/.test(value)) {
                    setErrors({
                        ...errors,
                        [name]: 'Only letters are allowed'
                    });
                } else {
                    setErrors({
                        ...errors,
                        [name]: ''
                    });
                }
                break;
            case 'email':
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    setErrors({
                        ...errors,
                        [name]: 'Invalid email address'
                    });
                } else {
                    setErrors({
                        ...errors,
                        [name]: ''
                    });
                }
                break;
            case 'message':
                if (value.length > 500) {
                    setErrors({
                        ...errors,
                        [name]: 'Message cannot exceed 500 characters'
                    });
                } else {
                    setErrors({
                        ...errors,
                        [name]: ''
                    });
                }
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { fname, lname, email, message } = formData;

        // Check if there are any validation errors
        if (!fname || !lname || !email || !message) {
            setErrors({
                fname: !fname ? 'First Name is required' : errors.fname,
                lname: !lname ? 'Last Name is required' : errors.lname,
                email: !email ? 'Email is required' : errors.email,
                message: !message ? 'Message is required' : errors.message
            });
            return;
        }

        // If no errors, proceed with form submission
        if (!errors.fname && !errors.lname && !errors.email && !errors.message) {
            try {
                const response = await fetch('http://localhost:5000/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    // Show success message
                    setSuccessMessage('Message successfully sent.');

                    // Reset form
                    setFormData({
                        fname: '',
                        lname: '',
                        email: '',
                        message: ''
                    });
                    setErrors({
                        fname: '',
                        lname: '',
                        email: '',
                        message: ''
                    });
                } else {
                    console.error('Failed to send message');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        }
    };

    return (
        <div className='background'>
        <div className="contactform">
            <form className="contact-form" id="contactForm" onSubmit={handleSubmit}>
                <h2>Contact Us</h2>
                <h4>Got a favorite book or a suggestion?</h4> 
                <h4>We want to hear it all! Your feedback helps us serve you better.</h4>
                <div className="input">
                    <label htmlFor="fname">First Name:</label>
                    <input
                        type="text"
                        id="fname"
                        name="fname"
                        value={formData.fname}
                        onChange={handleChange}
                        placeholder="First Name"
                    />
                    <div className="error">{errors.fname}</div>
                </div>
                <div className="input">
                    <label htmlFor="lname">Last Name:</label>
                    <input
                        type="text"
                        id="lname"
                        name="lname"
                        value={formData.lname}
                        onChange={handleChange}
                        placeholder="Last Name"
                    />
                    <div className="error">{errors.lname}</div>
                </div>
                <div className="input">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                    <div className="error">{errors.email}</div>
                </div>
                <div className="input">
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us your book recommendations.."
                        maxLength="500"
                    ></textarea>
                    <div className="error">{errors.message}</div>
                </div>
                <button type="submit" id="submit">Submit</button>
            </form>
            {successMessage && <div className="success-message">{successMessage}</div>}
        </div>
        </div>
    );
}

export default Contact;
