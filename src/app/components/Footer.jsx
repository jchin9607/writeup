import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div>
      <div className="min-h-[60px] sm:h-[60px] flex flex-col px-[5%]   justify-between mt-[auto] w-full">
        <div className="h-[1px] bg-muted"></div>
        <div className="flex sm:flex-row flex-col items-center w-full h-full justify-center gap-10 text-neutral-500 dark:text-neutral-400 py-10 sm:py-0">
          <Link
            href="https://hcb.hackclub.com/donations/start/writeup"
            target="_blank"
          >
            Donate
          </Link>
          <Link href="/join">
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
