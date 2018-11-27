function convertToBase64(file, callback) {
  const reader = new FileReader();
  reader.onloadend = callback;
  reader.readAsDataURL(file);
}

export default convertToBase64;
