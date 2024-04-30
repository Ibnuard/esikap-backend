const db = require("../db");
const {
  uploadImagesCloudinary,
  deleteFilesInFolder,
} = require("../utils/cloudinary");
const { Responder } = require("../utils/responder");
const { getImageByKey } = require("../utils/utils");
const P3k = db.p3k;

exports.uploadP3K = async (req, res) => {
  const { data, file } = req.body;
  try {
    // Handle file
    const masalahKesehatan = getImageByKey(file, "masalahkesehatan");

    // Handle Upload
    const uploadSignatureKapten = await uploadImagesCloudinary(
      `data:image/jpeg;base64,${data.signKapten}`,
      `P3KFile/${data.id}/SIGNATURE`,
      true
    );

    // Handle Upload
    const uploadSignaturePetugas = await uploadImagesCloudinary(
      `data:image/jpeg;base64,${data.signPetugas}`,
      `P3KFile/${data.id}/SIGNATURE`,
      true
    );

    //console.log(data);

    const optSignature = {};

    if (data.signPetugas2.length > 0) {
      const uploadSignature = await uploadImagesCloudinary(
        `data:image/jpeg;base64,${data.signPetugas2}`,
        `PHQCFile/${data.id}/SIGNATURE`,
        true
      );

      optSignature.ttd2 = uploadSignature.url;
    }

    if (data.signPetugas3.length > 0) {
      const uploadSignature = await uploadImagesCloudinary(
        `data:image/jpeg;base64,${data.signPetugas3}`,
        `PHQCFile/${data.id}/SIGNATURE`,
        true
      );

      optSignature.ttd3 = uploadSignature.url;
    }

    if (!uploadSignatureKapten.url || !uploadSignaturePetugas.url) {
      deleteFilesInFolder(`P3KFile/${data?.id}/`);
      return Responder(res, "ERROR", null, null, 400);
    }

    const p3kData = {
      namaagen: data.kapal.namaAgen,
      namakapal: data.kapal.namaKapal,
      bendera: data.kapal.bendera,
      imo: data.kapal.imo,
      negaraasal: data.kapal.negaraAsal,
      grosstone: data.kapal.grossTone,
      jenislayanan: data.jenisLayanan,
      jenispelayaran: data.jenisPelayanan,
      lokasiperiksa: data.lokasiPemeriksaan,
      tglperiksa: data.tglDiperiksa,
      peralatanp3k: data.pemeriksaan.peralatanP3K,
      oksigenemergency: data.pemeriksaan.oxygenEmergency,
      fasilitasmedis: data.pemeriksaan.fasilitasMedis,
      obatantibiotik: data.pemeriksaan.obatAntibiotik,
      obatanalgesik: data.pemeriksaan.obatAnalgesik,
      obatlainnya: data.pemeriksaan.obatLainnya,
      obatnarkotik: data.pemeriksaan.obatNarkotik,
      jumlahabk: data.jmlABK,
      abksehat: data.abkSehat,
      abksakit: data.abkSakit,
      resiko: data.pemeriksaan.resiko,
      masalah: data.pemeriksaan.masalah,
      buktimasalah: masalahKesehatan,
      catatan: data.pemeriksaan.masalahCatatan,
      p3kstatus: data.recP3K,
      tanggalp3k: data.recTanggal,
      jamp3k: data.recJam,
      ttdkapten: uploadSignatureKapten.url,
      namakapten: data.signNamaKapten,
      ttdpetugas: uploadSignaturePetugas.url,
      namapetugas: data.signNamaPetugas,
      username: data.username,
      petugas2: data.namaPetugas2 || "-",
      nippetugas2: data.nipPetugas2 || "-",
      ttd2: optSignature.ttd2 || "-",
      petugas3: data.namaPetugas3 || "-",
      nippetugas3: data.nipPetugas3 || "-",
      ttd3: optSignature.ttd3 || "-",
    };

    await P3k.create(p3kData);

    Responder(res, "OK", null, { success: true }, 200);
    return;
  } catch (error) {
    console.log(error);
    Responder(res, "ERROR", null, { success: false }, 400);
    return;
  }
};

exports.deleteP3KFolder = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteFilesInFolder(`P3KFile/${id}/`);
    Responder(res, "OK", null, { deleted: true }, 200);
    return;
  } catch (error) {
    Responder(res, "ERROR", null, null, 400);
    return;
  }
};

exports.uploadSingleDocP3K = async (req, res) => {
  const { key, image, docId } = req.body;
  try {
    if (image?.length < 5) {
      Responder(res, "OK", null, { key: key, image: "" }, 200);
      return;
    }

    const upload = await uploadImagesCloudinary(
      `data:image/jpeg;base64,${image}`,
      `P3KFile/${docId}`,
      false
    );

    if (!upload.url) {
      console.log("UPLOAD P3K FAILED");
      return Responder(res, "ERROR", null, null, 400);
    }

    console.log("UPLOADED URL : " + upload.url);

    Responder(res, "OK", null, { key: key, image: upload.url }, 200);
    return;
  } catch (error) {
    Responder(res, "ERROR", null, null, 400);
    return;
  }
};
