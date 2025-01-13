import React from 'react';
import './Breadcrum.css';
import arrow_icon from '../Assets/breadcrum_arrow.png';

const Breadcrum = ({ anythingforinaccess }) => {
  // Ensure that the anythingforinaccess prop and its properties exist
  const category = anythingforinaccess?.category || 'Category';
  const name = anythingforinaccess?.name || 'Product';

  return (
    <div className="breadcrum">
      HOME <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt="" />
      <span className='docapital-first'>{category}</span>
      <img src={arrow_icon} alt="" /> <span className='docapital-second'>{name}</span>
    </div>
  );
};

export default Breadcrum;
