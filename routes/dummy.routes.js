const express = require('express');
const router = express.Router();

/* 
@type  GET api/test
@descr dummy test endpoint
@public
*/

router.get('/', (req, res) => res.send('test route'));

module.exports = router;
