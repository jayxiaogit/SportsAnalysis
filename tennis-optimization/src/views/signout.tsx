import { SignOutButton } from "@clerk/clerk-react";
import { Link } from 'react-router-dom';
 
const SignOutPage = () => (
  <Link to="/"><SignOutButton>Logout</SignOutButton></Link>
);
 
export default SignOutPage;