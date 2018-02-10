### The Proekspert front-end test assignment for Jaak Erisalu.

###### Dependencies:

The styles are categorized using [atomic design principles][1]

Using [React-Redux][2] with [thunks][3] for State management

Using [Redux-persist][4] for local caching

Using [React-geolocated][5] and [React-places-autocomplete][6] for geolocation

Using [Moment.js][7] to parse/format datetime info

[1]: http://bradfrost.com/blog/post/atomic-web-design/
[2]: https://github.com/reactjs/react-redux
[3]: https://github.com/gaearon/redux-thunk
[4]: https://github.com/rt2zz/redux-persist
[5]: https://github.com/no23reason/react-geolocated
[6]: https://github.com/kenny-hibino/react-places-autocomplete
[7]: https://momentjs.com/

###### Notes:

The OpenWeatherMap API free forecast is limited to 5 (!) days and no historical data is available (Which means I can't get the data about previous points of time TODAY, for example)

I chose to leave it as such instead of querying an additional API for 0-4 datapoints for simplicity.

I'm tracking `isLoading` in redux, but I couldn't think of a good way (or if we even need to) convey it to the user. I would slap a spinner somewhere if necessary.

Errors are handled in the sense that they are duly noted & ignored (I wouldn't want to show the user the errors anyway and I tried to just make it not break instead).
It's pretty simple to build some sort of error UI ontop of it (The necessary info is in redux already)

###### To run:
* Make sure your Node version supports ES6
* Development
  * `cd src` and `npm install`
  * `npm run dev`
  * Project will be served at `127.0.0.1:8008` by default
  * IF nothing is getting served, try running `npm run serve:static` in parallel - My windows machine using GIT Bash could not run the 2 commands in `npm run dev` in parallel on its own, for example
* Prod
  * `cd src` and `npm install`
  * You can either:
    * Build it yourself with `npm run build:prod`
    * Or use the pre-built `/dist` directory I've included
  * Serve it with a webserver of your choice or `npm run serve:dev`
