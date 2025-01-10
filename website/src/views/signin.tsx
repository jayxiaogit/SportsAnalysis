import { SignIn, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";


const SignInPage = () => {

  const base_url = import.meta.env.VITE_BASE_URL;

  const { user, isSignedIn } = useUser();

  const addUserToDb = (id: string, name: string, email: string) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // console.log("Success");
      } 
    };

    const url = `${base_url}/user?user_name=${id}&name=${name}&email=${email}&is_owner=false`;
    xhr.open("POST", url, true);
    xhr.send();
  };

  useEffect(() => {
    if (isSignedIn && user?.id && user?.fullName && user?.primaryEmailAddress?.emailAddress) {
      addUserToDb(user?.id, user?.fullName, user?.primaryEmailAddress?.emailAddress);
    }
  }, [isSignedIn, user]);

  return <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />;
};

export default SignInPage;
