"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { profileName } from "@/lib/profile";

export default function AccountLink() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!supabase) return;
    let active = true;
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) setUser(session?.user ?? null);
    });
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  if (!user) return <Link href="/login" className="text-sm font-semibold text-yellow">Sign in</Link>;

  const name = profileName(user.user_metadata);
  return <Link href="/login" aria-label={`Profile: ${name}`} className="inline-flex min-w-0 items-center gap-2 rounded-full border border-yellow/30 bg-yellow/5 py-1 pl-1 pr-3 text-sm font-semibold text-white hover:border-yellow">
    <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow text-background">{Array.from(name)[0].toLocaleUpperCase()}</span>
    <span className="max-w-[3.5rem] truncate sm:max-w-[9rem]">{name}</span>
  </Link>;
}
