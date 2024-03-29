// Require the cloudinary library
const cloudinary = require("cloudinary").v2;

// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true,
});

/////////////////////////
// Uploads an image file
/////////////////////////
const uploadImage = async ({ imagePath }: { imagePath: string }) => {
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    console.log("CLOUDINARY RESULT: ", result);
    return result.url;
  } catch (error) {
    console.error("CLOUDINARY ERROR:", error);
  }
};

export default uploadImage;
