"use client";
import styles from './page.module.css'
import { useRef, useState } from 'react';
import Scanner  from '../components/Scanner'
import Result from '../components/Result'
import Quagga from '@ericblade/quagga2';

export default function Home() {
  const [scanning, setScanning] = useState(false);
    const [results, setResults] = useState([]);
    const scannerRef = useRef(null);

    const startScanning=()=>
    {
      setScanning(true)
    }

    const stopScanning=()=>
    {
      setScanning(false);
      Quagga.stop();
    }


    const handleDetected=(result)=> {
      setResults([...results, result]);
      setScanning(false);
    }
  return (
    <main className={styles.main}>
      <div className={styles.description}>
      <div>
        <p>Scan Bar Code for Product</p>
            <button onClick={startScanning}>Start</button>
            <button onClick={stopScanning}>Stop</button>
            <ul className="results">
                {results.map((result) => (result.codeResult && <Result key={result.codeResult.code} result={result} />))}
            </ul>
            <div ref={scannerRef} style={{position: 'relative'}}>
                <canvas className="drawingBuffer" style={{
                    position: 'absolute',
                    top: '0px',
                    border: '3px solid green',
                }} width="640" height="480" />
                {scanning ? <Scanner scannerRef={scannerRef} onDetected={(result)=>handleDetected(result)} /> : null}
            </div>
        </div>
       
      </div>
    </main>
  )
}