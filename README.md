## **Barcode Scanner**
---
Barcode Scanner is a web application to allow the user to scan, modify and update the product data using product barcode.

This application built using the NextJS.

### **Features**
---
- ***Landing/Home Page*** :  Landing page have options to start and stop the scanner. We can scan the barcode using system webcam. Once barcode scanned, it will redirect to Product details page if that is valid product barcode. I not valid product barcode, It will redirect to home page.

- ***Product Details*** : This page contains product details. We can edit and update the product data here. 

### **User Guide**
---
Click [here](./BarCodeScan-UserGuide.pdf) to read User Guide with screen shots. I have attached valid and invalid product barcodes for testing purpose.

### **Tech Library Used**
---
- HTML
- CSS
- Javascript & ES6
- NextJS
- QuaggaJS
- React
- Hooks
- JSON mock server

  
### **Instructions**
---

-Run ``npm run dev`` command to open the site in the development mode.

-Open http://localhost:3000 to view it in your browser.

-Run the below commands in the project directory to create a mock server using ``db.json`` file and ``JSON-Server``.

```bash
npm install -g json-server
json-server --watch db.json --port 3001
```

### **Contributors**
---
[Latha Thavamani](https://github.com/LathaThavamani)

### **Acknowledgments**
---
I will take all the responsiblity for every single line of code.  