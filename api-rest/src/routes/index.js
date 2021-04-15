/**
 * @desc   Enrutador principal del api
 * @author  William Quintero
 * @since   2021
 */
const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.json({"Title": "Hello Api Products Mercado Libre"});
});

module.exports = router;