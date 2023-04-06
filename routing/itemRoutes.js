const express = require("express");
const { BadRequestError } = require("../expressError");
const { items } = require("../fakeDb");
const router = new express.Router();


router.get("/", function (req, res) {

  return res.json({ items });
});

router.post('/', function (req, res) {
  if (req.body === undefined) throw new BadRequestError();

  let newItemName = req.body.name;
  let newItemPrice = req.body.price;

  items.push({ name: newItemName, price: newItemPrice });

  return res.json({ added: { name: newItemName, price: newItemPrice } });
});

router.get('/:name', function (req, res) {
  let inputName = req.params.name;
  let match = items.find(item => item.name === inputName);

  if (match) {
    return res.json({match})
  } else {
    throw new BadRequestError()
  }
});

router.patch('/:name', function(req, res) {
  let inputName = req.params.name;
  let match = items.find((item) => item.name === inputName);

  if (req.body === undefined) throw new BadRequestError();

  let newItemName = req.body.name;
  let newItemPrice = req.body.price;

  match.name = newItemName;
  match.price = newItemPrice;

  return res.json({updated: {match}});
});





module.exports = router;