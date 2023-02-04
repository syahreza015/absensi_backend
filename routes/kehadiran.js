const connection = require("../connection/dbConnection");

// route to get attendance

const getAttendance = (req, res) => {
  const queryGetAttendance = "SELECT * FROM kehadiran WHERE user_id=?";
  const userId = req.params.id;
  const cookie = req.cookies.admin;
  if (!cookie) {
    res.status(401).send("access not granted, no cookie");
  } else {
    if (cookie.expires < Date.now()) {
      res.status(401).send("access not granted, cookie expired");
    } else {
      connection.execute(queryGetAttendance, [userId], (err, result) => {
        if (err) {
          res
            .status(400)
            .send(`there is truble in processing your request ${err}`);
        } else {
          if (result.length > 0) {
            res.status(200).json(result);
          } else {
            res.status(404).send(`the data does not exist`);
          }
        }
      });
    }
  }
};

const getAttendancePrecise = (req, res) => {
  const userId = req.params.id;
  const tanggal = req.query.tanggal;
  const bulan = req.query.bulan;
  const tahun = req.query.tahun;
  const cookie = req.cookies.admin;
  const queryGetAttendancePrecise =
    "SELECT * FROM kehadiran WHERE user_id=? AND tanggal=? AND bulan=? AND tahun=?";

  if (!cookie) {
    res.status(401).send("Access not granted, no cookie");
  } else {
    if (cookie.expires < Date.now()) {
      res.status(401).send("Access not granted, cookie expired");
    } else {
      connection.execute(
        queryGetAttendancePrecise,
        [userId, tanggal, bulan + 1, tahun],
        (err, result) => {
          if (err) {
            res
              .status(500)
              .send(`there is a problem while processing your request, ${err}`);
            console.log(userId, tanggal, bulan, tahun);
          } else {
            res.status(200).json(result);
            console.log(userId, tanggal, bulan, tahun);
          }
        }
      );
    }
  }
};

exports.getAttendance = getAttendance;
exports.getAttendancePrecise = getAttendancePrecise;
