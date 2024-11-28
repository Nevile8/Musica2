import React, { useState } from 'react';
import axios from 'axios';

const EmailConfirmationForm = ({ bookingDetails }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSendConfirmation = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/send-confirmation', {
                email,
                bookingDetails,
            });
            if (response.status === 200) {
                setMessage('Confirmation email sent successfully!');
            } else {
                setMessage('Failed to send confirmation email.');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            setMessage('An error occurred while sending the email.');
        }
    };
    

    return (
        <div>
            <h2>Enter Your Email</h2>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
            />
            <button onClick={handleSendConfirmation}>Send Confirmation Email</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default EmailConfirmationForm;
