let qrData = document.getElementById("qr-data"),
  qrcode = new QRCode(document.getElementById("qrcode"), {
    text: "qrcode",
    width: 200,
    height: 200,
    colorDark: "#006405", // Changed color to #006405
    colorLight: "#ffffff",

    correctLevel: QRCode.CorrectLevel.H,
  }),
  generateButton = document.getElementById("generate-button");

generateButton.addEventListener("click", function (e) {
  e.preventDefault();

  let data = qrData.value;
  // Change the QR code color to #006405 every time a new QR code is generated
  qrcode.makeCode(data, { colorDark: "#006405" });

  if (data == "") {
    alert("You Cannot Leave Fields Empty!");
  }
});
// Code for downloading the QR code remains unchanged

//Downloading QR Code

let downloadButton = document.getElementById("download-button"),
  qrCanvas = document.querySelector("canvas"),
  generatedQrCode = document.querySelector("img");

// Adding margin to the qrCanvas
qrCanvas.style.margin = "5px"; // This line adds a margin around the canvas

downloadButton.addEventListener("click", function (e) {
  e.preventDefault();
  let data = qrData.value;

  if (data == "") {
    alert("Please Generate a QR Code To Download!");
  } else {
    // Create a new canvas element
    let borderCanvas = document.createElement("canvas");
    let borderCtx = borderCanvas.getContext("2d");

    // Calculate new dimensions to include the white border
    const borderWidth = 5;
    borderCanvas.width = qrCanvas.width + borderWidth * 2;
    borderCanvas.height = qrCanvas.height + borderWidth * 2;

    // Fill the new canvas with white background
    borderCtx.fillStyle = "#ffffff";
    borderCtx.fillRect(0, 0, borderCanvas.width, borderCanvas.height);

    // Draw the original QR code canvas onto the new canvas, centered
    borderCtx.drawImage(qrCanvas, borderWidth, borderWidth);

    // Use the new canvas to generate the data URI
    const dataURI = borderCanvas.toDataURL("image/png");

    // Continue with your existing download logic
    generatedQrCode.src = dataURI;
    if (window.navigator.msSaveBlob) {
      window.navigator.msSaveBlob(borderCanvas.msToBlob(), "qr-code.png");
    } else {
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.href = dataURI;
      a.download = "qr-code.png";
      a.click();
      document.body.removeChild(a);
    }
  }
});
