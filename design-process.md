# Design Process Description

## Brainstorming
Technology and algorithm Brainstorm:

After receiving the challenge, we began brainstorming potential solutions to the design problem.
The main requirements of the problem being:
-Recommendations based on a "user profile"
-Ease of use
-Attractive user interface

Based on our combined skills, we narrowed down the technologies we could use to the following:
-Java desktop application
-Java android application
-React native android application
-PHP/HTML/Javascript Web application

We agreed, that with our understanding of the problem, we could use our base knowledge of machine learning 
to design a K-nearest neighbours algorithm which would rank movies based on their distance from other similar movies.

Chosen solution:
From the list of technologies, we decided to build a web application with no back-end in Javascript/HTML5/CSS.

The basis of our decision lies in the simplicity of our algorithm and our familiarity with the technologies.
We were all familiar with Javascript, and, while it does not offer as many mathematical analysis tools as languages such as 
python, it was more than enough for implementing KNN. 

Furthermore, Javascript being a very high level language allows us to very quickly prototype our application.
Finally, we believed that, with our previous experience in web development, we could create a responsive website which
would be usable both on mobile and desktop devices. These last two facts allow us to best satisfy the last two requirements of 
the design challenge.

Additionally, we chose not to have any back-end infrastructure to simplify the problem, as there was no important information that would be stored.
All user profiles would be stored in the web browser's local storage, and thus be accessible at all times. Localstorage functions best with JSON,
and as such it would be incredibly easy to transfer information received from a database to and from the local storage.

Design brainstorm:
We brainstormed for a bit on different ways to create a user profile. 

Our main concern was to determine which categories the user would have to specify to receive recommendations.
The following categories came to mind:
-Genre preferences
-Director/Producers preferred 
-Similar shows

In the end, we decided to only require the user to indicate which movies they liked or disliked, and to build our KNN graph based on these preferences.
This would provide a much simpler and intuitive interface for the user and would remove the need for complicated fields on a website.

After reseraching how different websites which offer movie and tv show services have their design, we chose to go for a more minimalist approach.
(Sketches of our designs were submitted in paper before submission deadlines)

Our application would consist of very few use cases. 
TV shows are listed under different categories, and the user may like them, dislike them, or add them to a watch later list.

The categories given are "Recommendations, Liked, Disliked, Search".
The same controls ae available in every category, providing a simple and intuitive way for users to interact with the application.
Click on a TV show in any category would reveal information about the show, and buttons to "like, dislike, or add to watch".
The search category would allow the user to search for more movies.
The recommendations category would run our algorithm based on liked and disliked movies.

Please refer to the sketches submitted on paper for a graphical view of the initial design.

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
