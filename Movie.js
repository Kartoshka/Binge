function Movie(id, container) {
    this.id = id;
    this.container = container;

    var self = this;

    getMovieInfo(id, function (data) {
        self.data = data;
        console.log(data);

        self.element = $('<div>').addClass('movie');
        self.image = $('<img>').appendTo(self.element).attr('src', "http://image.tmdb.org/t/p/w1000" + data.poster_path).addClass('movie-thumbnail').attr('title', data.name);
        // self.title = $('<h4>').appendTo(self.element).text(data.name).addClass('movie-title');

        self.container.append(self.element);
    });
}
