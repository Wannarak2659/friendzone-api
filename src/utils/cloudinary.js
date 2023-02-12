// ## cloud storage for photos - sent to user controller

const cloudinary = require("../config/cloudinary");

exports.upload = async (filePath) => {
  const result = await cloudinary.uploader.upload(filePath, {
    unique_filename: false,
    use_filename: true,
    overwrite: true,
  });
  //   console.log(result);

  return result.secure_url;
  //   const option = {
  //     unique_filename: false,
  //     use_filename: true,
  //     overwrite: true,
  //   };

  //   if (publicId) {
  //     option.public_id = publicId;
  //   }

  // # sent to user controller[updateProfileImage]
};

// exports.getPublicId = (url) => {
//   const splitSlash = url.split("/");
//   return splitSlash[splitSlash.length - 1].split(".")[0];
// };
