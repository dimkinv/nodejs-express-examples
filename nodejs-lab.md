# Lab
## Skeleton

1.	To create Package.json run `npm init`
2.  install nodemon in global by running `npm i -g nodemon`
2.	To create tsconfig.json run `tsc –-init`
2.  add the following to the `CompilerOptions` in the tsconfig.json file:
    ```
    "lib": [
            "es2015"
    ]
    ```
3.	Install express, @types/express and concurrently `npm i express @types/express concurrently`
4.	Create `app.ts` file and add simple server code
5.	Add the following line into scripts in package.json `"start": "concurrently --kill-others \"tsc -w\" nodemon"`
6.	change the main property in `package.json` to `app.js`
7.	run the server with `npm start` command

## html
1. create public folder
1. inside `app.ts` (server) create simple express server instance
    ```
    import * as http from 'http';
    import * as express from 'express';
    const app = express()
    const httpd = http.createServer(app);   
    ```
2. add the `public` folder to static route `app.use('/', express.static('public'));`
3. inside public folder add `index.html`, `scripts.ts`, `styles.css` files
4. create a top header, big box at top to hold all the messages, an input to write new message and a button to send the message
5. add links to js/css files from `index.html`
1. as the last line of the file listen to the server on port 3000
```
httpd.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});
```
*these lines should always be the last lines*

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
the result example can be seen here: `https://esi.tech.ccp.is/latest/characters/95404206`

## creating the chat socket - server

1.  create `models` folder and inside create `message.model.ts` file, inside implement a class that will represent the model of a message.

    message should be of this format: `{from:string, content:string}` 

    *essentially it should be a class with two public properties*
2. import message model into `app.ts` file `import { Message } from         './models/message.model';`
1.	Install `socket.io` and `@types/socket.io` deps with npm as in previous steps
4.	import socket.io to `app.ts` and add socket connection on server.
    ```
    const app = express()
    const httpd = http.createServer(app);
    const ioServer = io(httpd);
    ```
5. add listener on new connection for the socket 
    ```
    ioServer.on('connection', (socket)=>{
    });
    ```
1. inside the connection callback create another listener for custom message from client to server with the name 
   ```
   socket.on('messageToServer', (message: Message) => {
    
   }
   ```
6. on messages from client reply with broadcast to all other clients except the one that sent the message via `socket.broadcast.emit` function with the same message received `    socket.broadcast.emit('messageFromServer', message);`

## creating the chat socket - client *(bonus)*

*you can copy-paste the contents of the public folder from the solution if you wish so, but I recoomend to try anyway*
1.	Add script reference for the client side socket in the `index.html`
1. create socket instance from the io factory `var socket = io();`
2. emit an event when user enters message and press button or `enter` key the message should be of the following format: `{ from: string, content: string }`
   ```
   socket.emit('messageToServer', message);
   ```
   *don't forget to update the UI for your own message (the server won't update it for you)*
3. listen to a `messageFromServer` event to receive a message and update the UI
   ```
   socket.on('messageFromServer', (message) => {
   });
   ```
## adding the character search for chat

if the user will write something that starts from `!char` it will be understood by the server as a command, all the rest of the message will become the search parameter for the character search 

1. create `character-reposnse.model.ts` file in `models` folder and add an interface declaration for the response that will be back from the server. Remember you should **always** be typesafe!
3. import all the functions from the search service into `app.ts`: `import * as searchService from './services/search.service';`
4. add logic
    1. if the message content starts with `!char` string is means it's a search query activate the search by string function to find all the ids that match
    2. for each id received search the characters data on the server and broadcast message to all clients with charters name and birth date *(you can find birthdate in the result)*
    3. use either promise or async/await syntax for this

## exposing the search as a REST API

1. install `body-parser` and `@types/body-parser` dependencies
1. create `controllers` folder and `index.ts` file inside
1. in `index.ts` file import `Router` factory from express `import { Router } from 'express';` and create an instance

   *note, this is not a constructor but factory*
   ```
   export const apiRouter = Router();
   apiRouter.use('/search', searchRouter);
   ```
1. create `search-controller` folder in controllers and add `search.controller.ts`, `index.ts` files to it.
1. expose `SearchFactory` class from `search.controller.ts` with get function 
   ```
   export class SearchController {
     get(req: Request, res: Response) {

     }
   }
   ```
1. in `controllers/index.ts` file add a get method to the router and setup the handler to be the `search.controller` get method, export the router
    ```
    export const searchRouter = Router();
    const ctrl = new SearchController();
    searchRouter.get('/:searchParam', ctrl.get);
    ```
1. in the `search-controller/index.ts` file create another `Router` and add the `search-controller` router to it with `use` function under the `/search` route
    ```
    import { Router } from 'express';
    import { SearchController } from './search.controller';

    export const searchRouter = Router();
    const ctrl = new SearchController();
    searchRouter.get('/:searchParam', ctrl.get);
    ```
1. add the whole `api` router to the `app.ts` file also with the `use` function under the `/api` route
    ```
    app.use('/api', apiRouter);
    ```
1. import `SearchService` into the controller and make write the logic to pull the characters from server. Respond to the request with json of the following format:
    ```
     {
        name: string,
        birthday: string
    }
    ```
1. make sure to handle errors and notify the api user with appropriate HTTP codes
   for example if you get error for some reason you server should return status code 500 `res.status(500).end();`

   on the other hand for query that did not return any characters should return 404 not found.
