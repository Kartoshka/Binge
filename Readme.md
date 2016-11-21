![Binge](Binge.png?raw=true)

## What is it?
It's a bird, it's a plane, it's Binge!

Binge is a TV show suggestion engine. It allows you to rate shows, get suggestions and save them for later.

Try it at https://kartoshka.github.io/Binge/ or see the `Getting started` section below.

Created by team Marmalade: Jérôme Parent-Lévesque ([@jeromepl](https://github.com/jeromepl)), Mathieu Bolduc ([@mathieubolduc](https://github.com/mathieubolduc)) and Elie Harfouche ([@Kartoshka](https://github.com/Kartoshka)).

You can read more about our design process [here](https://github.com/anthony-ubah/Senior_Team4/blob/master/design-process.md).

![Screenshot](Capture.PNG?raw=true)

## Why Binge?
Easy to use: Rate a few movies and get suggestions instantly.

Reminder: Do you forget easily? Binge remembers your watchlist even if you do not.

Personalized: Are you tired of Netflix telling you to watch the same thing over and over again? Binge uses its own machine learning suggestion algorithm.

## Getting started
Access Binge [here](https://kartoshka.github.io/Binge/), or open `index.html` in Chrome, Firefox or Safari and even on mobile devices!

Use the **Search** tab to find shows you've watched, then click the stars to rate them.

You can see and edit the movies you've rated in the **Rated** tab.

In the **Recommended** tab you will find suggestions based on your rated movies.

If a recommended movie interests you, click "+ WatchList" to add it to the **WatchList** tab.

Binge will remember your ratings and watchlist for your next Netflix (and chill?) session.

## How it works
Binge uses [TheMovieDb API](https://www.themoviedb.org/) to get TV show data. It extracts show genres, release dates, country of origin, original languages and popularity, then runs a modified KNN algorithm to give you personalized suggestions.
It also uses the browser's localStorage to store users' ratings and WatchList.

The Binge logo was made using [Emblemmatic](https://emblemmatic.org/markmaker/#/).

The icons used are from [Iconic](https://useiconic.com/).
