module.exports = (sequelize, Sequelize) => {
  const COP = sequelize.define(
    "t_cop",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      tgltransaksi: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      namaagen: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      imo: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      grosstone: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      namakapal: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      bendera: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      negaraasal: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      tgltiba: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      lokasisandar: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      lokasipemeriksaan: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      jml_abk_asing: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      jml_abk_asing_meninggal: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      jml_abk_asing_sehat: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      jml_abk_asing_sakit: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      jml_abk_wni: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      jml_abk_wni_meninggal: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      jml_abk_wni_sehat: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      jml_abk_wni_sakit: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      jml_penumpang_asing: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      jml_penumpang_asing_meninggal: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      jml_penumpang_asing_sehat: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      jml_penumpang_asing_sakit: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      jml_penumpang_wni: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      jml_penumpang_wni_meninggal: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      jml_penumpang_wni_sehat: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      jml_penumpang_wni_sakit: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      isyaratkarantina: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      kegiatan_sebelum_petugas_datang: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      mdh_file: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
      },
      mdh_note: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sscec_file: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
      },
      sscec_note: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      p3k_file: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
      },
      p3k_note: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bukukesehatan_file: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
      },
      bukukesehatan_note: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bukuvaksin_file: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
      },
      bukuvaksin_note: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      daftarabk_file: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
      },
      daftarvaksin_file: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
      },
      daftarobat_file: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
      },
      daftarnarkotik_file: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
      },
      lastportofcall_file: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
      },
      shipparticular_file: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
      },
      lastportclearance_file: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
      },
      lastportclearance_note: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bukukuning_file: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
      },
      bukukuning_note: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      catatanperjalanan_file: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
      },
      catatanperjalanan_note: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      izinberlayar_file: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
      },
      izinberlayar_note: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      daftaralkes_file: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
      },
      daftaralkes_note: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      daftarstore_file: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
      },
      daftarstore_note: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      rekomendasi: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sanitasi_dapur: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sanitasi_pantry: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sanitasi_gudang: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sanitasi_palka: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sanitasi_ruangtidur: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sanitasi_ruangabk: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sanitasi_ruangperwira: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sanitasi_ruangpenumpang: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sanitasi_geladak: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sanitasi_airminum: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sanitasi_limbacair: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sanitasi_airtergenang: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sanitasi_ruangmesin: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sanitasi_fasilitasmedis: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sanitasi_arealainnya: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vektor_dapur: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vektor_pantry: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vektor_gudang: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vektor_palka: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vektor_ruangtidur: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vektor_ruangabk: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vektor_ruangperwira: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vektor_ruangpenumpang: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vektor_geladak: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vektor_airminum: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vektor_limbacair: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vektor_airtergenang: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vektor_ruangmesin: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vektor_fasilitasmedis: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vektor_arealainnya: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      rekomendasi: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      resikosanitasi: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tandatandavektor: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      masalahkesehatan: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      masalahkesehatan_note: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      masalahkesehatan_file: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
      },
      hasilpemeriksaan_file: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
      },
      pemeriksaanobatp3k: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pelanggarankarantina: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dokumenksehatankapal: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      jenisdokumen: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tanggalterbit: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      jamterbit: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dokumen_file: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ttd_kapten: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
      },
      nama_kapten: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ttd_petugas: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
      },
      nama_petugas: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      jenislayanan: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      jenispelayaran: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
    },
    {
      tableName: "t_cop",
      underscore: true,
    }
  );

  return COP;
};
