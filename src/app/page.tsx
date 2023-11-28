"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center p-4">
      <h1>Welcome to Wavly !!!</h1>
      <div className="flex min-h-screen flex-row items-center justify-center gap-4 p-6">
        <Button>
          <Link href="/auth">Auth</Link>
        </Button>
        <Button>
          <Link href="/note">Note</Link>
        </Button>
      </div>
    </main>
  );
}
