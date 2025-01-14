const moment = require("moment");

module.exports = (sequelize, Sequelize) => {
  const SSCEC = sequelize.define(
    "t_sscec",
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
      imo: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      grosstone: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      tujuan: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      tgltiba: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      ssceclama: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      lokasiterbit: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      lokasisandar: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      jml_abk_asing: {
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
      jml_abk_wni_sehat: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      jml_abk_wni_sakit: {
        type: Sequelize.INTEGER,
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
      sscec_dok: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sscec_tanggal: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sscec_jam: {
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
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      petugas2: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      nippetugas2: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      ttd2: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
      },
      petugas3: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      nippetugas3: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      ttd3: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
      },
      kapal_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      catatan_kesehatan: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
    },
    {
      tableName: "t_sscec",
      underscore: true,
    }
  );

  return SSCEC;
};
