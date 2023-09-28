import {
  HiOutlineQuestionMarkCircle,
  HiOutlineCog,
  HiOutlineBell,
} from "react-icons/hi";
import ProfileActions from "./ProfileActions";
import styles from "./index.module.scss";

const ProfileSettings = () => {
  return (
    <div className={styles["profile-view"]}>
      <HiOutlineQuestionMarkCircle className={styles["icon"]} />
      <HiOutlineCog className={styles["icon"]} />
      <HiOutlineBell className={styles["icon"]} />
      <ProfileActions />
    </div>
  );
};

export default ProfileSettings;
