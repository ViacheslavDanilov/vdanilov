// Quiet synthesized cues for the journey; nothing plays until a click creates the context
let ctx = null;
let master = null;

const context = () => {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain();
    master.gain.value = 0.5;
    master.connect(ctx.destination);
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
};

const envelope = (gain, at, peak, attack, release) => {
  gain.gain.setValueAtTime(0.0001, at);
  gain.gain.exponentialRampToValueAtTime(peak, at + attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + attack + release);
};

const noiseBuffer = (audio, seconds) => {
  const buffer = audio.createBuffer(
    1,
    audio.sampleRate * seconds,
    audio.sampleRate,
  );
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  return buffer;
};

const tone = (audio, at, frequency, peak, release) => {
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  osc.type = "sine";
  osc.frequency.value = frequency;
  envelope(gain, at, peak, 0.01, release);
  osc.connect(gain).connect(master);
  osc.start(at);
  osc.stop(at + release + 0.05);
};

export const unlockSound = () => context();

// Soft air rising through a band-pass filter
export const playTakeoff = () => {
  const audio = context();
  const at = audio.currentTime;
  const source = audio.createBufferSource();
  source.buffer = noiseBuffer(audio, 1.4);
  const filter = audio.createBiquadFilter();
  filter.type = "bandpass";
  filter.Q.value = 1.2;
  filter.frequency.setValueAtTime(300, at);
  filter.frequency.exponentialRampToValueAtTime(1400, at + 1.2);
  const gain = audio.createGain();
  envelope(gain, at, 0.09, 0.5, 0.8);
  source.connect(filter).connect(gain).connect(master);
  source.start(at);
};

// Two soft bell notes a fifth apart
export const playLanding = () => {
  const audio = context();
  const at = audio.currentTime;
  tone(audio, at, 659.25, 0.05, 1.4);
  tone(audio, at + 0.09, 987.77, 0.035, 1.6);
};

// Three faint high notes, like a signal going out
export const playLink = () => {
  const audio = context();
  const at = audio.currentTime;
  [1318.5, 1174.66, 1567.98].forEach((frequency, n) =>
    tone(audio, at + n * 0.12, frequency, 0.02, 0.5),
  );
};
