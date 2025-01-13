import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import add_product_icon from '../../assets/cart_icon.png';
import list_product_icon from '../../assets/star_icon.png';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to={'/addproduct'} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={add_product_icon} alt="Add Product Icon" />
          <p>Add Product</p>
        </div>
      </Link>

      <Link to={'/listproduct'} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={list_product_icon} alt="Products List Icon" />
          <p>Products List</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
