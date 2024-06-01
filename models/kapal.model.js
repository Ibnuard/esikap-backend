module.exports = (sequelize, Sequelize) => {
  const KAPAL = sequelize.define(
    "t_kapal",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      nama_kapal: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nama_agen: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      kapten_kapal: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      gross_tone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bendera: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      imo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      negara_asal: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tipe_kapal: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tanggal_permintaan: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      tipe_dokumen: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tgl_diperiksa_phqc: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dok_id_phqc: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      tgl_diperiksa_cop: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dok_id_cop: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      tgl_diperiksa_sscec: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dok_id_sscec: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      tgl_diperiksa_p3k: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dok_id_p3k: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "t_kapal",
      timestamps: false,
      underscore: true,
    }
  );

  return KAPAL;
};
