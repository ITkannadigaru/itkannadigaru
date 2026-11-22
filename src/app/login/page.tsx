"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { SOCIAL_LINKS } from "@/lib/links";
import { GUEST_KEY, OAUTH_KEY, RETURN_KEY, safeReturnPath, SITE_ROOT } from "@/lib/visitor-session";
import { profileName } from "@/lib/profile";

export default function LoginPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [notice, setNotice] = useState("");

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
      if (active) {
        setUser(session?.user ?? null);
        if (session) finishLogin();
      }
    });
    client.auth.getSession().then(({ data, error }) => {
      if (!active) return;
      if (error) setError(`Could not restore your sign-in: ${error.message}`);
      setUser(data.session?.user ?? null);
      if (data.session) finishLogin();
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

  function finishLogin() {
    try {
      if (window.sessionStorage.getItem(OAUTH_KEY) !== "yes") return;
      const destination = safeReturnPath(window.sessionStorage.getItem(RETURN_KEY));
      window.sessionStorage.removeItem(OAUTH_KEY);
      window.sessionStorage.removeItem(RETURN_KEY);
      window.sessionStorage.removeItem(GUEST_KEY);
      window.location.replace(destination);
    } catch {
      setError("Sign-in succeeded, but we couldn't restore your destination. Use Continue to courses.");
    }
  }

  function continueAsGuest() {
    try {
      const destination = safeReturnPath(window.sessionStorage.getItem(RETURN_KEY));
      window.sessionStorage.setItem(GUEST_KEY, "yes");
      window.sessionStorage.removeItem(RETURN_KEY);
      window.sessionStorage.removeItem(OAUTH_KEY);
      window.location.replace(destination);
    } catch {
      setError("Guest access requires browser session storage. Please allow it and try again.");
    }
  }

  async function signIn() {
    if (!supabase) return;
    setBusy(true);
    setError("");
    try {
      window.sessionStorage.setItem(OAUTH_KEY, "yes");
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}${SITE_ROOT}/login` },
      });
      if (error) {
        window.sessionStorage.removeItem(OAUTH_KEY);
        setError(`Could not start Google sign-in: ${error.message}`);
        setBusy(false);
      }
    } catch {
      try {
        window.sessionStorage.removeItem(OAUTH_KEY);
      } catch {
        // The error below also covers blocked browser storage.
      }
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

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextName = name.trim();
    if (!nextName) {
      setError("Enter a profile name.");
      return;
    }
    if (!supabase || !user) return;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const { data, error } = await supabase.auth.updateUser({ data: { display_name: nextName } });
      if (error) {
        setError(`Could not save your profile: ${error.message}`);
      } else if (data.user) {
        setUser(data.user);
        setEditing(false);
        setNotice("Profile name saved.");
      } else {
        setError("Could not confirm the profile update. Please try again.");
      }
    } catch {
      setError("Could not save your profile. Please check your connection and try again.");
    }
    setBusy(false);
  }

  return (
    <main className="min-h-screen">
      <header className="border-b border-white/10">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-8" aria-label="Main navigation">
          <Link href="/" className="text-lg font-extrabold"><span className="text-yellow">&lt;/&gt;</span> ITKannadigaru</Link>
          {user ? <Link href="/#courses" className="text-sm text-grey hover:text-white">All courses</Link> : <button type="button" onClick={continueAsGuest} className="text-sm text-grey hover:text-white">Continue as guest</button>}
        </nav>
      </header>
      <section className="mx-auto max-w-xl px-5 py-20">
        <div className="rounded-3xl border border-white/10 bg-card/80 p-7 sm:p-10">
          <p className="text-xs font-bold tracking-[0.2em] text-yellow">LEARN IN KANNADA</p>
          <h1 className="mt-4 text-3xl font-extrabold">{user ? "Your profile" : "Student sign in"}</h1>
          <p className="mt-4 text-sm leading-7 text-grey">{user ? "Your profile name appears in the top corner while you are signed in." : "Sign in with Google, or continue learning as a guest. Subscribing to the YouTube channel is optional."}</p>
          {!supabase ? <p role="alert" className="mt-6 text-sm text-orange-200">Sign-in is not configured for this deployment yet.</p> :
            loading ? <p role="status" className="mt-6 text-sm text-grey">Checking your sign-in…</p> :
              user ? <div className="mt-6">
                <p className="text-xs font-bold tracking-widest text-grey">PROFILE NAME</p>
                <p className="mt-2 break-words text-xl font-bold">{profileName(user.user_metadata)}</p>
                <p className="mt-2 break-all text-sm text-grey">Signed in as {user.email ?? "Google user"}.</p>
                {editing ? <form onSubmit={saveProfile} className="mt-5">
                  <label htmlFor="profile-name" className="text-sm font-semibold">Profile name</label>
                  <input id="profile-name" value={name} onChange={(event) => setName(event.target.value)} maxLength={80} required autoComplete="name" className="mt-2 block w-full rounded-xl border border-white/20 bg-background px-4 py-3 text-sm text-white focus:border-yellow focus:outline-none" />
                  <div className="mt-3 flex flex-wrap gap-3"><button type="submit" disabled={busy} className="rounded-full bg-yellow px-5 py-2.5 text-sm font-bold text-background disabled:opacity-50">Save name</button><button type="button" disabled={busy} onClick={() => { setEditing(false); setError(""); }} className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold disabled:opacity-50">Cancel</button></div>
                </form> : <button type="button" disabled={busy} onClick={() => { setName(profileName(user.user_metadata)); setEditing(true); setError(""); setNotice(""); }} className="mt-5 text-sm font-bold text-yellow underline underline-offset-4 disabled:opacity-50">Edit profile name</button>}
                <div><button type="button" disabled={busy} onClick={signOut} className="mt-5 rounded-full border border-white/20 px-5 py-3 text-sm font-bold disabled:opacity-50">Sign out</button></div>
              </div> :
                <button disabled={busy} onClick={signIn} className="mt-6 rounded-full bg-yellow px-6 py-3 text-sm font-bold text-background disabled:opacity-50">Continue with Google</button>}
          {error && <p role="alert" className="mt-4 text-sm text-red-300">{error}</p>}
          {notice && user && <p role="status" className="mt-4 text-sm text-green-300">{notice}</p>}
          <p className="mt-6 text-xs leading-6 text-grey">Your learning progress currently stays in this browser; signing in does not sync or import it yet.</p>
          <div className="mt-5 flex flex-wrap items-center gap-5">
            {user ? <Link href="/#courses" className="text-sm font-bold text-yellow underline underline-offset-4">Continue to courses</Link> : <button type="button" onClick={continueAsGuest} className="text-sm font-bold text-yellow underline underline-offset-4">Continue as guest</button>}
            <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-grey hover:text-yellow">Subscribe on YouTube ↗</a>
          </div>
        </div>
      </section>
    </main>
  );
}
