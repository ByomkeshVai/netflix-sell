import React from "react";
import axios from "axios";

const PhotoCaptureForm = ({ onSubmit }) => {
  // ... (previous code)

  const handleFormSubmit = async (data) => {
    // Create a new FormData object to send the image file
    const formData = new FormData();
    formData.append("image", data[0]);

    // Upload the photo to ImgBB
    try {
      const response = await axios.post(`"https://api.imgbb.com/1/upload"`, {
        key: "YOUR_IMGBB_API_KEY", // Replace with your ImgBB API key
        image: data[0], // The file captured from the form field
      });

      const imgbbUrl = response.data.data.url;

      // Call the onSubmit function with the ImgBB URL
      onSubmit(imgbbUrl);
    } catch (error) {
      // Handle any errors that occurred during the upload process
      console.error("Error uploading photo to ImgBB:", error);
    }
  };

  // ... (rest of the code)
};

export default PhotoCaptureForm;
