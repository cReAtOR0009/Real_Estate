import React from 'react'

const HeaderContainer = ({ headerText, paragrapgText, styles }) => (
    <div className={styles.headerTextContainer}>
      <h1 className={styles.heading}>{headerText}</h1>
      <p className={styles.paragraph}>{paragrapgText}</p>
    </div>
  );

export default HeaderContainer