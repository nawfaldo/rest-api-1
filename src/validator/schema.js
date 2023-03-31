const Joi = require("joi");

const ReportPayloadSchema = Joi.object({
  nomor: Joi.string().required(),
});

module.exports = { ReportPayloadSchema };
