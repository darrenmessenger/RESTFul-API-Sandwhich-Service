const express = require('express');
const app = express();
const morgan = require('morgan'); // Funnel requests through morgan for extra logging

const productRoutes = require('./api/routes/schedule');

app.use(morgan('dev'));

app.use('/schedule', productRoutes);

// catch all requests that are not handled
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status= 404;
    next(error);
})

// catch all errors from anywhere in application
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

// app.get('/', (req, res) => {
//     res.send('Hello World');
// })

// app.listen(3000, () => console.log('Listening on Port 3000'));

module.exports = app;