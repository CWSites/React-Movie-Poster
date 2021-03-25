# React Movie Poster

React SPA using OMDB API

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Run `yarn start` and open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Requirements

- A free-text search box the user can use to search for movies.
- A submit button to submit a search against the OMDB.
- The ability to make a call against the OMDB API with the following format:
  https://www.omdbapi.com/?s={query_string}&apikey=902755be
- Display a loading screen while waiting on the response from the OMDB.
- When the OMDB returns, provide a dropdown with the first ten movies returned by the
  OMDB (i.e. the first page of results)
- If someone selects a value from the dropdown, show the poster image associated with the selected item.
