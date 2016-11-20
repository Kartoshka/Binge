var likedMoviesListName = 'LikedMovies';
var dislikedMoviesListName = 'DislikedMovies';
var emptyFunc = function () {};

function getMovieInfo(id, callback) {
    $.getJSON("https://api.themoviedb.org/3/tv/" + id + "?api_key=6bca0b74270a3299673d934c1bb11b4d&language=en-US", callback);
}

function getSuggestions(id, callback) {
    $.getJSON("https://api.themoviedb.org/3/tv/" + id + "/similar?api_key=6bca0b74270a3299673d934c1bb11b4&language=en-US", callback);
}

var results;

function getMovies(name, callback) {
    if (results) {
        results.abort();
    }
    results = $.getJSON("https://api.themoviedb.org/3/search/tv?api_key=6bca0b74270a3299673d934c1bb11b4d&language=en-US&query=" + name, callback);
}

function populateRecommended(allMovies, evaluate) {
    for (var i = allMovies.length - 1; i >= 0; i--) {
        if (evaluate(allMovies[i])) {
            new Movie(allMovies[i].id, $('#recommendedList'));
        }
    };
}

function addMovieToList(id, rating) {
    if (rating <= 0) {
        addMovieToList(id, rating, "dislikedMovies");
    } else {
        addMovieToList(id, rating, "likedMovies");
    }
}

function addMovieToList(id, rating, listName, callback) {
    if (!isNaN(id) && id >= 0) {
        var movieList = getMovieList(listName);
        var index = indexOfID(movieList, id);

        if (index == -1) {
            getMovieInfo(id, function (data) {
                if (!data.status_code) {
                    movieList.push({
                        id: data.id,
                        genre_ids: data.genres.map(function (genre) {
                            return genre.id;
                        }),
                        first_air_date: data.first_air_date,
                        origin_country: data.origin_country,
                        popularity: data.popularity,
                        vote_average: data.vote_average,
                        app_user_rating: rating
                    });
                    saveMovieList(movieList, listName);
                    console.log("Saved list");
                    if (callback)
                        callback(id);
                }
            });
        }

    }
}

function removeMovieFromList(id, listName, callback) {
    var rating = 1;
    if (!isNaN(id) && id >= 0) {
        var movieList = getMovieList(listName);
        var index = indexOfID(movieList, id);

        if (index != -1) {
            movieList.splice(index, 1);
        }
        saveMovieList(movieList, listName, callback);
    }
}

function getMovieList(listName) {
    if (localStorage.getItem(listName) === null) {
        clearMovieList(listName);
    }
    return JSON.parse(localStorage.getItem(listName));
}

function saveMovieList(movieList, listName, callback) {
    console.log(3);

    callback = callback || emptyFunc;

    localStorage.setItem(listName, JSON.stringify(movieList));
    callback();
}

function clearMovieList(listName, callback) {
    var movieList = [];
    saveMovieList(movieList, listName, callback);
}

function movieInList(id, listName) {
    var movieList = getMovieList(listName);
    return indexOfID(movieList, id) != -1;
}

function saveLikedMovies(likedMovies, callback) {
    saveMovieList(likedMovies, likedMoviesListName, callback);
}

function addLikedMovie(id, callback) {
    console.log(1);
    addMovieToList(id, 1, likedMoviesListName, callback);
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


function makeUL(array) {
    // Create the list element:
    var list = document.createElement('ul');

    for (var i = 0; i < array.length; i++) {
        // Create the list item:
        var item = document.createElement('li');

        // Set its contents:
        item.appendChild(document.createTextNode(array[i].id + " " + array[i].rating));

        // Add it to the list:
        list.appendChild(item);
    }

    // Finally, return the constructed list:
    return list;
}

function retrieveLikedMovies(container) {
    container.append(makeUL(getLikedMovies()));

}

function indexOfID(array, id) {
    for (var i = array.length - 1; i >= 0; i--) {
        if (array[i].id == id) {
            return i;
        }
    };

    return -1;
}
