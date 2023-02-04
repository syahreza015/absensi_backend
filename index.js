const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const cron = require("node-cron");
const route = express.Router();

const userRoute = require("./routes/user");
const adminRoute = require("./routes/admin");
const attendanceRoute = require("./routes/kehadiran");

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(route);

//user route
route.get("/getUser", userRoute.getUser);
route.get("/getUser/:id", userRoute.getSpecificUser);

//admin route
route.post("/adminLogin", adminRoute.adminLogin);

//attendance route
route.get("/getAttendance/:id", attendanceRoute.getAttendance);
route.get("/getAttendancePrecise/:id", attendanceRoute.getAttendancePrecise);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server up and run at port ${port}`);
});
