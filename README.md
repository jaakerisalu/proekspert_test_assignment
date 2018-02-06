### The Proekspert front-end test assignment for Jaak Erisalu.

###### Dependencies:

The styles are categorized using [atomic design principles][1]

Using [React-Redux][2] with [thunks][3] for State management

Using [Redux-persist][4] for local caching

Using [React-geolocated][5] as a wrapper for `navigator.geolocation`

[1]: http://bradfrost.com/blog/post/atomic-web-design/
[2]: https://github.com/reactjs/react-redux
[3]: https://github.com/gaearon/redux-thunk
[4]: https://github.com/rt2zz/redux-persist
[5]: https://github.com/no23reason/react-geolocated

###### To run:
* Make sure your Node version supports ES6
* Development
  * `cd src` and `npm install`
  * `npm run dev`
  * Project will be served at `127.0.0.1:8008` by default
* Prod
  * `cd src` and `npm install`
  * You can either:
    * Build it yourself with `npm run build:prod`
    * Or use the pre-built `/dist` directory I've included
  * Serve it with a webserver of your choice or `npm run serve:dev`

###### Getting Geolocation to work:

My browser of choice is FireFox, and on `v 57.0.4` I had to do the following:

* Go to about:config
* Set the `geo.wifi.uri` key to `https://location.services.mozilla.com/v1/geolocate?key=test`
