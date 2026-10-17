// Sonido de arranque de motor sintetizado con Web Audio API.
// No usa archivos de audio: todo se genera en el navegador con osciladores.
// Solo suena cuando la persona toca el botón (los navegadores bloquean el
// audio automático, y además es lo correcto).

let ctx: AudioContext | null = null;

export function playEngineStart(durationMs = 2600) {
  if (typeof window === "undefined") return;
  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return;

  ctx ??= new AudioCtx();
  const now = ctx.currentTime;
  const end = now + durationMs / 1000;

  const master = ctx.createGain();
  master.gain.setValueAtTime(0.0001, now);
  master.gain.exponentialRampToValueAtTime(0.35, now + 0.25);
  master.gain.setValueAtTime(0.35, end - 0.6);
  master.gain.exponentialRampToValueAtTime(0.0001, end);

  // Filtro pasa bajos: le saca lo "electrónico" y lo hace sonar más grave.
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.Q.value = 6;
  filter.frequency.setValueAtTime(300, now);
  filter.frequency.linearRampToValueAtTime(1400, now + 0.9);
  filter.frequency.linearRampToValueAtTime(500, end);

  filter.connect(master).connect(ctx.destination);

  // Dos osciladores apenas desafinados: el batido entre ellos da el
  // "temblor" de un motor.
  for (const detune of [0, 14]) {
    const osc = ctx.createOscillator();
    osc.type = "sawtooth";
    osc.detune.value = detune;
    osc.frequency.setValueAtTime(38, now);
    osc.frequency.exponentialRampToValueAtTime(165, now + 0.9); // acelerada
    osc.frequency.exponentialRampToValueAtTime(58, now + 1.8); // vuelve a ralentí
    osc.frequency.setValueAtTime(58, end);
    osc.connect(filter);
    osc.start(now);
    osc.stop(end);
  }

  // Pulso del ralentí: modula el volumen como los cilindros de un motor.
  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  lfo.frequency.setValueAtTime(9, now);
  lfo.frequency.linearRampToValueAtTime(28, now + 0.9);
  lfo.frequency.linearRampToValueAtTime(12, now + 1.8);
  lfoGain.gain.value = 0.12;
  lfo.connect(lfoGain).connect(master.gain);
  lfo.start(now);
  lfo.stop(end);
}
