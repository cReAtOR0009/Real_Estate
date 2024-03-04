const constants = require("../constants/index");
const Order = require("../database/models/orderModel");
const User = require("../database/models/userModel");
const Property = require("../database/models/propertyModel");
const { formatMongoData, checkObjectId } = require("../utilities/formatData");

const serverResponse = constants.serverResponse.defaultResponse;

const validateIdandPrice = async (id, price, quantity) => {
  const existingProduct = await Property.findById(id);
  //confirm if property exist and throw error if it dosent
  if (!existingProduct) {
    console.log("id: ", id)
    throw new Error("some property not found");
  }
//  validate induvidual price to be correct with database
  const productPrice = existingProduct.price;
  if (productPrice !== price) { 
    throw new Error(
      "some property prices are not correct, kindly refresh page to get live prices"
    );
  }

// validate cummulative price

  if (parseInt(productPrice * quantity) !== parseInt(price * quantity)) {
    throw new Error(
      "some property prices are not correct, kindly refresh property to get live prices"
    );
  } 

  return parseInt(productPrice * quantity);
};

const validateProperty = async (propertyArray) => {
  let total = 0;
  for (let index = 0; index < propertyArray.length; index++) {
    const property = propertyArray[index];
    await checkObjectId(property.property);
    //get coreect total price for each property and add to total
    const validatePrice = await validateIdandPrice(
      property.property,
      property.price,
      property.quantity
    );
    total += validatePrice;
  }

  return total;
};

// const verifyTotal

module.exports.checkout = async (req, res) => {
  let response = serverResponse;

  try {
    const { user, properties, totalPrice } = req.body;
    const total = await validateProperty(properties);

    console.log("total :", total)
    console.log("totalPrice :", totalPrice) 
    if (total !== totalPrice) {
      throw new Error("error validating total order Price");
    }

    const userExist = await User.findById(user);

    if (!userExist) {
      throw new Error("error validating user");
    }

    const order = new Order({
      user: user,
      properties: properties,
      totalPrice: totalPrice,
    });

    await order.save();

    response.status = 200;
    response.message = "property order placed successfully";
    response.data = await formatMongoData(order);

  } catch (error) {
    response.message = "error message";
    response.error = error.message;
    response.data = {};
    console.log("error with order controller: order property ");
    console.log(error);
  } finally {
    return res.status(response.status).send(response);
  }
};
