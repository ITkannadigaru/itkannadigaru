"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { GUEST_KEY, RETURN_KEY, SITE_ROOT } from "@/lib/visitor-session";

export default function VisitorGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/login" || pathname === "/login/";
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isLogin) return;
    let active = true;
    async function checkVisitor() {
      try {
        if (window.sessionStorage.getItem(GUEST_KEY) === "yes") {
          if (active) setReady(true);
          return;
        }
        if (supabase) {
          const { data, error } = await supabase.auth.getSession();
          if (error) throw error;
          if (!active) return;
          if (data.session) {
            setReady(true);
            return;
          }
        }
        window.sessionStorage.setItem(RETURN_KEY, `${window.location.pathname}${window.location.search}${window.location.hash}`);
        window.location.replace(`${SITE_ROOT}/login`);
      } catch {
        if (active) setError("We could not check your sign-in or browser storage. Open the sign-in page to try again or continue as a guest.");
      }
    }
    void checkVisitor();
    return () => { active = false; };
  }, [isLogin]);

  if (isLogin || ready) return children;
  return <main className="flex min-h-screen items-center justify-center p-6 text-center">
    {error ? <div><p role="alert" className="text-sm text-orange-200">{error}</p><a href={`${SITE_ROOT}/login`} className="mt-4 inline-block text-sm font-bold text-yellow underline">Open sign-in</a></div> : <p role="status" className="text-sm text-grey">Preparing your learning journey…</p>}
  </main>;
}
