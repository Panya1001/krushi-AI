// Web Speech API and Web Audio Sound Effects for KrishiAI

export class SpeechService {
  private static recognition: any = null;
  private static synth: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;
  private static audioCtx: AudioContext | null = null;
  private static sirenOscillator: OscillatorNode | null = null;
  private static sirenGain: GainNode | null = null;
  private static sirenInterval: any = null;

  // Initialize Speech Recognition
  public static startListening(
    lang: 'en' | 'mr' | 'hi',
    onResult: (text: string) => void,
    onError: (err: string) => void,
    onEnd: () => void
  ) {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      onError("Speech recognition not supported in this browser. Please type your message.");
      return;
    }

    try {
      if (this.recognition) {
        this.recognition.stop();
      }

      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;

      // Locale codes
      const langCodes: Record<string, string> = {
        mr: 'mr-IN',
        hi: 'hi-IN',
        en: 'en-IN'
      };
      this.recognition.lang = langCodes[lang] || 'en-IN';

      this.recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
      };

      this.recognition.onerror = (event: any) => {
        onError(event.error || "Speech recognition error");
      };

      this.recognition.onend = () => {
        onEnd();
      };

      this.recognition.start();
    } catch (e: any) {
      onError(e.message || "Failed to start microphone");
    }
  }

  public static stopListening() {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {
        // ignore
      }
    }
  }

  // Text to Speech
  public static speak(text: string, lang: 'en' | 'mr' | 'hi', onEnd?: () => void) {
    if (!this.synth) return;

    this.synth.cancel(); // Stop any active speech

    // Clean markdown asterisks or special characters for speech
    const cleanText = text.replace(/[*#_`]/g, '').slice(0, 300); // speak first key paragraph
    const utterance = new SpeechSynthesisUtterance(cleanText);

    const langCodes: Record<string, string> = {
      mr: 'mr-IN',
      hi: 'hi-IN',
      en: 'en-IN'
    };
    utterance.lang = langCodes[lang] || 'en-IN';
    utterance.rate = 0.95; // Slightly slower for clear regional pronunciation
    utterance.pitch = 1.0;

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    this.synth.speak(utterance);
  }

  public static stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  // Wildlife Siren Generator using Web Audio API
  public static startWildlifeSiren(): boolean {
    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtxClass) return false;

      if (!this.audioCtx) {
        this.audioCtx = new AudioCtxClass();
      }

      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      this.stopWildlifeSiren(); // reset if running

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sawtooth';
      gain.gain.setValueAtTime(0.3, this.audioCtx.currentTime);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      let high = false;
      osc.frequency.setValueAtTime(750, this.audioCtx.currentTime);

      this.sirenInterval = setInterval(() => {
        if (!this.audioCtx || !this.sirenOscillator) return;
        high = !high;
        const targetFreq = high ? 950 : 650;
        osc.frequency.exponentialRampToValueAtTime(targetFreq, this.audioCtx.currentTime + 0.3);
      }, 350);

      osc.start();
      this.sirenOscillator = osc;
      this.sirenGain = gain;
      return true;
    } catch (e) {
      console.warn("Could not start siren audio context:", e);
      return false;
    }
  }

  public static stopWildlifeSiren() {
    if (this.sirenInterval) {
      clearInterval(this.sirenInterval);
      this.sirenInterval = null;
    }
    if (this.sirenOscillator) {
      try {
        this.sirenOscillator.stop();
        this.sirenOscillator.disconnect();
      } catch (e) {
        // ignore
      }
      this.sirenOscillator = null;
    }
    if (this.sirenGain) {
      try {
        this.sirenGain.disconnect();
      } catch (e) {
        // ignore
      }
      this.sirenGain = null;
    }
  }
}
