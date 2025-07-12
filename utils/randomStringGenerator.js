const crypto = require("crypto");

module.exports.randomStringGenerator = () => {
  const randomHex = crypto.randomBytes(8).toString("hex");
  const bigNumber = BigInt("0x" + randomHex);
  return bigNumber.toString().slice(0, 12).padStart(12, "0");
};
