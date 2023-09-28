"use client";
import { useRouter } from "next/navigation";
import styles from "./index.module.scss";
import LoginImage from "@/src/components/generic/LoginImage";
import Logo from "@/src/components/generic/Logo";
import React, { useEffect, useState } from "react";
import Button from "@/src/components/universal/Button";

const FaceRecognition = () => {
  const router = useRouter();
  return (
    <div className={styles["parent"]}>
      <div className={styles["form"]} onSubmit={() => {}}>
        <Logo />
        <p className={styles["login"]}>Face Recognition</p>
        <p className={styles["welcome"]}>
          Please smile for the rest of your day!
        </p>
        <Button
          type="submit"
          variant="primary"
          onClick={() => router.push("/all-experiments")}
        >
          Authenticate
        </Button>
      </div>
      <LoginImage />
    </div>
  );
};

export default FaceRecognition;
