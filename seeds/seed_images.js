
exports.seed = function(knex) {
  return knex('images').del()
    .then(function () {
      return knex('images').insert([
  {
    "name": "at-atc walker.jpg",
    "url": "/files/at-atc walker.jpg"
  },
  {
    "name": "bb-8.jpg",
    "url": "/files/bb-8.jpg"
  },
  {
    "name": "blue-ace.jpg",
    "url": "/files/blue-ace.jpg"
  },
  {
    "name": "c-3po.jpg",
    "url": "/files/c-3po.jpg"
  },
  {
    "name": "falcon.jpg",
    "url": "/files/falcon.jpg"
  },
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
  },
  {
    "name": "r2-d2.jpg",
    "url": "/files/r2-d2.jpg"
  },
  {
    "name": "rey.jpg",
    "url": "/files/rey.jpg"
  },
  {
    "name": "stormtrooper.jpg",
    "url": "/files/stormtrooper.jpg"
  },
  {
    "name": "tiefighter.jpg",
    "url": "/files/tiefighter.jpg"
  },
  {
    "name": "yoda.jpg",
    "url": "/files/yoda.jpg"
  }
]);
    });
};
