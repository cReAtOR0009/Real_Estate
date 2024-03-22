import React, { useState } from "react";
import { styles } from "../../styles/styles";
import FaqCard from "./FaqCard";
import "../../styles/faq.css";
import { leftarrow, rightarrow } from "../../assets/imageImporter";

const FaqBox = ({ faq }) => {
  console.log("faq: ", faq);
  const itemsPerDisplay = 3;
  const faqLength = faq.length;
  const noOfPages = Math.ceil(faqLength / itemsPerDisplay);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerDisplay;
  const endIndex = Math.min(startIndex + itemsPerDisplay, faqLength);

  const faqsItems = Array.isArray(faq) ? faq.slice(startIndex, endIndex) : [];

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, noOfPages));
  };

  return (
    <div className={`${styles.homeheader}`}>
      <div
        className={`flex sm:items-end justify-between flex-col sm:flex-row gap-[20px] py-[10px] `}
      >
        <div className="">
          <h2 className={`${styles.heading} my-[10px]`}>
            Frequently Asked Questions
          </h2>
          <p className={`${styles.paragraph}`}>
            Find answers to common questions about Estatein's services, property
            listings, and the real estate process. We're here to provide clarity
            and assist you every step of the way.
          </p>
        </div>
        <div className="flex-1 grow text-center whitespace-nowrap sm:text-right sm:w-[auto]">
          <button
            className={`${styles.buttonPadding} w-[100%] sm:w-[auto] flex-1 grow text-center sm:text-right`}
          >
            View All FAQ's
          </button>
        </div>
      </div>
      {faqLength === 0 ? (
        <p>No FAQs available.</p>
      ) : (
        <>
          <div className="faqCardContainer">
            {faqsItems.map((faqItem, index) => (
              <FaqCard key={index} {...faqItem} />
            ))}
          </div>
          <div className="featuredToggle">
            <p>
              <span className="currentPage">{currentPage}</span> of{" "}
              <span className="totalPage">{noOfPages}</span>
            </p>
            <div className="toggleButton">
              <div
                className="previous"
                onClick={handlePrevClick}
                disabled={currentPage === 1}
              >
                <img src={leftarrow} alt="Previous" />
              </div>
              <div
                className="next"
                onClick={handleNextClick}
                disabled={currentPage === noOfPages}
              >
                <img src={rightarrow} alt="Next" />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FaqBox;
