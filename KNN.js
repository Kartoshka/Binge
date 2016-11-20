function KNN(numRecommendations, numPages, fraction) {

    this.n = numRecommendations;
    this.fraction = fraction;
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

        // genres
        var commonGenres = 0;
        for (var i = 0; i < movie1.genre_ids.length; i++) {
            for (var j = 0; j < movie2.genre_ids.length; j++) {
                if (movie1.genre_ids[i] === movie2.genre_ids[j])
                    commonGenres++;
            }
        }
        tempDist = (Math.max(movie1.genre_ids.length, movie2.genre_ids.length) - commonGenres);
        distance += tempDist * tempDist * 20;

        // origin country
        if (movie1.origin_country !== movie2.origin_country)
            distance += 10;

        // original language
        if (movie1.original_language !== movie2.original_language)
            distance += 10;

        // first air date
        tempDist = Math.abs(parseFloat(movie1.first_air_date) - parseFloat(movie2.first_air_date));
        if (isNaN(parseFloat(movie1.first_air_date)) || isNaN(parseFloat(movie2.first_air_date)))
            tempDist = 10;
        distance += tempDist * tempDist;

        // popularity
        tempDist = Math.abs(parseFloat(movie1.popularity) - parseFloat(movie2.popularity));
        distance += tempDist * tempDist;

        // vote average
        tempDist = Math.abs(parseFloat(movie1.vote_average) - parseFloat(movie2.vote_average));
        distance += tempDist * tempDist;

        return Math.sqrt(distance);
    }



    function getKNNRating(movie, likedMovies, k) {

        k = Math.min(likedMovies.length, k);
        var distance = 0
        var distances = [];
        var ratings = []
        for (var i = 0; i < likedMovies.length; i++) {
            distance = getDistance(likedMovies[i], movie);
            var j = 0;
            while (distances[j] != undefined && distance > distances[j]) {
                j++;
            }
            distances.splice(j, 0, distance);
            ratings.splice(j, 0, likedMovies[i].app_user_rating);
        }
        distance = 0;
        for (var j = 0; j < k; j++) {
            distance += 1 / distances[j] * ratings[j];
        }
        return distance / k;
    }



    // returns the n best recommendations from the pool, in order of relevance
    this.updateRecommendations = function () {

        var likedMovies = getLikedMovies();
        if (likedMovies.length == 0) {
            this.recommendations = this.pool.slice(0, this.n);

        } else {

            for (var i = 0; i < this.pool.length; i++) {

                var rating;
                if (movieIsToWatch(this.pool[i].id) !== -1 || movieIsLiked(this.pool[i].id) !== -1) {
                    rating = -Infinity;
                } else {
                    rating = getKNNRating(this.pool[i], likedMovies, Math.ceil(this.fraction * likedMovies.length));
                }
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
