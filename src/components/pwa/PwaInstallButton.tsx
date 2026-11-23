"use client";

import { Download, Share2, X } from "lucide-react";
import { useEffect, useState } from "react";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export default function PwaInstallButton({ mobile = false }: { mobile?: boolean }) {
  const [prompt, setPrompt] = useState<InstallPromptEvent | null>(null);
  const [ios, setIos] = useState(false);
  const [standalone, setStandalone] = useState(false);
  const [guide, setGuide] = useState(false);

  useEffect(() => {
    const nav = navigator as Navigator & { standalone?: boolean };
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches || nav.standalone === true;
    const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
    setStandalone(isStandalone);
    setIos(isIos);
    const onPrompt = (event: Event) => {
      event.preventDefault();
      setPrompt(event as InstallPromptEvent);
    };
    const onInstalled = () => { setStandalone(true); setPrompt(null); setGuide(false); };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (standalone || (!prompt && !ios)) return null;

  async function installApp() {
    if (prompt) {
      await prompt.prompt();
      const choice = await prompt.userChoice;
      if (choice.outcome === "accepted") setPrompt(null);
      return;
    }
    if (ios) setGuide(true);
  }

  return (
    <>
      <button type="button" onClick={installApp} className={mobile ? "aura-pwa-install mobile" : "aura-pwa-install"}>
        <Download size={14} /> <span>Install app</span>
      </button>
      {guide && (
        <div className="aura-pwa-guide" role="dialog" aria-label="Install Purity of Hearts">
          <button type="button" onClick={() => setGuide(false)} aria-label="Close install instructions"><X size={17}/></button>
          <Share2 size={20}/>
          <strong>Add Purity to your iPhone</strong>
          <p>In Safari, tap the Share button, then choose <b>Add to Home Screen</b>.</p>
        </div>
      )}
    </>
  );
}
