const { Op } = require("sequelize");
const db = require("../db");
const { Responder } = require("../utils/responder");
const KAPAL = db.kapal;
const PHQC = db.phqc;
const COP = db.cop;
const P3K = db.p3k;
const SSCEC = db.sscec;
const moment = require("moment");

exports.get_all_kapal = async (req, res) => {
  const { cari } = req.query;
  const { type } = req.params;
  try {
    const whereCondition = {};

    if (type == "WAITING") {
      whereCondition.status = 0;
    } else {
      whereCondition.status = 1;
    }

    if (cari) {
      whereCondition.nama_kapal = {
        [Op.like]: `%${cari}%`,
      };
    }

    const getKapal = await KAPAL.findAll({ where: whereCondition });
    Responder(res, "OK", null, getKapal, 200);
    return;
  } catch (error) {
    console.log(error);
    Responder(res, "ERROR", "Ada kesalahan jaringan!", null, 500);
    return;
  }
};

exports.update_status_kapal = async (req, res) => {
  const { id } = req.params;
  try {
    const getKapal = await KAPAL.findOne({
      where: {
        id: id,
      },
    });

    const kapalData = await getKapal["dataValues"];
    const extStatus = kapalData.status;
    const kapalDoc = kapalData.tipe_dokumen.split(",");

    // skip if already 1
    if (extStatus == 1) {
      Responder(res, "OK", null, { status: extStatus }, 200);
      return;
    }

    // Array untuk menyimpan hasil pengecekan
    const doc_result = [];

    // Fungsi untuk menemukan dokumen
    async function findDocument(model) {
      const result = await model.findOne({ where: { kapal_id: id } });
      return result ? 1 : 0;
    }

    // Pemetaan dokumen ke model yang sesuai
    const documentModels = {
      PHQC: PHQC,
      COP: COP,
      SSCEC: SSCEC,
      P3K: P3K,
    };

    // Menjalankan pengecekan untuk setiap dokumen secara paralel
    const checks = kapalDoc.map((doc) => {
      const model = documentModels[doc];
      if (model) {
        return findDocument(model);
      } else {
        // Mengembalikan 0 jika dokumen tidak ditemukan di pemetaan
        return Promise.resolve(0);
      }
    });

    // Menunggu semua pengecekan selesai
    const results = await Promise.all(checks);

    // Memperbarui hasil pengecekan
    doc_result.push(...results);

    // Memeriksa apakah semua dokumen ditemukan
    if (doc_result.every((item) => item === 1)) {
      const currentDate = moment().format("YYYY-MM-DD HH:mm:ss");
      await KAPAL.update(
        { status: 1, tanggal_diperiksa: currentDate },
        { where: { id: id } }
      );
    }

    const getKapalStatus = await KAPAL.findOne({ where: { id: id } });
    const kapalDataStatus = await getKapalStatus["dataValues"].status;

    Responder(res, "OK", null, { status: kapalDataStatus }, 200);
    return;
  } catch (error) {
    console.log(error);
    Responder(res, "ERROR", `X Ada kesalahan jaringan. ${error}`, null, 500);
    return;
  }
};
