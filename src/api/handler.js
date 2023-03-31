const ClientError = require("../exceptions/ClientError");

class ReportsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postReportHandler = this.postReportHandler.bind(this);
    this.getReportsHandler = this.getReportsHandler.bind(this);
  }

  async postReportHandler(request, h) {
    try {
      const { nomor } = request.payload;

      const toValidate = {
        nomor,
      };

      this._validator.validateReportsPayload(toValidate);

      const report = await this._service.addNewReport({
        nomor,
      });

      const response = h.response({
        status: "success",
        message: "Berhasil menambahkan Laporan.",
        data: {
          report,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: "fail",
          message: error.message,
        });

        response.code(error.statusCode);
        return response;
      }

      console.log(error);

      const response = h.response({
        status: "error",
        message: "Maaf, Server Mengalami Kegagalan.",
      });

      response.code(500);
      return response;
    }
  }
  async getReportsHandler(request, h) {
    try {
      const reports = await this._service.getReports();

      return {
        status: "success",
        data: {
          reports,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: "fail",
          message: error.message,
        });

        response.code(error.statusCode);
        return response;
      }

      const response = h.response({
        status: "error",
        message: "Maaf, Server Mengalami Kegagalan.",
      });

      response.code(500);
      return response;
    }
  }
}

module.exports = ReportsHandler;
