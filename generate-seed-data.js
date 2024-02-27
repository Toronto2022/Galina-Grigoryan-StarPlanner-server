const fs = require("fs");
const path = require("path");

const imagesDirectory = "./files";
const seedFileName = "./seeds/seed_images.js"; // Use the actual seed file path

fs.readdir(imagesDirectory, (err, files) => {
  if (err) throw err;

  const seedData = files.map((file) => ({
    name: path.basename(file),
    url: "/" + path.join(imagesDirectory, file).replace(/\\/g, "/"), // Correctly join paths and ensure only one separator
  }));

  const seedFileContent = `
exports.seed = function(knex) {
  return knex('images').del()
    .then(function () {
      return knex('images').insert(${JSON.stringify(seedData, null, 2)});
    });
};
`;

  fs.writeFile(seedFileName, seedFileContent, (err) => {
    if (err) throw err;
    console.log("Seed file generated successfully!");
  });
});
