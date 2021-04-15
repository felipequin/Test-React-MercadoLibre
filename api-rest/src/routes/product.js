const { Router } = require('express');
var cors = require('cors')
const { successProduct, error } = require("../apiResponse/responseApi");
const router = Router();
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
  }
const fetch  = require('node-fetch');

router.get('/api/items/:id',cors(corsOptions), async (req, res) => {
      try {
        const item = await fetch('https://api.mercadolibre.com/items/'+req.params.id
        ).then(response => response.json());
        const description = await fetch('https://api.mercadolibre.com/items/'+req.params.id+'/description'
        ).then(response => response.json());
        const categories = await fetch('https://api.mercadolibre.com/categories/'+item.category_id+''
        ).then(response => response.json());
        const product = {item,
        description,
        categories};
        res
        .status(200)
        .json(successProduct({ data: product }, res.statusCode));     
      } catch (err) {
          console.log(err)
        res
        .status(500)
        .json(error("Error Api", err, res.statusCode));    
      }

});

module.exports = router;