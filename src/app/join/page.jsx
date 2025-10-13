import React from "react";

const Join = () => {
  return (
    <div className="w-full min-h-screen flex justify-start items-start p-[5%] flex-col gap-4 my-[15%] sm:my-[10%] md:my-[0]">
      <h1 className="text-4xl font-bold mb-4">Join</h1>
      <h3 className="text-2xl font-bold">About</h3>
      <p>
        writeup. is a community of vibrant writers, and it is our mission to
        make sure all voices can be heard fairly. We are a 501(c)(3) non-profit
        and sponsored by Hack Club.
      </p>
      <p>
        We recently launched this project in October of 2024 and we need help
        applying the final touches!
      </p>
      <h3 className="text-2xl font-bold mt-4">Available Roles</h3>
      <ul className="list-disc">
        <li>Article writers/Bloggers</li>
        <li>Front End Developers</li>
        <li>Social Media Outreach</li>
        <li>UX Designer</li>
      </ul>
      <p>
        These roles are mainly for <b>high school students</b> since we can only
        give out volunteer hours. However, feel free to apply if you are still
        interested.
      </p>
      <a
        href="https://forms.gle/X9bYG5JYJnMMrLy56"
        className="link-primary"
        target="_blank"
      >
        Apply Here
      </a>
    </div>
  );
};

export default Join;
