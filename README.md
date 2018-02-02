### The Proekspert front-end test assignment for Jaak Erisalu.

###### Dependencies:

The styles are categorized using [atomic design principles][1]

Using [tg-modal][3] for the modal

Using [React-Redux][4] with [thunks][5] for State management

[1]: http://bradfrost.com/blog/post/atomic-web-design/
[3]: https://github.com/thorgate/tg-modal
[4]: https://github.com/reactjs/react-redux
[5]: https://github.com/gaearon/redux-thunk

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
