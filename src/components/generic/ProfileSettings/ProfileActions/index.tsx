import { HiOutlineUserCircle, HiOutlineChevronDown } from "react-icons/hi";
import styles from "./index.module.scss";

const ProfileActions = () => {
  return (
    <div className={styles["profile-actions"]}>
      <HiOutlineUserCircle className={styles["icon-style"]} />
      <div className={styles["names"]}>
        <p className={styles["name"]}>Wade Warren</p>
        {/* <p className={styles["mail"]}>wade.warren@mail.com</p> */}
      </div>
      <HiOutlineChevronDown className={styles["icon"]} />
    </div>
  );
};

export default ProfileActions;
