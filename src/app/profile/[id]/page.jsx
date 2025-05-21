import { Github, Mail, MapPin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ProfileToggleSection from "@/components/profile-toggle-section";
// import { db } from "@/firebase/firebase";
// import { doc, getDoc } from "firebase/firestore";
import ProfileFollowSection from "@/app/components/ProfileFollowSection";
import { fetchProfile } from "@/hooks/GetUserData";
import WrittenBlogs from "./WrittenBlogs";

// export const fetchProfile = async (id) => {
//   "use cache";

//   const docRef = doc(db, "users", id);
//   const docSnap = await getDoc(docRef);

//   if (docSnap.exists()) {
//     const docData = docSnap.data();
//     return docData;
//   } else {
//     console.log(
//       "Document does not exist or you don't have permission to access it."
//     );
//     throw new Error(
//       "Document does not exist or you don't have permission to access it."
//     );
//   }
// };

export default async function ProfilePage({ params }) {
  const param = await params;
  const id = decodeURIComponent(param.id);
  const data = await fetchProfile(id);

  return (
    <div className="min-h-screen ">
      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="relative h-24 w-24 rounded-full overflow-hidden border border-[#e6e6e6] dark:border-[#333]">
            <Image
              src={data?.photoURL}
              alt="Profile picture"
              width={96}
              height={96}
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{data.fullName}</h1>
            <p className="text-[#6b7280] dark:text-[#a8a29e] text-lg">
              {data.username}
            </p>
            <div className="flex items-center gap-2 mt-2 text-sm text-[#6b7280] dark:text-[#a8a29e] ">
              <ProfileFollowSection
                followers={data.followers}
                following={data.following}
                id={id}
              />
            </div>
          </div>
        </div>

        {/* Location and contact */}
        <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-[#6b7280] dark:text-[#a8a29e]">
          <div className="flex items-center gap-1">
            <MapPin size={16} />
            <span>San Francisco, CA</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={"mailto:" + data.email}
              className="flex items-center gap-1 hover:text-[#37352f] dark:hover:text-[#e6e6e6] transition-colors"
              aria-label="Email"
            >
              <Mail size={16} />
              <span>{data.email}</span>
            </Link>
            <Link
              href="https://github.com"
              className="hover:text-[#37352f] dark:hover:text-[#e6e6e6] transition-colors"
              aria-label="GitHub"
            >
              <Github size={16} />
            </Link>
            <Link
              href="https://twitter.com"
              className="hover:text-[#37352f] dark:hover:text-[#e6e6e6] transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={16} />
            </Link>
          </div>
        </div>

        <Separator className="my-6 bg-[#e6e6e6] dark:bg-[#333]" />

        {/* About section */}
        <ProfileToggleSection title="About">
          <div className="prose dark:prose-invert max-w-none text-[#37352f] dark:text-[#e6e6e6]">
            {data.bio}
          </div>
        </ProfileToggleSection>

        {/* Experience section */}
        {/* <ProfileToggleSection title="Experience">
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#262626] p-4 rounded-lg border border-[#e6e6e6] dark:border-[#333]">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">Senior Product Designer</h3>
                  <p className="text-[#6b7280] dark:text-[#a8a29e]">
                    TechCorp Inc.
                  </p>
                </div>
                <p className="text-sm text-[#6b7280] dark:text-[#a8a29e]">
                  2021 - Present
                </p>
              </div>
              <p className="mt-2 text-sm">
                Leading design for enterprise products, managing a team of 3
                designers, and collaborating with engineering to implement
                design systems.
              </p>
            </div>

            <div className="bg-white dark:bg-[#262626] p-4 rounded-lg border border-[#e6e6e6] dark:border-[#333]">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">UX Designer & Developer</h3>
                  <p className="text-[#6b7280] dark:text-[#a8a29e]">StartupX</p>
                </div>
                <p className="text-sm text-[#6b7280] dark:text-[#a8a29e]">
                  2018 - 2021
                </p>
              </div>
              <p className="mt-2 text-sm">
                Designed and developed user interfaces for mobile and web
                applications, conducted user research, and implemented design
                improvements based on analytics.
              </p>
            </div>
          </div>
        </ProfileToggleSection> */}

        {/* Skills section */}
        {/* <ProfileToggleSection title="Skills">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Design</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-white dark:bg-[#262626]">
                  UI Design
                </Badge>
                <Badge variant="outline" className="bg-white dark:bg-[#262626]">
                  UX Research
                </Badge>
                <Badge variant="outline" className="bg-white dark:bg-[#262626]">
                  Figma
                </Badge>
                <Badge variant="outline" className="bg-white dark:bg-[#262626]">
                  Design Systems
                </Badge>
                <Badge variant="outline" className="bg-white dark:bg-[#262626]">
                  Prototyping
                </Badge>
                <Badge variant="outline" className="bg-white dark:bg-[#262626]">
                  Wireframing
                </Badge>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Development</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-white dark:bg-[#262626]">
                  React
                </Badge>
                <Badge variant="outline" className="bg-white dark:bg-[#262626]">
                  Next.js
                </Badge>
                <Badge variant="outline" className="bg-white dark:bg-[#262626]">
                  TypeScript
                </Badge>
                <Badge variant="outline" className="bg-white dark:bg-[#262626]">
                  Tailwind CSS
                </Badge>
                <Badge variant="outline" className="bg-white dark:bg-[#262626]">
                  Node.js
                </Badge>
                <Badge variant="outline" className="bg-white dark:bg-[#262626]">
                  GraphQL
                </Badge>
              </div>
            </div>
          </div>
        </ProfileToggleSection> */}

        {/* Written Blogs section */}
        <WrittenBlogs id={id} />
        {/* Education section */}
        {/* <ProfileToggleSection title="Education">
          <div className="bg-white dark:bg-[#262626] p-4 rounded-lg border border-[#e6e6e6] dark:border-[#333]">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">
                  Bachelor of Science in Computer Science
                </h3>
                <p className="text-[#6b7280] dark:text-[#a8a29e]">
                  University of California, Berkeley
                </p>
              </div>
              <p className="text-sm text-[#6b7280] dark:text-[#a8a29e]">
                2014 - 2018
              </p>
            </div>
            <p className="mt-2 text-sm">
              Specialized in Human-Computer Interaction and Software
              Engineering. Minor in Design Innovation.
            </p>
          </div>
        </ProfileToggleSection> */}

        {/* Contact section */}
        {/* <div className="mt-10 bg-white dark:bg-[#262626] p-6 rounded-lg border border-[#e6e6e6] dark:border-[#333] text-center">
          <h2 className="text-xl font-medium mb-4">Let's work together</h2>
          <p className="text-[#6b7280] dark:text-[#a8a29e] mb-6 max-w-md mx-auto">
            I'm currently available for freelance work and interesting projects.
            Feel free to reach out!
          </p>
          <Button className="bg-[#37352f] hover:bg-[#2e2c26] text-white dark:bg-[#e6e6e6] dark:text-[#191919] dark:hover:bg-[#d1d1d1]">
            Contact Me
          </Button>
        </div> */}

        {/* Footer */}
        {/* <footer className="mt-16 text-center text-sm text-[#6b7280] dark:text-[#a8a29e]">
          <p>Last updated May 2024</p>
        </footer> */}
      </div>
    </div>
  );
}
