function KNN(numRecommendations, numPages) {

    this.n = numRecommendations;
    this.numPages = numPages;
    this.recommendations = [];
    this.ratings = [];

    this.pool = [];

    var self = this;

    function appendToPool(newPool) {
        if (getLikedMovies.length > 0) {
            var oldPool = self.pool;
            self.pool = newPool.results;
            updateAndShowRecommendations(false);
            self.pool = oldPool.concat(newPool.results);
        } else {
            self.pool = self.pool.concat(newPool.results);
            updateAndShowRecommendations(true);
        }
    }

    for (var i = 1; i <= this.numPages; i++) {
        $.getJSON("https://api.themoviedb.org/3/discover/tv?api_key=6bca0b74270a3299673d934c1bb11b4d&language=en-US&sort_by=popularity.desc&page=" + i + "&timezone=America/New_York&include_null_first_air_dates=false", appendToPool);
    }



    function getDistance(movie1, movie2) {
        var distance = 0,
            tempDist = 0;

        // duplicate protection
        if (movie1.id === movie2.id) {
            return Infinity;
        }

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

        // first air date
        tempDist = Math.abs(parseFloat(movie1.first_air_date) - parseFloat(movie2.first_air_date));
        if (isNaN(parseFloat(movie1.first_air_date)) || isNaN(parseFloat(movie2.first_air_date)))
            tempDist = 10;
        distance += tempDist;

        // popularity
        tempDist = Math.abs(parseFloat(movie1.popularity) - parseFloat(movie2.popularity)) * 0.5;
        distance += tempDist * tempDist;

        // vote average
        tempDist = Math.abs(parseFloat(movie1.vote_average) - parseFloat(movie2.vote_average)) * 0.8;
        distance += tempDist * tempDist;

        return distance;
    }

    function getCloseness(movie, likedMovies) {

        var closeness = 0;
        for (var i = 0; i < likedMovies.length; i++) {
            closeness += getDistance(likedMovies[i], movie);
        }
        return 1 / Math.sqrt(closeness);
    }

    // returns the n best recommendations from the pool, in order of relevance
    this.updateRecommendations = function () {

        var likedMovies = getLikedMovies();
        if (likedMovies.length == 0) {
            this.recommendations = this.pool.slice(0, this.n);

        } else {

            for (var i = 0; i < this.pool.length; i++) {
                var rating = getCloseness(this.pool[i], likedMovies);
                var j = 0;
                while (j < Math.min(this.ratings.length, this.n) && this.ratings[j] > rating) {
                    j++;
                }
                this.recommendations.splice(j, 0, this.pool[i]);
                this.ratings.splice(j, 0, rating);
            }

            this.recommendations = this.recommendations.slice(0, this.n);
            this.ratings = this.ratings.slice(0, this.n);
        }
    }
}
