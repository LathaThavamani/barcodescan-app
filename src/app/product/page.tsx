"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";
import Loader from "../../components/Loader"

export default function Page() {

    const searchParams = useSearchParams();
    const productCode=searchParams.get('productCode');
    const [productDetails, setProductDetails] = useState({});
    const [loaderSpinnig, setLoaderSpinning] = useState(true);
    const router=useRouter()

    const getProductDetails= async ()=>{
         const res=await fetch(`http://localhost:3001/products/${productCode}`, {
            method: 'GET'
        })
        if(!res.ok){
            alert("Product not found. Please scan bar code properly or scan correct bar code");
            router.push("/");
        }
        return (res.json());
    }

    const handleInput = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
    
    setProductDetails((prevState) => ({
          ...prevState,
          [fieldName]: fieldValue
        }));
      }

      const updateProduct = (e) => {
        return fetch(`http://localhost:3001/products/${productCode}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productDetails)
        }).then(res => res.json())
        .then((data) => {
            alert("Updated successfully")
          })
      }

      const scanProduct=()=>{
        router.push("/");
      }

    useEffect(() => {   
        const callAsyncMethods= async ()=>{
            let details = await getProductDetails();
            setProductDetails(details);
            setLoaderSpinning(false)
        }
        callAsyncMethods();
    }, []);

    useEffect(() => {
        console.log(productDetails.description);
    }, [productDetails]);

    

    return (<>
        {loaderSpinnig && <Loader />}
        <div>
            <h3>Product Details</h3>
            <div>
            <label>Brand</label>
            <input type="text" name="brand" onChange={handleInput} value={productDetails.brand} />
          </div>
          <div>
            <label>Description</label>
            <input type="text" name="description" onChange={handleInput} value={productDetails.description} />
          </div>
          <div>
            <label>Category Id</label>
            <input type="number" name="category_id" onChange={handleInput} value={productDetails.category_id} />
          </div>
          <button onClick={updateProduct}>Update Product</button>
          <button onClick={scanProduct}>Scan Product</button>

        </div>
        </>
    )
  }