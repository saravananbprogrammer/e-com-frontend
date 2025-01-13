import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../../assets/drop.jpg";

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false); // To indicate the upload process
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: "",
  });

  // Handle image file selection
  const imageHandler = (e) => {
    const file = e.target.files[0];
    setImage(file); // Set the selected file for preview
  };

  // Handle input changes
  const changeHandler = (e) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Add product function
  const Add_Product = async () => {
    if (!productDetails.name || !image || !productDetails.new_price || !productDetails.old_price) {
      alert("Please fill in all the required fields!");
      return;
    }

    setLoading(true); // Set loading to true during the process
    try {
      // Upload image
      let formData = new FormData();
      formData.append("product", image);

      const uploadResponse = await fetch("http://localhost:4000/upload", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      if (uploadData.success) {
        // Add image URL to product details
        const product = {
          ...productDetails,
          image: uploadData.image_url,
        };

        // Add product to database
        const addProductResponse = await fetch("http://localhost:4000/addproduct", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        });

        const addProductData = await addProductResponse.json();

        if (addProductData.success) {
          alert("Product Added Successfully!");
          // Reset fields after successful addition
          setProductDetails({
            name: "",
            image: "",
            category: "women",
            new_price: "",
            old_price: "",
          });
          setImage(false);
        } else {
          alert("Failed to add product!");
        }
      } else {
        alert("Image upload failed!");
      }
    } catch (error) {
      console.error("Error adding product: ", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false); // End the loading state
    }
  };

  return (
    <div className="add-product">
      <div className="add-product-itemfield">
        <p>Product Title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type here..."
        />
      </div>

      <div className="addproduct-price">
        <div className="add-product-itemfield">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder="Type here..."
          />
        </div>

        <div className="add-product-itemfield">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            placeholder="Type here..."
          />
        </div>
      </div>

      <div className="add-product-itemfield">
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="add-product-selector"
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>

      <div className="add-product-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className="addproduct-thumbnail"
            alt="Upload Thumbnail"
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>

      <button
        onClick={Add_Product}
        className="addproduct-btn"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add"}
      </button>
    </div>
  );
};

export default AddProduct;
