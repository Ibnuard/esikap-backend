const db = require("../db");
const {
  uploadImagesCloudinary,
  deleteFilesInFolder,
} = require("../utils/cloudinary");
const { checkAndUpdateKapalStatus } = require("../utils/kapalUtils");
const { Responder } = require("../utils/responder");
const { getImageByKey } = require("../utils/utils");
const COP = db.cop;

exports.deleteCOPFolder = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteFilesInFolder(`COPFile/${id}/`);
    Responder(res, "OK", null, { deleted: true }, 200);
    return;
  } catch (error) {
    Responder(res, "ERROR", null, null, 400);
    return;
  }
};

exports.uploadSingleDoc = async (req, res) => {
  const { key, image, docId } = req.body;
  try {
    if (image?.length < 5) {
      Responder(res, "OK", null, { key: key, image: "" }, 200);
      return;
    }

    const upload = await uploadImagesCloudinary(
      `data:image/jpeg;base64,${image}`,
      `COPFile/${docId}`,
      false
    );

    if (!upload.url) {
      console.log("UPLOAD MDH FAILED");
      return Responder(res, "ERROR", null, null, 400);
    }

    Responder(res, "OK", null, { key: key, image: upload.url }, 200);
    return;
  } catch (error) {
    Responder(res, "ERROR", null, null, 400);
    return;
  }
};

