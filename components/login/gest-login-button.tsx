"use client";
import React from "react";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function GestLoginButton() {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        authClient.signIn.anonymous().then(() => {
          router.push("/");
        });
      }}
      variant="outline"
      type="button"
      className="w-full"
    >
      ゲストログイン
    </Button>
  );
}
