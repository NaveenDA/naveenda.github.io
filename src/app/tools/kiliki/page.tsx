"use client";

import { useEffect, useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

const KILIKI_SERVICE_URL = "https://staging.karky.in:8186/kilikiService";

type Mode = "spell" | "english";

const MODES: { id: Mode; label: string; hint: string; placeholder: string }[] = [
    {
        id: "spell",
        label: "I know the spelling",
        hint: "Type Kiliki's own phonetic spelling. Renders instantly, no server needed. e.g. kiLiki, navIn, min (I), nim (you).",
        placeholder: "Type Kiliki spelling here, e.g. kiLiki…",
    },
    {
        id: "english",
        label: "Convert from English",
        hint: "Type plain English and it's converted via the Kiliki transliteration service. Can be slow or briefly unavailable.",
        placeholder: "Type English text here…",
    },
];

export default function KilikiPage() {
    const [mode, setMode] = useState<Mode>("spell");
    const [text, setText] = useState("");
    const [converted, setConverted] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

    useEffect(() => {
        if (mode !== "english") {
            return;
        }
        if (!text.trim()) {
            return;
        }

        const controller = new AbortController();
        const timeout = setTimeout(async () => {
            setStatus("loading");
            try {
                const params = new URLSearchParams({
                    Destlang: "kiliki",
                    Srclang: "english",
                    type: "button",
                    inputStr: text,
                });
                const response = await fetch(`${KILIKI_SERVICE_URL}?${params.toString()}`, {
                    signal: controller.signal,
                });
                if (!response.ok) throw new Error("Request failed");
                const data = await response.json();
                setConverted((data.out ?? "").trim());
                setStatus("idle");
            } catch (error) {
                if ((error as Error).name !== "AbortError") {
                    setStatus("error");
                }
            }
        }, 400);

        return () => {
            clearTimeout(timeout);
            controller.abort();
        };
    }, [text, mode]);

    const displayText = mode === "spell" ? text : converted;
    const activeMode = MODES.find((m) => m.id === mode)!;

    const handleModeChange = (next: Mode) => {
        setMode(next);
        setText("");
        setConverted("");
        setStatus("idle");
    };

    return (
        <>
            <Header />
            <div className="min-h-screen py-16 px-6 md:px-10">
                <div className="max-w-6xl mx-auto">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-ink mb-4 text-center">
                        Tools
                    </p>
                    <h1 className="font-display text-4xl md:text-5xl text-center mb-3">
                        Kiliki Text Converter
                    </h1>
                    <p className="text-center text-muted-foreground mb-8 max-w-lg mx-auto">
                        See text rendered in the Kiliki script, vowels stacked on their consonants.
                    </p>

                    <div className="flex justify-center gap-2 mb-3">
                        {MODES.map((m) => (
                            <button
                                key={m.id}
                                onClick={() => handleModeChange(m.id)}
                                className={
                                    "text-sm font-medium px-4 py-2 border transition-colors " +
                                    (mode === m.id
                                        ? "bg-ink text-paper border-ink"
                                        : "bg-card text-muted-foreground border-border hover:border-gold-ink hover:text-foreground")
                                }
                            >
                                {m.label}
                            </button>
                        ))}
                    </div>
                    <p className="text-center text-sm text-muted-foreground mb-10 max-w-xl mx-auto">
                        {activeMode.hint}
                    </p>

                    <div className="max-w-2xl mx-auto">
                        <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2 block">
                            {mode === "spell" ? "Kiliki Spelling" : "English Text"}
                        </label>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            rows={3}
                            className="w-full p-4 border border-border bg-card focus:border-gold-ink focus:outline-none resize-none font-mono text-lg leading-relaxed"
                            placeholder={activeMode.placeholder}
                        />
                    </div>

                    <div className="mt-10">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                Kiliki Script
                            </span>
                            {status === "loading" && (
                                <span className="text-xs text-muted-foreground">&middot; Converting&hellip;</span>
                            )}
                            {status === "error" && (
                                <span className="text-xs text-destructive">&middot; Conversion service unavailable</span>
                            )}
                        </div>
                        <div className="min-h-[280px] flex items-center justify-center border border-border bg-card px-6 py-10 overflow-x-auto">
                            {displayText ? (
                                <span
                                    style={{
                                        fontFamily: "Kiliki, sans-serif",
                                        fontSize: "4.5rem",
                                        lineHeight: 1,
                                        whiteSpace: "pre-wrap",
                                        wordBreak: "break-word",
                                        fontFeatureSettings: '"liga" 1, "dlig" 1',
                                        fontVariantLigatures: "common-ligatures discretionary-ligatures",
                                    }}
                                >
                                    {displayText}
                                </span>
                            ) : (
                                <span className="text-muted-foreground text-sm">
                                    Your Kiliki script will appear here.
                                </span>
                            )}
                        </div>
                    </div>

                    <p className="mt-8 text-center text-sm text-muted-foreground">
                        {mode === "spell"
                            ? "Rendered entirely in your browser. The Kiliki font's own ligatures compose the vowel-over-consonant shapes."
                            : "Transliteration powered by the Kiliki conversion service; the result is rendered with the Kiliki font loaded from the local public directory."}
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
}
