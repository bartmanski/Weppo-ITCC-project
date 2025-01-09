const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', './views');


app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/', (req, res) => {
  res.send('TEST');
});

app.listen(port, () => {
  console.log('Server is listening on port ' + port);
});