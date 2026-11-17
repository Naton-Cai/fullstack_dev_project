const express = require('express');
const paintController = require('../controllers/paintController');

const router = express.Router();

/* GET home page. */
// eslint-disable-next-line no-unused-vars
router.get('/', (req, res) => {
  res.redirect('/paints');
});

router.get('/paints', paintController.paint_list);

router.get('/paints/:id', paintController.paint_detail);

router.get('/paints/:id/delete', paintController.paint_delete_get);

router.post('/paints/:id/delete', paintController.paint_delete_post);

module.exports = router;
