const connection = require("../connection/dbConnection");
const date = new Date();
const currentHour = date.getHours();

// route for admin login

const adminLogin = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const cookieName = username + password;
  const expiration = currentHour + 1;
  const queryLoginUser = "SELECT * FROM admin WHERE username=? AND password=?";
  const queryStoreCookie =
    "INSERT INTO cookies(cookie_name, expiration) VALUES(?,?)";

  // username, password authentication and cookie generation / deliver
  connection.execute(queryLoginUser, [username, password], (err, result) => {
    if (err) {
      res.status(400).send(`ada kesalahan, ${err}`);
    } else {
      const userFound = result.length;
      if (userFound > 0) {
        res.cookie("admin", cookieName, {
          maxAge: 1000 * 60 * 60,
          httpOnly: true,
        });
        res.status(200).json(result);
        // insert cookie details to database
      } else {
        res.status(401).send("gagal login, user tidak ditemukan");
      }
    }
  });
};

exports.adminLogin = adminLogin;
