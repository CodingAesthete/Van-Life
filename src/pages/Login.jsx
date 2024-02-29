import React, { useEffect } from "react";
import {
  useLoaderData,
  useNavigation,
  Form,
  redirect,
  useActionData
} from "react-router-dom";
import { loginUser } from "../api";

export function loader({ request }) {
  return new URL(request.url).searchParams.get("message");
}

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const pathname = new URL(request.url)
    .searchParams.get("redirectTo") || "/host";

  try {
    await loginUser({ email, password });
    localStorage.setItem("loggedin", true); // Set login status
    const response = redirect(pathname);
    response.body = true;
    return response;
  } catch (err) {
    return err.message;
  }
}

export default function Login() {
  const errorMessage = useActionData();
  const message = useLoaderData();
  const navigation = useNavigation();

  // Function to set login status after successful login
  const setLoggedInStatus = () => {
    localStorage.setItem("loggedin", true); // Set login status
    window.location.reload(); // Reload the page
  };

  useEffect(() => {
    // Check if user is already logged in, if yes, redirect to dashboard
    const loggedIn = localStorage.getItem("loggedin");
    if (loggedIn) {
      const pathname = new URL(window.location.href)
        .searchParams.get("redirectTo") || "/host";
      window.location.replace(pathname); // Redirect to dashboard
    }
  }, []);

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {message && <h3 className="red">{message}</h3>}
      {errorMessage && <h3 className="red">{errorMessage}</h3>}

      <Form method="post" className="login-form" replace>
        <input name="email" type="email" placeholder="Email address" />
        <input name="password" type="password" placeholder="Password" />
        <button
          onClick={setLoggedInStatus} // Call setLoggedInStatus on button click
          disabled={navigation.state === "submitting"}
        >
          {navigation.state === "submitting" ? "Logging in..." : "Log in"}
        </button>
      </Form>
    </div>
  );
}
