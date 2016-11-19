function KNN(numRecommendations, numPages) {

    this.n = numRecommendations;
    this.numPages = numPages;
    this.recommendations = [];
    this.ratings = [];

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
        tempDist = 100 / commonGenres;
        distance += tempDist;

        // other fields

        tempDist = Math.abs(parseFloat(movie1.first_air_date) - parseFloat(movie2.first_air_date));
        distance += tempDist * tempDist;

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
    this.updateRecommendations = function (moviePool) {

        var likedMovies = getLikedMovies();
        if (!likedMovies) {
            return moviePool.slice(0, this.n);
        }

        for (var i = 0; i < moviePool.length; i++) {
            var rating = getCloseness(moviePool[i], likedMovies);
            var j = 0;
            while (j < Math.min(this.ratings.length, this.n) && this.ratings[j] > rating) {
                j++;
            }
            this.recommendations.splice(j, 0, moviePool[i]);
            this.ratings.splice(j, 0, rating);
        }

        this.recommendations = this.recommendations.slice(0, this.n);
        this.ratings = this.ratings.slice(0, this.n);
    }
}
