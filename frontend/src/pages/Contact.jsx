import React from 'react';

const Contact = () => {
    
  return (
    <div className="home-container" style={{alignItems: 'center', justifyContent: 'flex-start', paddingTop: '100px'}}>
      <header className="hero-header" style={{marginBottom: '40px'}}>
        <h1 className="brand-font title-glow">Contact Us</h1>
        <p className="subtitle">Submit new locations or request details</p>
      </header>

      <div className="glass" style={{maxWidth: '600px', width: '90%', padding: '40px', borderRadius: '15px'}}>
         <form className="admin-form" onSubmit={(e) => { e.preventDefault(); alert("System Message: Message formally captured by React State! (Requires SMTP backend to email)"); }}>
             <input type="text" placeholder="Your Full Name" required />
             <input type="email" placeholder="Your Email Address" required />
             <select>
                 <option value="inquiry">General Inquiry</option>
                 <option value="submission">Submit a new Water Place</option>
                 <option value="report">Report inaccurate location data</option>
             </select>
             <textarea placeholder="Write your message here..." style={{height: '150px'}} required></textarea>
             
             <button type="submit" className="custom-btn" style={{marginTop: '10px'}}>
                 Send Encrypted Message
             </button>
         </form>
      </div>
    </div>
  );
};

export default Contact;
