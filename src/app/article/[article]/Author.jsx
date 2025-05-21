import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { fetchProfile } from "@/hooks/GetUserData";

export default async function Author({ articleData }) {
  const authorData = await fetchProfile(articleData.author);
  return (
    <>
      <div className="flex gap-3 items-center">
        <Link href={"/profile/" + articleData.author}>
          <Avatar className="size-7 rounded-full">
            <AvatarImage
              src={authorData.photoURL}
              alt="placeholder"
              className="object-cover"
            />
          </Avatar>
        </Link>
        <div>
          <h2 className="font-semibold">{authorData.fullName}</h2>
          <p className="text-xs text-muted-foreground">{articleData.date}</p>
        </div>
      </div>
    </>
  );
}
