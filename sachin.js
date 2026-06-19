let movies =
JSON.parse(localStorage.getItem("movies")) || [];

let currentFilter = "all";

toggleSeriesFields();
renderMovies();

function toggleSeriesFields(){

let type =
document.getElementById("type").value;

let seriesFields =
document.getElementById("seriesFields");

if(type === "Web Series"){
seriesFields.style.display = "block";
}
else{
seriesFields.style.display = "none";
}

}

function generateSeasonInputs(){

let seasons =
parseInt(
document.getElementById("seasons").value
) || 0;

let container =
document.getElementById(
"seasonEpisodesContainer"
);

container.innerHTML = "";

for(let i=1;i<=seasons;i++){

container.innerHTML += `

<input
type="number"
class="seasonEpisode"
placeholder="Season ${i} Episodes">

`;

}

}

function addMovie(){

let title =
document.getElementById("title").value.trim();

let type =
document.getElementById("type").value;

let rating =
document.getElementById("rating").value;

let status =
document.getElementById("status").value;

let image =
document.getElementById("image").value;

let seasons =
document.getElementById("seasons").value;

let episodeInputs =
document.querySelectorAll(".seasonEpisode");

let seasonEpisodes = [];

episodeInputs.forEach((input,index)=>{

seasonEpisodes.push({
season:index+1,
episodes:input.value || 0
});

});

if(title===""){
alert("Enter Movie / Series Name");
return;
}

movies.push({

title,
type,
rating,
status,
image,
seasons,
seasonEpisodes

});

movies.sort((a,b)=>
a.title.localeCompare(b.title)
);

saveData();
renderMovies();

document.getElementById("title").value="";
document.getElementById("rating").value="";
document.getElementById("image").value="";
document.getElementById("seasons").value="";

document.getElementById(
"seasonEpisodesContainer"
).innerHTML="";

}

function saveData(){

localStorage.setItem(
"movies",
JSON.stringify(movies)
);

}

function filterContent(type){

currentFilter = type;

renderMovies();

}

function toggleDetails(id){

let details =
document.getElementById(id);

if(details.style.display==="block"){
details.style.display="none";
}
else{
details.style.display="block";
}

}

function renderMovies(){

let movieList =
document.getElementById("movieList");

movieList.innerHTML="";

movies.forEach((movie,index)=>{

if(
currentFilter!=="all" &&
movie.type!==currentFilter
){
return;
}

let seasonHTML = "";

if(movie.type==="Web Series"){

movie.seasonEpisodes.forEach(item=>{

seasonHTML += `

<p>
📺 Season ${item.season}
- ${item.episodes} Episodes
</p>

`;

});

}

movieList.innerHTML += `

<div class="card">

<a
target="_blank"
href="https://www.google.com/search?q=${encodeURIComponent(movie.title)}">

<img src="${
movie.image ||
'https://via.placeholder.com/400x600?text=No+Poster'
}">

</a>

<div class="content">

<div class="movie-title">

<a
target="_blank"
href="https://www.google.com/search?q=${encodeURIComponent(movie.title)}">

${movie.title}

</a>

</div>

<p class="rating">
⭐ ${movie.rating}/10
</p>

<p>
${movie.status}
</p>

<p>
🎞️ ${movie.type}
</p>

<button
onclick="toggleDetails('details${index}')">

More Details

</button>

<div
id="details${index}"
style="display:none;">

${
movie.type==="Web Series"
?

`
<p>
📚 Total Seasons:
${movie.seasons}
</p>

${seasonHTML}
`

:

`
<p>
🎬 Movie
</p>
`
}

</div>

<button
class="delete-btn"
onclick="deleteMovie(${index})">

Delete

</button>

</div>

</div>

`;

});

}

function deleteMovie(index){

movies.splice(index,1);

saveData();

renderMovies();

}

function searchMovies(){

let search =
document.getElementById("search")
.value
.toLowerCase();

let cards =
document.querySelectorAll(".card");

cards.forEach(card=>{

let title =
card.querySelector(".movie-title")
.innerText
.toLowerCase();

if(title.includes(search)){
card.style.display="block";
}
else{
card.style.display="none";
}

});

}