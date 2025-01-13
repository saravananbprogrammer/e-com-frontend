import React from 'react';
import './Item.css';
import Errorimage from '../Assets/new assets/Errorimage.jpg';
import { Link } from 'react-router-dom';

const Item = (props) => {
    return (
        <div className='item'>
            <Link to={`/product/${props.id}`} onClick={() => window.scrollTo(0, 0)}>
                <img 
                    src={props.image} 
                    alt={props.name || 'Product Image'} 
                    onError={(e) => e.target.src = Errorimage} 
                />
            </Link>
            <p>{props.name}</p>

            <div className='items-prices'>
                <div className='new-price'>
                    ${props.new_price}
                </div>
                <div className='old-price'>
                    ${props.old_price}
                </div>
            </div>
        </div>
    );
}

export default Item;
