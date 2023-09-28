import Link from "next/link";
import styles from "./index.module.scss";
import { useRecoilState } from "recoil";
import { activeTopHeader } from "@/src/store/atoms/Utility";

const NavigationInfo = [
  {
    name: "All Experiments",
    link: "/all-experiments",
  },
  {
    name: "Model Analysis",
    link: "/model-analysis",
  },
];

const TopNavigation = () => {
  const [activeNavHeader, setActiveNavHeader] = useRecoilState(activeTopHeader);
  return (
    <nav className={styles["nav"]}>
      <ul className={styles["headers"]}>
        {NavigationInfo.map((item) => (
          <li
            className={`${
              activeNavHeader == item.link ? styles["active"] : styles["header"]
            }`}
            key={item.link}
          >
            <Link
              onClick={() => setActiveNavHeader(item.link)}
              className={styles["link"]}
              href={item.link}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TopNavigation;
