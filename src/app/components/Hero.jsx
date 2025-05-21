import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import HeroPrimaryButton from "./HeroPrimaryButton";
import Image from "next/image";

const Hero = ({
  badge = "✨ Currently in Beta",
  heading = "For Students, By Students",
  description = "🌎 Join a free, student-run platform to share your thoughts and ideas.📝 Write and share articles with students worldwide and connect with a global community.",
  buttons = {
    primary: {
      text: "Log in / Sign up",
      url: "/auth",
    },
    secondary: {
      text: "View Articles",
      url: "/home",
    },
  },
  image = {
    src: "https://www.shadcnblocks.com/images/block/placeholder-1.svg",
    alt: "Hero section demo image showing interface components",
  },
}) => {
  return (
    <section className="py-32 ">
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {badge && (
              <Badge variant="outline">
                {badge}
                <ArrowUpRight className="ml-2 size-4" />
              </Badge>
            )}
            <h1 className="my-6 text-4xl font-bold text-pretty lg:text-6xl">
              {heading}
            </h1>
            <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
              {description}
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              {buttons.primary && (
                // <Button asChild className="w-full sm:w-auto">
                //   {/* <a href={buttons.primary.url}>{buttons.primary.text}</a> */}
                //   <Link href={buttons.primary.url}>{buttons.primary.text}</Link>
                // </Button>
                <HeroPrimaryButton
                  url={buttons.primary.url}
                  text={buttons.primary.text}
                />
              )}
              {buttons.secondary && (
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <Link href={buttons.secondary.url}>
                    {buttons.secondary.text}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
          <Image
            src={image.src}
            alt={image.alt}
            width={500}
            height={500}
            priority
            loading="eager"
            className="max-h-93 w-full rounded-md object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
