const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const theatersService = require("./theaters.service");
/**
 * list all theaters
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function list(req, res, next) {
  const data = await theatersService.list();
  res.json({ data });
}

module.exports = {
    list: asyncErrorBoundary(list)
}