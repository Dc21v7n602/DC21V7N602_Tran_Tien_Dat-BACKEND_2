const ContactService = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
  if (!req.body?.name) {
    return next(new ApiError(400, "Name cannot be empty"));
  }
  try {
    const service = new ContactService(MongoDB.client);
    const document = await service.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, "Error while creating contact"));
  }
};


exports.findAll = async (req, res, next) => {
  let documents = [];
  try {
    const service = new ContactService(MongoDB.client);
    const { name } = req.query;
    if (name) {
      documents = await service.findByName(name);
    } else {
      documents = await service.find({});
    }
    return res.send(documents);
  } catch (error) {
    return next(new ApiError(500, "Error retrieving contacts"));
  }
};


exports.findOne = async (req, res, next) => {
  try {
    const service = new ContactService(MongoDB.client);
    const document = await service.findById(req.params.id);

    if (!document) {
      return next(new ApiError(404, "Contact not found"));
    }
    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, "Error retrieving contact"));
  }
};


exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Data to update cannot be empty"));
  }
  try {
    const service = new ContactService(MongoDB.client);
    const document = await service.update(req.params.id, req.body);

    if (!document) {
      return next(new ApiError(404, "Contact not found"));
    }
    return res.send({ message: "Contact updated successfully" });
  } catch (error) {
    return next(new ApiError(500, "Error updating contact"));
  }
};


exports.delete = async (req, res, next) => {
  try {
    const service = new ContactService(MongoDB.client);
    const document = await service.delete(req.params.id);

    if (!document) {
      return next(new ApiError(404, "Contact not found"));
    }
    return res.send({ message: "Contact deleted successfully" });
  } catch (error) {
    return next(new ApiError(500, "Error deleting contact"));
  }
};


exports.deleteAll = async (req, res, next) => {
  try {
    const service = new ContactService(MongoDB.client);
    const deletedCount = await service.deleteAll();
    return res.send({ message: `${deletedCount} contacts were deleted successfully` });
  } catch (error) {
    return next(new ApiError(500, "Error deleting all contacts"));
  }
};


exports.findAllFavorite = async (req, res, next) => {
  try {
    const service = new ContactService(MongoDB.client);
    const documents = await service.findFavorite();
    return res.send(documents);
  } catch (error) {
    return next(new ApiError(500, "Error retrieving favorite contacts"));
  }
};


