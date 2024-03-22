import React from 'react'

const MainHeaderContainer = ({ headerText, paragrapgText, styles }) => (
    <div className={styles.TextContainer}>
      <h1 className={styles.heading}>{headerText}</h1>
      <p className={styles.paragraph}>{paragrapgText}</p>
    </div>
  );

export default MainHeaderContainer