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
      tanggal_diperiksa: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      tanggal_disetujui: {
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
    },
    {
      tableName: "t_kapal",
      timestamps: false,
      underscore: true,
    }
  );

  return KAPAL;
};
