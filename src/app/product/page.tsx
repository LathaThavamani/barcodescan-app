"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";
import Loader from "../../components/Loader"
import "../../styles/Product.css"

export default function Page() {

    // Get product code from the router URL
    const searchParams = useSearchParams();
    const productCode=searchParams.get('productCode');
    const [productDetails, setProductDetails] = useState({});
    const [loaderSpinnig, setLoaderSpinning] = useState(true);
    const router=useRouter()

    // Get product details from json server API
    const getProductDetails= async ()=>{
         const res=await fetch(`http://localhost:3001/products/${productCode}`, {
            method: 'GET'
        })
        if(!res.ok){
            // Show alert if scanned product code not exists
            alert("Product not found. Please scan barcode properly or scan correct barcode");
            router.push("/");
            return false;
        }
        return (res.json());
    }

    // Updating field value in state prodcut object when chanding input
    const handleInput = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
    
    setProductDetails((prevState) => ({
          ...prevState,
          [fieldName]: fieldValue
        }));
      }

      // Updating field value in state prodcut object when chanding check box type
      const handleCheckBox = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.checked;

    setProductDetails((prevState) => ({
          ...prevState,
          [fieldName]: fieldValue
        }));

        // Clear best before date when requires best before date is unchecked
        if(fieldName=="requires_best_before_date" && !fieldValue)
        {
            setProductDetails((prevState) => ({
                ...prevState,
                ["best_before_date"]: ""
              }));
        }
      }

      // Update the values in json object using JSOn server post API
      const updateProduct = () => {
        return fetch(`http://localhost:3001/products/${productCode}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productDetails)
        }).then(res => res.json())
        .then((data) => {
            // Updated changes in db JSON successfully
            alert("Updated successfully")
          })
      }

      // Redirect to scan product page
      const scanProduct=()=>{
        router.push("/");
      }

    useEffect(() => {   
        // Get product details on page load
        const callAsyncMethods= async ()=>{
            let details = await getProductDetails();
            setProductDetails(details);
            // Set loader status false
            setLoaderSpinning(false)
        }
        callAsyncMethods();
    }, []);

    return (<>
        {loaderSpinnig?<Loader />:
       <><div className="title">
            <h2>Product Details</h2>
        </div>
        <div className='form'>
            <div className='field'>
                <label>Brand</label>
                <input type="text" name="brand" onChange={handleInput} value={productDetails.brand} />
            </div>
            <div className='field'>
                <label>Category Id</label>
                <input type="number" name="category_id" onChange={handleInput} value={productDetails.category_id} />
            </div>
            <div className='field' >
                <label>Description</label>
                <input type="text" name="description" onChange={handleInput} value={productDetails.description} />
            </div>
            <div className='field'>
                <label>Edeka Article Number</label>
                <input type="number" name="edeka_article_number" onChange={handleInput} value={productDetails.edeka_article_number} />
            </div>
            <div className='field'>
                <label>Gross Weight</label>
                <input type="number" name="gross_weight" onChange={handleInput} value={productDetails.gross_weight} />
            </div>
            <div className='field'>
                <label>Net Weight</label>
                <input type="number" name="net_weight" onChange={handleInput} value={productDetails.net_weight} />
            </div>
            <div className='field' >
                <label>Requires Best Before Date</label>
                <input type="checkbox" name="requires_best_before_date" onChange={handleCheckBox} checked={productDetails.requires_best_before_date} />
            </div>
            {productDetails.requires_best_before_date &&
            <div className='field' >
                <label>Best Before Date</label>
                <input type="date" name="best_before_date" onChange={handleInput} value={productDetails.best_before_date} />
            </div>}
            <div className='field' >
                <label>Trade Item Unit Descriptor</label>
                <input type="text" name="trade_item_unit_descriptor" onChange={handleInput} value={productDetails.trade_item_unit_descriptor} />
            </div>
            <div className='field' >
                <label>Trade Item Unit Descriptor Name</label>
                <input type="text" name="trade_item_unit_descriptor_name" onChange={handleInput} value={productDetails.trade_item_unit_descriptor_name} />
            </div>
            <div className='field' >
                <label>Unit Name</label>
                <input type="text" name="unit_name" onChange={handleInput} value={productDetails.unit_name} />
            </div>
            <div className='buttons'>
                <button onClick={updateProduct}>Update Product</button>
                <button onClick={scanProduct}>Scan Product</button>
            </div>
        </div></>}
        </>
    )
  }