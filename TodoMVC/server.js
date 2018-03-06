
const express = require('express');
const app = express();

app.use(express.static('dist'));
app.listen(8000, function () {
    console.log('Todo app listening on port 8000!');
});
