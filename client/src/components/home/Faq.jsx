import { React, useState } from "react";
import { faqs } from "../../assets/textAssets";
import { leftarrow, rightarrow } from "../../assets/textAssets";
import "../../styles/faq.css";
import { styles } from "../../styles/styles";
import FaqCard from "../smallcomponents/FaqCard";

const Faq = ({ faq = faqs }) => {
  const itemsPerDisplay = 3;
  const noOfPages = Math.ceil(faq.length / itemsPerDisplay);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerDisplay;
  const endIndex = startIndex + itemsPerDisplay;

  const faqsItems = faq.slice(startIndex, endIndex);

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)); // Ensure the page doesn't go below 0
  };

  // Handle click event for the "Next" button
  const handleNextClick = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, noOfPages)); // Ensure the page doesn't exceed the total number of pages
  };
  return (
    <div className={`${styles.homeheader}`}>
      <div className={`flex sm:items-end justify-between flex-col sm:flex-row gap-[20px]`}>
        <div className="">
          <h2 className={`${styles.heading}`}>Frequently Asked Questions</h2>
          <p>
            Find answers to common questions about Estatein's services, property
            listings, and the real estate process.
          </p>
        </div>
        <div className="flex-1 text-center sm:text-right">
          <button className={`${styles.buttonPadding}  w-[100%] sm:w-[auto]`}>View All FAQ's</button>
        </div>
      </div>
      <div className="faqCardContainer">
        {faqsItems.map((faq, index) => (
          <FaqCard key={index} {...faq} />
        ))}
      </div>
      <div className="featuredToggle">
        <p>
          <span className="currentPage">{currentPage}</span>of
          <span className="totalPage">{noOfPages}</span>
        </p>
        <div className="toggleButton">
          <div
            className="previous"
            onClick={handlePrevClick}
            disabled={currentPage === 0}
          >
            <img src={leftarrow} alt="" />
          </div>
          <div
            className="next"
            onClick={handleNextClick}
            disabled={currentPage === noOfPages - 1}
          >
            <img src={rightarrow} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
