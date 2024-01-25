const mongoose = require('mongoose');

const formatMongoData = async (toFormatData) => {
  if (Array.isArray(toFormatData)) {
    let convertedData = [];
    toFormatData.forEach((data) => {
      convertedData.push(data.toObject());
    });
    return convertedData;
  }

  return toFormatData.toObject();
};

const checkObjectId = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("you passed an invalid Id");
  }
};

module.exports =  {formatMongoData, checkObjectId}
