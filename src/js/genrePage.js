import {fetchData, fetchNextPageData } from "./fetchData.js"
import { createCards} from "./search.js";
import { getMoviesFromStorage } from "./localStorage.js";
import { getIdFromWindowLocation } from "./getCheckUrlData.js";
import { pathForSearchByGenre } from "./commonVars.js";
// import { filterMovieData } from "./moviePage/getMovieData.js";
// import {showErrorMsg} from "./moviePage/loadMoviePage.js";


export const movie_container = document.querySelector(".movies-container");
const mainTitle = document.querySelector(".main-title");
const loadMoreButton = document.getElementById("load-more");
let currentPage;
let totalPage;
let genreId;

export async function mainGenrePageFunction() {
  genreId=Number(getIdFromWindowLocation());
  const movieArr = getMoviesFromStorage("movies");
  let moviesByGenre;
  // loadMoreButton.style.display = "block";
  if(movieArr && movieArr.length >0){
    moviesByGenre = filterMoviesArr(movieArr);
  }else{
    moviesByGenre = await fetchData(`/search/genre?genre_id=${genreId}`)
  }
  mainTitle.textContent= moviesByGenre.genre_name;
  console.log(movieArr);
  console.log(moviesByGenre);
if(
  !moviesByGenre || !moviesByGenre.results || moviesByGenre.results.length <1
){
  // showErrorMsg();
  const errorElem = document.querySelector(".error-msg");
  errorElem.style.display = "block";
  movie_container.style.display = "none";
  return;
}

createCards(moviesByGenre.results, movie_container);
currentPage = moviesByGenre.page;
totalPage = moviesByGenre.total_pages;

const check = isLastPage(moviesByGenre);
enableDisableBtn(loadMoreButton, check);
}

export function filterMoviesArr(movieArr){
  if(movieArr && movieArr.length>0) {
    const filteredArr = movieArr.filter((movie)=>{
      return movie.genre_id === Number(getIdFromWindowLocation());
    });
    return filteredArr[0];
  }
}


function isLastPage(){
  return currentPage < totalPage;
}

function enableDisableBtn (btn, check){
  if (check){
    btn.style.display = "block";
    return;
  }
  btn.style.display = "none";
}

export async function loadMoreHandler(){
  const pathAndSearchParams = `${pathForSearchByGenre}?genre_id=${genreId}`;
  let newResults = await fetchNextPageData( pathAndSearchParams, currentPage+1);

  if(!newResults || newResults>0) {
    const errorElem = document.querySelector(".error-msg");
    errorElem.style.display = "block";
    movie_container.style.display = "none";
    // showErrorMsg();
    return;
  }
 createCards(newResults, movie_container);
currentPage+=1;
enableDisableBtn(loadMoreButton, isLastPage());
}


