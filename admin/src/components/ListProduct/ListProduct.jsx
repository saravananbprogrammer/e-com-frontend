import React, { useState, useEffect } from 'react';
import './ListProduct.css';

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true); // For loader
  const [error, setError] = useState(null); // For error handling

  const fetchInfo = async () => {
    try {
      const response = await fetch('http://localhost:4000/allproducts');
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      const data = await response.json();
      setAllProducts(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_product = async (id) =>{
    await fetch('http://localhost:4000/removeproduct', {
        method:'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({id:id})
    })
    await fetchInfo();
  }

  return (
    <div className='list-product'>
      <h1>ALL PRODUCTS LIST</h1>
      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p>Error loading products: {error}</p>
      ) : allproducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <>
          <div className='listproduct-format-main'>
            <p>Products</p>
            <p>Title</p>
            <p>Old Price</p>
            <p>New Price</p>
            <p>Category</p>
            <p>Remove</p>
          </div>
          <div className='listproduct-allproducts'>
            <hr />
            {allproducts.map((product, index) => (
              <React.Fragment key={index}>
                <div className='listproduct-format-main listproduct-format'>
                  <img src={product.image} alt='' className='listproduct-product-icon' />
                  <p>{product.name}</p>
                  <p>${product.old_price}</p>
                  <p>${product.new_price}</p>
                  <p>{product.category}</p> {/* category displays */}
                  <img onClick={()=> {remove_product(product.id)}} src="/assets/remove-icon.svg" alt="Remove" className="listproduct-remove-icon" />
                </div>
                <hr />
              </React.Fragment>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ListProduct;
