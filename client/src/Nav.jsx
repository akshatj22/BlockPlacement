import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button} from "@nextui-org/react";
import { Link} from "react-router-dom";
import { useState } from "react";
export default function App() {
    
  const [signOut , setSignOut] = useState(false)
  
  const handleSignOut = () => {
    setSignOut(true)
  }

  return (
    <Navbar position="static" className="background">
      <NavbarBrand>
        <p className="font-bold text-white text-xl">Etherdocs</p>
      </NavbarBrand> 
      <NavbarContent justify="end">
      <NavbarItem>
      <Link to="/">
      {signOut ? 
          <Button  color="secondary"  variant="flat" className="ml-[32px]">
            Sign Out
          </Button> : null}
      </Link>
        </NavbarItem>
        <NavbarItem>
      <Link to="signin">
          <Button  color="secondary"  variant="flat" className="ml-[32px]">
            Sign In
          </Button>
      </Link>
        </NavbarItem>
        <NavbarItem>
        <Link to = "signup">
          <Button  color="secondary" href="SignUp" variant="flat">
            Sign Up
          </Button>
        </Link>
        </NavbarItem>
        <NavbarItem>
        <Link to = "job">
          <Button  color="secondary" href="SignUp" variant="shadow">
            Job Portal
          </Button>
        </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
