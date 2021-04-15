/**
 * @desc   Enrutador de los productos para exponerlo sobre el api
 * @author  William Quintero
 * @since   2021
 */
const { Router } = require('express');
var cors = require('cors')
const { successProducts, error } = require("../apiResponse/responseApi");
const router = Router();
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
  }
const fetch  = require('node-fetch');

router.get('/api/items',cors(corsOptions), async (req, res) => {
    for (const key in req.query) {
        console.log(key, req.query[key])
      }
      try {
        const response = await fetch('https://api.mercadolibre.com/sites/MLA/search?'
        + new URLSearchParams({
            q: req.query.q,
            limit: 4,
        }));
        const products = await response.json();
        res
        .status(200)
        .json(successProducts({ data: products }));     
      } catch (err) {
        res
        .status(500)
        .json(error("Error Api", err, res.statusCode));    
      }

});

module.exports = router;