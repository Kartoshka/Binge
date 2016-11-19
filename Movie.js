function Movie(id, container,data) {
    this.id = id;
    this.container = container;

    var self = this;

    function createNewMovie(data) {
        self.data = data;
        self.element = $('<div>').addClass('movie');
        if(data.poster_path){
            self.image = $('<img>').appendTo(self.element).attr('src', "http://image.tmdb.org/t/p/w1000" + data.poster_path).addClass('movie-thumbnail').attr('title', data.id); //.attr('title', data.name);
        }
        else
        {
            self.image = $('<div>').appendTo(self.element).addClass('movie-thumbnail').addClass('no-poster');
            self.title = $('<h4>').appendTo(self.image).text(data.name).addClass('movie-title');

        }

        self.container.append(self.element);
    }

    if(data)
    {
        createNewMovie(data);
    }
    else
    {
        getMovieInfo(id, createNewMovie);
    }
}

