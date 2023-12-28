import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.COUDINARY_CLOUD_NAME,
  api_key: process.env.COUDINARY_API_KEY,
  api_secret: process.env.ClOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) return null;
    //upload the file to the cloudinary
    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    console.log("File uploaded successfully", response.url);
  } catch (error) {
    fs.unlinkSync(filePath);
    return null;
  }
};

export { uploadOnCloudinary };
