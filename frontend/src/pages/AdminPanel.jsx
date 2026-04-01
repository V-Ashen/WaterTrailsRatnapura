import React, { useState } from 'react';
import './AdminPanel.css'; 

const AdminPanel = () => {
    const [jwt, setJwt] = useState(localStorage.getItem('token'));
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    // State matching our WaterTrail MongoDB Schema
    const [gemData, setGemData] = useState({
        name: '', category: 'Waterfall', description: '', navigationNotes: '', difficulty: 'Easy',
        lat: '', lng: '', nearestTown: '', safetyLevel: 'Safe', imageUrl: ''
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (data.token) {
                localStorage.setItem('token', data.token);
                setJwt(data.token);
            } else {
                alert("Login failed: " + data.message);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setJwt(null);
    };

    const handleCreateGem = async (e) => {
        e.preventDefault();
        // Construct the GeoJSON correctly before sending to backend
        const payload = {
            name: gemData.name,
            category: gemData.category,
            description: gemData.description,
            location: {
                type: 'Point',
                coordinates: [parseFloat(gemData.lng), parseFloat(gemData.lat)], // Longitude always goes first!
                nearestTown: gemData.nearestTown
            },
            navigationNotes: gemData.navigationNotes,
            difficulty: gemData.difficulty,
            safetyLevel: gemData.safetyLevel,
            images: [{ url: gemData.imageUrl }]
        };

        try {
            const res = await fetch('http://localhost:5000/api/trails', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}` // Adding the JWT Authentication Token headers
                },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                alert("Hidden Gem Successfully Added and Geocoded in Atlas!");
                setGemData({ ...gemData, name: '', description: '', imageUrl: '' }); // Reset fields slightly
            } else {
                alert("Failed to add gem.");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (data.token) {
                localStorage.setItem('token', data.token);
                setJwt(data.token);
                alert("Admin Account Registered successfully!");
            } else {
                alert(`Registration failed: ${data.message} \n\nBackend Error: ${data.error} \nStack: ${data.stack}`);
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (!jwt) {
        return (
            <div className="admin-container glass">
                <h2>{isRegistering ? "Register First Admin" : "Admin Login (CMS)"}</h2>
                <form onSubmit={isRegistering ? handleRegister : handleLogin} className="admin-form">
                    <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                    <button type="submit" className="custom-btn">{isRegistering ? "Create Admin Account" : "Login"}</button>
                    
                    <p style={{marginTop: '15px', fontSize: '0.9rem', cursor: 'pointer', color: 'var(--secondary)'}} onClick={() => setIsRegistering(!isRegistering)}>
                        {isRegistering ? "Already have an account? Login here." : "Need to setup the first admin account?"}
                    </p>
                </form>
            </div>
        );
    }

    return (
        <div className="admin-container glass">
            <div className="admin-header">
                <h2>Add New Hidden Gem</h2>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
            <form onSubmit={handleCreateGem} className="admin-form">
                <input type="text" placeholder="Gem Name (e.g., Kuruwita Falls)" value={gemData.name} onChange={e => setGemData({...gemData, name: e.target.value})} required />
                <select value={gemData.category} onChange={e => setGemData({...gemData, category: e.target.value})}>
                    <option value="Waterfall">Waterfall</option>
                    <option value="River Trail">River Trail</option>
                    <option value="Natural Pool">Natural Pool</option>
                </select>
                <textarea placeholder="Description" value={gemData.description} onChange={e => setGemData({...gemData, description: e.target.value})} required />
                <div style={{display:'flex', gap: '10px'}}>
                    <input style={{width:'50%'}} type="number" step="any" placeholder="Latitude (e.g. 6.7725)" value={gemData.lat} onChange={e => setGemData({...gemData, lat: e.target.value})} required />
                    <input style={{width:'50%'}} type="number" step="any" placeholder="Longitude (e.g. 80.3644)" value={gemData.lng} onChange={e => setGemData({...gemData, lng: e.target.value})} required />
                </div>
                <input type="text" placeholder="Nearest Town" value={gemData.nearestTown} onChange={e => setGemData({...gemData, nearestTown: e.target.value})} required />
                <textarea placeholder="Navigation/Offline Directions to reach there" value={gemData.navigationNotes} onChange={e => setGemData({...gemData, navigationNotes: e.target.value})} required />
                <input type="url" placeholder="Direct Image URL (Cloudinary Manual)" value={gemData.imageUrl} onChange={e => setGemData({...gemData, imageUrl: e.target.value})} required />
                <button type="submit" className="custom-btn">Save Gem to Atlas Database</button>
            </form>
        </div>
    );
};

export default AdminPanel;
