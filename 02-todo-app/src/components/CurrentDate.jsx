import { useState, useEffect } from "react";
import styles from "./CurrentDate.module.css"

const CurrentDate = () => {
  const [currDate, setCurrDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const weekday = currDate.toLocaleString("en-IN", { weekday: "long" });
  const month   = currDate.toLocaleString("en-IN", { month: "long" });
  const day     = currDate.toLocaleString("en-IN", { day: "2-digit" });
  const year    = currDate.getFullYear();

  const formattedDate = `${weekday}, ${month} ${day}, ${year}`;

  const formattedTime = currDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  return (
    <div className={styles.date}>
      <p>{formattedDate}</p>
      <p>{formattedTime}</p>
    </div>
  );
};

export default CurrentDate;
