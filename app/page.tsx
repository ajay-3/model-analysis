"use client";
import { useState } from "react";
import EmailVerification from "@/src/components/generic/EmailVerification";
import FaceRecognition from "@/src/components/generic/FaceRecognition";

export default function Home() {
  const [emailVerified, setEmailVerified] = useState(false);
  const handleEmailVerification = (isVerified: boolean) => {
    setEmailVerified(isVerified);
  };
  return (
    <>
      {!emailVerified ? (
        <EmailVerification handleEmailVerified={handleEmailVerification} />
      ) : (
        <FaceRecognition />
      )}
    </>
  );
}
