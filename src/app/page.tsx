"use client";

import React from "react";
import  { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  const handleClick = (route: string) => {
    router.push(route);
  };

  return (
    <main className="flex flex-col items-center justify-center p-4">
    <h1>Welcome to Wavly !!!</h1>
    <div className="flex min-h-screen flex-row items-center justify-center gap-4 p-6">
    <Button onClick={() => handleClick("/auth")}>Auth</Button>
    <Button onClick={() => handleClick("/note")}>Note</Button>
    </div>
    </main>
  )
}
