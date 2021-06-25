const knex = require("../db/connection");
const lodash = require("lodash");
/**
 * Add critic
 * @param {*} reviews 
 * @returns 
 */
function addCritic(reviews) {
  return reviews.map((review) => {
    return {
      review_id: review.review_id,
      content: review.content,
      score: review.score,
      created_at: review.created_at,
      updated_at: review.updated_at,
      critic_id: review.critic_id,
      movie_id: review.movie_id,
      critic: {
        preferred_name: review.preferred_name,
        surname: review.surname,
        organization_name: review.organization_name,
      },
    };
  });
}
/**
 * update review
 * @param {*} newReview 
 * @returns 
 */
function update(newReview) {
  return knex("reviews")
    .where({ review_id: newReview.review_id })
    .update(newReview, ["*"])
    .then((data) => data[0]);
}

/**
 * Read review by id
 * @param {*} reviewId 
 * @returns 
 */
function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

/**
 * get critic by id
 * @param {*} criticId 
 * @returns 
 */
function getCriticById(criticId) {
  return knex("critics").select("*").where({ critic_id: criticId }).first();
}

/**
 * delete review by id
 * @param {*} reviewId 
 * @returns 
 */
function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

module.exports = {
  update,
  read,
  getCriticById,
  destroy,
};