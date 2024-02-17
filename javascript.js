let imgBox = document.getElementById("imgBox");
let qrImage = document.getElementById("qrImage");
let qrText = document.getElementById("qrText");
let downloadBtn = document.getElementById("downloadBtn");


// function generateQR(){
//     qrImage.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + qrText.value;
//     downloadBtn.style.display = "block"; 
// }

function generateQR() {
    let url = qrText.value.trim(); // Trim any leading or trailing whitespace
    let isValidURL = isValidHttpUrl(url);
    
    if (isValidURL) {
        qrImage.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + encodeURIComponent(url);
        imgBox.classList.add("show-img");
        qrImage.style.display = "block"; // Display the QR code image
        downloadBtn.style.display = "block"; // Display the "Download QR Code" button
        document.getElementById("errorMsg").style.display = "none"; // Hide the error message
    } else {
        qrImage.style.display = "none"; // Hide the QR code image
        downloadBtn.style.display = "none"; // Hide the "Download QR Code" button
        document.getElementById("errorMsg").style.display = "block"; // Display the error message
    }
}




function isValidHttpUrl(text) {
    let urlRegex = /^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/\S*)?$/;
    return urlRegex.test(text);
}


qrText.addEventListener("keypress", function (event) {
    // Check if the pressed key is Enter (key code 13)
    if (event.key === "Enter") {
        let url = qrText.value.trim(); // Trim any leading or trailing whitespace
        let isValidURL = isValidHttpUrl(url);

        if (isValidURL) {
            qrImage.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + encodeURIComponent(url);
            imgBox.classList.add("show-img");
            qrImage.style.display = "block"; // Display the QR code image
            downloadBtn.style.display = "block"; // Display the "Download QR Code" button
            document.getElementById("errorMsg").style.display = "none"; // Hide the error message
        } else {
            qrImage.style.display = "none"; // Hide the QR code image
            downloadBtn.style.display = "none"; // Hide the "Download QR Code" button
            document.getElementById("errorMsg").style.display = "block"; // Display the error message
        }
    }
});



// function downloadQR() {
//     let downloadLink = document.createElement("a");
//     downloadLink.href = qrImage.src;
//     downloadLink.download = "qr_code.png";
//     document.body.appendChild(downloadLink);
//     downloadLink.click();
//     document.body.removeChild(downloadLink);
// }

function downloadQR() {
    fetch(qrImage.src)
        .then(response => response.blob())
        .then(blob => {
            // Create a download link
            let downloadLink = document.createElement("a");
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = "qr_code.png";

            // Trigger the download
            document.body.appendChild(downloadLink);
            downloadLink.click();

            // Clean up
            document.body.removeChild(downloadLink);
            URL.revokeObjectURL(downloadLink.href);
        });
}
