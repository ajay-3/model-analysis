"use client";
import { useRouter } from "next/navigation";
import styles from "./index.module.scss";
import LoginImage from "@/src/components/generic/LoginImage";
import Logo from "@/src/components/generic/Logo";
import CustomInput from "@/src/components/universal/CustomInput";
import React, { useEffect, useState } from "react";
import Button from "@/src/components/universal/Button";

interface EmailVerificationProps {
  handleEmailVerified: (isVerified: boolean) => void;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({
  handleEmailVerified,
}) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberPassword, setRememberPassword] = useState(false);

  const [clearEmail, setClearEmail] = useState(false);
  const [clearPassword, setClearPassword] = useState(false);

  const handleEmailChange = (input: string) => {
    setEmail(input);
  };
  const handlePasswordChange = (input: string) => {
    setPassword(input);
  };
  const handleRememberPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRememberPassword(e.target.checked);
  };

  useEffect(() => {
    // Check for stored credentials (e.g., cookies)
    const storedUsername = getCookie("username");
    const storedPassword = getCookie("password");

    if (storedUsername && storedPassword) {
      setEmail(storedUsername);
      setPassword(storedPassword);
    }
    handleEmailVerified(true);
  }, []);

  function getCookie(name: string) {
    const cookieValue = document.cookie.match(
      `(^|;)\\s*${name}\\s*=\\s*([^;]+)`
    );
    return cookieValue ? cookieValue.pop() : "";
  }

  const handleSubmit = () => {
    if (rememberPassword) {
      // Store the credentials securely (e.g., in a cookie)
      document.cookie = `username=${email}; expires=${new Date(
        Date.now() + 30 * 24 * 3600 * 1000
      ).toUTCString()}; path=/`;
      document.cookie = `password=${password}; expires=${new Date(
        Date.now() + 30 * 24 * 3600 * 1000
      ).toUTCString()}; path=/`;
    }
  };

  return (
    <main className={styles["parent"]}>
      <form className={styles["form"]} onSubmit={handleSubmit}>
        <Logo />
        <p className={styles["login"]}>Login</p>
        <p className={styles["welcome"]}>
          Welcome back! Please enter your details
        </p>
        <CustomInput
          type="text"
          label="Email"
          placeholder="Enter your email"
          onChange={handleEmailChange}
          clear={clearEmail}
        />
        <CustomInput
          type="password"
          label="Password"
          placeholder="Enter your password"
          onChange={handlePasswordChange}
          clear={clearPassword}
        />
        <div className={styles["remember-label-div"]}>
          <input
            type="checkbox"
            className={styles["remember-input"]}
            checked={rememberPassword}
            onChange={handleRememberPasswordChange}
          />
          <label className={styles["remember-label"]}>Remember Password</label>
        </div>
        <Button
          type="submit"
          variant="primary"
          onClick={() => router.push("/all-experiments")}
        >
          Login
        </Button>
      </form>
      <LoginImage />
    </main>
  );
};

export default EmailVerification;
