"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import { fetchProfile } from "@/hooks/GetUserData";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import RefreshData from "@/hooks/RefreshData";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { storage } from "@/firebase/firebase";
import { useRouter } from "next/navigation";
import { useDeleteUser } from "react-firebase-hooks/auth";

export default function SettingsPage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteUser] = useDeleteUser(auth);
  const router = useRouter();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) {
      return;
    }
    if (user) {
      fetchProfile(user.uid).then((data) => {
        const obj = {
          fullName: data?.fullName || null,
          username: data?.username || null,
          bio: data?.bio || null,
          location: data?.location || null,
          website: data?.website || null,
          github: data?.github || null,
          twitter: data?.twitter || null,
          photoURL: data?.photoURL || null,

          lastUpdated: data?.lastUpdated || null,
        };
        setProfile(obj);
        setLoading(false);
      });
    }
  }, [user]);

  if (loading) {
    return (
      <p className="flex justify-center items-center w-full h-[calc(100vh-120px)]">
        Loading...
      </p>
    );
  }

  async function updateProfile() {
    if (!user) {
      return;
    }

    if (!profile) {
      return;
    }

    if (!profile.fullName || !profile.username || !profile.bio) {
      window.prompt("Please fill out name, username and/or bio");
      return;
    }
    const thirtyDays = 1000 * 60 * 60 * 24 * 30;

    if (
      profile?.lastUpdated &&
      profile.lastUpdated > new Date().getTime() - thirtyDays
    ) {
      window.prompt(
        "You can only update your profile once every 30 days, if you made a mistake please contact us"
      );
      return;
    }

    await updateDoc(doc(db, "users", user.uid), {
      fullName: profile.fullName,
      username: profile.username,
      bio: profile.bio,
      location: profile.location || null,
      website: profile.website || null,
      twitter: profile.twitter || null,
      github: profile.github || null,
      lastUpdated: new Date(),
    });
    RefreshData(user.uid);
    window.prompt("Profile updated successfully");
    router.push("/profile/" + user.uid);
  }

  async function handlePictureUpload(body) {
    if (!user || !body) {
      return;
    }
    if (!user.uid) {
      return;
    }
    if (body.size > 1000000) {
      window.prompt("image must be less than 1mb");
      return;
    }
    const path = "images/" + user.uid + "photoURL";
    const imageRef = ref(storage, path);

    try {
      await uploadBytes(imageRef, body);
      window.prompt("Image uploaded successfully");
      const url = await getDownloadURL(imageRef);
      await updateDoc(doc(db, "users", user.uid), {
        photoURL: url,
      });
      RefreshData(user.uid);
      setProfile({ ...profile, photoURL: url });
    } catch (error) {
      throw new Error(error);
    }
  }

  function handleDeleteAccount() {
    if (window.confirm("Are you sure you want to delete your account?")) {
      deleteUser();
      router.push("/");
    }
  }

  return (
    <div className="container max-w-3xl mx-auto py-8 px-[5%]">
      <h1 className="text-2xl font-medium mb-6">Settings</h1>

      {/* <Tabs defaultValue="profile" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3 mb-2">
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList> */}

      {/* <TabsContent value="profile"> */}

      <div className="flex items-center gap-4 mb-6">
        <Avatar className="h-16 w-16">
          <AvatarImage
            src={profile?.photoURL}
            alt="Avatar"
            className="object-cover"
          />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <input
          type="file"
          id="elProfilePic"
          accept="image/*"
          onChange={(e) => handlePictureUpload(e.target.files[0])}
          hidden
        />
        <Button asChild variant="outline" size="sm">
          <label htmlFor="elProfilePic">Change</label>
        </Button>{" "}
        <br />
        <p className="text-sm text-muted-foreground">
          Profile Picture changes are seperate from your other settings
        </p>
      </div>

      <div className="mb-4">
        <p className="mb-2">Full Name</p>
        <span>
          <Input
            placeholder="John Doe"
            value={profile?.fullName || ""}
            onChange={(e) => {
              setProfile({
                ...profile,
                fullName: e.target.value,
              });
            }}
          />
        </span>
      </div>

      <div className="mb-4">
        <p className="mb-2">Username</p>
        <span>
          <Input
            placeholder="johndoe"
            value={profile?.username || ""}
            onChange={(e) => {
              setProfile({
                ...profile,
                username: e.target.value,
              });
            }}
          />
        </span>
      </div>

      <div className="mb-4">
        <p className="mb-2">Bio</p>
        <span>
          <Textarea
            placeholder="Tell us a little bit about yourself"
            className="resize-none"
            value={profile?.bio || ""}
            onChange={(e) => {
              setProfile({
                ...profile,
                bio: e.target.value,
              });
            }}
          />
        </span>
      </div>

      <div className="mb-4">
        <p className="mb-2">Location</p>
        <span>
          <Input
            placeholder="Boston, MA, USA"
            value={profile?.location || ""}
            onChange={(e) => {
              setProfile({
                ...profile,
                location: e.target.value,
              });
            }}
          />
        </span>
      </div>

      <div className="my-4">
        <p className="my-2 text-lg">Links</p>
        <span>
          <p className="text-sm mb-2">Website</p>
          <Input
            placeholder="https://johndoe.com"
            value={profile?.website || ""}
            onChange={(e) => {
              setProfile({
                ...profile,
                website: e.target.value,
              });
            }}
          />
        </span>
        <span>
          <p className="text-sm mb-2">Twitter</p>
          <Input
            placeholder="https://twitter.com/johndoe"
            value={profile?.twitter || ""}
            onChange={(e) => {
              setProfile({
                ...profile,
                twitter: e.target.value,
              });
            }}
          />
        </span>
        <span>
          <p className="text-sm mb-2">GitHub</p>
          <Input
            placeholder="https://github.com/johndoe"
            value={profile?.github || ""}
            onChange={(e) => {
              setProfile({
                ...profile,
                github: e.target.value,
              });
            }}
          />
        </span>
      </div>

      <div className="pt-2">
        <Button onClick={updateProfile}>Save</Button>
      </div>
      <div className="pt-10" onClick={() => handleDeleteAccount()}>
        <Button variant="destructive">Delete Account</Button>
      </div>
    </div>
  );
}
