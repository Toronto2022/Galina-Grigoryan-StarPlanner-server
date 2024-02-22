const knex = require("knex")(require("../knexfile"));
const jwt = require("jsonwebtoken");
const router = require("express").Router();
// const bcrypt = require("bcryptjs");

router.post("/signup", async (req, res) => {
  const { username, name, password, email } = req.body;
  // Check if user already exists
  const existingUser = await knex("users").where({ username }).first();
  if (existingUser) {
    return res.status(400).send("Username already taken");
  }
  const existingEmail = await knex("users").where({ email }).first();
  if (existingEmail) {
    return res.status(400).send("Email already in use");
  }
  // Hash password
  //   const hashedPassword = await bcrypt.hash(password, 10);

  // Insert new user
  try {
    const [newUserId] = await knex("users").insert({
      email,
      username,
      name,
      password,
    });
    const newUser = await knex("users").where("id", newUserId).first();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating user");
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await knex("users").where({ username: username }).first();

  if (!user) {
    return res.status(403).send("usernamenot found");
  }
  const passwordMatching = user.password === password;

  if (!passwordMatching) {
    return res.status(403).send("Combination of username & password not found");
  }
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
    },
    process.env.SECRET_KEY
  );

  res.status(200).json({
    access_token: token,
  });
});

// router.get("/user-info", async (req, res) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1]; // Assuming Bearer token is used
//     const decoded = jwt.verify(token, process.env.SECRET_KEY);
//     const userId = decoded.id;

//     const user = await knex("users").where("id", userId).first();
//     if (!user) {
//       return res.status(404).send("User not found");
//     }
//     res.status(200).send({ name: user.name });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error retrieving user information");
//   }
// });

module.exports = router;
