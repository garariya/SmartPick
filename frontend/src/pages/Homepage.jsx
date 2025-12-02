import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";

export default function Homepage() {
  const navigate = useNavigate();
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  const [smartphones, setSmartphones] = useState([]);
  const [laptops, setLaptops] = useState([]);
  const [tablets, setTablets] = useState([]);
  const [lighting, setLighting] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("select");
  const [filteredData, setFilteredData] = useState([])

  const [user, setUser] = useState(null);

  const goToChat = () => navigate("/chat");
  const goToProfile = () => navigate("/profile");

  const fetchData = async (category, setter) => {
    try {
      const res = await fetch(
        `${REACT_APP_API_URL}/api/category/${category}?limit=5`
      );
      const data = await res.json();
      setter(data.products || []);
    } catch (error) {
      console.error(`${category} fetch error:`, error);
    }
  };

  const handleAdd = async() => {
    const token = localStorage.getItem("token");
    
    const newProduct = {
      title: 'BMW Pencil',
      price: 99,
      description: "A luxury BMW-branded pencil",
      category: "stationary",
      rating: 4.9,
      stock: 50,
      images: ["https://example.com/pencil.jpg"]
    }

    const res = await fetch(`${REACT_APP_API_URL}/api/products/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(newProduct)
    })
    
    const data = await res.json();
    console.log("Add product response:", data);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/");

    fetch(`${REACT_APP_API_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);


  useEffect(() => {
    fetchData("smartphones", setSmartphones);
    fetchData("laptops", setLaptops);
    fetchData("tablets", setTablets);
    fetchData("lighting", setLighting);
  }, []);



  const renderCategory = (title, routeCategory, products) => {
    const filteredData = products.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    return (
      <div className="category-section">
        <div className="category-header">
          <h2>{title}</h2>
          <button
            className="see-all-btn"
            onClick={() => navigate(`/category/${routeCategory}`)}
          >
            See All
          </button>
        </div>
  
        <div className="product-row">
          {filteredData.map((p) => (
            <div
              key={p.id}
              className="product-card"
              onClick={() => navigate(`/product/${p.id}`)}
            >
              <img src={p.thumbnail} alt={p.title} />
              <p>{p.title}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  

  return (
    <div className="homepage-container">
      {/* Top Right Buttons */}
      <div className="top-right-buttons">
        <button className="ask-ai-btn" onClick={goToChat}>Ask AI</button>
        <button className="profile-btn" onClick={goToProfile}>Profile</button>
      </div>
  
      <h1>Welcome to SmartPick</h1>
  
      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* search button */}
        <button>Search</button>
  
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="select">Select</option>
          <option value="smartphones">Smartphones</option>
          <option value="laptops">Laptops</option>
          <option value="tablets">Tablets</option>
          <option value="lighting">Lighting</option>
        </select>
  
        
      </div>

      {user?.email === "johnwick@gmail.com" && (
        <div>
          <button onClick={handleAdd}>add product</button>
          <button>update product</button>
          <button>delete product</button>
        </div>
      )}
      
  
      {/* CONDITIONAL CATEGORY RENDERING */}
      {selectedCategory === "select" && (
        <>
          {renderCategory("Smartphones", "smartphones", smartphones)}
          {renderCategory("Laptops", "laptops", laptops)}
          {renderCategory("Tablets", "tablets", tablets)}
          {renderCategory("Lighting", "lighting", lighting)}
        </>
      )}
  
      {selectedCategory === "smartphones" &&
        renderCategory("Smartphones", "smartphones", smartphones)}
  
      {selectedCategory === "laptops" &&
        renderCategory("Laptops", "laptops", laptops)}
  
      {selectedCategory === "tablets" &&
        renderCategory("Tablets", "tablets", tablets)}
  
      {selectedCategory === "lighting" &&
        renderCategory("Lighting", "lighting", lighting)}
    </div>
  );
  
}
