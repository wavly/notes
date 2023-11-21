"use client";

import { Button } from "@/components/ui/button";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const session = useSession();
  return (
    <>
      <Button>login with Google</Button>
      <Button onClick={() => signIn("discord")}>login with Discord</Button>
      {session?.data?.user.email && (
        <Button variant={"destructive"}>Log out</Button>
      )}
    </>
  );
}
