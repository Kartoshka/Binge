var likedMoviesListName = 'LikedMovies';
var toWatchMoviesListName = 'ToWatchMovies';
var emptyFunc = function() {};

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

function addMovieToList(id, rating, listName, callback) {
    if (!isNaN(id) && id >= 0) {
        var movieList = getMovieList(listName);
        var index = indexOfID(movieList, id);

        if (index == -1) {
            getMovieInfo(id, function(data) {
                if (!data.status_code) {
                    movieList.push({
                        id: data.id,
                        name: data.name,
                        overview: data.overview,
                        poster_path: data.poster_path,
                        genre_ids: data.genres.map(function(genre) {
                            return genre.id;
                        }),
                        first_air_date: data.first_air_date,
                        origin_country: data.origin_country,
                        original_language: data.original_language,
                        popularity: data.popularity,
                        vote_average: data.vote_average,
                        app_user_rating: rating
                    });
                    saveMovieList(movieList, listName);
                    if (callback) {
                        callback(id);
                    }
                }
            });
        } else {
            movieList[index].app_user_rating = rating;
        }
        saveMovieList(movieList, listName);
        if (callback) {
            callback(id);
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
    return indexOfID(movieList, id);
}

function getMovieInList(id, listName) {
    var movies = getMovieList(listName);
    for (var i = movies.length - 1; i >= 0; i--) {
        if (movies[i].id == id) {
            return movies[i];
        }
    };
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

function indexOfID(array, id) {
    for (var i = array.length - 1; i >= 0; i--) {
        if (array[i].id == id) {
            return i;
        }
    };

    return -1;
}
