# BookMarked

By: Luke Loecher

### Overview

BookMarked is an application built for the avid book reader. BookMarked provides a medium for users to keep track of all the books they have read, rate them, and document their fresh thoughts on them after they finish. As an avid reader myself, I often find myself forgetting how I felt about a book over time and struggle to give friends’ book recommendations when asked. BookMarked solves this problem by giving people a user-friendly way of documenting the books they read as well as being able to quickly access them within the application. The application also tracks how many books you’ve read each year.

### Technical Details

BookMarked is a full stack application built with React, React-Bootstrap, Node, Express, Sequelize, and PostgreSQL. JSON web tokens were used to authenticate users when they log in.
The back end of this application was build using Node and Express. PostgreSQL was used as the database and Sequelize was used to create the models and migrations for the database. The front end was built with React and styled with React-Bootstrap.

### Features

Home Page Search Feature: I used an axios get request to retrieve all the books currently in the database for the logged in user. Using this array of objects, I used the filter method to get an array of just the book that matches what is searched in the input field. If a book is matched, it is rendered on the page. If not, an error message is displayed directing the user to the add-book page.

Reading Stats feature: I used an npm package from react-chartjs-2. I used an axios get request to retrieve all the books currently in the database for the logged in user. To get the counts of each year, I first created an empty object. I then looped through the array of years when the books were read. If the year is not in the empty object, I create a key for the year in the object and set its value to 1. If it is already in the object, I add one to the count for that year. Using these counts, I was able to create the chart showing how many books were read each year.

Add Book Feature: To get all the input data from the add-book form, I used the useState React hook. Using this input data, I used an axios post request to send all the data into the PostgreSQL. To get the cover image for each book, I used the title and author from the inputs and fetched the Open Library API. This fetch request gives me access to the books isbn number. I save this isbn number into the database for each book which allows me to render the cover images.
