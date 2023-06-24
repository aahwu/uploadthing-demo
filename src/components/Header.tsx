import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export function Header() {
  const { user } = useUser();
  return (
    <nav className="flex justify-between border-b bg-gray-900 p-6">
      <Link href="/">
        <div className="text-2xl font-semibold text-gray-100">
          Uploagthing-demo
        </div>
      </Link>
      {user != null ? (
        <div className="flex gap-4 text-2xl">
          <Link href={`/profile/${user.id}`} className="">
            <span className=" text-gray-100">My Images</span>
          </Link>
          <UserButton />
        </div>
      ) : (
        <div>
          <SignInButton>
            <span className="text-2xl text-green-700">Log In</span>
          </SignInButton>
        </div>
      )}
    </nav>
  );
}
