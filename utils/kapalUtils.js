const db = require("../db");
const KAPAL = db.kapal;
const moment = require("moment");

async function checkAndUpdateKapalStatus(dok_id, kapal_id, type) {
  try {
    const currentDate = moment().format("DD-MM-YYYY");
    console.log("CHECK AND UPDATE STATUS");

    function updateParamsType() {
      switch (type) {
        case "PHQC":
          return { tgl_diperiksa_phqc: currentDate, dok_id_phqc: dok_id };

        case "SSCEC":
          return { tgl_diperiksa_sscec: currentDate, dok_id_sscec: dok_id };

        case "COP":
          return { tgl_diperiksa_cop: currentDate, dok_id_cop: dok_id };

        case "P3K":
          return { tgl_diperiksa_p3k: currentDate, dok_id_p3k: dok_id };

        default:
          return null;
          break;
      }
    }

    const updateParams = updateParamsType();

    await KAPAL.update(updateParams, {
      where: {
        id: kapal_id,
      },
    });

    // ============== check status
    const getKapal = await KAPAL.findOne({
      where: {
        id: kapal_id,
      },
    });

    const kapalData = getKapal["dataValues"];
    const reqDok = kapalData.tipe_dokumen.split(",");

    console.log("REQUIRED DOC : " + reqDok);

    const dokumenMapping = {
      PHQC: "tgl_diperiksa_phqc",
      COP: "tgl_diperiksa_cop",
      SSCEC: "tgl_diperiksa_sscec",
      P3K: "tgl_diperiksa_p3k", // Assuming default is P3K for other types
    };

    // Menjalankan pengecekan untuk setiap dokumen
    const checkResult = reqDok.every((doc) => {
      const field = dokumenMapping[doc];
      return kapalData[field] !== null;
    });

    if (checkResult) {
      await KAPAL.update(
        {
          status: 1,
        },
        {
          where: {
            id: kapal_id,
          },
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  checkAndUpdateKapalStatus,
};
