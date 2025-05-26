// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "@/firebase/firebase";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// import { redirect } from "next/navigation";

const HeroPrimaryButton = ({ url, text }) => {
  // const [user, loading, error] = useAuthState(auth);
  // if (user) {
  //   redirect("/home");

  // }

  // if (loading) {
  //   return (
  //     <Button asChild className="w-full sm:w-auto">
  //       {/* <a href={buttons.primary.url}>{buttons.primary.text}</a> */}
  //       <Link href={url}>{text}</Link>
  //     </Button>
  //   );
  // }

  // if (error) {
  //   return (
  //     <Button asChild className="w-full sm:w-auto">
  //       {/* <a href={buttons.primary.url}>{buttons.primary.text}</a> */}
  //       <Link href={url}>Error</Link>
  //     </Button>
  //   );
  // }

  return (
    <Button asChild className="w-full sm:w-auto">
      {/* <a href={buttons.primary.url}>{buttons.primary.text}</a> */}
      <Link href={url}>{text}</Link>
    </Button>
  );
};

export default HeroPrimaryButton;
