const { query } = require("express");
const connection = require("../connection/dbConnection");
const date = new Date();
const currentHour = new Date().getHours();

// route to delete cookie every one hour

const deleteCookie = () => {
  const queryDeleteCookie = "DELETE FROM cookies WHERE expiration <= ?";

  connection.execute(queryDeleteCookie, [currentHour], (err, result) => {
    if (err) {
      console.log(`gagal menghapus cookie dari database, ${err}`);
    } else {
      console.log(`berhasil menghapus cookie karena kadaluarsa ${result}`);
    }
  });
};

const getCookie = (req, res) => {
  const queryGetCookie = "SELECT * FROM cookies";

  connection.execute(queryGetCookie, (err, result) => {
    if (err) {
      res.status(400).send(`ada kesalahan dalam pemrosesan ${err}`);
    } else {
      res.status(200).json(result);
    }
  });
};

exports.deleteCookie = deleteCookie;
exports.getCookie = getCookie;
