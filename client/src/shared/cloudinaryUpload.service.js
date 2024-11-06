const uploadImageToCloudinary = async (file, folder, axiosInstance) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ml_default");
  formData.append("folder", folder);

  try {
    const response = await axiosInstance.post(
      "https://api.cloudinary.com/v1_1/dil8a7bnc/image/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const data = await response.data;
    return data.secure_url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export default uploadImageToCloudinary;
