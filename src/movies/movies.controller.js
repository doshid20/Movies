const moviesService = require("./movies.service");

/**
 * if movie exist
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
async function ifMovieExists(req, res, next) {
  const foundMovie = await moviesService.read(req.params.movieId);
  if (foundMovie) {
    res.locals.movie = foundMovie;
    return next();
  }
  next({
    status: 404,
    message: `Movie id ${req.params.movieId} not found`,
  });
}

/**
 * list movies currently showing or all
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function list(req, res, next) {
  const data = await moviesService.list(req.query.is_showing);
  res.json({ data });
}

/**
 * Read movies if exist
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function read(req, res, next) {
  res.json({ data: res.locals.movie });
}

/**
 * lists all reviews
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function listReviews(req, res, next) {
  try {
    const reviews = await moviesService.listReviews(req.params.movieId);
    const mappedReviews = reviews.map((review, index) => {
      const {
        review_id,
        content,
        score,
        critic_id,
        movie_id,
        surname,
        preferred_name,
        organization_name,
      } = review;
      return {
        review_id,
        content,
        score,
        critic_id,
        movie_id,
        critic: { surname, critic_id, preferred_name, organization_name },
      };
    });
    res.json({ data: mappedReviews });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  list,
  read: [ifMovieExists, read],
  listReviews: [ifMovieExists, listReviews],
  ifMovieExists,
};