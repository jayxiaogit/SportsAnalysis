import { SignIn, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";

const SignInPage = () => {
  const { user, isSignedIn } = useUser();

  const addUserToDb = (user) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log("Success");
      } 
    };

    const username = user?.id;
    const name = user?.fullName;
    const email = user.primaryEmailAddress?.emailAddress;

    const url = `http://localhost:6969/user?user_name=${username}&name=${name}&email=${email}&is_owner=false`;
    xhr.open("POST", url, true);
    xhr.send();
  };

  useEffect(() => {
    if (isSignedIn && user) {
      addUserToDb(user);
    }
  }, [isSignedIn, user]);

  return <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />;
};

export default SignInPage;
