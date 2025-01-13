import React, { useContext } from 'react'
import { ShopContext } from '../Context/Context';
import { useParams } from 'react-router-dom'
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/Description box/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProduct';


const Product = () => {
    const {all_product}= useContext(ShopContext);
    const {productID} = useParams();
    /*  const productID = productID.useParams();
        useParams() will allow to use the URL parameters in React Applications */

    const products = all_product.find((e)=> e.id === Number(productID));
    return(
        <div>
           <Breadcrum anythingforinaccess={products} />
           <ProductDisplay afterprops={products} />
           <DescriptionBox />
           <RelatedProducts />

        </div>
    )
}


export default Product