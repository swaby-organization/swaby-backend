"use strict";

const { itemModel } = require("../DatabaseModels");

const findeOneItem = async (req, res) => {

  const id = req.params.id;
  const item = await itemModel.findOne({
    where: {
      id: id
    },
  });
  res.status(200).json({
    item
  });
};


module.exports = {
  findeOneItem
}