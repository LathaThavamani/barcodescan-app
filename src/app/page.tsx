"use client";

import React from 'react'
import "../styles/HomePage.css"
import { useRef, useState } from 'react';
import Scanner  from '../components/Scanner'
import Quagga from '@ericblade/quagga2';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [scanning, setScanning] = useState(false);
    const [productCode, setProductCode] = useState([]);
    const scannerRef = useRef(null);
    const router = useRouter();

    const startScanning=()=>
    {
      setScanning(true)
    }

    const stopScanning=()=>
    {
      setScanning(false);
      Quagga.stop();
    }


    const handleDetected=(code)=> {
      setProductCode(code);
      setScanning(false);
      router.push(`/product?productCode=${code}`);
    }
  return (
    <>
      <div className="title">
          <h2>Scan Product</h2>
      </div>
      <div className="buttons">
          <button className="button" onClick={startScanning}>Start</button>
      </div>
      <div className="buttons">
          <button className="button" onClick={stopScanning}>Stop</button>
       </div>
       <div ref={scannerRef} style={{position: 'relative'}}>
                <canvas className="drawingBuffer" style={{
                    position: 'absolute',
                    top: '0px',
                    border: '3px solid green',
                    margin:'2px',
                    width:'631px',
                    height:'473px'
                }}   />
                {scanning ? <Scanner scannerRef={scannerRef} onDetected={(result)=>handleDetected(result.codeResult.code)} /> : null}
            </div>
    </>
  )
}
