"use client";
import React, { useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import dynamic from "next/dynamic";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Pause, Play, Square, Volume2, VolumeX } from "lucide-react";

// Force client-side only rendering with a unique key
const LongplayerVisualizer = dynamic(
    () => import("./Visualizer").then((mod) => mod.LongplayerVisualizer),
    {
        ssr: false,
        loading: () => (
            <div className="w-full max-w-[500px] aspect-square mx-auto bg-white flex items-center justify-center text-black">
                <p>Loading Visualizer...</p>
            </div>
        ),
    },
);

const LOOP_DURATIONS = [180, 231, 276, 329, 378, 414]; // seconds
const SOUND_PATHS = [
    "/sounds/tibetan-bowls/1.mp3",
    "/sounds/tibetan-bowls/2.mp3",
    "/sounds/tibetan-bowls/3.mp3",
    "/sounds/tibetan-bowls/4.mp3",
    "/sounds/tibetan-bowls/5.mp3",
    "/sounds/tibetan-bowls/6.mp3",
];

type PlaybackState = "stopped" | "playing" | "paused";

export default function LongplayerSimulation() {
    const [playbackState, setPlaybackState] = useState<PlaybackState>(
        "stopped",
    );
    const playersRef = useRef<Tone.Player[]>([]);
    const analyzerRef = useRef<Tone.Analyser | null>(null);
    const [progresses, setProgresses] = useState<number[]>(
        new Array(6).fill(0),
    );
    const [bufferDurations, setBufferDurations] = useState<number[]>(
        new Array(6).fill(0),
    );
    const [volume, setVolume] = useState(-6); // approximately 50% volume in dB
    const [audioData, setAudioData] = useState<Float32Array>(
        new Float32Array(0),
    );

    const isRunning = playbackState !== "stopped";

    // Initialize analyzer
    useEffect(() => {
        analyzerRef.current = new Tone.Analyser("waveform", 256);
        Tone.Destination.connect(analyzerRef.current);

        return () => {
            if (analyzerRef.current) {
                analyzerRef.current.dispose();
            }
        };
    }, []);

    // Update audio data
    useEffect(() => {
        let animationFrame: number;

        const updateAudioData = () => {
            if (analyzerRef.current && playbackState === "playing") {
                const data = analyzerRef.current.getValue() as Float32Array;
                setAudioData(data);
            }
            animationFrame = requestAnimationFrame(updateAudioData);
        };

        if (playbackState === "playing") {
            updateAudioData();
        }

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [playbackState]);

    // Effect to handle player creation and cleanup
    useEffect(() => {
        if (!isRunning) {
            // Properly cleanup all players
            playersRef.current.forEach((player) => {
                player.stop();
                player.dispose();
            });
            playersRef.current = [];
            Tone.Transport.stop();
            Tone.Transport.cancel();
            setProgresses(new Array(6).fill(0));
            return;
        }

        // Create new players only if we don't have them
        if (playersRef.current.length === 0) {
            const now = Date.now() / 1000;
            const newPlayers = SOUND_PATHS.map((path, index) => {
                const duration = LOOP_DURATIONS[index];
                const player = new Tone.Player({
                    url: path,
                    loop: true,
                    autostart: false,
                    onload: () => {
                        if (playbackState === "playing") {
                            const loopStartTime = now % duration;
                            const offset = loopStartTime %
                                player.buffer.duration;
                            player.start(Tone.now(), offset);
                        }

                        setBufferDurations((prev) => {
                            const newDurations = [...prev];
                            newDurations[index] = player.buffer.duration;
                            return newDurations;
                        });
                    },
                }).toDestination();
                return player;
            });

            playersRef.current = newPlayers;
        }
    }, [isRunning, playbackState]);

    // Effect to handle playback state changes
    useEffect(() => {
        const players = playersRef.current;

        if (playbackState === "playing") {
            players.forEach((player) => {
                if (player.loaded && player.state !== "started") {
                    player.start();
                }
            });
        } else {
            // For both pause and stop
            players.forEach((player) => {
                if (player.state === "started") {
                    player.stop();
                }
            });
        }
    }, [playbackState]);

    // Effect to update progress
    useEffect(() => {
        let animationFrameId: number;
        if (playbackState === "playing") {
            const updateProgresses = () => {
                const now = Date.now() / 1000;
                const newProgresses = LOOP_DURATIONS.map(
                    (duration) => (now % duration) / duration,
                );
                setProgresses(newProgresses);
                animationFrameId = requestAnimationFrame(updateProgresses);
            };
            updateProgresses();
        }
        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [playbackState]);

    // Effect to handle volume changes
    useEffect(() => {
        Tone.Destination.volume.value = volume;
    }, [volume]);

    const handleTogglePlayPause = async () => {
        if (Tone.context.state !== "running") {
            await Tone.start();
        }
        if (playbackState === "playing") {
            setPlaybackState("paused");
        } else {
            setPlaybackState("playing");
        }
    };

    const handleStop = () => {
        setPlaybackState("stopped");
    };

    return (
        <>
            <Header />
            <div className="min-h-screen flex flex-col items-center justify-center text-black p-4">
                <h1 className="text-3xl font-bold mb-4 text-center">
                    Longplayer Simulation
                </h1>

                <div className="my-6 w-full relative">
                    <LongplayerVisualizer
                        started={isRunning}
                        progresses={progresses}
                        loopDurations={LOOP_DURATIONS}
                        bufferDurations={bufferDurations}
                        audioData={audioData}
                    />
                </div>

                <div className="flex items-center gap-4 mb-4">
                    <button
                        onClick={handleTogglePlayPause}
                        className="bg-blue-600 text-white p-3 rounded-full shadow hover:bg-blue-700 transition-colors"
                        aria-label={playbackState === "playing"
                            ? "Pause"
                            : "Play"}
                    >
                        {playbackState === "playing"
                            ? <Pause size={24} />
                            : <Play size={24} />}
                    </button>
                    <button
                        onClick={handleStop}
                        disabled={!isRunning}
                        className="bg-gray-700 text-white p-3 rounded-full shadow hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        aria-label="Stop"
                    >
                        <Square size={24} />
                    </button>
                </div>

                <div className="flex items-center gap-2 w-full max-w-xs">
                    <VolumeX size={20} />
                    <input
                        type="range"
                        min="-40"
                        max="0"
                        step="1"
                        value={volume}
                        onChange={(e) => setVolume(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        aria-label="Volume"
                    />
                    <Volume2 size={20} />
                </div>

                <p className="mt-6 text-sm text-gray-600 text-center max-w-md">
                    This simulation uses six sound loops of different lengths
                    that continuously play to create a soundscape that will not
                    repeat for over 1000 years. Use the controls to play, pause,
                    stop, and adjust the volume.
                </p>
                {/* Back to blog */}
                <a
                    href="/tools/longplayer"
                    className="text-blue-600 hover:text-blue-700 bg-white border mt-4 border-blue-600 px-4 py-2 rounded-lg"
                >
                    Back to blog
                </a>
            </div>
            <Footer />
        </>
    );
}
