/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("users").del();
  await knex("users").insert([
    {
      id: 1,
      username: "SampleUser",
      email: "sampleUser@example.com",
      password: "hashedPassword",
    },
    {
      id: 2,
      username: "AnotherUser",
      email: "anotherUser@example.com",
      password: "hashedPassword",
    },
  ]);
};
