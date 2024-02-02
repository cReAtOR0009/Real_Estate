const mongoose = require('mongoose');

const formatMongoData = async (dataToFormat) => {
  if (Array.isArray(dataToFormat)) {
    let convertedData = [];
    dataToFormat.forEach((data) => {
      convertedData.push(data.toObject());
    });
    return convertedData;
  }

  return dataToFormat.toObject();
};

const checkObjectId = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("you passed an invalid Id");
  }
};

module.exports =  {formatMongoData, checkObjectId}
