/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("tasks").del();
  await knex("users").del();
  await knex("users").insert([
    {
      user_id: "customUser1", // Custom identifier
      username: "Sample User",
      email: "sampleUser@example.com",
      password: "hashedPassword", // Ensure this is hashed appropriately
    },
  ]);
};
