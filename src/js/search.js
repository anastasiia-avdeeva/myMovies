import { classesControlBar } from "./controlBar/controlBarVars";
import { createControlBarElem } from "./controlBar/createControlBar";
import { basePosterUrl } from "./commonVars";

const movie_container = document.getElementById('movies');

function searchTitle(){
    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get("title");
    return title;
}

async function fetchMovies(title){
    try{
        const response = await fetch(`https://movies.gila.workers.dev/search/movie/byTitle?title=${title}`);
        if (!response.ok) {
            console.log("Cannot fetch data form the server");
            throw new Error("HTTP Error: " + response.status);
          }
        const data = await response.json();
        console.log(data);
        return data;
        }
    catch(error){
        movie_container.classList.add('errorMessage')
        movie_container.textContent=`${error.message} 😔 Please try again later`;
        throw error;
    }
}

function filterMoviesProps(data){
    const propsArray = [];
    data.results.forEach((item)=>{
        propsArray.push({id: item.id, title: item.title, poster_path: item.poster_path, release_date: item.release_date, overview: item.overview});
    })

    return propsArray;
}

export async function mainSearchFunction(){
    try{
        const title = searchTitle();
        if(!title) return;
    // const title_search = searchMedia(title);
        const movies = await fetchMovies(title);
        if(movies &&movies.results && movies.results.length > 0){
        const filtered_results= filterMoviesProps(movies);
        createCards(filtered_results, movie_container);
        movie_container.addEventListener("click", (evt) => { 
            
        const controlBar = evt.target.closest(
            "." + classesControlBar.controlBar
        );
        const clickOnbtns =
            controlBar &&
            controlBar.classList.contains(classesControlBar.controlBar);
        if (!clickOnbtns) {
            const movieElem = evt.target.closest(".movie-card");
            if (movieElem) { 
                const movie_id = movieElem.getAttribute("data-id");
                window.location.href = `movie.html?id=${movie_id}`;
            }
        }
        });
        } else{
            movie_container.classList.add('errorMessage');
            movie_container.textContent = "No results found 😔";
        }
    } catch(error) {
        console.error("Error in mainSearchFunction: ", error)
        movie_container.textContent = `An error occured: ${error.message}.`
    }
} 

export function createCards(arrayOfObjs, container){
    container.innerHTML='';
    if (Array.isArray(arrayOfObjs)){
    arrayOfObjs.forEach((movie)=> {
        const card = createCard(movie);
        container.appendChild(card);
    });
}
}


export function createCard(movie){
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');
    movieCard.setAttribute('data-id', movie.id);

    const posterPath = movie.poster_path ? `${basePosterUrl}${movie.poster_path}` : './assets/images/no-Image-Placeholder.svg'

    movieCard.innerHTML=` <div class="poster-container"> <img class="poster" src="${posterPath}" alt ="${movie.title} Poster"> </div>
    <div class="text-container"> <h3 class="movieTitle">${movie.title}</h3>
    <p>${movie.release_date ? movie.release_date.slice(0, 4): ''}</p>
    <p class="movie-info">${movie.overview}</p> </div>
    `

    movieCard
    .querySelector(".text-container")
    .append(createControlBarElem(movie));

    return movieCard;
}



mainSearchFunction();
