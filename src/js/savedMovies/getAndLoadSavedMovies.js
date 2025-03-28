import { basePosterUrl } from "../commonVars";
import {
  createElementWithProps,
  createLinkWithIcon,
  createImgElem,
} from "../elementCreation";
import {
  savedMoviesClss,
  moviesContainerClass,
  infoMsgClass,
  numOfMovies,
} from "./savedMoviesVars";
import { tmbdUrl, iconPaths } from "../commonVars";
import { getMoviesFromStorage } from "../localStorage";
import { createControlRemBar } from "./createRemBtn";

const movieCards = document.querySelector("." + moviesContainerClass);

export function loadSavedMovies(storageProperty) {
  const moviesArr = getMoviesFromStorage(storageProperty);
  numOfMovies.num = moviesArr.length;
  appendMovies(moviesArr, storageProperty);
}

function appendMovies(movieArr, storageProperty) {
  if (movieArr.length === 0) {
    showMsgLstIsEmpty(movieCards);
    return;
  }
  movieArr.forEach((movieObj) =>
    movieCards.append(createMovieElem(movieObj, storageProperty))
  );
}

export function showMsgLstIsEmpty(movieCards) {
  const msg = createElementWithProps(
    "p",
    infoMsgClass,
    false,
    "Nothing on the list"
  );
  movieCards.append(msg);
}

function createMovieElem(movieData, storageProperty) {
  const movieCard = createElementWithProps("div", savedMoviesClss.movieCard);
  movieCard.dataset.id = movieData.id;

  const closeBtnContainer = createControlRemBar(storageProperty);
  const posterElem = createPosterElem(movieData.poster_path);
  const titleElem = createTitleElem(movieData.title);
  movieCard.append(closeBtnContainer, posterElem, titleElem);

  if (movieData.release_date) {
    const yearElem = createParElem(
      savedMoviesClss.year,
      movieData.release_date.slice(0, 4)
    );
    movieCard.append(yearElem);
  }

  if (movieData.overview) {
    const descriptionElem = createParElem(
      savedMoviesClss.overview,
      movieData.overview
    );
    movieCard.append(descriptionElem);
  }

  const tmbdLinkElem = createTMBDlinkElem(movieData.id);
  movieCard.append(tmbdLinkElem);

  return movieCard;
}

function createPosterElem(posterPath) {
  const posterContainer = createElementWithProps(
    "div",
    savedMoviesClss.posterCont
  );
  const posterElem = createImgElem(
    savedMoviesClss.poster,
    posterPath
      ? basePosterUrl + posterPath
      : "./src/assets/images/no-Image-Placeholder.svg",
    "movie poster"
  );
  posterContainer.append(posterElem);
  return posterContainer;
}

function createTitleElem(title) {
  return createElementWithProps(
    "h2",
    savedMoviesClss.title,
    false,
    title || "Unknown"
  );
}

function createParElem(className, text) {
  return createElementWithProps("p", className, false, text);
}

function createTMBDlinkElem(movie_id) {
  const container = createElementWithProps("div", savedMoviesClss.linkCont);

  const linkElem = createLinkWithIcon(
    savedMoviesClss.link,
    savedMoviesClss.linkIcon,
    tmbdUrl + movie_id,
    iconPaths.TMBDIcon,
    "TMBD icon"
  );

  container.append(linkElem);
  return container;
}
