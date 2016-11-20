function Movie(id, container, data) {
    this.id = id;
    this.container = container;

    var starsContainer;

    this.rating = (data && typeof data.app_user_rating !== 'undefined' ? data.app_user_rating : -2);

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

        self.popup = $('<div>').appendTo(self.element).addClass('movie-popup').hide();
        $('<h4>').appendTo(self.popup).text(data.name).addClass('movie-title');
        $('<p>').appendTo(self.popup).text(data.overview).addClass('movie-overview');
        starsContainer = $('<div>').appendTo(self.popup).addClass('stars-container');

        var starNb = 0;
        if (self.rating > -2) {
            starNb = self.rating * 2 + 3;
        }
        for (var i = 1; i <= 5; i++) {
            var starImg = $('<img>').appendTo(starsContainer).attr('title', 'Rate this show').addClass('star').data('value', i);

            if (i <= starNb) {
                starImg.attr('src', "star-md.png");
            }
            else {
                starImg.attr('src', "star-empty-md.png");
            }
        }

        // EVENTS

        $(self.image).on('click', function (e) {
            if (!self.popup.is(':visible')) {
                $('.movie-popup').hide(300);
                self.popup.show(500);
            }
            else {
                $('.movie-popup').hide(300);
            }
        });

        $(starsContainer.children('.star')).on('mouseenter', function(e) {
            var starValue = $(this).data('value');
            starsContainer.children('.star').each(function(i, star) {
                if ($(star).data('value') <= starValue) {
                    $(star).attr('src', "star-md.png");
                }
                else {
                    $(star).attr('src', "star-empty-md.png");
                }
            });
        });
        $(starsContainer.children('.star')).on('mouseleave', {context: self}, function(e) {
            var starNb = 0;
            if (e.data.context.rating > -2) {
                starNb = e.data.context.rating * 2 + 3;
            }
            starsContainer.children('.star').each(function(i, star) {
                if (i + 1 <= starNb) {
                    $(star).attr('src', "star-md.png");
                }
                else {
                    $(star).attr('src', "star-empty-md.png");
                }
            });
        });
        $(starsContainer.children('.star')).on('click', function(e) {
            var rating = ($(this).data('value') - 3) / 2.0; // Rating is between -1 and 1
            addLikedMovie(data.id, rating);
        })

        $('<button>').appendTo(starsContainer).text("+ WatchList").attr('title', 'Add to WatchList').addClass('add-to-watchlist');

        self.container.append(self.element);

    }

    if(data)
    {
        self.data = data;
        createNewMovie(data);
    }
    else
    {
        getMovieInfo(id, createNewMovie);
    }
}