exports.uploadCOP = async (req, res) => {
  const { data, file, kapalid } = req.body;
  try {
    //  Signature
    const ttdKapten = await uploadImagesCloudinary(
      `data:image/jpeg;base64,${data.signKapten}`,
      `SIGNATURE/COP/${data.id}`,
      true
    );

    const ttdPetugas = await uploadImagesCloudinary(
      `data:image/jpeg;base64,${data.signPetugas}`,
      `SIGNATURE/COP/${data.id}`,
      true
    );

    if (!ttdKapten.url || !ttdPetugas.url) {
      console.log("UPLOAD DOK FAILED");
      return Responder(res, "ERROR", null, null, 400);
    }

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

    const fileURL = {
      mdh: getImageByKey(file, "mdh"),
      sscec: getImageByKey(file, "sscec"),
      p3k: getImageByKey(file, "p3k"),
      bukukesehatan: getImageByKey(file, "bukukesehatan"),
      bukuvaksin: getImageByKey(file, "bukuvaksin"),
      daftarabk: getImageByKey(file, "daftarabk"),
      daftarvaksin: getImageByKey(file, "daftarvaksin"),
      daftarobat: getImageByKey(file, "daftarobat"),
      daftarnarkotik: getImageByKey(file, "daftarnarkotik"),
      lpoc: getImageByKey(file, "lpoc"),
      shipparticular: getImageByKey(file, "shipparticular"),
      lpc: getImageByKey(file, "lpc"),
      masalahkesehatan: getImageByKey(file, "masalahkesehatan"),
      hasilpemeriksaan: getImageByKey(file, "hasilpemeriksaan"),
      penerbitandokumen: getImageByKey(file, "penerbitandokumen"),
      bukukuning: getImageByKey(file, "bukukuning"),
      catatanperjalanan: getImageByKey(file, "catatanperjalanan"),
      izinberlayar: getImageByKey(file, "izinberlayar"),
      daftaralkes: getImageByKey(file, "daftaralkes"),
      daftarstore: getImageByKey(file, "daftarstore"),
    };

    const copData = {
      namaagen: data.kapal.namaAgen,
      namakapal: data.kapal.namaKapal,
      bendera: data.kapal.bendera,
      negaraasal: data.kapal.negaraAsal,
      imo: data.kapal.imo,
      grosstone: data.kapal.grossTone,
      tgltiba: data.tglTiba,
      lokasisandar: data.lokasiSandar,
      lokasipemeriksaan: data.lokasiPemeriksaan,
      jml_abk_asing: data.jumlahABKAsing,
      jml_abk_asing_meninggal: data.jumlahABKAsingMD,
      jml_abk_asing_sehat: data.asingSehat,
      jml_abk_asing_sakit: data.asingSakit,
      jml_abk_wni: data.jumlahABKWNI,
      jml_abk_wni_meninggal: data.jumlahABKWNIMD,
      jml_abk_wni_sehat: data.wniSehat,
      jml_abk_wni_sakit: data.wniSakit,
      jml_penumpang_asing: data.jumlahPenumpangAsing,
      jml_penumpang_asing_meninggal: data.jumlahPenumpangAsingMD,
      jml_penumpang_asing_sehat: data.penumpangAsingSehat,
      jml_penumpang_asing_sakit: data.penumpangAsingSakit,
      jml_penumpang_wni: data.jumlahPenumpangWNI,
      jml_penumpang_wni_meninggal: data.jumlahPenumpangWNIMD,
      jml_penumpang_wni_sehat: data.penumpangSehat,
      jml_penumpang_wni_sakit: data.penumpangSakit,
      isyaratkarantina: data.dokumenKapal.isyaratKarantina,
      kegiatan_sebelum_petugas_datang: data.dokumenKapal.aktifitasKapal,
      mdh_file: fileURL.mdh,
      mdh_note: data.dokumenKapal.mdhNote,
      sscec_file: fileURL.sscec,
      sscec_note: data.dokumenKapal.sscecNote,
      p3k_file: fileURL.p3k,
      p3k_note: data.dokumenKapal.p3kNote,
      bukukesehatan_file: fileURL.bukukesehatan,
      bukukesehatan_note: data.dokumenKapal.bukuKesehatanNote,
      bukuvaksin_file: fileURL.bukuvaksin,
      bukuvaksin_note: data.dokumenKapal.bukuVaksinNote,
      daftarabk_file: fileURL.daftarabk,
      daftarvaksin_file: fileURL.daftarvaksin,
      daftarobat_file: fileURL.daftarobat,
      daftarnarkotik_file: fileURL.daftarnarkotik,
      lastportofcall_file: fileURL.lpoc,
      shipparticular_file: fileURL.shipparticular,
      lastportclearance_file: fileURL.lpc,
      lastportclearance_note: data.dokumenKapal.lpcNote,
      sanitasi_dapur: data.sanitasiKapal.sanDapur,
      sanitasi_pantry: data.sanitasiKapal.sanRuangRakit,
      sanitasi_gudang: data.sanitasiKapal.sanGudang,
      sanitasi_palka: data.sanitasiKapal.sanPalka,
      sanitasi_ruangtidur: data.sanitasiKapal.sanRuangTidur,
      sanitasi_ruangabk: data.sanitasiKapal.sanABKReq,
      sanitasi_ruangperwira: data.sanitasiKapal.sanPerwira,
      sanitasi_ruangpenumpang: data.sanitasiKapal.sanPenumpang,
      sanitasi_geladak: data.sanitasiKapal.sanGeladak,
      sanitasi_airminum: data.sanitasiKapal.sanAirMinum,
      sanitasi_limbacair: data.sanitasiKapal.sanLimbaCair,
      sanitasi_airtergenang: data.sanitasiKapal.sanAirTergenang,
      sanitasi_ruangmesin: data.sanitasiKapal.sanRuangMesin,
      sanitasi_fasilitasmedis: data.sanitasiKapal.sanFasilitasMedik,
      sanitasi_arealainnya: data.sanitasiKapal.sanAreaLainnya,
      vektor_dapur: data.sanitasiKapal.vecDapur,
      vektor_pantry: data.sanitasiKapal.vecRuangRakit,
      vektor_gudang: data.sanitasiKapal.vecGudang,
      vektor_palka: data.sanitasiKapal.vecPalka,
      vektor_ruangtidur: data.sanitasiKapal.vecRuangTidur,
      vektor_ruangabk: data.sanitasiKapal.vecABKReq,
      vektor_ruangperwira: data.sanitasiKapal.vecPerwira,
      vektor_ruangpenumpang: data.sanitasiKapal.vecPenumpang,
      vektor_geladak: data.sanitasiKapal.vecGeladak,
      vektor_airminum: data.sanitasiKapal.vecAirMinum,
      vektor_limbacair: data.sanitasiKapal.vecLimbaCair,
      vektor_airtergenang: data.sanitasiKapal.vecAirTergenang,
      vektor_ruangmesin: data.sanitasiKapal.vecRuangMesin,
      vektor_fasilitasmedis: data.sanitasiKapal.vecFasilitasMedik,
      vektor_arealainnya: data.sanitasiKapal.vecAreaLainnya,
      rekomendasi: data.sanitasiKapal.rekomendasi,
      resikosanitasi: data.sanitasiKapal.resikoSanitasi,
      masalahkesehatan: data.sanitasiKapal.masalahKesehatan,
      tandatandavektor: data.sanitasiKapal.tandatandaVektor,
      masalahkesehatan_note: data.sanitasiKapal.masalahKesehatanCatatan,
      masalahkesehatan_file: fileURL.masalahkesehatan,
      hasilpemeriksaan_file: fileURL.hasilpemeriksaan,
      pemeriksaanobatp3k: data.obatP3K,
      pelanggarankarantina: data.pelanggaranKarantina,
      dokumenksehatankapal: data.dokumenKesehatanKapal,
      jenisdokumen:
        data.docType == "RP" ? "Restresed Pratique" : "Free Pratique",
      tanggalterbit: data.docTanggal,
      jamterbit: data.docJam,
      dokumen_file: fileURL.penerbitandokumen,
      ttd_kapten: ttdKapten.url,
      nama_kapten: data.signNamaKapten,
      ttd_petugas: ttdPetugas.url,
      nama_petugas: data.signNamaPetugas,
      jenislayanan: data.jenisLayanan,
      jenispelayaran: data.jenisPelayaran,
      bukukuning_file: fileURL.bukukuning,
      bukukuning_note: data.dokumenKapal.bukuKuningNote,
      catatanperjalanan_file: fileURL.catatanperjalanan,
      catatanperjalanan_note: data.dokumenKapal.catatanPerjalananNote,
      izinberlayar_file: fileURL.izinberlayar,
      izinberlayar_note: data.dokumenKapal.izinBerlayarNote,
      daftaralkes_file: fileURL.daftaralkes,
      daftaralkes_note: data.dokumenKapal.daftarAlkesNote,
      daftarstore_file: fileURL.daftarstore,
      daftarstore_note: data.dokumenKapal.daftarStoreNote,
      rekomendasi: data.dokumenKapal.rekomendasi,
      username: data.username,
      petugas2: data.namaPetugas2 || "-",
      nippetugas2: data.nipPetugas2 || "-",
      ttd2: optSignature.ttd2 || "-",
      petugas3: data.namaPetugas3 || "-",
      nippetugas3: data.nipPetugas3 || "-",
      ttd3: optSignature.ttd3 || "-",
      kapal_id: kapalid || 999123,
    };

    await COP.create(copData).then(async (result) => {
      await checkAndUpdateKapalStatus(result.id, kapalid, "COP");
    });

    Responder(res, "OK", null, { success: true }, 200);
    return;
  } catch (error) {
    console.log(error);
    deleteFilesInFolder(`COPFile/${data.id}/`);
    Responder(res, "ERROR", error, { success: false }, 400);
    return;
  }
};
