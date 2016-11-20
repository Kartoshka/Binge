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

function retrieveLikedMovies(container) {
    container.append(makeUL(getLikedMovies()));

}