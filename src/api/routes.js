const routes = (handler) => [
  {
    method: "POST",
    path: "/reports",
    handler: handler.postReportHandler,
  },
  {
    method: "GET",
    path: "/reports",
    handler: handler.getReportsHandler,
  },
];

module.exports = routes;
