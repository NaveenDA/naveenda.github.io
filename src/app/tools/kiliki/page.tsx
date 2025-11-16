"use client";

import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function KilikiPage() {
    const [text, setText] = useState("Type your text here...");

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-50 py-8 px-4">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-center mb-2">
                        Kiliki Text Converter
                    </h1>
                    <p className="text-center text-gray-600 mb-8">
                        Type in English on the left and see it rendered in
                        Kiliki font on the right
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left side - Input Editor */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-2">
                                English Text
                            </label>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="flex-1 min-h-[500px] p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-none font-mono text-lg leading-relaxed"
                                placeholder="Type your text here..."
                            />
                        </div>

                        {/* Right side - Kiliki Font Preview */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-2">
                                Kiliki Font
                            </label>
                            <div
                                className="flex-1 min-h-[500px] p-4 border-2 border-gray-300 rounded-lg bg-white overflow-auto"
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

                    <div className="mt-8 text-center text-sm text-gray-500">
                        <p>
                            The Kiliki font is loaded from your local public
                            directory
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
