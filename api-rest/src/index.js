/**
 * @desc   Index principal del api, se configuran los routes que se usaran y las dependencias.
 * @author  William Quintero
 * @since   2021
 */
const express = require('express');
const app = express();
const morgan = require('morgan');

app.set('port', process.env.PORT || 3008);
app.use(morgan('dev'));
app.use(express.json());
app.use(require('./routes/index'));
app.use(require('./routes/products'));
app.use(require('./routes/product'));

app.listen(app.get('port'), () => {
    console.log('Server Running');
});
