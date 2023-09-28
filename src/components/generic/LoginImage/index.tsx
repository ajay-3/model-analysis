import statistics from "../../../../public/images/statistics.png";
import order from "../../../../public/images/order.png";
import styles from "./index.module.scss";
import Image from "next/image";

const LoginImage = () => {
  return (
    <div className={styles["parent"]}>
      <div className={styles["images-div"]}>
        <img
          className={styles["order"]}
          src={order.src}
          alt="Order Summary"
          // width={220}
          // height={234}
        />
        <img
          className={styles["statistics"]}
          src={statistics.src}
          alt="Statistics Image"
          // width={375}
          // height={194}
        />
      </div>
      <div className={styles["text"]}>
        <p className={styles["welcome"]}>Welcome to Model Analysis Dashboard</p>
        <p className={styles["sign"]}>Sign in and explore the insights</p>
      </div>
    </div>
  );
};

export default LoginImage;
