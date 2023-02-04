const connection = require("../connection/dbConnection");
// route to get all user

const getUser = (req, res) => {
  const queryGetUser = "SELECT * FROM user";
  const cookie = req.cookies.admin;
  if (!cookie) {
    res.status(401).send("access denied, access not authorized");
  } else {
    //check if cookie expired in database
    if (cookie.expires < Date.now()) {
      res.status(401).send("access not granted, cookie expired");
    } else {
      connection.execute(queryGetUser, (err, result) => {
        if (err) {
          res.status(400).send(`error on handling request, ${err}`);
        } else {
          res.status(200).json(result);
        }
      });
    }
  }
};

// get user with id

const getSpecificUser = (req, res) => {
  const queryGetSpecificUser = "SELECT * FROM user WHERE id=?";
  const queryCheckCookie = "SELECT * FROM cookies WHERE cookie_name=?";
  const id = req.params.id;
  const cookie = req.cookies.admin;
  if (!cookie) {
    res.status(401).send("access denied, acces not authorized");
  } else {
    connection.execute(queryCheckCookie, [cookie], (err, result) => {
      //check if cookie avaible in database
      connection.query(queryGetSpecificUser, [id], (err, result) => {
        if (err) {
          res
            .status(400)
            .send(`error on handling request, request not valid, ${err}`);
        } else {
          //if avaible start giving response
          if (cookie.expires < Date.now()) {
            res.status(401).send("access not granted, cookie expired");
          } else {
            if (result.length <= 0) {
              res.status(404).send("user not found");
            } else {
              res.status(200).json(result);
            }
          }
        }
      });
    });
  }
};

exports.getUser = getUser;
exports.getSpecificUser = getSpecificUser;
