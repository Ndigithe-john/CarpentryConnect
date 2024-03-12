const { format } = require("date-fns");

const getTimestamp = () => {
  return format(new Date(), "yyyyMMddHHmmss");
};
const getPassword = (shortCode, passkey, timestamp) => {
  const passString = shortCode + passkey + timestamp;

  return Buffer.from(passString).toString("base64");
};

module.exports = { getTimestamp, getPassword };
