"use strict";

var router = require("express").Router();

var networkControl = require('./ntkControl');

router.put('/updateNode', networkControl.updateNode);
module.exports = router;