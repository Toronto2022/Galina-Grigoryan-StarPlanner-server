
exports.seed = function(knex) {
  return knex('images').del()
    .then(function () {
      return knex('images').insert([
  {
    "name": "leia.jpg",
    "url": "/files/leia.jpg"
  },
  {
    "name": "luke.jpg",
    "url": "/files/luke.jpg"
  },
  {
    "name": "obi-wan-kenobi.jpg",
    "url": "/files/obi-wan-kenobi.jpg"
  }
]);
    });
};
