module.exports = (req, code, error) => {
    console.error(`---------------------`);
    console.error(`Time: ${new Date()}`);
    console.error(`Method: ${req.method}`);
    console.error(`Path: ${req.originalUrl}`);
    console.error(`Catch: ${code}`);
    console.error(error.message ? error.message : error);
    console.error(`---------------------`);
  };