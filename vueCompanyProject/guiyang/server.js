const express = require('express');
const path = require('path');
const cdr = require('child_process');

const port = 10000;

const app = express();

console.log(process.env.PORT);

app.set('port', process.env.PORT || port);


app.use(express.static(path.join(__dirname, '/dist')));

app.listen(app.get('port'));

console.log(`server is running at ${port}`);

cdr.exec(`start http://localhost:${port}`);
