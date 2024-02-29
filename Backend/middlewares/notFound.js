/**
 *
 * @param {*} req
 * @param {*} res
 * @returns routes doesn't exists
 */
const notFound = (req, res) => res.status(404).send("Routes doesn't exist!");

module.exports = notFound;
