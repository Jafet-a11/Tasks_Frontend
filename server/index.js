//Jafet Uribe Ramirez
const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let Datos = [];

app.post("/registro", (req, res) => {
  const { username, email, password, birthDate, fullName } = req.body;

  if (!username || !email || !password || !birthDate || !fullName) {
    return res.status(400).json({
      statusCode: 400,
      intMessage: "Bad Request",
      data: { message: "Todos los campos son obligatorios" },
    });
  }
  
  const usuarioExistente = Datos.some((user) => user.username === username);
  if (usuarioExistente) {
    return res.status(400).json({
      statusCode: 400,
      intMessage: "Bad Request",
      data: { message: "El usuario ya esta registrado" },
    });
  }

  const correoExistente = Datos.some((user) => user.email === email);
  if (correoExistente) {
    return res.status(400).json({
      statusCode: 400,
      intMessage: "Bad Request",
      data: { message: "El correo ya esta registrado" },
    });
  }

  const nuevoUsuario = { username, email, password, birthDate, fullName };
  Datos.push(nuevoUsuario);

  res.status(200).json({
    statusCode: 200,
    message: "Usuario registrado correctamente",
    usuario: nuevoUsuario,
  });
  console.log(Datos);
});

app.get("/login", async (req, res) => {
  const { username, password } = req.query;
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Nombre de usuario y contraseña son obligatorios" });
  }
  const usuario = Datos.find((user) => user.username === username);
  if (!usuario) {
    return res.status(401).json({
      statusCode: 401,
      intMessage: "Unauthorized",
      data: { message: "Usuario no encontrado" },
    });
  }
  const contrasena = Datos.find((user) => user.password === password);
  if (!contrasena) {
    return res.status(401).json({
      statusCode: 401,
      intMessage: "Unauthorized",
      data: { message: "Contraseña incorrecta" },
    });
  }

  res.status(200).json({
    statusCode: 200,
    intMessage: "Operation Successful",
    data: { message: "Credenciales correctas" },
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
