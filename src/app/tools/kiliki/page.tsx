"use client";

import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function KilikiPage() {
    const [text, setText] = useState("Type your text here...");

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
                    <p className="text-center text-muted-foreground mb-12 max-w-lg mx-auto">
                        Type in English on the left and see it rendered in the Kiliki font on the right.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col">
                            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                                English Text
                            </label>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="flex-1 min-h-[500px] p-4 border border-border bg-card focus:border-gold-ink focus:outline-none resize-none font-mono text-lg leading-relaxed"
                                placeholder="Type your text here..."
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                                Kiliki Font
                            </label>
                            <div
                                className="flex-1 min-h-[500px] p-4 border border-border bg-card overflow-auto"
                                style={{
                                    fontFamily: "Kiliki, monospace",
                                    fontSize: "1.5rem",
                                    lineHeight: "2rem",
                                    whiteSpace: "pre-wrap",
                                    wordWrap: "break-word",
                                }}
                            >
                                {text}
                            </div>
                        </div>
                    </div>

                    <p className="mt-8 text-center text-sm text-muted-foreground">
                        The Kiliki font is loaded from the local public directory.
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
}
