const db = require("../db");
const { Responder } = require("../utils/responder");
const KAPAL = db.kapal;
const PHQC = db.phqc;
const COP = db.cop;
const P3K = db.p3k;
const SSCEC = db.sscec;

exports.get_all_kapal = async (req, res) => {
  try {
    const getKapal = await KAPAL.findAll();
    Responder(res, "OK", null, getKapal, 200);
    return;
  } catch (error) {
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

    // find if already upload
    let doc_result = [];
    for (let doc of kapalDoc) {
      if (doc == "PHQC") {
        findPHQC();
      } else if (doc == "COP") {
        findCOP();
      } else if (doc == "SSCEC") {
        findSSCEC();
      } else {
        findP3K();
      }
    }

    // == Find PHQC
    async function findPHQC() {
      const getPHQC = PHQC.findOne({ where: { kapal_id: id } });
      if (getPHQC) {
        doc_result.push(true);
      } else {
        doc_result.push(false);
      }
    }

    // == Find COP
    async function findCOP() {
      const getCOP = COP.findOne({ where: { kapal_id: id } });
      if (getCOP) {
        doc_result.push(true);
      } else {
        doc_result.push(false);
      }
    }

    // == Find SSCEC
    async function findSSCEC() {
      const getSSCEC = SSCEC.findOne({ where: { kapal_id: id } });
      if (getSSCEC) {
        doc_result.push(true);
      } else {
        doc_result.push(false);
      }
    }

    // == Find P3K
    async function findP3K() {
      const getP3K = P3K.findOne({ where: { kapal_id: id } });

      if (getP3K) {
        doc_result.push(true);
      } else {
        doc_result.push(false);
      }
    }

    if (doc_result.every((item) => item == true)) {
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
    Responder(res, "ERROR", "Ada kesalahan jaringan.", null, 500);
    return;
  }
};
