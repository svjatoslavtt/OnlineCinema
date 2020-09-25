import React from "react";

import Film from "./components/Film.tsx";
import styles from "./style.module.scss";

const NewsFeed: React.FC = () => {
  return (
    <div className={styles.newsFeedContainer}>
      <Film />
    </div>
  )
}

export default NewsFeed;