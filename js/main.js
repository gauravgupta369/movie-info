/*
$(document).ready(function() {
	alert("1");
});
*/
$(document).ready(() => {
	$('#searchForm').on('submit', (e) => {
		var searchText = $('#searchText').val();
		getMovies(searchText);
		e.preventDefault();
	})
});

function getMovies(searchText) {
	axios.get('http://www.omdbapi.com/?s=' + searchText)
	.then((response) => {
		console.log(response);
		var movies = response.data.Search;
		var output = '';
		$.each(movies, (index, movie) => {
			output += `
				<div class="col-md-3">
					<div class="well text-center">
						<img src="${movie.Poster}" />
						<h4 class="text-center">${movie.Title}</h4>
						<a onclick="movieSelected('${movie.imdbID}')" class="btn btn-danger" href="#">More Info</a>
					</div>
				</div>
			`;
		})
		$('#movies').html(output);
	})
	.catch((err) => {
		console.log(err);
	});
}

function movieSelected(id) {
	sessionStorage.setItem('movieId' , id);
	window.location = 'movie.html';
	return false;
}

function getMovie() {
	var id = sessionStorage.getItem('movieId');
	axios.get('http://www.omdbapi.com/?i=' + id)
	.then((response) => {
		console.log(response);
		var movie = response.data;
		output = `
			<div class="row">
				<div class="col-md-4">
					<img src="${movie.Poster}" class="thumbnale" />
				</div>
				<div class="col-md-8">
					<h2>${movie.Title}</h2>
					<ul class="list-group">
						<li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
						<li class="list-group-item"><strong>Awards</strong> ${movie.Awards}</li>
						<li class="list-group-item"><strong>Director</strong> ${movie.Director}</li>
						<li class="list-group-item"><strong>Genre</strong> ${movie.Genre}</li>
						<li class="list-group-item"><strong>Language</strong> ${movie.Language}</li>
						<li class="list-group-item"><strong>Country</strong> ${movie.Country}</li>
						<li class="list-group-item"><strong>Released</strong> ${movie.Released}</li>
						<li class="list-group-item"><strong>Year</strong> ${movie.Year}</li>
					</ul>
				</div>
			</div>
			<div class="row">
				<div class="">
					<h3 class="custom-spacing">Plot </h3> 
					<p class="custom-spacing">${movie.Plot}</p>
					<hr />
					<a href="#" class="btn btn-danger custom-spacing">View</a>
					<a href="index.html" class="btn btn-danger custom-spacing">Go back to search</a>
				</div>
			</div>
		`;
		$('#movie').html(output);
	})
	.catch((err) => {
		console.log(err);
	});
}