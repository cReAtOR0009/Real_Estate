import React from "react";
import { styles } from "../../styles/styles";
import { Link } from "react-router-dom";

const FaqCard = ({ question, answer, id }) => {
  return (
    <div className="flex p-[10px] sm:p-[40px] flex-col items-start gap-[24px] rounded-[10px] border border-Grey-15 bg-Grey-08">
      <h3>{question}</h3>
      <p className={`${styles.paragraph}`}>{answer}</p>
      <button
        className={`${styles.buttonPadding} bg-Grey-50 hover:bg-Purple-60 transition`}
      >
        <Link to="#">Read More</Link>
      </button>
    </div>
  );
};

export default FaqCard;
