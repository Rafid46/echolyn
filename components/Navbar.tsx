import Image from "next/image";
import Link from "next/link";
import logo from "../public/images/echolyn.png";
import NavItems from "./NavItems";
import {
  ClerkProvider,
  SignIn,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
const Navbar = () => {
  return (
    <div
      style={{
        backgroundImage: `url('/images/line.png')`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "80% auto",
        zIndex: 50,
      }}
      className="flex items-center my-5 w-full h-20 bg-no-repeat bg-center bg-contain"
    >
      <nav className="navbar">
        <Link href="/">
          <div className="flex items-center gap-2.5 cursor-pointer">
            <Image
              src={logo}
              alt="logo"
              className="lg:w-[70px] w-[42px]"
              height={44}
            />
          </div>
        </Link>
        <NavItems />
        <div className="flex items-center gap-8">
          <SignedOut>
            <SignInButton>
              <Button className="btn-signin">Sign In</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton></UserButton>
          </SignedIn>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
