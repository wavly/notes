"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Auth } from "@/app/_lib/db";
import { Button } from "@/components/ui/button";

export default function Home() {
  let AuthDb: Auth | null = null;
  const router = useRouter();
  const [isAuthed, setIsAuthed] = useState<string | null>(null);
  const [checkAuth, setCheckAuth] = useState<() => string | null>(() => nullAuthFunction);

  function nullAuthFunction() {
    return null;
  }

  useEffect(() => {
    AuthDb = new Auth("auth");

    function authFunction() {
      if (AuthDb) {
        return AuthDb.checkAuth();
      }
      return null;
    }

    setCheckAuth(() => authFunction);
  }, []);

  const authOut = async () => {
    if (AuthDb) {
      await AuthDb.removeAuth();
    }

    setIsAuthed(checkAuth);
  };

  const authIn = async () => {
    if (AuthDb) {
      await AuthDb.createAuth();
    }

    setIsAuthed(checkAuth);
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
        <Button onClick={() => router.push("/note")}>Note</Button>
      </div>
    </main>
  );
}
