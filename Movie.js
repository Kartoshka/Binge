function Movie(id, container,data) {
    this.id = id;
    this.container = container;

    var self = this;

    function createNewMovie(data) {
        self.data = data;
        self.element = $('<div>').addClass('movie');
        self.image = $('<img>').appendTo(self.element).attr('src', "http://image.tmdb.org/t/p/w1000" + data.poster_path).addClass('movie-thumbnail').attr('title', data.name);
        // self.title = $('<h4>').appendTo(self.element).text(data.name).addClass('movie-title');

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

