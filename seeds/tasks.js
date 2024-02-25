/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("tasks").del();
  // await knex("users").del();
  const existingUser = await knex("users").first();
  if (existingUser?.id) {
    await knex("tasks").insert([
      {
        user_id: existingUser.id,
        title: "Sample User",
        description: "sampleUser@example.com",
        position: JSON.stringify({ x: 0, y: 0 }),
      },
      {
        user_id: existingUser.id,
        title: "Sample User2",
        description: "sampleUser2@example.com",
        position: JSON.stringify({ x: 0, y: 0 }),
      },
    ]);
  } else {
    console.error("User's table is empry!");
  }
};
