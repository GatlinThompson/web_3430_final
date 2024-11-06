const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
dotenv.config();


let PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT} ...`);
});

const SECRET_KEY = process.env.JWT_SECRET_KEY;
const expiresIn = "24h";
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

function isAuthenticated(username, password) {
  if (username === "admin@school.edu" && password === "asdf"){
    return true
  }else{
    if (username === "teacher@school.edu" && password === "asdf"){
      return true;
    }else{
      return false;
    }
  }
}

function isAdmin(request, response, next) {
  try {
    let userDecoded = jwt.verify(request.cookies.token, SECRET_KEY)
    if (userDecoded.role === "admin") {
      next()
    } else {
      // 403 Forbidden – client authenticated but does not have permission to access the requested resource
      response.status(403).json({ success: false, message: "Aautherror: client authenticated but does not have permission to access the requested resource" })
    }
  } catch (err) {
    response.status(401).json({ success: false, message: "Autherror: You are not signed in." })

  }
}

function isTeacher(request, response, next) {
  try {
    let userDecoded = jwt.verify(request.cookies.token, SECRET_KEY)
    if (userDecoded.role === "teacher") {
      next()
    } else {
      // 403 Forbidden – client authenticated but does not have permission to access the requested resource
      response.status(403).json({ success: false, message: "Aautherror: client authenticated but does not have permission to access the requested resource" })
    }
  } catch (err) {
    response.status(401).json({ success: false, message: "Autherror: You are not signed in." })

  }
}

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/api/admin', isAdmin, function (request, response) {
  response.json({ message: "Admin only resource returned" })
});

app.get('/api/teacher', isTeacher, function (request, response) {
  response.json({ message: "Teacher only resource returned" })
});

app.get('/api/anybody', function (request, response) {
  response.json({ message: "Anybody resource returned (not protected)" })
});

app.post("/api/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (isAuthenticated(username, password)) {
    let assignedRole = ""
    if (username == "admin@school.edu"){
      assignedRole = "admin"
    }else{
      assignedRole = "teacher"
    }
    let data = {
      username: username,
      role: assignedRole
    };

    const token = createToken(data);
    res.cookie("token", token, { maxAge: 1000 * 60 * 60 })
    res.json({
      message: "You authenticated!",
      success: true,
      username: username,
      token,
    });
    res.end();
  } else {
    res.json({ message: "You DID NOT authenticate", success: false });
  }
});
