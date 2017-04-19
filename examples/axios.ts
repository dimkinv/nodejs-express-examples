import axios from 'axios';

// function handleResult(result) {

// }

let handleResult = (result) => {

}


// let promise = axios.get('http://google.com');
// promise.then(handleResult)

//es5
// promise.then(function(){

// });

//es6 
axios.get('http://google.com')
    .then((result) => {

    })
    .catch((err) => {

    });

// axios.post('url', {})
// .then