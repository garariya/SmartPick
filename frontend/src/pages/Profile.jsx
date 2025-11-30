import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

export default function Profile() {
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;

  const [user, setUser] = useState(null);


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/");

    fetch(`${API}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setUser(data));
  }, [navigate, API]);

  const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/");
  };


  const handleDeleteAccount = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete your account? This action is permanent."
    );
    if (!confirmation) return;
  
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No user logged in.");
      return navigate("/login");
    }
  
    try {
      const res = await fetch(`${API}/api/auth/delete-account`, {
        method: "DELETE",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        alert(data.message || "Unable to delete account.");
        return;
      }
  

      localStorage.removeItem("token");
  
      alert("Your account has been permanently deleted.");
      navigate("/signup");
  
    } catch (error) {
      console.error("Delete account error:", error);
      alert("Something went wrong. Try again.");
    }
  };
  

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <div className="profile-card neumorphic">
        <h2 className="profile-title">Your Profile</h2>

        <div className="profile-field">
          <label>Name</label>
          <p>{user.name}</p>
        </div>

        <div className="profile-field">
          <label>Email</label>
          <p>{user.email}</p>
        </div>

        <div className="button-row">
          <button className="btn logout" onClick={handleLogout}>Logout</button>
          <button className="btn delete" onClick={handleDeleteAccount}>Delete Account</button>
        </div>
      </div>
    </div>
  );
}
