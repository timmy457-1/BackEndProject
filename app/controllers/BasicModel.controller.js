const BasicModel = require("../models/tutorial.model.js");

// Create and Save a new BasicModel
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a BasicModel
  const tutorial = new BasicModel({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  });

  // Save BasicModel in the database
  BasicModel.create(tutorial, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the BasicModel."
      });
    else res.send(data);
  });
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  BasicModel.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

// Find a single BasicModel by Id
exports.findOne = (req, res) => {
  BasicModel.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found BasicModel with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving BasicModel with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Tutorials
exports.findAllPublished = (req, res) => {
  BasicModel.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

// Update a BasicModel identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  BasicModel.updateById(
    req.params.id,
    new BasicModel(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found BasicModel with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating BasicModel with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a BasicModel with the specified id in the request
exports.delete = (req, res) => {
  BasicModel.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found BasicModel with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete BasicModel with id " + req.params.id
        });
      }
    } else res.send({ message: `BasicModel was deleted successfully!` });
  });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  BasicModel.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    else res.send({ message: `All Tutorials were deleted successfully!` });
  });
};
