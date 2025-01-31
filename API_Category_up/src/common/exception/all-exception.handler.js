function AllExceptionHandler(app) {
  app.use((err, req, res, next) => {
    let statusCode = err?.statusCode || err?.status || err?.code;
    if (
      !statusCode ||
      isNaN(+statusCode) ||
      statusCode < 200 ||
      statusCode > 511
    )
      statusCode = 500;

    res
      .status(statusCode)
      .json({ message: err?.message ?? err?.stack ?? "خطای سرور" });
  });
}
module.exports = AllExceptionHandler;
