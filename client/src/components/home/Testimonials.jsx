import {React, useState} from "react";
import { leftarrow, rightarrow, ratingicon } from "../../assets/imageImporter";
// imoort leftarrow
import { testimonials } from "../../assets/textAssets";
import "../../styles/testimonials.css";
import { styles } from "../../styles/styles";

const StarRating = ({ rating }) => {
  // Ensure the rating is within the valid range (1 to 5)
  const normalizedRating = Math.min(5, Math.max(1, rating));

  // Create an array of stars based on the rating
  const stars = Array.from(
    { length: normalizedRating },
    (_, index) => index + 1
  );

  return (
    <div className="starContainer">
      {stars.map((star) => (
        <span key={star} role="img" aria-label="star">
          ⭐
        </span>
      ))}
    </div>
  );
};

const TestimonialCard = ({
  rating,
  title,
  content,
  profile,
  name,
  address,
}) => {
  return (
    <div className="flex flex-col items-center p-[20px] sm:p-[40px] rounded-[10px] border border-Grey-15 bg-Grey-08">
      <div className="">{<StarRating rating={rating} />}</div>
      <div className="textContainers">
        <h2>{title}</h2>
        <p>
          {content}
        </p>
      </div>
      <div className="profileContainers">
        <div className="profileImage">
          <img src={profile} alt="" />
        </div>
        <div className="profiledeatails">
          <h2>{name}</h2>
          <p>{address}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = ({realEstateTestimonials = testimonials}) => {

     // Define the number of testimonials to display per page
  const testimonialsPerPage = 3;

  // State to track the current page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of testimonials and pages
  const totalTestimonials = realEstateTestimonials.length;
  const totalPages = Math.ceil(totalTestimonials / testimonialsPerPage);

  // Handle click event for the "Previous" button
  const handlePrevClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)); // Ensure the page doesn't go below 0
  };

  // Handle click event for the "Next" button
  const handleNextClick = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages )); // Ensure the page doesn't exceed the total number of pages
  };

  // Calculate the starting and ending index of testimonials to display on the current page
  const startIndex = (currentPage - 1) * testimonialsPerPage;
  const endIndex = startIndex + testimonialsPerPage;

  // Extract the testimonials to display on the current page
  const displayedTestimonials = realEstateTestimonials.slice(startIndex, endIndex);
  return (
    <div className={`${styles.homeheader}`}>
      <div className={` flex sm:items-end justify-between flex-col sm:flex-row gap-[20px]`}>
        <div className="">
          <h2 className={`${styles.heading}`}>What Our Clients Say</h2>
          <p className={`${styles.paragraph}`}>
            Read the success stories and heartfelt testimonials from our valued
            clients. Discover why they chose Estatein for their real estate
            needs.
          </p>
        </div>
        <div className="right">
          {" "}
          <button className={`${styles.buttonPadding}`}>View All Testimonials</button>
        </div>
      </div>

      <div>
        <div className="testimonialsCardContainer">
            {displayedTestimonials.map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} />
            ))}
        </div>
        <div className="featuredToggle">
            <p>
                <span className="currentPage">{currentPage}</span>of
                <span className="totalPage">{totalPages}</span>
            </p>
            <div className="toggleButton">
                <div className="previous" onClick={handlePrevClick} disabled={currentPage === 0}><img src={leftarrow} alt="" /></div>
                <div className="next" onClick={handleNextClick} disabled={currentPage === totalPages - 1}><img src={rightarrow} alt="" /></div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials