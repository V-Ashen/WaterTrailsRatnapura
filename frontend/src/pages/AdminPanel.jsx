import React, { useState, useEffect } from 'react';
import './AdminPanel.css'; 

const AdminPanel = () => {
    const [jwt, setJwt] = useState(localStorage.getItem('token'));
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    
    // Existing database entries
    const [gemsList, setGemsList] = useState([]);
    
    // Determines if we are Updating an existing Document instead of POSTing a new one
    const [editModeId, setEditModeId] = useState(null);

    // State matching our WaterTrail MongoDB Schema
    const [gemData, setGemData] = useState({
        name: '', category: 'Waterfall', description: '', navigationNotes: '', difficulty: 'Easy',
        lat: '', lng: '', nearestTown: '', safetyLevel: 'Safe', imageUrl: ''
    });

    // Fetch existing gems securely on load
    const fetchGems = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/trails');
            const data = await res.json();
            if (Array.isArray(data)) setGemsList(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (jwt) fetchGems();
    }, [jwt]);

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

    const handleSaveGem = async (e) => {
        e.preventDefault();
        const payload = {
            name: gemData.name,
            category: gemData.category,
            description: gemData.description,
            location: {
                type: 'Point',
                coordinates: [parseFloat(gemData.lng), parseFloat(gemData.lat)],
                nearestTown: gemData.nearestTown
            },
            navigationNotes: gemData.navigationNotes,
            difficulty: gemData.difficulty,
            safetyLevel: gemData.safetyLevel,
            images: [{ url: gemData.imageUrl }]
        };

        const targetUrl = editModeId 
            ? `http://localhost:5000/api/trails/${editModeId}` 
            : 'http://localhost:5000/api/trails';
            
        const targetMethod = editModeId ? 'PUT' : 'POST';

        try {
            const res = await fetch(targetUrl, {
                method: targetMethod,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}` 
                },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                alert(`Location Successfully ${editModeId ? "Updated" : "Added"}!`);
                resetForm();
                fetchGems(); // Refresh the grid!
            } else {
                alert("Failed to save location.");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteGem = async (id) => {
        if (!window.confirm("Are you sure you want to rigorously delete this from the Atlas Database?")) return;
        try {
            const res = await fetch(`http://localhost:5000/api/trails/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${jwt}` }
            });
            if (res.ok) {
                alert("Location deleted permanently.");
                fetchGems();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const startEditing = (gem) => {
        setEditModeId(gem._id);
        setGemData({
            name: gem.name,
            category: gem.category,
            description: gem.description,
            navigationNotes: gem.navigationNotes,
            difficulty: gem.difficulty,
            lat: gem.location.coordinates[1], // Latitude
            lng: gem.location.coordinates[0], // Longitude
            nearestTown: gem.location.nearestTown,
            safetyLevel: gem.safetyLevel,
            imageUrl: gem.images && gem.images.length > 0 ? gem.images[0].url : ''
        });
        window.scrollTo(0,0);
    };

    const resetForm = () => {
        setEditModeId(null);
        setGemData({
            name: '', category: 'Waterfall', description: '', navigationNotes: '', difficulty: 'Easy',
            lat: '', lng: '', nearestTown: '', safetyLevel: 'Safe', imageUrl: ''
        });
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
        <div className="admin-container glass" style={{maxWidth: '800px'}}>
            <div className="admin-header">
                <h2>{editModeId ? "Edit Existing Location" : "Add New Water Location"}</h2>
                <div>
                   {editModeId && <button onClick={resetForm} className="custom-btn" style={{marginRight: '10px', background: '#333'}}>Cancel Edit</button>}
                   <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
            </div>
            
            <form onSubmit={handleSaveGem} className="admin-form">
                <input type="text" placeholder="Location Name (e.g., Kuruwita Falls)" value={gemData.name} onChange={e => setGemData({...gemData, name: e.target.value})} required />
                <select value={gemData.category} onChange={e => setGemData({...gemData, category: e.target.value})}>
                    <option value="Waterfall">Waterfall</option>
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
                <button type="submit" className="custom-btn">
                     {editModeId ? "Update Location in Atlas Database" : "Save Location to Atlas Database"}
                </button>
            </form>

            {/* List of Existing Databases Elements */}
            <div style={{marginTop: '40px', borderTop: '2px solid rgba(255,255,255,0.1)', paddingTop: '20px'}}>
                <h3 className="brand-font" style={{color: 'var(--secondary)'}}>Currently Saved Locations</h3>
                {gemsList.length === 0 ? <p>No locations saved yet.</p> : (
                    <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px'}}>
                        {gemsList.map(gem => (
                            <div key={gem._id} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.4)', padding: '10px 15px', borderRadius: '8px'}}>
                                <div>
                                    <strong>{gem.name}</strong> 
                                    <span style={{fontSize: '0.8rem', marginLeft: '10px', color: '#aaa'}}>{gem.category}</span>
                                </div>
                                <div style={{display:'flex', gap: '10px'}}>
                                     <button onClick={() => startEditing(gem)} style={{padding: '5px 10px', background: 'var(--primary)', border: 'none', color: 'white', borderRadius: '4px', cursor: 'pointer'}}>Edit</button>
                                     <button onClick={() => handleDeleteGem(gem._id)} style={{padding: '5px 10px', background: '#d32f2f', border: 'none', color: 'white', borderRadius: '4px', cursor: 'pointer'}}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
};

export default AdminPanel;
