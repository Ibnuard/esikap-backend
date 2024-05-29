module.exports = (sequelize, Sequelize) => {
  const P3K = sequelize.define(
    "t_p3k",
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
      namakapal: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      imo: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      negaraasal: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      namaagen: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      bendera: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      grosstone: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      jenislayanan: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      jenispelayaran: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      lokasiperiksa: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      tglperiksa: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      peralatanp3k: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      oksigenemergency: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fasilitasmedis: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      obatantibiotik: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      obatanalgesik: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      obatlainnya: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      obatnarkotik: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      jumlahabk: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      abksehat: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      abksakit: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      resiko: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      masalah: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      buktimasalah: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
      },
      catatan: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      p3kstatus: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      tanggalp3k: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      jamp3k: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      namakapten: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      ttdkapten: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
      },
      namapetugas: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      ttdpetugas: {
        type: Sequelize.TEXT("long"),
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
    },
    {
      tableName: "t_p3k",
      underscore: true,
    }
  );

  return P3K;
};
