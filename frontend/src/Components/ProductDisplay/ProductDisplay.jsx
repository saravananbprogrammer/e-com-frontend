import React, { useContext } from 'react';
import './ProductDisplay.css';
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from '../../Context/Context';

const ProductDisplay = (props) => {
    const { afterprops = {} } = props; // Default to an empty object if not provided
    const { addToCart } = useContext(ShopContext);

    const {
        image = '',
        name = 'Product Name',
        old_price = '0.00',
        new_price = '0.00',
        id = null,
    } = afterprops; // Destructure with default values

    return (
        <div className="productdisplay">
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    {[image, image, image, image].map((imgSrc, index) => (
                        <img key={index} src={imgSrc} alt={`Product thumbnail ${index + 1}`} />
                    ))}
                </div>
            </div>
            <div className="productdisplay-main-img">
                <img src={image} alt="Main product" className="productdisplay-main-img" />
            </div>
            <div className="productdetails-container">
                <div className="productdisplay-right">
                    <h1>{name}</h1>
                    <div className="productdisplay-right-stars">
                        <img src={star_icon} alt="Star icon" />
                        <img src={star_icon} alt="Star icon" />
                        <img src={star_icon} alt="Star icon" />
                        <img src={star_icon} alt="Star icon" />
                        <img src={star_dull_icon} alt="Dull star icon" />
                        <p>{122}</p>
                    </div>
                </div>
                <div className="productdisplay-right-container">
                    <div className="productdisplay-right-prices">
                        <div className="productdisplay-right-price-old">${old_price}</div>
                        <div className="productsdisplay-right-price-new">${new_price}</div>
                    </div>
                    <div className="productdisplay-right-description">
                        <p>
                            Stylish casual and formal wear for men, elegant dresses and chic tops for women, 
                            and fun, durable clothing for kids. Whether it’s cozy outerwear or playful outfits, 
                            there’s something for everyone to stay fashionable and comfortable on any occasion.
                        </p>
                    </div>
                    <div className="productdisplay-right-size">
                        <h1>Select :</h1>
                        <div className="productdisplay-right-sizes">
                            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                                <div key={size}>{size}</div>
                            ))}
                        </div>
                        <div className="productdisplay-catcontainer">
                            <button onClick={() => addToCart && addToCart(id)}>ADD TO CART</button>
                            <p className="productdisplay-right-category">
                                <span>Category : </span>Women, T-Shirt, Crop Top
                            </p>
                            <p className="productdisplay-right-category">
                                <span>Tags : </span>Modern, Latest, New Design
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDisplay;
