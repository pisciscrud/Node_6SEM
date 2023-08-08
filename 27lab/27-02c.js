
const axios = require("axios");
const fs = require("fs");

const { ClientVerify } = require("./module/Sign");

const verify = async () => {
  try {
    const { data } = await axios.get('http://localhost:3000/');

    const rs = fs.createReadStream(`${__dirname}/files/file.txt`, {
      encoding: "utf8",
    });

    ClientVerify(data, rs, (isVerified) => {
      // проверяем подпись
      console.log(`Valide: ${isVerified}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};
verify();
