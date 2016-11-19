function getDistance(movie1, movie2) {
    var distance = 0,
        tempDist = 0;

    // genres
    var commonGenres = 1;
    for (var i = 0; i < movie1.genre_ids.length; i++) {
        for (var j = 0; j < movie2.genre_ids.length; j++) {
            if (movie1.genre_ids[i] === movie2.genre_ids[j])
                commonGenres++;
        }
    }
    tempDist = 20 / commonGenres;
    distance += tempDist * tempDist;

    // other fields
    var fields = ["first_air_date", "popularity", "vote_average"];
    for (var i = 0; i < fields.length; i++) {
        tempDist = Math.abs(parseFloat(movie1[fields[i]]) - parseFloat(movie2[fields[i]]));
        distance += tempDist * tempDist;
    }

    distance = Math.sqrt(distance);
    return distance;
}

function getCloseness(movie, likedMovies) {

    var closeness = 0;
    for (var i = 0; i < likedMovies.length; i++) {
        closeness += 1 / getDistance(likedMovies[i], movie);
    }
    return closeness;
}

// returns the n best recommendations from moviePool, in order of relevance
function getRecommended(moviePool, n) {

    var likedMovies = getLikedMovies();
    if (!likedMovies) {
        return moviePool.slice(0, n);
    }

    var recommendations = [];
    var ratings = [];
    for (var i = 0; i < moviePool.length; i++) {
        var rating = getCloseness(moviePool[i], likedMovies);
        var j = 0;
        while (j < Math.min(ratings.length, n) && ratings[j] > rating) {
            j++;
        }
        recommendations.splice(j, 0, moviePool[i]);
        ratings.splice(j, 0, rating);
    }

    return recommendations.slice(0, n);
}
