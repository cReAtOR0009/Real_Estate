const constants = require("../constants/index");
const Property = require("../database/models/propertyModel");
const { formatMongoData, checkObjectId } = require("../utilities/formatData");
const jwt = require("jsonwebtoken");

const serverResponse = constants.serverResponse.defaultResponse;

module.exports.createProduct = async (req, res) => {
  let response = serverResponse;
  try {
    const {
      name,
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

    const existingPropertyName = await Property.findOne({ name: name });

    if (existingPropertyName) {
      throw new Error( 
        "this property already exist, kindly change prperty name "
      );
    }

    // const {}

    let newProperty = new Property({
      name: name,
      description: description,
      price: price,
      bedrooms: bedrooms,
      bathrooms: bathrooms,
      size: size,
      address: address,
      amenities: amenities,
      additionalFeatures: additionalFeatures,
      images: images,
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
    response.status = 200;
    response.message = "property added succesfully";
    response.data = await formatMongoData(savedProperty);

  } catch (error) {
    response.message = "error message";
    response.data = {}
    response.error = error.message;
    console.log(error);
    console.log("something went wrong: controller:  create property");
  } finally {
    return res.status(response.status).send(response);
  }
};
