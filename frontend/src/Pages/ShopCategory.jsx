import React, { useContext, useState } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/Context';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/items/Item';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [visibleProducts, setVisibleProducts] = useState(12);

  const loadMore = () => {
    setVisibleProducts(prev => prev + 12); // Increase by 12 items or change as needed
  };

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner || 'default_banner_image.png'} alt="" />
      <div className="shopcategory-indexsort">
        <p>
          <span>Showing 1-{all_product.filter(item => props.category === item.category).slice(0, visibleProducts).length}</span> out of {all_product.filter(item => props.category === item.category).length} products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt='' />
        </div>
      </div>
      <div className="shopcategory-products">
        {all_product
          .filter(item => props.category === item.category)
          .slice(0, visibleProducts)
          .map(item => (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              old_price={item.old_price}
              new_price={item.new_price}
            />
          ))}
      </div>
      {visibleProducts < all_product.filter(item => props.category === item.category).length && (
        <div className="shopcategory-loadmore">
          <button onClick={loadMore}>Explore More</button>
        </div>
      )}
    </div>
  );
};

export default ShopCategory;
