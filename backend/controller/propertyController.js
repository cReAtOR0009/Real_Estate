const constants = require("../constants/index");
// const propertyModel = require("../database/models/propertyModel");
const Property = require("../database/models/propertyModel");
const { formatMongoData, checkObjectId } = require("../utilities/formatData");
const jwt = require("jsonwebtoken");

const serverResponse = constants.serverResponse.defaultResponse;

module.exports.createProperty = async (req, res) => {
  let response = serverResponse;
  try {
    const {
      // id,
      title,
      description,
      price,
      bedrooms,
      bathrooms,
      size,
      address,
      amenities,
      additionalFeatures,
      propertyType,
      images,
      tags,
      status,
      agent,
      virtualTour,
      propertyHistory,
      nearbyAmenities,
      availability,
    } = req.body;
    console.log("request data-body,", req.body);

    const existingPropertyName = await Property.findOne({ name: title });

    if (existingPropertyName) {
      console.log("existingPropertyName: ", existingPropertyName);
      throw new Error(
        "this property already exist, kindly change prperty name "
      );
    }

    // const {}

    let newProperty = new Property({
      name: title,
      description: description,
      price: price,
      bedrooms: bedrooms,
      bathrooms: bathrooms,
      size: size,
      address: address,
      amenities: amenities,
      additionalFeatures: additionalFeatures,
      images: [images],
      propertyType: propertyType,
      agent: agent,
      tags: tags,
      status: status,
      virtualTour: virtualTour,
      propertyHistory: propertyHistory,
      nearbyAmenities: nearbyAmenities,
      availability: availability,
    });

    let savedProperty = await newProperty.save();

    console.log("saved property: ", savedProperty);
    response.status = 200;
    response.error = {};
    response.message = "property added succesfully";
    response.data = await formatMongoData(savedProperty);
  } catch (error) {
    response.message = "error message";
    response.data = {};
    response.status = 400;
    response.error = error.message;
    console.log(error);
    console.log("something went wrong: controller:  create property");
  } finally {
    return res.status(response.status).send(response);
  }
};

module.exports.listProperty = async (req, res, skip = 0, limit = 10) => {
  let response = serverResponse;
  try {
    skip = req.params.skip ? req.params.skip : skip;
    limit = req.params.limit ? req.params.limit : limit;

    const properties = await Property.find({})
      .skip(parseInt(skip))
      .limit(parseInt(limit));

    response.status = 200;
    response.message = "property fetched succesfully";
    response.data = await formatMongoData(properties);
  } catch (error) {
    response.message = "error message";
    response.data = {};
    response.error = error.message;
    console.log(error);
    console.log("something went wrong: controller:  fetching properties");
  } finally {
    return res.status(response.status).send(response);
  }
};

module.exports.getPropertyById = async (req, res) => {
  let response = serverResponse;

  try {
    await checkObjectId(req.params.id);
    const id = req.params.id;

    existingproperty = await Property.findById(id);

    if (!existingproperty) {
      throw new Error("property not found");
    }

    response.status = 200;
    response.message = "property fetched successfully";
    response.data = await formatMongoData(existingproperty);
  } catch (error) {
    response.message = "error message";
    response.error = error.message;
    response.data = {};
    console.log("error with product controller: getPropertyById ");
    console.log(error);
  } finally {
    return res.status(response.status).send(response);
  }
};

module.exports.deletePropertyById = async (req, res) => {
  let response = serverResponse.defaultResponse;

  try {
    checkObjectId(req.params.id);
    const id = req.params.id;
    const existingproperty = await Property.findByIdAndDelete(id);

    if (!existingproperty) {
      throw new Error("property not found");
    }

    response.status = 200;
    response.message = "property deleted successfully";
    response.data = await formatMongoData(existingproperty);
  } catch (error) {
    response.message = "error message";
    response.error = error.message;
    response.data = {};
    console.log("error with product controller: deletePropertyById ");
    console.log(error);
  } finally {
    return res.status(response.status).send(response);
  }
};
