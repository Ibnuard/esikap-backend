const { generateRandomNumber } = require("./utils");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "da3pljvjv",
  api_key: "729168696563766",
  api_secret: "4XGgcFxKDkNuIDuAAXqRFKhVaWs",
});

async function uploadImagesCloudinary(base64, folder, isSignature) {
  try {
    const uploadResponse = await cloudinary.uploader.upload(base64, {
      folder: folder,
      public_id: `doc${generateRandomNumber(100, 999)}`,
      transformation: [
        {
          width: isSignature ? 240 : 540,
          height: isSignature ? 120 : undefined,
          quality: "auto",
          crop: "scale",
        }, // Mengatur lebar maksimum dan kualitas gambar ke "auto:low" untuk kompresi
      ],
    });
    return uploadResponse;
  } catch (error) {
    console.log(error);
  }
}

// Function to delete all files within a folder
function deleteFilesInFolder(folderName) {
  try {
    cloudinary.api.delete_resources_by_prefix(
      folderName,
      { invalidate: true },
      function (error, result) {
        if (error) {
          console.error(error);
          throw error;
        } else {
          console.log("Files deleted successfully:", result);
          setTimeout(() => {
            deleteFolder(folderName);
          }, 200);
        }
      }
    );
  } catch (error) {
    throw error;
  }
}

// Function to delete a folder
function deleteFolder(folderName) {
  cloudinary.api.delete_folder(folderName, function (error, result) {
    if (error) {
      if (error.http_code === 400 && error.message === "Folder is not empty") {
        console.log(
          "Folder is not empty. Deleting files before deleting the folder..."
        );
      } else {
        console.error(error);
      }
    } else {
      console.log("Folder deleted successfully:", result);
    }
  });
}

module.exports = {
  uploadImagesCloudinary,
  deleteFilesInFolder,
};
