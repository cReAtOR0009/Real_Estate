import React, { useState, useEffect, useContext, useReducer } from "react";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  app,
} from "../firebase.config";
import { styles } from "../styles/styles";
import { formReducer, initialFormData } from "../context/PropertyContext";
// import { useDispatch } from "react-redux";
import { useAddpropertyMutation } from "../features/auth/authApiSlice";

const AddProperty = () => {
  const [formData, dispatch] = useReducer(formReducer, initialFormData);
  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState([]);
  const [addProperty, { isLoading }] = useAddpropertyMutation();
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(checked, name, type, value, checked);
    // const newValue = type === "checkbox" ? checked : value;

    if (name === "tags") {
      dispatch({
        type: "ADD_TAGS",
        payload: { name, value },
      });
    }

    if (name === "nearbyAmenities") {
      dispatch({
        type: "ADD_NEARBY_AMENIIES",
        payload: { name, value },
      });
    }

    if (name.startsWith("address.")) {
      // Check if the field is in the address object
      const detailName = name.split(".")[1]; // Extract the detail name
      dispatch({
        type: "ADD_LOCATION",
        payload: { name: detailName, value },
      }); // Dispatch action to update address
    } else if (name.startsWith("amenities.")) {
      const detailName = name.split(".")[1];
      // let name = detailName;
      dispatch({
        type: "ADD_AMENITIES",
        payload: { name: detailName, value: checked },
      });
    } else {
      dispatch({ type: "ADD_TO_FORM", payload: { name, value } }); // Dispatch action to update other fields
    }
  };

  const deleteAmenity = (index) => {
    dispatch({ type: "DELETE_AMENITIES", payload: {index} });
  };

  const resetForm = () => {
    dispatch({ type: "RESET_form" });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    console.log("files: ", files[0].name);
    let FilesData = [];
    for (const file of files) {
      const imageUrl = URL.createObjectURL(file);
      let fileWithUrl = {
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified,
        // Add more properties if needed
        imageUrl: imageUrl, // Assuming imageUrl is the URL you want to add
      };
      FilesData.push({ ...fileWithUrl, file });
    }

    console.log("files with uri: ", FilesData);
    console.log("last file with uri: ", FilesData[FilesData.length - 1].file);

    dispatch({ type: "ADD_IMAGES", payload: { value: FilesData } });
  };

  const handleFeatureDescriptionChange = (e, index) => {
    const { value, name } = e.target;
    dispatch({
      type: "ADD_CONTENT_TO_FEATURES",
      payload: { index, name, value },
    });
  };

  console.log("errors", errors);

  const validateForm = () => {
    let isValid = true;
    const newErrors = [];

    for (const [key, value] of Object.entries(formData)) {
      if (value === "" && key !== "availability") {
        newErrors.push(
          `${key.charAt(0).toUpperCase() + key.slice(1)} is required`
        );
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formData:", formData);
    const formIsValid = validateForm();

    // try {
    if (formIsValid) {
      const storage = getStorage(app);
      const folder = formData.propertyType;
      let urlArray = [];
      let progress;
      console.log("formdata image length:", formData.images.length);

      formData.images.length > 0
        ? await Promise.all(
            formData.images.map(async (image, index) => {
              console.log("image: ", image);
              console.log(`image to upload ${index}:`, image.file);
              const file = image.file;
              console.log("image type: ", file.type);

              const storageRef = ref(storage, `${folder}/${file.name}`);
              const metadata = {
                contentType: file.type,
              };

              try {
                const uploadTask = uploadBytesResumable(
                  storageRef,
                  file,
                  metadata
                );

                uploadTask.on(
                  "state_changed",
                  (snapshot) => {
                    progress =
                      (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadPercentage(Math.round(progress));
                    console.log("Upload is " + progress + "% done");
                    switch (snapshot.state) {
                      case "paused":
                        console.log("Upload is paused");
                        break;
                      case "running":
                        console.log("Upload is running");
                        break;
                    }
                  },
                  (error) => {
                    switch (error.code) {
                      case "storage/unauthorized":
                        // User doesn't have permission to access the object
                        break;
                      case "storage/canceled":
                        // User canceled the upload
                        break;
                      // ...
                      case "storage/unknown":
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                    }
                  },
                  async () => {
                    // Upload completed successfully, now we can get the download URL
                    const downloadURL = await getDownloadURL(
                      uploadTask.snapshot.ref
                    );
                    urlArray.push({ imageUrl: downloadURL });
                    // console.log("url array: ", urlArray)
                    formData.images[index].imageUrl = downloadURL;
                    // formData.images[index] = { imageUrl: downloadURL };
                    console.log(`File ${index} available at ${downloadURL}`);
                    console.log(
                      "formdata images before submisiion: ",
                      formData.images
                    );
                    if (
                      index == formData.images.length - 1 &&
                      progress == 100
                    ) {
                      // console.log("this is the last image", formData.images[index])
                      let formatDataToSend = formData;
                      formatDataToSend.images = urlArray;
                      const propertyDetails = await addProperty({
                        ...formatDataToSend,
                      }).unwrap();
                      // console.log("formdata images after submisiion: ", formData.images)
                      resetForm();
                      console.log("propertyDetails:", propertyDetails.data);
                    }
                  }
                );
                setErrors([]);
              } catch (error) {
                console.error("Error uploading image:", error);
                if (error.data?.error) {
                  setErrors((err) => [...err, error.data.error]);
                } else {
                  setErrors((err) => [...err, error.message]);
                }
                setVisible(true);
                console.log("visible state:", visible);
                setTimeout(() => {
                  setVisible(false);
                  // setErrors(error.data.error);
                }, 15000);
              }
            })
          )
        : (async () => {
            try {
              console.log("this is formdata without image", formData.images);
              const propertyDetails = await addProperty({
                ...formData,
              }).unwrap();
              console.log("propertyDetails:", propertyDetails.data);
              resetForm();
            } catch (error) {
              if (error.data?.error) {
                setErrors((err) => [...err, error.data.error]);
              } else {
                setErrors((err) => [...err, error.message]);
              }
              setVisible(true);
              console.log("visible state:", visible);
              setTimeout(() => {
                setVisible(false);
                // setErrors(error.data.error);
              }, 15000);
            }
          })();
    }
  };

  const addAdditionalFeature = () => {
    dispatch({ type: "ADD_ADDITIONAL_FEATURES_FIELD" });
  };

  useEffect(() => {
    if (errors.length > 0) {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
        setErrors([]);
      }, 5000);
    }
  }, [errors]);

  return (
    <div className=" mt-[150px] p-[10px]">
      <div className="fixed m-0 top-[100px] z-[200] text-center text-[15px]">
        {/* errors */}
        {visible && (
          <div className="flex flex-wrap  h-[40px] rounded-[10px] gap-[5px]">
            {/* Display all errors hello people lorem500 */}
            {errors.map((error, index) => (
              <p
                className="text-[red] p-[5px] bg-Purple-75 rounded-[5px]"
                key={index}
              >
                {error}
              </p>
            ))}
          </div>
        )}
      </div>

      <h2 className="text-[25px] text-center">Add New Property</h2>
      {/* {errors.title && <span className="text-[20px]">{errors.title}</span>} */}
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          className="p-[5px] border border-solid border-Grey-60 h-[50px]"
          type="text"
          name="title"
          placeholder="Property Name"
          value={formData.title}
          onChange={handleChange}
        />

        <label>Description:</label>
        <textarea
          className="text-[black] "
          name="description"
          placeholder="describe Property as detailed as possible with 5000 characters"
          value={formData.description}
          onChange={handleChange}
        />

        <label>Price:</label>
        <input
          className="p-[5px] border border-solid border-Grey-60 h-[50px]"
          type="number"
          name="price"
          placeholder="property Price"
          value={formData.price}
          onChange={handleChange}
        />

        <label>Bedrooms:</label>
        <input
          className="p-[5px] border border-solid border-Grey-60 h-[50px]"
          type="number"
          name="bedrooms"
          placeholder="number of Bedrooms"
          value={formData.bedrooms}
          onChange={handleChange}
        />

        <label>Bathrooms:</label>
        <input
          className="p-[5px] border border-solid border-Grey-60 h-[50px]"
          type="number"
          name="bathrooms"
          placeholder="number of Bathrooms"
          value={formData.bathrooms}
          onChange={handleChange}
        />

        <label>Size:</label>
        <input
          className="p-[5px] border border-solid border-Grey-60 h-[50px]"
          type="number"
          name="size"
          placeholder="property Size"
          value={formData.size}
          onChange={handleChange}
        />

        <label>Street:</label>
        <input
          className="p-[5px] border border-solid border-Grey-60 h-[50px]"
          type="text"
          name="address.street"
          value={formData.address.street}
          onChange={handleChange}
        />

        <label>City:</label>
        <input
          className="p-[5px] border border-solid border-Grey-60 h-[50px]"
          type="text"
          name="address.city"
          value={formData.address.city}
          onChange={handleChange}
        />

        <label>State:</label>
        <input
          className="p-[5px] border border-solid border-Grey-60 h-[50px]"
          type="text"
          name="address.state"
          value={formData.address.state}
          onChange={handleChange}
        />

        <label>Zipcode:</label>
        <input
          className="p-[5px] border border-solid border-Grey-60 h-[50px]"
          type="text"
          name="address.zipcode"
          value={formData.address.zipcode}
          onChange={handleChange}
        />

        {/* Amenities */}
        <div className="flex flex-wrap items-center gap-[10px] border border-solid border-Grey-60 my-[10px] p-[5px]">
          <label>Swimming Pool:</label>
          <input
            className="p-[5px] border border-solid border-Grey-60 h-[50px]"
            type="checkbox"
            name="amenities.swimmingPool"
            checked={formData.amenities.swimmingPool}
            onChange={handleChange}
          />

          <label>Garden:</label>
          <input
            className="p-[5px] border border-solid border-Grey-60 h-[50px]"
            type="checkbox"
            name="amenities.garden"
            checked={formData.amenities.garden}
            onChange={handleChange}
          />

          <label>Garage:</label>
          <input
            className="p-[5px] border border-solid border-Grey-60 h-[50px]"
            type="checkbox"
            name="amenities.garage"
            checked={formData.amenities.garage}
            onChange={handleChange}
          />

          <label>Gym:</label>
          <input
            className="p-[5px] border border-solid border-Grey-60 h-[50px]"
            type="checkbox"
            name="amenities.gym"
            checked={formData.amenities.gym}
            onChange={handleChange}
          />

          <label>securitySystem:</label>
          <input
            className="p-[5px] border border-solid border-Grey-60 h-[50px]"
            type="checkbox"
            name="amenities.securitySystem"
            checked={formData.amenities.securitySystem}
            onChange={handleChange}
          />

          <label>balcony:</label>
          <input
            className="p-[5px] border border-solid border-Grey-60 h-[50px]"
            type="checkbox"
            name="amenities.balcony"
            checked={formData.amenities.balcony}
            onChange={handleChange}
          />

          <label>centralHeating:</label>
          <input
            className="p-[5px] border border-solid border-Grey-60 h-[50px]"
            type="checkbox"
            name="amenities.centralHeating"
            checked={formData.amenities.centralHeating}
            onChange={handleChange}
          />

          <label>airConditioning:</label>
          <input
            className="p-[5px] border border-solid border-Grey-60 h-[50px]"
            type="checkbox"
            name="amenities.airConditioning"
            checked={formData.amenities.airConditioning}
            onChange={handleChange}
          />
        </div>

        {/* nearby amenities */}

        <label>Nearby Amenities:</label>
        <input
          className="p-[5px] border border-solid border-Grey-60 h-[50px]"
          value={formData.nearbyAmenities}
          type="text"
          name="nearbyAmenities"
          placeholder="seperate additional feature with comma"
          onChange={handleChange}
        />

        {/* Additional Features */}
        <div className="flex flex-col flex-grow  flex-wrap gap-[10px] my-[5px]">
          <h2 className="text-[20px] text-center">Additional Features</h2>
          {/* <label>Additional Features:</label> */}
          {formData.additionalFeatures.map((feature, index) => (
            <div
              key={index}
              className=" flex flex-col border border-solid relative"
            >
              <label>Feature Name:</label>
              <input
                className="p-[5px] border border-solid border-Grey-60 h-[50px]"
                type="text"
                name="name"
                value={feature.name}
                onChange={(e) => handleFeatureDescriptionChange(e, index)}
                placeholder="Name"
              />
              <label>Feature Description:</label>
              <input
                className="p-[5px] border border-solid border-Grey-60 h-[50px]"
                type="text"
                name="description"
                value={feature.description}
                onChange={(e) => handleFeatureDescriptionChange(e, index)}
                placeholder="Description"
              />
              <button
                onClick={() => deleteAmenity(index)}
                className="absolute right-2 top-0 bg-[red]"
              >
                delete
              </button>
            </div>
          ))}
          <button
            className={`${styles.buttonPadding} w-[100%] bg-Purple-60`}
            type="button"
            onClick={addAdditionalFeature}
          >
            Add Extra Feature
          </button>
        </div>

        {/* Images */}
        <div className="flex  justify-center items-center flex-wrap gap-[10px]">
          <label>Add Property Images:</label>
          <input type="file" multiple onChange={handleImageUpload} />
          <div className="flex flex-wrap gap-[10px] border border-solid border-Purple-60 rounded-[10px] p-[10px]">
            {formData.images.map((image, index) => (
              <img
                className="w-[100px] h-[100px] rounded-[10px]"
                key={index}
                src={image.imageUrl}
                alt={`Image ${index}`}
              />
            ))}
          </div>
        </div>

        {/* Add input className="p-[5px] border border-solid border-Grey-60 h-[50px]" fields for other properties */}
        <label>Property Type:</label>
        <select
          className="bg-Grey-10 text-[white]"
          name="propertyType"
          id="propertyType"
          onChange={handleChange}
        >
          <option value="House">House</option>
          <option value="Apartment">Apartment</option>
          <option value="Condo">Condo</option>
          <option value="Land">Land</option>
          <option value="Commercial">Commercial</option>
          <option value="Villa">Villa</option>
        </select>

        <label>Tags:</label>
        <input
          className="p-[5px] border border-solid border-Grey-60 h-[50px]"
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="Separate tags with comma"
        />

        <label>Status:</label>
        <select
          className="bg-Grey-10 text-[white]"
          name="status"
          id="status"
          onChange={handleChange}
        >
          <option value="">status</option>
          <option value="For Sale">For Sale</option>
          <option value="For Rent">For Rent</option>
          <option value="For Lease">For Lease</option>
        </select>

        <label>Virtual Tour:</label>
        <input
          className="p-[5px] border border-solid border-Grey-60 h-[50px]"
          type="text"
          name="virtualTour"
          value={formData.virtualTour}
          onChange={handleChange}
        />

        {/* Add more input className="p-[5px] border border-solid border-Grey-60 h-[50px]" fields for other properties */}
        {/* <div className="flex tetx-center items-center justify-center"> */}
        <button
          className=" px-[10px] my-[20px] py-[15px] bg-Purple-60"
          type="submit"
        >
          Submit
        </button>
        {/* </div> */}
      </form>
    </div>
  );
};

export default AddProperty;
