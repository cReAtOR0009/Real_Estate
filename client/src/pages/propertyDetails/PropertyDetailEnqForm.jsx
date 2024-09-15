import React, { useEffect, useState } from "react";
// import input
import InputField from "../../components/formComponent/InputField";
import { contactFieldDetails } from "../../assets/textAssets";
import { styles } from "../../styles/styles";
import { usePropertyEnquiryMutation } from "../../features/auth/authApiSlice";

const PropertyDetailEnqForm = ({ address, name, id }) => {
  const [errors, setErrors] = useState({ errors: [], display: false });

  const [propertyForm, setPropertForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    selectedProperty: name,
    message: "",
    agreeToTerms: "off",
    propertyId: id,
  });

  const [propertyEnquiry, { loading }] = usePropertyEnquiryMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertForm((propertyFormData) => ({
      ...propertyFormData,
      [name]: value=="on"?true:value=="off"?false:value,
    }));
  };
  const validateForm = () => {
    let isValid = true;
    const newErrors = [];

    for (const [key, value] of Object.entries(propertyForm)) {
      if (value === "" || value === "off") {
        newErrors.push(
          `${key.charAt(0).toUpperCase() + key.slice(1)} is/are required`
        );
        isValid = false;
      }
    }

    if (!isValid) {
      setErrors((errorDetails) => ({
        ...errorDetails,
        errors: [...newErrors],
        display: true,
      }));
      console.log("Error from validateForm:", newErrors);
    }

    return isValid;
  };

  console.log("propertyForm:", propertyForm);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formIsValid = validateForm();

      if (formIsValid) {
        console.log("form submitted...");

        const response =await propertyEnquiry(propertyForm).unwrap();
        console.log("response:....", response)
        //   const {

        //   }
      }
    } catch (error) {
        console.log("error:", error)
    }
  };

  useEffect(() => {
    if (errors.errors.length > 0) {
      setErrors((errorDeatails) => ({ ...errorDeatails, display: true }));
      const errorTime = setTimeout(() => {
        setErrors(() => ({ errors: [], display: false }));
      }, 5000);

      return () => clearTimeout(errorTime);
    }
  }, [errors.errors.length, errors.display]);
  return (
    <div className="grow sm:max-w-[50vw] p-[20px] border border-solid border-Grey-50 rounded-[10px]">
      <div className="fixed m-0 top-[100px] z-[200] text-center text-[15px]">
        {/* errors */}
        {errors.display && (
          <div className="flex flex-wrap  h-[40px] rounded-[10px] gap-[5px]">
            {errors.errors.map((error, index) => (
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
      <form
        action=""
        className="grid grid-cols-2 gap-[30px]"
        onSubmit={handleSubmit}
      >
        {contactFieldDetails.map(
          (contactFieldDetail, index) => (
            // index % 2 === 0 && ( // Render pairs based on even index
            <div className="flex flex-wrap gap-[20px]" key={index}>
              <InputField
                onChange={handleChange}
                {...contactFieldDetail}
                styles={styles.inputField}
              />
              {/* Render the second element if it exists */}
              {/* {index + 1 < contactFieldDetails.length && (
                  <InputField
                    {...contactFieldDetails[index + 1]}
                    styles={styles.inputField}
                  />
                )} */}
            </div>
          )
          // )
        )}
        <div className="flex flex-col">
          <InputField
            type={"text"}
            placeholder={`${name} ${address.street},${address.city},${address.state} `}
            name={"selectedProperty"}
            label={"Selected Property"}
            readOnly={true}
            onChange={handleChange}
            styles={styles.inputField}
            value={`${name} ${address.street},${address.city},${address.state}`}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="Message" className="my-[10px]">
            Message
          </label>
          <textarea
            // type={"textarea"}
            placeholder={``}
            name={"message"}
            onChange={handleChange}
            className={`${styles.inputField} mr-[0px]  bg-Grey-08 text-Purple-60 text-center`}
            // styles={styles.inputField}
            // value=""
          />
        </div>

        <div className="flex justify-center items-center w-full">
          <div className="flex justify-center items-center">
            <InputField
              type={"checkbox"}
              placeholder="I agree with Terms of Use and Privacy Policy"
              id="agreement"
              styles={`w-[20px] bg-Grey-08 mt-[-15px] text-Purple-60 text-center flex items-center justify-center`}
              name="agreeToTerms"
              onChange={handleChange}
              // styles={styles.inputField}
            />
            <label
              htmlFor="agreement"
              className={`${styles.paragraph} text-[10px] m-auto grow-[1]`}
            >
              I agree with Terms of Use and Privacy Policy
            </label>
          </div>

          <button
            type="submit"
            className={`"hover:bg-[#946cf9] transition-all px-[10px] py-[10px] lg:px-[24px] lg:py-[18px] rounded-[8px] text-[10px] sm:text-[12px] bg-Purple-60`}
          >
            Send Your Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyDetailEnqForm;
