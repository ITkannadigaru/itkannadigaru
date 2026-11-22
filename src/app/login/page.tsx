"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    const client = supabase;
    const callback = new URLSearchParams(window.location.hash.slice(1));
    if (callback.has("error")) {
      setError("Google sign-in was not completed. Please try again or check the provider configuration.");
      window.history.replaceState(null, "", window.location.pathname);
    }
    let active = true;
    const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
      if (active) setUser(session?.user ?? null);
    });
    client.auth.getSession().then(({ data, error }) => {
      if (!active) return;
      if (error) setError(`Could not restore your sign-in: ${error.message}`);
      setUser(data.session?.user ?? null);
      setLoading(false);
    }).catch(() => {
      if (active) {
        setError("Could not restore your sign-in. Please check your connection and try again.");
        setLoading(false);
      }
    });
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  async function signIn() {
    if (!supabase) return;
    setBusy(true);
    setError("");
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/itkannadigaru/login` },
      });
      if (error) {
        setError(`Could not start Google sign-in: ${error.message}`);
        setBusy(false);
      }
    } catch {
      setError("Could not start Google sign-in. Please check your connection and try again.");
      setBusy(false);
    }
  }

  async function signOut() {
    if (!supabase) return;
    setBusy(true);
    setError("");
    try {
      const { error } = await supabase.auth.signOut();
      if (error) setError(`Could not sign out: ${error.message}`);
    } catch {
      setError("Could not sign out. Please check your connection and try again.");
    }
    setBusy(false);
  }

  return (
    <main className="min-h-screen">
      <header className="border-b border-white/10">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-8" aria-label="Main navigation">
          <Link href="/" className="text-lg font-extrabold"><span className="text-yellow">&lt;/&gt;</span> ITKannadigaru</Link>
          <Link href="/#courses" className="text-sm text-grey hover:text-white">All courses</Link>
        </nav>
      </header>
      <section className="mx-auto max-w-xl px-5 py-20">
        <div className="rounded-3xl border border-white/10 bg-card/80 p-7 sm:p-10">
          <p className="text-xs font-bold tracking-[0.2em] text-yellow">LEARN IN KANNADA</p>
          <h1 className="mt-4 text-3xl font-extrabold">Student sign in</h1>
          <p className="mt-4 text-sm leading-7 text-grey">Sign in with Google, or continue learning as a guest. Subscribing to the YouTube channel is optional.</p>
          {!supabase ? <p role="alert" className="mt-6 text-sm text-orange-200">Sign-in is not configured for this deployment yet.</p> :
            loading ? <p role="status" className="mt-6 text-sm text-grey">Checking your sign-in…</p> :
              user ? <div className="mt-6"><p className="text-sm">Signed in as <strong>{user.email ?? "Google user"}</strong>.</p><button disabled={busy} onClick={signOut} className="mt-5 rounded-full border border-white/20 px-5 py-3 text-sm font-bold disabled:opacity-50">Sign out</button></div> :
                <button disabled={busy} onClick={signIn} className="mt-6 rounded-full bg-yellow px-6 py-3 text-sm font-bold text-background disabled:opacity-50">Continue with Google</button>}
          {error && <p role="alert" className="mt-4 text-sm text-red-300">{error}</p>}
          <p className="mt-6 text-xs leading-6 text-grey">Your learning progress currently stays in this browser; signing in does not sync or import it yet.</p>
          <Link href="/#courses" className="mt-5 inline-block text-sm font-bold text-yellow underline underline-offset-4">Continue to courses</Link>
        </div>
      </section>
    </main>
  );
}
