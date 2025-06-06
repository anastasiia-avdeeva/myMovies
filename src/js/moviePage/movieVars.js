export const movieContainer = document.getElementById("movie");

export const movieBlockName = "full-movie__";

export const fullPropertylist = [
  "id",
  "title",
  "tagline",
  "backdrop_path",
  "poster_path",
  "genres", // (array)
  "homepage",
  "origin_country", // (array)
  "spoken_languages", //(array of objects, where we need english_name)
  "overview",
  "release_date",
  "vote_average",
  "runtime",
  "cast", // (array)
  "directors", // (array)
];

export const shortPropertyList = [
  "id",
  "title",
  "poster_path",
  "overview",
  "release_date",
];

export const lstClasses = {
  lst: [`${movieBlockName}lst`, `${movieBlockName}feature-value`],
  items: `${movieBlockName}lst-item`,
  genreItems: [`${movieBlockName}lst-item`, `${movieBlockName}genre`],
};

export const clssInfo = {
  info: `${movieBlockName}info`,
  content: `${movieBlockName}content`,
  facts: `${movieBlockName}facts`,
  feature: `${movieBlockName}feature`,
  featureName: `${movieBlockName}feature-name`,
  featureVal: `${movieBlockName}feature-value`,
  director: `${movieBlockName}director`,
  cast: `${movieBlockName}cast`,
  shownCast: `${movieBlockName}feature-value--shown`,
  hiddenCast: `${movieBlockName}feature-value--hidden`,
  castBtn: `${movieBlockName}cast-btn`,
  description: `${movieBlockName}description`,
  genres: `${movieBlockName}genres`,
  genre: `${movieBlockName}genre`,
  links: `${movieBlockName}links`,
  link: `${movieBlockName}link`,
  linkIcon: `${movieBlockName}link-icon`,
  year: `${movieBlockName}year`,
  country: `${movieBlockName}country`,
  language: `${movieBlockName}language`,
  runtime: `${movieBlockName}runtime`,
  rating: `${movieBlockName}rating`,
};

export const castIds = {
  btn: "castBtn",
  hidden: "castHidden",
};
