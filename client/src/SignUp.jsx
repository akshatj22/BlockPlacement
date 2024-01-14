import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="signin__body">
    <div className="sign__form">
    <h1 className="text-black sign__text">Sign Up to Get Started</h1>
      <Input type="text" label="Name"/>
      <Input type="number" label="Enrollment Number"/>
      <Input type="text" label="Branch"/>
      <Input type="email" label="Email" />
      <Input type="password" label="Password"/>
      <Link to= "/">
      <Button color="secondary" variant="solid" size = "lg">
        Register
      </Button>
      </Link>
    </div>
    </div>
  );
}
