# Lab
## Skeleton

1.	Create Package.json run `npm init`
2.	Create tsconfig.json run `tsc –init`
3.	Install express, @types/express `npm i express @types/express`
4.	Create `app.ts` file and add simple server code
5.	Add the following line into scripts in package.json `"start": "tsc -w & nodemon"`
6.	change the main property in `package.json` to `app.js`
7.	run the server with `npm start` command

## html
1. create public folder
2. inside `app.ts` (server) add the `public` folder to static route `app.use('/', express.static('public'));`
3. inside public folder add `index.html`, `scripts.ts`, `styles.css` files
4. create a top header, big box at top to hold all the messages, an input to write new message and a button to send the message
5. add links to js/css files from `index.html`

## search for character data service

the purpose of this module is to create a service that should receive partial string and return ids of all the characters that has this string included in their name in EVE world.

1.	Create services folder 
2.	Create a search-service.ts file inside
3.	Install axios and `@types/axios` deps
4.	The url that searches the names by included string is `https://esi.tech.ccp.is/latest/search/?categories=character&datasource=tranquility&language=en-us&search=<string to search>&strict=false`
* this is a `GET` request that will return the following json format:
`{character: [1,2,3]}`
5.	Create a function in the service that should get a string as a parameter and return a promise (axios get request also returns promise) with the result of array of numbers
6.	Create a function that should receive character id and return promise with character public data that is available at the following url: `https://esi.tech.ccp.is/latest/characters/<character id>/?datasource=tranquility`
the result example can be seen here: `https://esi.tech.ccp.is/latest/characters/95404206/?datasource=tranquility`

# creating the chat socket

1.	Install `socket.io` and `@types/socket.io` deps
2.	Add socket support in the `app.ts` file `socket.listen(app);`
3.	Add script reference for the client side socket in the `index.html`
4.	Add socket connection on server and listen to httpd server instead of express app
    ```
    const app = express()
    const httpd = http.createServer(app);
    const socket = io(httpd);
    ```
5.



