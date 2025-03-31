import {
  classesControlRemBar,
  savedMoviesClss,
} from "./savedMovies/savedMoviesVars";
import { handleRemoveMovieClick } from "./savedMovies/removeBtnHandler";
import { handleControlBarClick } from "./controlBar/controlBarBtnHandlers";
import { classesBanner } from "./moviePage/movieVars";
import { classesControlBar } from "../js/controlBar/controlBarVars";
import { moveToPage } from "./moveToPage";

export function movieCardClickHandler(evt) {
  if (evt.target.closest("." + classesControlRemBar.controlBarElem[1])) {
    handleRemoveMovieClick(evt);
  } else if (evt.target.closest("." + classesControlBar.controlBar)) {
    handleControlBarClick(evt);
  } else if (evt.target.closest("." + savedMoviesClss.movieCard)) {
    moveToPage(evt.target.closest(".movie-card"), "movie");
  } else if (evt.target.closest("." + classesBanner.banner)) {
    moveToPage(evt.target.closest("." + classesBanner.banner), "movie");
  }
}
