import Feed from "../components/Feed";

const page = () => {
  const heading = "Blog Posts";
  const description =
    "Discover the latest insights, articles, and resources from our talent community.";
  return (
    <div className=" flex justify-center w-full px-[5%] ">
      <section className="py-32">
        <div className="container flex flex-col items-center gap-16">
          <div className="text-center">
            <h2 className="mx-auto mb-6 text-3xl font-semibold text-pretty md:text-4xl lg:max-w-3xl">
              {heading}
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
              {description}
            </p>
          </div>

          <Feed />
        </div>
      </section>
    </div>
  );
};

export default page;
