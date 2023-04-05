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
  console.log(req.body)
  let inputName = req.query.name;
  console.log(inputName);
  let match = items.find(item => item.name === inputName);
  if (match) {
    return res.json({match})
  } else {
    throw new BadRequestError()
  }

});






module.exports = router;