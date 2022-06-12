const QRCode = require("qrcode");

export const generateQR = async (text) => {
  try {
    return QRCode.toDataURL(text);
  } catch (err) {
    console.error(err);
  }
};
