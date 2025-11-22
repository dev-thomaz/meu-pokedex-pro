import { useState, useEffect, useCallback, useRef } from "react";

export const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const synth = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synth.current = window.speechSynthesis;

      const updateVoices = () => {
        const availableVoices = synth.current?.getVoices() || [];
        setVoices(availableVoices);
      };

      updateVoices();

      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = updateVoices;
      }
    }
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (!synth.current) return;

      synth.current.cancel();

      const utterance = new SpeechSynthesisUtterance(text);

      const preferredVoice =
        voices.find((v) => v.lang === "en-US" && !v.name.includes("Natural")) ||
        voices.find((v) => v.lang === "en-US");

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.pitch = 0.6;

      utterance.rate = 1.1;

      utterance.volume = 1;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      synth.current.speak(utterance);
    },
    [voices]
  );

  const stop = useCallback(() => {
    if (synth.current) {
      synth.current.cancel();
      setIsSpeaking(false);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (synth.current) {
        synth.current.cancel();
      }
    };
  }, []);

  return { speak, stop, isSpeaking };
};
