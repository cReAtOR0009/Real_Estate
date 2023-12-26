import React from "react";
import { faqs } from "../assets/textAssets";
import { leftarrow, rightarrow } from "../assets/textAssets";
import "../styles/faq.css"

const FaqCard = ({question, answer, id}) => {
  return (
    <div className="faqCard">
        <h3>{question}</h3>
        <p>{answer}</p>
        <button className="learnmore"><a href="#">Read More</a></button>
    </div>
  )
}

const   Faq = () => {
  return (
    <div className="faqContainer">
      <div className="headerText">
        <div className="left">
          
        <h2>Frequently Asked Questions</h2>
        <p>
        Find answers to common questions about Estatein's services, property listings, and the real estate process.   
        </p>
        </div>
        <div className="right">
          <button>View All FAQ's</button>
        </div>
      </div>
      <div className="faqCardContainer">
        {
          faqs.map((faq, index) => (
            <FaqCard key={index} {...faq} />
          ))
        }
      </div>
      <div className="featuredToggle">
            <p>
                <span className="currentPage">01</span>of
                <span className="totalPage">60</span>
            </p>
            <div className="toggleButton">
                <div className="previous"><img src={leftarrow} alt="" /></div>
                <div className="next"><img src={rightarrow} alt="" /></div>
            </div>
        </div>
    </div>
  );
};


export default Faq