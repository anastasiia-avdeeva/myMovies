export function setUpMovieCastBtn() {
  const castFullMovieBtn = document.getElementById("castMovieBtn");
  const castPart = document.getElementById("castAdditionalPart");
  const castHiddenClassName = "full-movie__feature-value--hidden";

  function toggleCastElementLen() {
    castPart.classList.toggle(castHiddenClassName);

    if (castPart.classList.contains(castHiddenClassName)) {
      castFullMovieBtn.textContent = "see more...";
    } else {
      castFullMovieBtn.textContent = "see less";
    }
  }
  if (castFullMovieBtn)
    castFullMovieBtn.addEventListener("click", toggleCastElementLen);
}
