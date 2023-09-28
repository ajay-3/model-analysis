import Image from "next/image";
import SohamLogo from "../../../../public/icons/soham_hq.png";
import styles from "./index.module.scss";

const Logo = () => {
  return (
    <div className={styles["logo"]}>
      <Image
        style={{ objectFit: "contain" }}
        // priority
        src={SohamLogo}
        alt="logo"
        width={40}
        height={40}
      />
      <h4 className={styles["logo-text"]}>Soham.ai</h4>
    </div>
  );
};

export default Logo;
