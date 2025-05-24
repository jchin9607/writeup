import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";
import ProfileControl from "./ProfileControl";
import { Martian_Mono } from "next/font/google";
import NavbarSignedOut from "./NavbarSignedOut";

const mono = Martian_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const Navbar = async () => {
  return (
    <div className="h-[60px] flex items-center px-[5%] justify-between w-full">
      <Link href="/" className={mono.className}>
        <h1 className="text-2xl">writeup.</h1>
      </Link>
      <div className="flex items-center gap-7">
        <NavbarSignedOut />
        <ProfileControl />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
