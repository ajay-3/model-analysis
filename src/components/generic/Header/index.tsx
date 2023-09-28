import Logo from "../Logo";
import ProfileSettings from "../ProfileSettings";
import TopNavigation from "../TopNavigation";
import styles from "./index.module.scss";

const Header = () => {
  return (
    <div className={styles["header"]}>
      <Logo />
      <TopNavigation />
      <ProfileSettings />
    </div>
  );
};

export default Header;
