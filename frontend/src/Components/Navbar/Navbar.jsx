import React, { useContext } from 'react'
import './Navbar1.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/Context'
import { useRef } from 'react'
import drop from '../Assets/drop.jpg'

const Navbar = () => {

    const [menu, setMenu] = useState("shop");
    const {getTotalCartItems}= useContext(ShopContext);
    const menuref = useRef();

    const dropdown_toggle = (e) => {
             menuref.current.classList.toggle('nav-menu-visible');
             e.target.classList.toggle('open');
    }

    return (
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt= "" />
                <p>HELLOSHOPPER</p>
            </div>
              <img className='dropDown' onClick={dropdown_toggle} src={drop} alt='' />
               <ul ref={menuref} className="nav-menu">
                <li onClick={() => { setMenu("shop1")}}><Link  style={{ textDecoration: 'none', color: 'black'} } to="/">Shop</Link>{menu==="shop1" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("men1")}}><Link style={{ textDecoration: 'none', color: 'black'}} to="/mens">Men</Link>{menu==="men1" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("women1")}}><Link style={{ textDecoration: 'none', color: 'black'}} to="/womens">Women</Link>{menu==="women1" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("kids1")}}><Link style={{ textDecoration: 'none', color: 'black'}} to="/kids">Kids</Link>{menu==="kids1" ? <hr /> : <></>}</li>
                </ul> 

               <div className="nav-login-cart">
                {localStorage.getItem('auth-token')?<button onClick={() => {localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button> : <Link to="/login"><button>Login</button></Link>}
               <Link to="/cart"><img src={cart_icon} alt="" /></Link> 
                <div className='nav-cart-count'>{getTotalCartItems()}</div>
                </div>  
        </div>
)
}
export default Navbar;