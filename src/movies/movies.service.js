const knex = require("./../db/connection");
/**
 * display Movie
 * display only currenly showing movie if isShowing is true
 * @param {*} isShowing 
 * @returns 
 */
function list(isShowing) {
  if (isShowing === "true") {
    return listOnlyShowing();
  }
  return listAll();
}

/**
 * list all movies
 * @returns 
 */
function listAll() {
  return knex("movies").select("*");
}

/**
 * list only currently showing
 * @returns 
 */
function listOnlyShowing() {
    return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .distinct("m.*")
    .where({ "mt.is_showing": true });
}

/**
 * read movie by id
 * @param {*} movieId 
 * @returns 
 */
function read(movieId) {
  return knex("movies as m")
    .select("m.*")
    .where({ "m.movie_id": movieId })
    .first();
}

/**
 * review by id
 * @param {} movieId 
 * @returns 
 */
function listReviews(movieId) {
  return knex("movies as m")
    .join("reviews as r", "m.movie_id", "r.movie_id")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({ "m.movie_id": movieId })
    .groupBy("r.review_id", "c.critic_id")
    .orderBy("r.review_id");
}

module.exports = {
  list,
  read,
  listReviews,
};