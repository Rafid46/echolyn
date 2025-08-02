import Image from "next/image";
import Link from "next/link";
import logo from "../public/images/echolyn.png";
import NavItems from "./NavItems";
const Navbar = () => {
  return (
    <div>
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
        <div className="flex items-center gap-8">
          <NavItems />
          <p>Sign In</p>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
