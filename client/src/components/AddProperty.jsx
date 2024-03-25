import React, { useState, useEffect, useContext, useReducer } from "react";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  app,
} from "../firebase.config";
import InputField from "./formComponent/InputField";
import SelectField2 from "./formComponent/SelectField2";
import { styles } from "../styles/styles";
import { formReducer, initialFormData } from "../context/AddPropertyContext";
// import { useDispatch } from "react-redux";
import { useAddpropertyMutation } from "../features/auth/authApiSlice";
import CheckBox from "./formComponent/CheckBox";

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
    dispatch({ type: "DELETE_AMENITIES", payload: { index } });
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

  const addPropertyWithoutImages = async () => {
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
        : addPropertyWithoutImages;
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
        <InputField
          placeholder="Property Name"
          type="text"
          name="title"
          label="title"
          styles={styles.inputFied}
          onChange={handleChange}
          value={formData.title}
        />
        <label>Description:</label>
        <textarea
          className="text-[black] "
          name="description"
          placeholder="describe Property as detailed as possible with 5000 characters"
          value={formData.description}
          onChange={handleChange}
        />
        <div className="flex flex-wrap gap-[30px]">
          <InputField
            placeholder="Set property Price"
            type="number"
            name="price"
            label="price"
            styles={`${styles.inputFied}`}
            onChange={handleChange}
            value={formData.price}
          />
          <InputField
            type="number"
            name="bedrooms"
            label="No of Bedrooms"
            placeholder="number of Bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            styles={styles.inputFied}
          />
          <InputField
            type="number"
            name="bathrooms"
            label="No of Bathrooms"
            placeholder="number of Bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            styles={styles.inputFied}
          />

          <InputField
            type="number"
            name="size"
            label="Property Size"
            placeholder="property Size"
            value={formData.size}
            onChange={handleChange}
            styles={styles.inputFied}
          />

          <InputField
            type="text"
            name="address.street"
            label="Property Adress: Street"
            value={formData.address.street}
            onChange={handleChange}
            placeholder="property Address Street"
            styles={styles.inputFied}
          />
          <InputField
            type="text"
            name="address.city"
            label="Property Adress: City"
            value={formData.address.city}
            onChange={handleChange}
            placeholder="property Address"
            styles={styles.inputFied}
          />
          <InputField
            type="text"
            name="address.state"
            label="Property Adress: State"
            value={formData.address.state}
            onChange={handleChange}
            placeholder="property Address City"
            styles={styles.inputFied}
          />
          <InputField
            type="text"
            name="address.zipcode"
            label="Property Adress: Zipcode"
            value={formData.address.zipcode}
            onChange={handleChange}
            placeholder="property address zipcode"
            styles={styles.inputFied}
          />
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap items-center gap-[10px] border border-solid border-Grey-60 my-[10px] p-[5px]">
          <div className=" flex items-center justify-between min-w-[130px] max-w-[150px] grow">
            <CheckBox
              className={`${styles.checkbox}`}
              type="checkbox"
              name="amenities.swimmingPool"
              label="Swimming Pool"
              checked={formData.amenities.swimmingPool}
              onChange={handleChange}
            />
          </div>
          <div className=" flex items-center justify-between min-w-[130px] max-w-[150px] grow">
            <CheckBox
              className={`${styles.checkbox}`}
              type="checkbox"
              name="amenities.garden"
              label="Garden"
              checked={formData.amenities.garden}
              onChange={handleChange}
            />
          </div>
          <div className=" flex items-center justify-between min-w-[130px] max-w-[150px] grow">
            <CheckBox
              className={`${styles.checkbox}`}
              type="checkbox"
              name="amenities.garage"
              checked={formData.amenities.garage}
              onChange={handleChange}
              label="Garage"
            />
          </div>
          <div className=" flex items-center justify-between min-w-[130px] max-w-[150px] grow">
            <CheckBox
              className={`${styles.checkbox}`}
              type="checkbox"
              name="amenities.gym"
              checked={formData.amenities.gym}
              onChange={handleChange}
              label="Gym"
            />
          </div>
          <div className=" flex items-center justify-between min-w-[130px] max-w-[150px] grow">
            <CheckBox
              className={`${styles.checkbox}`}
              type="checkbox"
              name="amenities.securitySystem"
              checked={formData.amenities.securitySystem}
              onChange={handleChange}
              label="securitySystem"
            />
          </div>
          <div className=" flex items-center justify-between min-w-[130px] max-w-[150px] grow">
            <CheckBox
              className={`${styles.checkbox}`}
              type="checkbox"
              name="amenities.balcony"
              checked={formData.amenities.balcony}
              onChange={handleChange}
              label="balcony"
            />
          </div>
          <div className=" flex items-center justify-between min-w-[130px] max-w-[150px] grow">
            <CheckBox
              className={`${styles.checkbox}`}
              type="checkbox"
              name="amenities.centralHeating"
              checked={formData.amenities.centralHeating}
              onChange={handleChange}
              label="centralHeating"
            />
          </div>

          <div className=" flex items-center justify-between min-w-[130px] max-w-[150px] grow">
            <CheckBox
              className={`${styles.checkbox}`}
              type="checkbox"
              name="amenities.airConditioning"
              checked={formData.amenities.airConditioning}
              onChange={handleChange}
              label="airConditioning"
            />
          </div>
        </div>

        {/* nearby amenities */}
        <InputField
          label="Nearby Amenities"
          styles={styles.inputFied}
          value={formData.nearbyAmenities}
          type="text"
          name="nearbyAmenities"
          placeholder={`seperate additional feature with comm(",")`}
          onChange={handleChange}
        />

        {/* Additional Features */}
        <div className="flex flex-wrap flex-grow  gap-[10px] my-[15px]">
          {/* <h2 className="text-[20px] text-center">Additional Features</h2> */}
          {/* <label>Additional Features:</label> */}
          {formData.additionalFeatures.map((feature, index) => (
            <div
              key={index}
              className=" flex flex-wrap grow gap-[20px] p-[10px] border border-solid rounded-[10px] relative"
            >
              <InputField
                label="Feature Name"
                styles={styles.inputFied}
                type="text"
                name="name"
                value={feature.name}
                onChange={(e) => handleFeatureDescriptionChange(e, index)}
                placeholder="Name"
              />
              <InputField
                label="Feature Description"
                styles={styles.inputFied}
                type="text"
                name="description"
                value={feature.description}
                onChange={(e) => handleFeatureDescriptionChange(e, index)}
                placeholder="Description"
              />
              <button
                onClick={() => deleteAmenity(index)}
                className="absolute right-2 top-5 bg-[red]"
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
            Click to Add Extra Feature
          </button>
        </div>

        {/* Add input className="p-[5px] border border-solid border-Grey-60 h-[50px]" fields for other properties */}
        <div className="flex flex-wrap gap-[30px]">
          <SelectField2
            label={"Property Type"}
            onChange={handleChange}
            styles={`${styles.inputFied}  min-w-[100px]`}
            options={[
              "House",
              "Apartment",
              "Condo",
              "Land",
              "Commercial",
              "Villa",
            ]}
          />
          <SelectField2
            label="status"
            onChange={handleChange}
            styles={`${styles.inputFied} min-w-[100px] `}
            options={["For Sale", "For Rent", "For Lease"]}
          />
          <InputField
            styles={styles.inputFied}
            type="text"
            name="tags"
            label="Tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Separate tags with comma"
          />
          <InputField
            styles={styles.inputFied}
            type="text"
            name="virtualTour"
            label={"Virtual Tour"}
            value={formData.virtualTour}
            onChange={handleChange}
          />
        </div>

        {/* Images */}
        <div className="flex  justify-center items-center flex-wrap gap-[10px]">
          <div className="my-[20px]">
            <label>Add Property Images:</label>
            <input type="file" multiple onChange={handleImageUpload} />
            {formData.images.length > 0 && (
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
            )}
          </div>
        </div>
        <button
          className={`${styles.buttonPadding} bg-Purple-60`}
          type="submit"
        >
          Add Property
        </button>
        {/* </div> */}
      </form>
    </div>
  );
};

export default AddProperty;
