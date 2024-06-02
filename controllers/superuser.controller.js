const db = require("../db");
const { uploadImagesCloudinary } = require("../utils/cloudinary");
const { Responder } = require("../utils/responder");
const { isMatchPassword } = require("../utils/utils");
const TB_SUPERUSER = db.superuser;

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const getUser = await TB_SUPERUSER.findOne({
      where: {
        username: username,
      },
    });

    // user not found
    if (!getUser) {
      return Responder(res, "ERROR", "User tidak ditemukan.", null, 400);
    }

    // user data
    const userData = getUser["dataValues"];

    if (userData.aktif == 0) {
      return Responder(res, "ERROR", "Status user tidak aktif", null, 400);
    }

    console.log(userData);

    if (userData.level != "petugas" && userData.level != "agen") {
      return Responder(
        res,
        "ERROR",
        "Hanya petugas dan agen yang memiliki akses aplikasi.",
        null,
        400
      );
    }

    const checkPassword = isMatchPassword(password, userData["password"]);

    if (!checkPassword) {
      return Responder(res, "ERROR", "Kata sandi tidak sesuai.", null, 400);
    }

    Responder(res, "OK", null, userData, 200);
    return;
  } catch (error) {
    Responder(res, "ERROR", null, null, 400);
    return;
  }
};

exports.cekStatus = async (req, res) => {
  const { username } = req.query;
  try {
    const getUser = await TB_SUPERUSER.findOne({
      where: {
        username: username,
      },
    });

    // user data
    const userData = getUser["dataValues"];

    Responder(res, "OK", null, userData, 200);
    return;
  } catch (error) {
    Responder(res, "ERROR", null, null, 400);
    return;
  }
};

exports.updateProfile = async (req, res) => {
  const { id } = req.params;
  const { image } = req.body;
  try {
    const imageBase64 = `data:image/jpeg;base64,${image}`;
    const upload = await uploadImagesCloudinary(imageBase64, "avatar", false);

    if (upload.url) {
      await TB_SUPERUSER.update({ avatar: upload.url }, { where: { id: id } });
      Responder(res, "OK", null, upload.url, 200);
      return;
    } else {
      Responder(res, "ERROR", null, null, 400);
      return;
    }
  } catch (error) {
    Responder(res, "ERROR", null, null, 500);
    return;
  }
};
