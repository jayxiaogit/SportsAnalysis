import GetStarted from "./views/get-started";
import ErrorPage from "./views/error-page";
import Dashboard from "./views/dashboard";
import About from "./views/about";
import SignInPage from "./views/signin";
import SignUpPage from "./views/signup";
import SignOutPage from "./views/signout"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./views/home";
import GenerateSchedule from "./views/generate-schedule";
import ExistingSchedules from "./views/existing-schedules";
import CreateProfile from "./views/create-profile";
import ExistingProfiles from "./views/existing-profiles";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/getstarted",
      element: <GetStarted />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/about",
      element: <About />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/new-profile",
      element: <Dashboard />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/create-profile",
      element: <CreateProfile />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/existing-profiles",
      element: <ExistingProfiles />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/existing-schedules",
      element: <ExistingSchedules />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/generate-schedule",
      element: <GenerateSchedule />,
      errorElement: <ErrorPage />,
    },
    { path: "/sign-up/*", element: <SignUpPage /> },
    { path: "/sign-in/*", element: <SignInPage /> },
    { path: "/sign-out/*", element: <SignOutPage />},
  ]);
  
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
