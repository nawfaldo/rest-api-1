const InvariantError = require("../exceptions/InvariantError");
const { prisma } = require("../utils/database.js");

class ReportsService {
  constructor() {}

  async addNewReport({ nomor }) {
    const result = await prisma.laporan.create({
      data: {
        nomor: nomor,
      },
    });

    if (!result.id) {
      throw new InvariantError("Laporan gagal ditambahkan");
    }

    return result.id;
  }

  async getReports() {
    let result = await prisma.laporan.findMany({});

    return result;
  }
}

module.exports = ReportsService;
