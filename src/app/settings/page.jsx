"use client";

import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { toast } from "sonner";

// Define validation schemas without zod for simplicity
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email) || "Please enter a valid email address.";
};

export default function SettingsPage() {
  const profileForm = useForm({
    defaultValues: {
      username: "johndoe",
      email: "john.doe@example.com",
      bio: "I'm a software developer based in New York.",
    },
  });

  const appearanceForm = useForm({
    defaultValues: {
      theme: "system",
    },
  });

  const notificationsForm = useForm({
    defaultValues: {
      emailNotifications: true,
      pushNotifications: false,
    },
  });

  function onProfileSubmit(data) {
    toast({ title: "Profile updated" });
    console.log(data);
  }

  function onAppearanceSubmit(data) {
    toast({ title: "Appearance updated" });
    console.log(data);
  }

  function onNotificationsSubmit(data) {
    toast({ title: "Notification preferences updated" });
    console.log(data);
  }

  return (
    <div className="container max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-medium mb-6">Settings</h1>

      {/* <Tabs defaultValue="profile" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3 mb-2">
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList> */}

      {/* <TabsContent value="profile"> */}
      <Form {...profileForm}>
        <form
          onSubmit={profileForm.handleSubmit(onProfileSubmit)}
          className="space-y-6"
        >
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src="/placeholder.svg?height=64&width=64"
                alt="Avatar"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">
              Change
            </Button>
          </div>

          <FormField
            control={profileForm.control}
            name="username"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={profileForm.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john.doe@example.com" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={profileForm.control}
            name="bio"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="pt-2">
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Form>
      {/* </TabsContent> */}

      {/* <TabsContent value="appearance">
          <Form {...appearanceForm}>
            <form
              onSubmit={appearanceForm.handleSubmit(onAppearanceSubmit)}
              className="space-y-6"
            >
              <FormField
                control={appearanceForm.control}
                name="theme"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Theme</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full max-w-xs">
                          <SelectValue placeholder="Select a theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="pt-2">
                <Button type="submit">Save</Button>
              </div>
            </form>
          </Form>
        </TabsContent>

        <TabsContent value="notifications">
          <Form {...notificationsForm}>
            <form
              onSubmit={notificationsForm.handleSubmit(onNotificationsSubmit)}
              className="space-y-6"
            >
              <FormField
                control={notificationsForm.control}
                name="emailNotifications"
                render={({ field }) => (
                  <div className="flex items-center justify-between py-3 border-b">
                    <FormLabel className="cursor-pointer">
                      Email Notifications
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </div>
                )}
              />

              <FormField
                control={notificationsForm.control}
                name="pushNotifications"
                render={({ field }) => (
                  <div className="flex items-center justify-between py-3 border-b">
                    <FormLabel className="cursor-pointer">
                      Push Notifications
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </div>
                )}
              />

              <div className="pt-2">
                <Button type="submit">Save</Button>
              </div>
            </form>
          </Form>
        </TabsContent> */}
      {/* </Tabs> */}
    </div>
  );
}
