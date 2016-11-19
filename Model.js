function getMovieInfo(id, callback){
	$.getJSON( "https://api.themoviedb.org/3/tv/"+id+"?api_key=6bca0b74270a3299673d934c1bb11b4d&language=en-US", callback);
}

function getSuggestions(id,callback){
	$.getJSON( "https://api.themoviedb.org/3/tv/"+id+"/similar?api_key=<<api_key>>&language=en-US", callback);
}

function addLikedMovie(id){
	var likedMovies = getLikedMovies();

	if(likedMovies.indexOf(id)==-1){
		likedMovies.add(id);
	}
	localStorage.setItem('LikedMovies',JSON.stringify(likedMovies));
}

function movieIsLiked(id){
	var likedMovies = getLikedMovies();
	return likedMovies.indexOf(id)!=-1;
}

function getLikedMovies(){
	if (localStorage.getItem("LikedMovies") === null) {
		var likedMovies =[];
		localStorage.setItem('LikedMovies',JSON.stringify(likedMovies));
	}

	return JSON.parse(localStorage.getItem('LikedMovies'))
}


