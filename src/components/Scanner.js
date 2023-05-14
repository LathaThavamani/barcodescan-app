import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Quagga from '@ericblade/quagga2';

const Scanner = ({
    onDetected,
    scannerRef
}) => {


    useEffect(() => {
        // Initialize the Quagga scanner on scanner page load
        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: scannerRef.current // Target scanner canvas area
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
            // Start the camera
            Quagga.start();
        });

        // This method will call once camera detected the barcode
        Quagga.onDetected(function (data) {
            // Call back method with dectected product code
            onDetected(data);
            // Stop the camera
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