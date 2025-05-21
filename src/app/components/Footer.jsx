import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div>
      <div className="h-[60px] flex flex-col px-[5%] justify-between mt-[auto] w-full">
        <div className="h-[1px] bg-muted"></div>
        <div className="flex items-center w-full h-full justify-center gap-10 text-neutral-400">
          <Link
            href="https://hcb.hackclub.com/donations/start/writeup"
            target="_blank"
          >
            Donate
          </Link>
          <Link href="https://forms.gle/X9bYG5JYJnMMrLy56" target="_blank">
            Join
          </Link>
          <Link href="https://discord.gg/xXaXAjEN47" target="_blank">
            Contact
          </Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/tos">Terms of Use</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
