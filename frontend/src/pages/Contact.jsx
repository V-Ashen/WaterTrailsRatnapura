import React, { useState } from 'react';

const Contact = () => {
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [reason, setReason]   = useState('inquiry');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Build a clean, human-readable message for WhatsApp
    const whatsappMessage = 
`🌊 *Water Trails Ratnapura — Contact Form*

👤 *Name:* ${name}
📧 *Email:* ${email}
📋 *Reason:* ${reason}

💬 *Message:*
${message}`;

    // Encode and open WhatsApp with the pre-filled message
    const encoded = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/94783536671?text=${encoded}`, '_blank');
  };

  return (
    <div className="home-container" style={{alignItems: 'center', justifyContent: 'flex-start', paddingTop: '100px'}}>
      <header className="hero-header" style={{marginBottom: '40px'}}>
        <h1 className="brand-font title-glow">Contact Us</h1>
        <p className="subtitle">Submit new locations or request details</p>
      </header>

      <div className="glass" style={{maxWidth: '600px', width: '90%', padding: '40px', borderRadius: '15px'}}>
        <form className="admin-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Your Email Address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <select value={reason} onChange={e => setReason(e.target.value)}>
            <option value="General Inquiry">General Inquiry</option>
            <option value="Submit a new Water Place">Submit a new Water Place</option>
            <option value="Report inaccurate location data">Report inaccurate location data</option>
          </select>
          <textarea
            placeholder="Write your message here..."
            style={{height: '150px'}}
            value={message}
            onChange={e => setMessage(e.target.value)}
            required
          />

          <button type="submit" className="custom-btn" style={{marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}>
            <span>💬</span> Send via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
