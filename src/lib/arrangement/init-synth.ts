import type { GenreId } from "./types";

export const SERUM_FROM_SCRATCH = {
  lead: [
    "Load Serum. Menu → Init Preset. Empty default. Don't start from a factory lead.",
    "Osc A: wavetable Basic Shapes. Drag the WT position to the saw (or load Analog_BD_Saw). Level 0 dB.",
    "Unison 7 (5 if it is already huge). Detune 0.20–0.35. Blend ~0.65 so a centre remains.",
    "Osc B (optional): same saw, octave +12, unison 3, level −8 dB. Noise osc 5–10%.",
    "Filter: MG Low 24, on. Cutoff 1.5–2.5 kHz. High-pass 250 Hz here or on EQ after. Drag Env 2 onto cutoff, amount +30 to +50.",
    "Env 1 = amp. Singing lead: 0 / 80 ms / 70% / 250 ms. Stab: 0 / 20 ms / 25% / 120 ms.",
    "Env 2 = filter. Faster than amp so notes bloom then close.",
    "LFO 1: BPM, 1/4 or 1/8, drag onto cutoff, 10–20%. LFO 2 slow onto unison detune if you want width that moves.",
    "FX in this order: Distortion (Diode, mix 20–30%) → Hyper / Dimension → Delay 1/8 dotted → short plate. Bypass the hall on a drop.",
    "Same MIDI as the kit. EQ / etch after Serum, not inside it. Sidechain the track to the kick.",
  ],
  chords: [
    "Second Serum, Init again. Don't copy the lead and just play chords — unison and FX will fight.",
    "Osc A only: saw, unison 5–7, detune 0.18–0.25. No Osc B. No noise.",
    "Filter MG Low 24. Break: cutoff 1.2 kHz, open it across the 32. Drop stabs: cutoff 1.8 kHz. High-pass 180–220 Hz.",
    "Duplicate the patch. Break envelope: 40 / 200 / 80% / 600 ms. Drop stabs: 0 / 40 / 25% / 180 ms.",
    "FX: chorus + dimension. Hall on the break only. Mute hall in the drop.",
    "MIDI: i–bVI–III–bVII, 2 bars each. EQ after, then sidechain to the kick.",
  ],
};

export const SPIRE_FROM_SCRATCH = {
  lead: [
    "Load Spire. Click Init in the preset browser. OSC 1 only, Classic analog, no FX. Don't start from a bank lead.",
    "OSC 1: Classic, SAW. Unison 4–7 (Uni). Detune / Fat so it is wide but not chorus-soup. Pan/stereo on unison, not on the amp.",
    "OSC 2 (optional): Classic SAW, octave +1, mix well under OSC 1. OSC 3 off.",
    "Filter 1: LP 24. Cutoff around 1.5–2.5 kHz. Res 10–20. Filter Env from ENV 2, amount +30 to +50. Keytrack a little so high notes stay open.",
    "ENV 1 = amp (top of the env page). ENV 2 = filter. Same numbers as Serum: long for a singing line, short for a stab.",
    "LFO 1: Sync on, 1/4 or 1/8. Mod matrix: LFO 1 → Filter 1 Cutoff, depth 10–20%.",
    "FX page, in order: Shaper (tube / drive, mix 20–40%) → Chorus (width) → Delay dotted 1/8 → Reverb short. Drop: reverb mix near 0.",
    "Master section: no limiter inside Spire. EQ / etch after the plugin. Sidechain the track to the kick.",
  ],
  chords: [
    "New Spire, Init again. OSC 1 SAW, unison 4–6, detune lower than the lead. OSC 2/3 off.",
    "Filter LP 24, cutoff 1.2 kHz in the break, 1.8 kHz on drop stabs. High-pass with Spire’s EQ or a filter HPF ~200 Hz.",
    "ENV 1 long in the break, pluck for drop stabs — save two presets, do not automate one envelope into both jobs.",
    "FX: Chorus only in the break. Delay low. Reverb on the break, bypass on the drop.",
    "Same chord MIDI as the kit. Spire is the engine; the piano roll does not change.",
  ],
};

export const SPIRE_KNOBS: Record<
  GenreId,
  { lead: string; chords: string; screech?: string }
> = {
  early: {
    lead: "OSC 1 SAW, Uni 3, low Fat. Filter LP 24 ~1.2 kHz, ENV 2 +30. Shaper mild. No big chorus. Hoover: mix a square on OSC 2, −12.",
    chords: "OSC 1 SAW Uni 3–4. Offbeat fifths. Filter closed. Chorus off.",
  },
  nustyle: {
    lead: "OSC 1 SAW Uni 5–7, Fat 0.25. OSC 2 SAW +7 or +12, quieter. Filter 1.5–2.5 kHz. Shaper 25% → Chorus → Delay 1/8d.",
    chords: "Uni 5, Fat 0.2. Stabs ENV 1 0/50/30/200. Chorus on, hall off in the drop.",
  },
  euphoric: {
    lead: "OSC 1 SAW Uni 7, Fat 0.3. OSC 2 SAW +12 Uni 3. Filter open on long notes. Shaper diode-ish 25% → Chorus → Delay 1/8d → Plate. This is the Spire supersaw.",
    chords: "Uni 7, Fat 0.22. Break pad ENV, duplicate for drop 8th-stabs. Chorus + hall in the break, both off in the drop.",
  },
  rawstyle: {
    lead: "Screech: OSC 1 HardFM or Noise+SAW, Uni 1–3. Filter BP or HP around 2–4 kHz, drive it. ENV 1 0/20/40/120. LFO 1/16 → FM or cutoff. Shaper heavy. Chorus off. Delay tiny.",
    chords: "Break only. Uni 2–3, filter 600–900 Hz, dark reverb. Mute in the drop.",
    screech: "If HardFM is too polite, OSC 2 as FM source, mix 20–40%, same as Serum FM.",
  },
  rawphoric: {
    lead: "Two inits. Break = euphoric SAW Uni 7. Drop = raw HardFM screech. Same MIDI. Automate which instance is audible, or two tracks.",
    chords: "Euphoric break chords. Mute or HP 300 Hz when the raw kick hits.",
  },
  xtraraw: {
    lead: "OSC 1 dirty / formant / HardFM, Uni 1–2. Filter driven. Short amp. If the zaag kick is the riff, mute Spire.",
    chords: "Off, except an 8-bar reset pad, LP 1.5 kHz.",
  },
  uptempo: {
    lead: "SAW or hoover, Uni 3–5. ENV 1 0/15/20/80. Filter HP 300 + LP 2 kHz. Shaper on, reverb off. Sidechain ~60 ms.",
    chords: "Offbeat fifths, never held pads at 190.",
  },
};
