// Import necessary modules and configurations
const constants = require("../constants/index");
const Property = require("../database/models/propertyModel");
const { formatMongoData, checkObjectId } = require("../utilities/formatData");
const serverResponse = constants.serverResponse.defaultResponse;

// Function to create a new property
module.exports.createProperty = async (req, res) => {
  let response = serverResponse;
  try {
    // Extract property data from request body
    const {
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

    console.log("nearbyAmenities:", nearbyAmenities) 

    // images?console.log("images: ", images) : ""

    // console.log("request body: ", req.body)

    // Check if property with the same title already exists
    const existingPropertyName = await Property.findOne({ name: title });
    if (existingPropertyName) {
      throw new Error(
        "This property already exists. Please change the property name."
      );
    }

      const splitTags = tags.split(",")
      const splitnearbyAmenities = nearbyAmenities.split(",")

    // Create new property object
    const newProperty = new Property({
      name: title,
      description,
      price,
      bedrooms,
      bathrooms,
      size,
      address,
      amenities:amenities,
      additionalFeatures,
      images: images,
      propertyType,
      agent,
      tags:splitTags,
      status,
      virtualTour,
      propertyHistory,
      nearbyAmenities,
      availability,
    });

    // Save the new property to the database
    const savedProperty = await newProperty.save();
    response.error = {};
    response.status = 200;
    response.message = "Property added successfully";
    response.data = await formatMongoData(savedProperty);
  } catch (error) {
    response.message = "Error adding property";
    response.error = error.message;
    response.status = 400;
    console.log("Error: ", error);
  } finally {
    return res.status(response.status).send(response);
  }
};

module.exports.listProperty = async (req, res) => {
  let response = { ...serverResponse };
  try {
    let { skip = 0, limit = 10 } = req.params;
    skip = parseInt(skip);
    limit = parseInt(limit);

    const properties = await Property.find({}).skip(skip).limit(limit);

    response.status = 200;
    response.message = "Properties fetched successfully.";
    response.data = await formatMongoData(properties);
  } catch (error) {
    response.message = "Error fetching properties.";
    response.error = error.message;
    console.log("Error in listing properties:", error);
  } finally {
    return res.status(response.status).send(response);
  }
};

module.exports.getPropertyById = async (req, res) => {
  let response = { ...serverResponse };
  try {
    await checkObjectId(req.params.id);
    const existingProperty = await Property.findById(req.params.id);

    if (!existingProperty) {
      throw new Error("Property not found.");
    }

    response.status = 200;
    response.message = "Property fetched successfully.";
    response.data = await formatMongoData(existingProperty);
  } catch (error) {
    response.message = "Error fetching property.";
    response.error = error.message;
    console.log("Error in getting property by id:", error);
  } finally {
    return res.status(response.status).send(response);
  }
};

module.exports.deletePropertyById = async (req, res) => {
  let response = { ...serverResponse };
  try {
    await checkObjectId(req.params.id);
    const deletedProperty = await Property.findByIdAndDelete(req.params.id);

    if (!deletedProperty) {
      throw new Error("Property not found.");
    }

    response.status = 200;
    response.message = "Property deleted successfully.";
    response.data = await formatMongoData(deletedProperty);
  } catch (error) {
    response.message = "Error deleting property.";
    response.error = error.message;
    console.log("Error in deleting property by id:", error);
  } finally {
    return res.status(response.status).send(response);
  }
};
