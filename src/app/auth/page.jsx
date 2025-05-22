import { LoginForm } from "../components/login-form";
import { Suspense } from "react";
import Loading from "../components/Loading";
import Image from "next/image";

export default async function LoginPage() {
  return (
    <div className="grid min-h-[calc(100vh-60px)]  lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Suspense fallback={<Loading />}>
              <LoginForm />
            </Suspense>
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          src="/placeholder.jpg"
          width={600}
          height={600}
          priority
          loading="eager"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
