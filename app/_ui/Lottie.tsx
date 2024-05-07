"use client";

import L from "react-lottie-player";

export default function Lottie({ ...props }) {
  return <L loop={false} play className="absolute left-0 top-0" {...props} />;
}
