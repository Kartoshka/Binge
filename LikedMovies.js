function saveLikedMovies(likedMovies, callback) {
    saveMovieList(likedMovies, likedMoviesListName, callback);
}

function addLikedMovie(id, rating,callback) {
    addMovieToList(id, rating, likedMoviesListName, callback);
}

function removeLikedMovie(id, callback) {
    removeMovieFromList(id, likedMoviesListName, callback);
}

function clearLikedMovies(callback) {
    clearMovieList(likedMoviesListName, callback);
}

function movieIsLiked(id) {
    return movieInList(likedMoviesListName);
}

function saveLikedMovies(likedMovies) {
    saveMovieList(likedMoviesListName);
}

function getLikedMovies() {
    return getMovieList(likedMoviesListName);
}

function getLikedMoviesByScore(){
	var likedMovies = getMovieList(likedMoviesListName);
	likedMovies.sort(compareRatings);
	return likedMovies;
}

function compareRatings(a,b)
{
	return a.app_user_rating - b.app_user_rating;
}

function retrieveLikedMovies(container) {
    container.append(makeUL(getLikedMovies()));

}
