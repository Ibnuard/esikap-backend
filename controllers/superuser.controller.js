const db = require("../db");
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
