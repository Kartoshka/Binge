# Binge

## What is it?
It's a bird, it's a plane, it's Binge!

Binge is a TV show suggestion engine. It allows you to rate shows, get suggestions and save them for later.

## Why Binge?
Easy to use: Rate a few movies and get suggestions instantly.

Reminder: Do you forget easily? Binge remembers your watchlist even if you do not.

Personalized: Are you tired of Netflix telling you to watch the same thing over and over again? Binge uses its own show machine learning suggestion algorithm.

## Getting started
Access Binge [here](https://kartoshka.github.io/Binge/), or open `index.html` in Chrome, FireFox or Safari.

Use the **Search** tab to find shows you've watched, then click the stars to rate them.

You can see and edit the movies you've rated in the **Rated** tab.

In the **Recommended** tab you will find suggestions based on your rated movies.

If a recommended movie interests you, click "+ WatchList" to add it to the **WatchList** tab.

Binge will remember your ratings and watchlist for your next Netflix (and chill?) session.

## How it works
Binge uses themoviedb.org api to get tv show data. It extracts show genres, release dates, country of origin, original languages and popularity, then runs a slightly modified KNN algorithm to give you personalized suggestions.