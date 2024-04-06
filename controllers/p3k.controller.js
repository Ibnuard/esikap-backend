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

    const uploadFileMasalahKesehatan =
      masalahKesehatan.length > 5
        ? await uploadImagesCloudinary(
            `data:image/jpeg;base64,${masalahKesehatan}`,
            `P3KFile/${data.id}`,
            false
          )
        : { url: "" };

    //console.log(data);

    if (
      !uploadSignatureKapten.url ||
      !uploadSignaturePetugas.url ||
      (masalahKesehatan.length > 5 && !uploadFileMasalahKesehatan.url)
    ) {
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
      buktimasalah: uploadFileMasalahKesehatan.url,
      catatan: data.pemeriksaan.masalahCatatan,
      p3kstatus: data.recP3K,
      tanggalp3k: data.recTanggal,
      jamp3k: data.recJam,
      ttdkapten: uploadSignatureKapten.url,
      namakapten: data.signNamaKapten,
      ttdpetugas: uploadSignaturePetugas.url,
      namapetugas: data.signNamaPetugas,
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
