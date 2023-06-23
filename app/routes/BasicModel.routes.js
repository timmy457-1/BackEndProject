module.exports = app => {
  const BasicModels = require("../controllers/BasicModel.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", BasicModels.create);

  // Retrieve all Tutorials
  router.get("/", BasicModels.findAll);

  // Retrieve all published Tutorials
  router.get("/published", BasicModels.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", BasicModels.findOne);

  // Update a Tutorial with id
  router.put("/:id", BasicModels.update);

  // Delete a Tutorial with id
  router.delete("/:id", BasicModels.delete);

  // Delete all Tutorials
  router.delete("/", BasicModels.deleteAll);

  app.use('/api/BasicModels', router);
};
