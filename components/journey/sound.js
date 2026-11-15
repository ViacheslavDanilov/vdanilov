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

const tone = (audio, at, frequency, peak, attack, release) => {
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  osc.type = "sine";
  osc.frequency.value = frequency;
  envelope(gain, at, peak, attack, release);
  osc.connect(gain).connect(master);
  osc.start(at);
  osc.stop(at + attack + release + 0.05);
};

export const unlockSound = () => context();

// A long breath of air opening up through a low-pass filter
export const playTakeoff = () => {
  const audio = context();
  const at = audio.currentTime;
  const seconds = 2.2;
  const buffer = audio.createBuffer(
    1,
    audio.sampleRate * seconds,
    audio.sampleRate,
  );
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  const source = audio.createBufferSource();
  source.buffer = buffer;
  const filter = audio.createBiquadFilter();
  filter.type = "lowpass";
  filter.Q.value = 0.7;
  filter.frequency.setValueAtTime(400, at);
  filter.frequency.exponentialRampToValueAtTime(1800, at + seconds);
  const gain = audio.createGain();
  envelope(gain, at, 0.07, 0.9, 1.2);
  source.connect(filter).connect(gain).connect(master);
  source.start(at);
};

// A warm A major chord that swells in
export const playLanding = () => {
  const audio = context();
  const at = audio.currentTime;
  [220, 277.18, 329.63].forEach((frequency) =>
    tone(audio, at, frequency, 0.025, 0.35, 2.2),
  );
};

// Two high tones a few hertz apart, so they shimmer
export const playLink = () => {
  const audio = context();
  const at = audio.currentTime;
  tone(audio, at, 1318.5, 0.012, 0.25, 1.2);
  tone(audio, at, 1322, 0.012, 0.25, 1.2);
};
