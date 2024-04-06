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
    const pemeriksaanFile = getImageByKey(file, "pemeriksaanKapal");

    // Handle Upload
    const uploadSignature = await uploadImagesCloudinary(
      `data:image/jpeg;base64,${data.signature}`,
      `SIGNATURE/PHQC/${data.id}`,
      true
    );

    const uploadFilePemeriksaan = await uploadImagesCloudinary(
      `data:image/jpeg;base64,${pemeriksaanFile}`,
      `PHQCFile/${data.id}`,
      false
    );

    if (!uploadSignature.url || !uploadFilePemeriksaan.url) {
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
      pemeriksaan_kapal_file: uploadFilePemeriksaan.url,
      jenislayanan: data.jenisLayanan,
      jenispelayaran: data.jenisPelayaran,
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
