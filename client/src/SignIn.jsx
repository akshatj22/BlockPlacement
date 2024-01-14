import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function SignIn({handleSignOut}) {
  return (
    <div className="signin__body">
    <div className="sign__form">
    <h1 className="text-black sign__text">Sign In to Your Account</h1>
      
      <Input type="email" label="Email" />
      <Input type="password" label="Password"/>

      <Link to="/">
      <Button color="secondary" variant="solid" size = "lg" onClick={handleSignOut}>
        Sign In
      </Button>
      </Link>
    </div>
    </div>
  );
}
