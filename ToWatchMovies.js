function saveToWatchMovies(likedMovies, callback) {
    saveMovieList(likedMovies, toWatchMoviesListName, callback);
}

function addToWatchMovie(id,callback) {
	if(movieIsLiked(id)!=-1)
	{
		removeLikedMovie(id,addMovieToList(id, -2, toWatchMoviesListName, callback));
	}
	else
	{
    	addMovieToList(id, -2, toWatchMoviesListName, callback);
	}
}

function removeToWatchMovie(id, callback) {
    removeMovieFromList(id, toWatchMoviesListName, callback);
}

function clearToWatchMovies(callback) {
    clearMovieList(toWatchMoviesListName, callback);
}

function movieIsToWatch(id) {
    return movieInList(id,toWatchMoviesListName);
}

function saveToWatchMovies(likedMovies) {
    saveMovieList(toWatchMoviesListName);
}

function getToWatchMovies() {
    return getMovieList(toWatchMoviesListName);
}

function retrieveToWatchMovies(container) {
    container.append(makeUL(getToWatchMovies()));

}
