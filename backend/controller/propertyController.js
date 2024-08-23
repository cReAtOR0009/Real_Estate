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

    console.log("nearbyAmenities:", nearbyAmenities);
    console.log("body:", req.body);
    // images?console.log("images: ", images) : ""

    // console.log("request body: ", req.body)

    // Check if property with the same title already exists
    const existingPropertyName = await Property.findOne({ name: title });
    if (existingPropertyName) {
      throw new Error(
        "This property already exists. Please change the property name."
      );
    }
    console.log("tags", tags);
    const splitTags = tags.split(",");
    const formatnearbyAmenities = nearbyAmenities.split(",");

    // Create new property object
    const newProperty = new Property({
      name: title,
      description,
      price,
      bedrooms,
      bathrooms,
      size,
      address,
      amenities: amenities,
      additionalFeatures,
      images: images,
      propertyType,
      agent,
      tags: splitTags,
      status,
      virtualTour,
      propertyHistory,
      nearbyAmenities: formatnearbyAmenities,
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

module.exports.searchProperty = async (req, res) => {
  console.log("queries......", req.query);
  let response = { ...serverResponse };
  try {
    const {
      'property name': propertyName,
      'property type': propertyType,
      'property size': propertySize,
      'build year': buildYear,
      'min price': minPrice,
      'max price': maxPrice
    } = req.query;
    

    console.log("queries......", req.query);
    console.log("property_Name:", propertyName);

    // Build the search query
    let query = {};
    if (propertyName) {
      query.name = { $regex: propertyName, $options: 'i' };
    }

    // if (propertyType) {
    //   query["address.city"] = property_city;
    // }

    // if (propertySize) {
    //   query["address.state"] = property_state;
    // }
    if (buildYear) {
      if (buildYear.includes('-')) {
        const [startYear, endYear] = buildYear.split(' - ').map(year => parseInt(year, 10));
        query.buildYear = { $gte: startYear, $lte: endYear };
      } else if (buildYear.includes("<")) {
        query.buildYear ={$lte:buildYear}
      } else if (buildYear.includes(">")) {
        query.buildYear ={$gte:buildYear}
      }
       else {
        
        query.buildYear = parseInt(buildYear, 10);
      }
    }

    if (minPrice) {
      query.price = { ...query.price, $gte: Number(minPrice) };
    }
    
    if (maxPrice) {
      query.price = { ...query.price, $lte: Number(maxPrice) };
    }
    
    if (propertyType) {
      query.propertyType = propertyType;
    }
    if (propertySize) {
      query.propertySize = propertySize;
    } 
    // if (bedrooms) {
    //   query.bedrooms = { $gte: Number(bedrooms) };
    // }

    // if (bathrooms) {
    //   query.bathrooms = { $gte: Number(bathrooms) };
    // }

    
        // if (property_status) { 
        //   query.status = property_status;
        // } 

    // Execute the search query
    console.log("query:", query)
    const properties = await Property.find(query); 

    console.log("properties:", properties)

    response.status = 200;
    response.message = "Property found with query.";
    response.data = await formatMongoData(properties);
  } catch (error) {
    response.message = "Error finding property.";
    response.error = error.message;
    console.log("Error in searching property:", error);
  } finally {
    return res.status(response.status).send(response);
  } 
  // });
};
