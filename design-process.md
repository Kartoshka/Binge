# Design Process Description

## Brainstorming

## The Main Sections
We then decided on which main sections (features) we wanted to have in our project:
- Search: This is where a user can search for TV shows he/she has watched in order to rate them and get better suggestions. It can also be used as a way to add shows directly to the WatchList, for example if a show was recommended by a friend.
- Rated: All TV shows that were given a rating are listed in this section. It thus shows previously wacthed series and can be used as an history of what was watched. The shows here are sorted by rating, the best ratings starting on the left.
- WatchList: Here are listed all shows added to the 'WatchList' by the user. This can and should be used as a way to manage a list of TV shows that a user wants to watch at a later date.
- Recommended: The TV shows recommended by our suggestion algorithm are presented to the user there. If nothing was rated, it simply displays the most popular TV shows. This is the **most important** section as it is the main purpose of this application.

Note that a TV show cannot appear in more than one of the following sections: Rated, WatchList and Recommended. This ensures that the recommendation list keeps evolving over time and that shows that have already been watched are not suggested to the user again.

## The Algorithm
We finally settled for a KNN algorithm, after much consideration. We judged that, given the very limited number of features we had access to (genres, release dates, country of origin, original languages and popularity) other algorithms such as Neural Networks would most likely not work well. Neural Networks work best when working with a bigger input size and, most importantly, a bigger training data size. KNN, in this sense, was perfect as it does not require training (it can thus evolve while ratings added live). We were able to use the "star" ratings made by the user by modifying the algorithm to make use of these floating point values, thus allowing negatively rating some shows.

## Timeline
We use most of the time on Friday evening for brainstorming, design sketches and algorithm research. By the end of the day we had a clear idea of what to do for the next day and what we wanted to achieve by the end of the event. We had a little bit of time to create a structure for the code and add some elements.

On Saturday evening, we achieved a Minimum Viable Product. We had a working version of our idea and proceeded to create a list of things left to do, as well as a list of things we would like to add, if time permitted.

On Sunday, we finished going through our list at around 1pm, at which point we started polishing the application a lot. We managed to go through the entire list of "non-essential" features we wanted to add and worked a lot on user experience (UX/UI). We added a lot of animations and made the entire application more mobile-friendly.
