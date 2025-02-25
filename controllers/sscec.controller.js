const db = require("../db");
const {
  uploadImagesCloudinary,
  deleteFilesInFolder,
} = require("../utils/cloudinary");
const { checkAndUpdateKapalStatus } = require("../utils/kapalUtils");
const { Responder } = require("../utils/responder");
const { getImageByKey } = require("../utils/utils");
const SSCEC = db.sscec;

exports.deleteCOPFolder = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteFilesInFolder(`SSCECFile/${id}/`);
    Responder(res, "OK", null, { deleted: true }, 200);
    return;
  } catch (error) {
    Responder(res, "ERROR", null, null, 400);
    return;
  }
};

exports.uploadSingleDocSSCEC = async (req, res) => {
  const { key, image, docId } = req.body;
  try {
    if (image?.length < 5) {
      Responder(res, "OK", null, { key: key, image: "" }, 200);
      return;
    }

    const upload = await uploadImagesCloudinary(
      `data:image/jpeg;base64,${image}`,
      `SSCECFile/${docId}`,
      false
    );

    if (!upload.url) {
      return Responder(res, "ERROR", null, null, 400);
    }

    Responder(res, "OK", null, { key: key, image: upload.url }, 200);
    return;
  } catch (error) {
    Responder(res, "ERROR", null, null, 400);
    return;
  }
};

exports.uploadSSCEC = async (req, res) => {
  const { data, file, kapalid } = req.body;
  try {
    //  Signature
    const ttdKapten = await uploadImagesCloudinary(
      `data:image/jpeg;base64,${data.signKapten}`,
      `SIGNATURE/SSCEC/${data.id}`,
      true
    );

    const ttdPetugas = await uploadImagesCloudinary(
      `data:image/jpeg;base64,${data.signPetugas}`,
      `SIGNATURE/SSCEC/${data.id}`,
      true
    );

    if (!ttdKapten.url || !ttdPetugas.url) {
      console.log("UPLOAD DOK FAILED");
      return Responder(res, "ERROR", null, null, 400);
    }

    const fileURL = {
      masalahkesehatan: getImageByKey(file, "masalahkesehatan"),
      hasilpemeriksaan: getImageByKey(file, "hasilpemeriksaan"),
    };

    console.log(data);

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

    const sscecData = {
      namaagen: data.kapal.namaAgen,
      namakapal: data.kapal.namaKapal,
      bendera: data.kapal.bendera,
      negaraasal: data.kapal.negaraAsal,
      tgltiba: data.tglTiba,
      ssceclama: data.sscecLama,
      lokasiterbit: data.tempatTerbit,
      imo: data.kapal.imo,
      grosstone: data.kapal.grossTone,
      tujuan: data.pelabuhanTujuan,
      lokasisandar: data.lokasiSandar,
      jml_abk_asing: data.jumlahABKAsing,
      jml_abk_asing_sehat: data.asingSehat,
      jml_abk_asing_sakit: data.asingSakit,
      jml_abk_wni: data.jumlahABKWNI,
      jml_abk_wni_sehat: data.wniSehat,
      jml_abk_wni_sakit: data.wniSakit,
      sanitasi_dapur: data.sanitasi.sanDapur,
      sanitasi_pantry: data.sanitasi.sanRuangRakit,
      sanitasi_gudang: data.sanitasi.sanGudang,
      sanitasi_palka: data.sanitasi.sanPalka,
      sanitasi_ruangtidur: data.sanitasi.sanRuangTidur,
      sanitasi_ruangabk: data.sanitasi.sanABKReq,
      sanitasi_ruangperwira: data.sanitasi.sanPerwira,
      sanitasi_ruangpenumpang: data.sanitasi.sanPenumpang,
      sanitasi_geladak: data.sanitasi.sanGeladak,
      sanitasi_airminum: data.sanitasi.sanAirMinum,
      sanitasi_limbacair: data.sanitasi.sanLimbaCair,
      sanitasi_airtergenang: data.sanitasi.sanAirTergenang,
      sanitasi_ruangmesin: data.sanitasi.sanRuangMesin,
      sanitasi_fasilitasmedis: data.sanitasi.sanFasilitasMedik,
      sanitasi_arealainnya: data.sanitasi.sanAreaLainnya,
      vektor_dapur: data.sanitasi.vecDapur,
      vektor_pantry: data.sanitasi.vecRuangRakit,
      vektor_gudang: data.sanitasi.vecGudang,
      vektor_palka: data.sanitasi.vecPalka,
      vektor_ruangtidur: data.sanitasi.vecRuangTidur,
      vektor_ruangabk: data.sanitasi.vecABKReq,
      vektor_ruangperwira: data.sanitasi.vecPerwira,
      vektor_ruangpenumpang: data.sanitasi.vecPenumpang,
      vektor_geladak: data.sanitasi.vecGeladak,
      vektor_airminum: data.sanitasi.vecAirMinum,
      vektor_limbacair: data.sanitasi.vecLimbaCair,
      vektor_airtergenang: data.sanitasi.vecAirTergenang,
      vektor_ruangmesin: data.sanitasi.vecRuangMesin,
      vektor_fasilitasmedis: data.sanitasi.vecFasilitasMedik,
      vektor_arealainnya: data.sanitasi.vecAreaLainnya,
      rekomendasi: data.sanitasi.rekomendasi,
      resikosanitasi: data.sanitasi.resikoSanitasi,
      masalahkesehatan: data.sanitasi.masalahKesehatan,
      masalahkesehatan_note: data.sanitasi.masalahKesehatanCatatan,
      masalahkesehatan_file: fileURL.masalahkesehatan,
      hasilpemeriksaan_file: fileURL.hasilpemeriksaan,
      sscec_dok: data.recSSCEC,
      sscec_tanggal: data.recTanggal,
      sscec_jam: data.recJam,
      ttd_kapten: ttdKapten.url,
      nama_kapten: data.signNamaKapten,
      ttd_petugas: ttdPetugas.url,
      nama_petugas: data.signNamaPetugas,
      jenislayanan: data.jenisLayanan,
      jenispelayaran: data.jenisPelayaran,
      username: data.username,
      petugas2: data.namaPetugas2 || "-",
      nippetugas2: data.nipPetugas2 || "-",
      ttd2: optSignature.ttd2 || "-",
      petugas3: data.namaPetugas3 || "-",
      nippetugas3: data.nipPetugas3 || "-",
      ttd3: optSignature.ttd3 || "-",
      kapal_id: kapalid || 999123,
      catatan_kesehatan: data.sanitasi.catatanKesehatan || "",
    };

    await SSCEC.create(sscecData).then(async (result) => {
      await checkAndUpdateKapalStatus(result.id, kapalid, "SSCEC");
    });

    Responder(res, "OK", null, { success: true }, 200);
    return;
  } catch (error) {
    console.log(error);
    deleteFilesInFolder(`SSCECFile/${data.id}/`);
    Responder(res, "ERROR", error, { success: false }, 400);
    return;
  }
};
