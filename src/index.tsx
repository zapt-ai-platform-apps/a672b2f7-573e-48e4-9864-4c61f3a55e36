import React from "react";
import ReactDOM from "react-dom/client";
import * as Sentry from "@sentry/browser";
import App from "./App";
import "./index.css";

Sentry.init({
  dsn: import.meta.env.VITE_PUBLIC_SENTRY_DSN,
  environment: import.meta.env.VITE_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: "frontend",
      projectId: import.meta.env.VITE_PUBLIC_APP_ID
    }
  }
});

if (import.meta.env.VITE_PUBLIC_APP_ENV !== "development") {
  const umamiScript = document.createElement("script");
  umamiScript.defer = true;
  umamiScript.src = "https://cloud.umami.is/script.ts";
  umamiScript.setAttribute("data-website-id", import.meta.env.VITE_PUBLIC_UMAMI_WEBSITE_ID);
  document.head.appendChild(umamiScript);
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);