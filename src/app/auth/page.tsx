"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

import { Auth } from "@/app/_lib/db";
import { Button } from "@/components/ui/button";

export default function AuthPage() {
  const AuthDb = new Auth("auth");
  const router = useRouter();
  const [isAuthed, setIsAuthed] = useState<string | null>(null);
  const [checkAuth, setCheckAuth] = useState<() => string | null>(
    () => nullAuthFunction
  );

  function nullAuthFunction() {
    return null;
  }

  useEffect(() => {
    const authFunction = () => {
      return AuthDb.checkAuth();
    };

    setCheckAuth(() => authFunction);
  }, []);

  const authOut = async () => {
    await AuthDb.removeAuth();
    setIsAuthed(checkAuth());
  };

  const authIn = async () => {
    await AuthDb.createAuth();
    setIsAuthed(checkAuth());
  };

  return (
    <main className="flex flex-col items-center justify-center p-4">
      <h1>Just a template for authentication with localStorage </h1>
      <div className="flex min-h-screen flex-row items-center justify-center gap-4 p-2">
        {!isAuthed ? (
          <Button onClick={authIn}>Auth In</Button>
        ) : (
          <Button onClick={authOut}>Auth Out</Button>
        )}
        <Button><Link href="/note">Note</Link></Button>
      </div>
    </main>
  );
}
