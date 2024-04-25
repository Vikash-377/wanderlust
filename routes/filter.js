const express = require("express");
const router = express.Router();
const listing = require("../models/listing.js");
const filterController = require("../controllers/filter.js");

router.get("/search",filterController.search);
router.get("/rooms",filterController.room);
router.get("/iconic",filterController.iconic);
router.get("/farm",filterController.farm);
router.get("/mountains",filterController.mountains);
router.get("/castles",filterController.castles);
router.get("/beach",filterController.beach);
router.get("/camping",filterController.camping);
router.get("/arctic",filterController.arctic);
router.get("/desert",filterController.desert);
router.get("/boats",filterController.desert);


module.exports = router;