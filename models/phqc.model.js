module.exports = (sequelize, Sequelize) => {
  const PHQC = sequelize.define(
    "t_phqc",
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
      tujuanberikut: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      dockapal: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      lokasiperiksa: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      deteksidemam: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      jmlpenumpang: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      jmlsehat: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      jmlsakit: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      jmlmeninggal: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      jmldirujuk: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      deteksidemam_abk: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      jml_abk: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      jmlsehat_abk: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      jmlsakit_abk: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      jmlmeninggal_abk: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      jmldirujuk_abk: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      statussanitasi: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      kesimpulan: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      petugaspemeriksa: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      ttd: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
      },
      pemeriksaan_kapal_file: {
        type: Sequelize.TEXT("long"),
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
      tableName: "t_phqc",
      underscore: true,
    }
  );

  return PHQC;
};
