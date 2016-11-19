function KNNClassifier() {

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
        tempDist = 10 / commonGenres;
        distance += tempDist * tempDist;

        // date
        tempDist = Math.abs(movie1.first_air_date - movie2.first_air_date);
        distance += tempDist * tempDist;

        // popularity
        tempDist = Math.abs(movie1.popularity - movie2.popularity);
        distance += tempDist * tempDist;

        // vote
        tempDist = Math.abs(movie1.vote_average - movie2.vote_average);
        distance += tempDist * tempDist;

        distance = Math.sqrt(distance);
        return distance;
    }

    function getTotalDistance(movie) {

    }


}
