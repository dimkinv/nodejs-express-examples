import * as express from 'express';

import * as fs from 'fs';
import { User, DefaultUser, doSmth } from './models/user.model'
import * as models from './models/user.model';

let DefaultName = 'Yossi';
let r: number;
r = 0;



DefaultUser.name = "other";
console.log(new models.User());
// console.log(new User());

var app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})