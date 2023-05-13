import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import Quagga from '@ericblade/quagga2';

// function getMedian(arr) {
//     arr.sort((a, b) => a - b);
//     const half = Math.floor(arr.length / 2);
//     if (arr.length % 2 === 1) {
//         return arr[half];
//     }
//     return (arr[half - 1] + arr[half]) / 2;
// }

// function getMedianOfCodeErrors(decodedCodes) {
//     const errors = decodedCodes.filter(x => x.error !== undefined).map(x => x.error);
//     const medianOfErrors = getMedian(errors);
//     return medianOfErrors;
// }

// const defaultConstraints = {
//     width: 640,
//     height: 480,
// };

// const defaultLocatorSettings = {
//     patchSize: 'medium',
//     halfSample: true,
// };

//const defaultDecoders = ['ean_reader'];

const Scanner = ({
    onDetected,
    scannerRef
}) => {
    // const errorCheck = useCallback((result) => {
    //     if (!onDetected) {
    //         return;
    //     }
    //     const err = getMedianOfCodeErrors(result.codeResult.decodedCodes);
    //     // if Quagga is at least 75% certain that it read correctly, then accept the code.
    //     if (err < 0.25) {
    //         onDetected(result.codeResult.code);
    //     }
    // }, [onDetected]);

    useEffect(() => {
        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: scannerRef.current   // Or '#yourElement' (optional)
            },
            decoder: {
                readers: ["code_128_reader", "ean_reader"]
            }
        }, function (err) {
            if (err) {
                console.log(err);
                return
            }
            console.log("Initialization finished. Ready to start");
            Quagga.start();
        });
        Quagga.onDetected(function (data) {
            onDetected(data);
            Quagga.stop();
        });


    }, []);
    return null;
}

Scanner.propTypes = {
    onDetected: PropTypes.func.isRequired,
    scannerRef: PropTypes.object.isRequired
};

export default Scanner;