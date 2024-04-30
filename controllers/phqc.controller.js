const db = require("../db");
const {
  uploadImagesCloudinary,
  deleteFilesInFolder,
} = require("../utils/cloudinary");
const { Responder } = require("../utils/responder");
const { getImageByKey } = require("../utils/utils");
const PHQC = db.phqc;

exports.uploadPHQC = async (req, res) => {
  const { data, file } = req.body;
  try {
    // Handle file
    const pemeriksaanFile = getImageByKey(file, "pemeriksaankapal");

    // Handle Upload
    const uploadSignature = await uploadImagesCloudinary(
      `data:image/jpeg;base64,${data.signature}`,
      `PHQCFile/${data.id}/SIGNATURE`,
      true
    );

    const uploadSignatureKapten = await uploadImagesCloudinary(
      `data:image/jpeg;base64,${data.signatureKapten}`,
      `PHQCFile/${data.id}/SIGNATURE`,
      true
    );

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

    if (!uploadSignature.url || !uploadSignatureKapten.url) {
      deleteFilesInFolder(`PHQCFile/${data?.id}/`);
      return Responder(res, "ERROR", null, null, 400);
    }

    const phqcData = {
      namaagen: data.kapal.namaAgen,
      namakapal: data.kapal.namaKapal,
      bendera: data.kapal.bendera,
      negaraasal: data.kapal.negaraAsal,
      tujuanberikut: data.tujuan,
      imo: data.kapal.imo,
      grosstone: data.kapal.grossTone,
      dockapal: data.dokumenKapal,
      lokasiperiksa: data.lokasiPemeriksaan,
      deteksidemam: data.deteksiDemam,
      jmlpenumpang: data.jumlahPenumpang,
      jmlsehat: data.custJumlahSehat,
      jmlsakit: data.custJumlahSakit,
      jmlmeninggal: data.custJumlahMeninggal,
      jmldirujuk: data.custJumlahDirujuk,
      deteksidemam_abk: data.deteksiDemam,
      jml_abk: data.jumlahABK,
      jmlsehat_abk: data.jumlahSehat,
      jmlsakit_abk: data.jumlahSakit,
      jmlmeninggal_abk: data.jumlahMeninggal,
      jmldirujuk_abk: data.jumlahDirujuk,
      statussanitasi: data.statusSanitasi,
      kesimpulan: data.kesimpulan,
      petugaspemeriksa: data.petugasPelaksana,
      ttd: uploadSignature.url,
      pemeriksaan_kapal_file: pemeriksaanFile,
      jenislayanan: data.jenisLayanan,
      jenispelayaran: data.jenisPelayaran,
      masalahkesehatan: data.masalahKesehatan,
      tgldiperiksa: data.tanggalDiperiksa,
      jamdiperiksa: data.jamDiperiksa,
      namakapten: data.kapten,
      ttdkapten: uploadSignatureKapten.url,
      username: data.username,
      petugas2: data.namaPetugas2 || "-",
      nippetugas2: data.nipPetugas2 || "-",
      ttd2: optSignature.ttd2 || "-",
      petugas3: data.namaPetugas3 || "-",
      nippetugas3: data.nipPetugas3 || "-",
      ttd3: optSignature.ttd3 || "-",
    };

    await PHQC.create(phqcData);

    Responder(res, "OK", null, { success: true }, 200);
    return;
  } catch (error) {
    console.log(error);
    Responder(res, "ERROR", null, { success: false }, 400);
    return;
  }
};

exports.deletePHQCFolder = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteFilesInFolder(`PHQCFile/${id}/`);
    Responder(res, "OK", null, { deleted: true }, 200);
    return;
  } catch (error) {
    Responder(res, "ERROR", null, null, 400);
    return;
  }
};

exports.uploadSingleDocPHQC = async (req, res) => {
  const { key, image, docId } = req.body;
  console.log("Upload PHQC Single Doc");
  try {
    if (image?.length < 5) {
      Responder(res, "OK", null, { key: key, image: "" }, 200);
      return;
    }

    const upload = await uploadImagesCloudinary(
      `data:image/jpeg;base64,${image}`,
      `PHQCFile/${docId}`,
      false
    );

    if (!upload.url) {
      console.log("UPLOAD PHQC FAILED");
      return Responder(res, "ERROR", null, null, 400);
    }

    Responder(res, "OK", null, { key: key, image: upload.url }, 200);
    return;
  } catch (error) {
    console.log("ERROR UPLOAD : ", error);
    Responder(res, "ERROR", null, null, 400);
    return;
  }
};
