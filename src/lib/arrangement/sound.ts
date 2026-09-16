import type { GenreId, PhraseKind } from "./types";

export const DAW_SESSION = [
  "New project, 4/4, BPM and key from the kit. Turn on a 4-bar grid. Name the file the track title.",
  "Tracks: Kick, Reverse bass, Clap, Hats, FX, Atmosphere, Lead (Serum or Spire from Init), Chords (second Init), Vox. Order them that way, top to bottom.",
  "Buses: Drums (clap + hats + extra perc) and Music (bass, leads, chords, pads). Kick stays on its own — it is the sidechain key.",
  "Sidechain: compressor or volume shaper on Reverse bass, Lead, Chords, Atmosphere. Input = Kick. Attack 0, release 80–150 ms, 4–8 dB of duck. Same idea in every DAW.",
  "Clap sits a 16th after the kick (delay ~80–100 ms at 150 BPM). Hats off the kick transient. Snare rolls only in the last 4–8 of a build.",
  "EQ after Serum, before the bus: high-pass, dip the box, etch the mid, then sidechain. Clip the kick bus. Limiter last on the master.",
];

export const EQ_ETCH = [
  "High-pass: kick 25–30 Hz, reverse bass ~70 Hz if the kick owns the sub, chords 180–220 Hz, leads 250–300 Hz. Nothing but kick and maybe bass below 80 Hz.",
  "Mud: cut 200–400 Hz on leads and chords (the box). If the kick honks, dip 800 Hz–1.2 kHz on the kick, not the lead.",
  "Etch: a narrow boost 2.2–3.5 kHz on the lead so it cuts a phone speaker. If the kick click already lives there, dip the lead 3–5 kHz instead — they cannot share the same spike.",
  "Air: 8–12 kHz shelf on euphoric supersaws only. Screeches and zaags get a cut above 8 kHz so they do not hiss.",
  "Stereo: kick, reverse bass and lead body in the mid. Unison / hyper / reverb on the sides. Check in mono — if the riff dies, the etch is too wide.",
];

export interface SerumPatch {
  name: string;
  osc: string;
  filter: string;
  env: string;
  lfo: string;
  fx: string;
  midi: string;
  eq: string;
}

export interface GenreSound {
  kick: string[];
  drums: string[];
  bass: string[];
  lead: SerumPatch;
  chords: SerumPatch;
  mix: string[];
}

export const SOUND: Record<GenreId, GenreSound> = {
  early: {
    kick: [
      "One long-tail kick. Less click, more body. Pitch it to the root or fifth of the key.",
      "Short pitch envelope on the sample (fast down). Do not stack three kicks — one good sample plus EQ.",
      "EQ: keep 50–80 Hz, dip 250–400 if it is muddy, a little 3 kHz etch if it disappears in the set.",
    ],
    drums: [
      "Hats on offbeats. Clap a 16th after the kick. No wall of percussion.",
      "Fills: one snare roll in the last 4 of a build. Then silence into the drop.",
    ],
    bass: [
      "Reverse bass on the offbeat after every kick. Same sample reversed, or a short saw pluck with a reverse envelope.",
      "Quieter than the kick. Sidechain it so the kick punch is clean.",
    ],
    lead: {
      name: "Hoover / analog stab",
      osc: "Osc A: saw, unison 3. Osc B: square, −12, unison 2. Mix B under A.",
      filter: "Low 24. Cutoff around 1.2 kHz. Env amount +30.",
      env: "Amp 0 / 40 ms / 50% / 180 ms. Filter env a bit faster.",
      lfo: "Slow LFO on cutoff (1/4 bar) so it does not sit still.",
      fx: "Chorus, short plate, mild drive. No huge unison.",
      midi: "8-bar riff, quarter notes, one voice. In Fm: F4 – C5 – F5 – C5 | Ab4 – C5 – F4 – C5, then repeat. Leave the offbeat empty for reverse bass. No 16ths. Same riff all drop.",
      eq: "HP 220 Hz. Cut 350 Hz. Small etch +2 dB at 2.5 kHz, Q ~2. No air shelf.",
    },
    chords: {
      name: "Early offbeat stabs",
      osc: "One saw, unison 3–4, detune low.",
      filter: "Low 24, cutoff 800 Hz–1.5 kHz. High-pass 180 Hz.",
      env: "Pluck: 0 / 60 ms / 20% / 220 ms.",
      lfo: "Off, or tiny vibrato on pitch.",
      fx: "Short room. No widescreen reverb.",
      midi: "Two-note fifths, offbeat 8ths (the + of each kick). In Fm: F3+C4 for 4 bars, then Ab3+Eb4 for 4. Not full triads — three notes fight the hoover. Mute in the intro.",
      eq: "HP 200 Hz. Cut 400 Hz. Etch a hair at 1.8 kHz. Keep it thinner than the lead.",
    },
    mix: [
      "If reverse bass is right, the track works. Do not bury it in layers.",
      "Kick owns 60 Hz and a soft 3 kHz click. Lead etch sits at 2.5 kHz, not on the kick click.",
    ],
  },
  nustyle: {
    kick: [
      "Tok = click + body + tail as three layers, or one sample that already has all three.",
      "Align transients. Pitch body to the key. Clip the kick bus a little so the tok stays hard.",
      "EQ click 3–5 kHz, body 80–150, tail under 80 Hz. High-pass everything else at 30 Hz.",
    ],
    drums: [
      "Clap after the kick. Open hats in the break, tighter in the drop.",
      "Ride or shaker only if the tok has space. Last 8 of the build: snare roll into a gap.",
    ],
    bass: [
      "Reverse bass still on the offbeat, a bit fatter than early. Sidechain to the tok.",
      "Optional sub under the kick — mute it if the kick tail already fills 50 Hz.",
    ],
    lead: {
      name: "Nu-style saw lead",
      osc: "Osc A saw unison 5–7, detune 0.25. Osc B saw +7 or +12, quieter.",
      filter: "MG Low 24, cutoff 1.5–2.5 kHz, env +40.",
      env: "Amp 0 / 80 ms / 55% / 250 ms for a singing line.",
      lfo: "LFO 1/8 on cutoff, small amount. Another LFO slow on osc detune.",
      fx: "Hyper / dimension, delay dotted 1/8, short hall. Distortion after the filter.",
      midi: "8-bar call and answer. In Fm: bars 1–4 F4 G4 Ab4 C5 (quarters) then hold C5; bars 5–8 Eb5 C5 Ab4 F4, last two beats a 8th run F–Ab–C–F. Repeat the 8. Drop B: same MIDI up an octave, extra 8ths. Rest on kick downbeats where you can.",
      eq: "HP 250 Hz. Cut 300–400 Hz (−3 dB, Q 0.8). Etch +3 dB at 2.8 kHz, Q 1.5. Air +1.5 dB at 10 kHz. If it fights the tok, dip 4 kHz on the lead.",
    },
    chords: {
      name: "Supersaw stabs",
      osc: "Saw, unison 5, detune 0.2. Warp off.",
      filter: "Low 24, high-pass 200 Hz. Cutoff 1.8 kHz, env +25.",
      env: "0 / 50 ms / 30% / 200 ms.",
      lfo: "Off.",
      fx: "Chorus, light drive, short reverb.",
      midi: "i–bVI–III–bVII, 2 bars each (in Fm: Fm – Db – Ab – Eb). Voicing: root in the left, 3rd+5th around C4, no 7ths. Break: whole notes. Drop: same four chords as offbeat 8th stabs (eight hits per bar, on the +). Invert the Ab so the top note stays C.",
      eq: "HP 200 Hz. Cut 250 Hz. Etch +2 dB at 2 kHz. No air — the lead owns 8 kHz+.",
    },
    mix: [
      "Tok click must read on a phone speaker (3–5 kHz). Lead etch lives just below that at ~2.8 kHz.",
      "Chords thinner than the lead. If the drop is a wall, the stabs have too much sustain or too little HP.",
    ],
  },
  euphoric: {
    kick: [
      "Pitched kick in key (root or fifth). Musical, not a brick. Layer click + pitched body.",
      "Pitch envelope: fast drop into the note, then hold. Tune with a tuner on the tail.",
      "Clip lightly. If it is a wall, it is no longer euphoric.",
    ],
    drums: [
      "Clap after kick. Hats that sparkle, not gabber rides.",
      "Build: snare roll last 4–8, crash on 1 of the drop. Keep percussion thin under the supersaw.",
    ],
    bass: [
      "Reverse bass, sidechained, slightly quieter than rawstyle.",
      "Same key as the kick. If the kick is pitched, the bass follows.",
    ],
    lead: {
      name: "Euphoric supersaw",
      osc: "Osc A Basic Saw, unison 7, detune 0.3, blend ~0.7. Osc B saw +12, unison 3, −8 dB. Noise 8%.",
      filter: "MG Low 24. Cutoff 2 kHz in the verse of the riff, open toward 8 kHz on long notes. High-pass 250 Hz on the filter or EQ.",
      env: "Amp almost full sustain. Filter env 0 / 120 ms / 40% / 400 ms so notes bloom.",
      lfo: "LFO 1/4 or 1/2 on cutoff (10–20%). Slow LFO on unison detune for width.",
      fx: "Hyper 2-voice, distortion (diode, mix 20–30%), delay 1/8 dotted, plate 1.2 s. EQ dip 400 Hz.",
      midi: "One 8-bar melody, minor pentatonic (1 b3 4 5 b7). In Fm: bars 1–2 C5 C5 Eb5 F5 (8ths) hold F5; bars 3–4 Ab4 F4 C4; bars 5–6 same as 1–2 up to F5–Ab5; bars 7–8 hold C5 then 8th run F–Ab–C–Eb–F. Copy that 8 through the drop. Breakdown: same notes, longer values, sit it on top of the chords. Do not write a new riff for Drop B — octave or extra 8ths only.",
      eq: "HP 280 Hz. Cut 350 Hz (−4 dB). Etch +3 dB at 2.4 kHz (the ‘anthem’ bite). Air +2 dB at 11 kHz. Dynamic EQ dip 4.5 kHz when the kick click peaks, or a static −2 dB if you do not have dynamic EQ.",
    },
    chords: {
      name: "Supersaw chords",
      osc: "Saw, unison 7, detune 0.22. One oscillator is enough.",
      filter: "Low 24, high-pass 180–220 Hz. Cutoff 1.2 kHz in the break, open across 32 bars into the build.",
      env: "Pad in the break: 40 ms / 200 ms / 80% / 600 ms. Stabs in the drop: 0 / 40 ms / 25% / 180 ms — duplicate the patch.",
      lfo: "Very slow cutoff LFO in the break. Off on stabs.",
      fx: "Chorus, wide dimension, long hall in the break only. Mute the hall in the drop.",
      midi: "Workhorse: i – bVI – III – bVII, 2 bars each, 8-bar loop. In Fm that is Fm – Db – Ab – Eb. Piano-roll voicing (break): F2–C3–Ab3–C4 | Db3–Ab3–F4–Ab4 | Ab2–Eb3–C4–Eb4 | Eb3–Bb3–G4–Bb4. Keep a C on top of every chord if you can — that is the glue. Drop: same four chords, 8th-note offbeats (on the +), 3-note voicing only (drop the bass note — kick has it). Last bar of each 8: one 16th pick-up into the next chord.",
      eq: "HP 200 Hz. Cut 280 Hz and 500 Hz. Etch +1.5 dB at 1.8 kHz so stabs speak, not scream. No 10 kHz shelf — the lead has the air. Mid-side: high-pass the sides at 300 Hz.",
    },
    mix: [
      "Sidechain lead + chords + bass to the kick. The kick is the downbeat; everything else nods.",
      "Etch the lead at 2.4 kHz, kick click at 4 kHz, chords under 2 kHz. Three different spikes, not one blob.",
      "Do not distort the kick until it stops sounding pitched.",
    ],
  },
  rawstyle: {
    kick: [
      "Distorted punch, often a hair sharp. Click + body + distorted tail.",
      "Kickrolls: extra 32nd/64th hits in the last 4 of a 16. Program them on the kick track, not a fill bus.",
      "Clip and saturator on the kick bus. Carve 1 kHz if it honks. Etch the click 3–5 kHz.",
    ],
    drums: [
      "Clap after kick. Hats optional. Industrial ticks in the break.",
      "Fills are kickrolls, not pretty snares.",
    ],
    bass: [
      "Reverse bass still on the offbeat, darker and quieter under a loud kick.",
      "High-pass ~70 Hz if the kick tail owns the sub.",
    ],
    lead: {
      name: "Screech",
      osc: "Osc A: scream / vowel / custom WT, unison 1–3. Osc B: sine or saw as FM source, FM 20–40%.",
      filter: "Band or high 12, cutoff in the scream zone (1.5–4 kHz). Drive the filter.",
      env: "Amp 0 / 20 ms / 40% / 120 ms. Short. It is a stab, not a pad.",
      lfo: "Fast LFO on FM or cutoff (1/16) for the growl. Tempo-sync it.",
      fx: "Heavy distortion, bit crush optional, short delay. No hall.",
      midi: "Two or three notes, chromatic. In Fm: F4 – B4 – C5 as 16th stabs on the offbeat (not on the kick). 2-bar cell: rest, B, C, rest | F, F, B, C. Bars 7–8 of a 16: faster 32nds into a gap. Drop B: shift the cell up a minor 2nd (F#–C–C#) for 8 bars, then back. No pentatonic anthem.",
      eq: "HP 400 Hz (screech is not a bass). Narrow etch +4 dB at 3.2 kHz, Q 4 — that is the scream. Cut 1 kHz if it is nasal. Cut everything above 8 kHz. Notch 4.5 kHz if the kick click lives there.",
    },
    chords: {
      name: "Dark clusters",
      osc: "Saw or square, unison 2–3. Keep it thin.",
      filter: "Low 24, cutoff 600–900 Hz. High-pass 200 Hz.",
      env: "Long in the cinematic break. Off in the drop unless it is a stab.",
      lfo: "Slow on cutoff in the break.",
      fx: "Dark reverb, no sparkle.",
      midi: "Break only. In Fm: F2–Ab2–B2–C3 (minor + tritone) 4 bars, then Db2–F2–G2–Ab2 4 bars. Hold, no rhythm. Drop: mute, or one offbeat stab on the 1 of every 8 (F3+B3).",
      eq: "HP 180 Hz. Cut 400 Hz and 2.5 kHz so it stays under the screech. No etch — the screech owns 3 kHz.",
    },
    mix: [
      "Screech etch 3.2 kHz, kick click 4.5 kHz — notch one if they stack. Never boost both.",
      "Kickrolls in the last 4 of a 16. Then a gap, then the downbeat.",
    ],
  },
  rawphoric: {
    kick: [
      "Two kicks: a pitched / musical one for the identity, a rawer one for the drop. Switch at Drop B if needed.",
      "Tune the musical kick. Distort the drop kick. Same click if you can, so the tok stays familiar.",
    ],
    drums: [
      "Euphoric hats in the break, tighter in the drop. Clap after kick always.",
      "Build into the raw drop: snare roll + kickroll in the last 4.",
    ],
    bass: [
      "Reverse bass in both halves. Louder under the raw kick, polite under the pitched kick.",
    ],
    lead: {
      name: "Break saw, drop screech",
      osc: "Save two Serum presets. Break: unison 7 saw. Drop: WT screech + FM, unison 2.",
      filter: "Break: low 24, open slowly. Drop: band-pass scream.",
      env: "Break: long. Drop: 0 / 20 / 35% / 100 ms.",
      lfo: "Break: slow cutoff. Drop: 1/16 on FM.",
      fx: "Break: hall + delay. Drop: distortion, hall off.",
      midi: "Write one contour, two sounds. Break in Fm: C5 – Eb5 – F5 hold, then Ab4 – F4 (the anthem). Drop: same pitches as 16th screech stabs, shorter, on the offbeat. Do not invent a second melody — the switch is the record.",
      eq: "Break: HP 260 Hz, cut 350 Hz, etch 2.4 kHz, air 10 kHz. Drop: HP 400 Hz, etch 3.2 kHz, air off. Automate the EQ with the preset change.",
    },
    chords: {
      name: "Euphoric break chords",
      osc: "Saw unison 6–7 for the break. Mute or high-pass in the raw drop.",
      filter: "Open the cutoff across the 32-bar break into the build.",
      env: "Pad envelope in the break.",
      lfo: "Slow movement only.",
      fx: "Wide reverb in the break. Bypass on the drop.",
      midi: "Same as euphoric: Fm – Db – Ab – Eb, 2 bars each, open voicing with a C on top. Sung melody on the lead track, not inside the chord clip. Raw drop: mute, or 3-note offbeat stabs on Fm only.",
      eq: "Break: HP 190 Hz, cut 300 Hz, gentle etch 1.8 kHz, air 12 kHz. Drop: HP 300 Hz, no air, −4 dB at 3 kHz so the screech wins.",
    },
    mix: [
      "The switch is the record. Automate kick bus distortion, lead preset, and the etch band — not 20 extra tracks.",
      "Keep one clap and one reverse bass so the two halves feel like one track.",
    ],
  },
  xtraraw: {
    kick: [
      "Reese / zaag is the lead. Short tail, aggressive top. Kick is the riff.",
      "Draw or automate kick pitch in 8- or 16-bar shapes. Distortion + clip on the bus.",
      "Kickrolls as the fill language. Leave a gap before the next 16.",
    ],
    drums: [
      "Almost no hats. Clap after kick if it still reads. Do not pretty it up.",
    ],
    bass: [
      "Skip classic reverse bass if the zaag already fills the offbeat. If you use it, keep it thin.",
    ],
    lead: {
      name: "Zaag / extra raw lead",
      osc: "Osc A: reese / formant / dirty WT. Unison 1–2. Osc B FM or sync.",
      filter: "Drive it. Band or comb if it needs more scream.",
      env: "Short amp. The kick is already the melody — this is spice.",
      lfo: "Tempo LFO on wavetable position or FM.",
      fx: "Distort, clip, tiny delay. No hall.",
      midi: "Stabs in the holes of the kick pattern, not a song. In Fm: F4 16ths on offbeats, then B4 for 2 bars as a false key. Copy 4-bar cell. If the kick pitch is already drawing F–Ab–B–C, mute this track.",
      eq: "HP 500 Hz. Etch +5 dB at 3.5 kHz, Q 6. Cut 200–800 Hz hard. Cut 10 kHz. This is a knife, not a pad.",
    },
    chords: {
      name: "Optional dark pad",
      osc: "One saw, unison 2, very quiet.",
      filter: "Closed low-pass, high-pass 250 Hz.",
      env: "Long, only in a short reset.",
      lfo: "Off.",
      fx: "Dark reverb, low mix.",
      midi: "Usually off. Reset only: hold Fm (F2–Ab2–C3) 8 bars, no rhythm. Never in the zaag 32.",
      eq: "HP 250 Hz. Cut 2–4 kHz so it cannot etch. Low-pass 1.5 kHz.",
    },
    mix: [
      "If the kick is not the loudest thing, start over.",
      "High-pass music bus at 150–200 Hz so the zaag kick owns the mid. Etch lives on the kick, not a lead layer.",
    ],
  },
  uptempo: {
    kick: [
      "Kick is the track. Tight, compressed, 180–200 BPM. Short tail so 1/4 notes do not smear.",
      "Layer click + short body. Clip hard. Pitch pattern can be a melody.",
      "No long reverse-bass tails — they eat the next kick.",
    ],
    drums: [
      "Offbeat hats or nothing. Clap after kick if there is space. Fills = kick rolls and stops.",
    ],
    bass: [
      "Optional gabber offbeat. If the kick is full-range, mute bass.",
    ],
    lead: {
      name: "Stab / hoover at speed",
      osc: "Saw or hoover, unison 3–5. Keep it short so 190 BPM does not blur.",
      filter: "Low 24, cutoff 2 kHz, high-pass 300 Hz.",
      env: "0 / 15 ms / 20% / 80 ms.",
      lfo: "Optional 1/8 on cutoff.",
      fx: "Drive, short delay. Reverb almost off.",
      midi: "Offbeat 8th stabs only. In Fm: F4+C5 for 8 bars, Ab4+Eb5 for 8. No held notes — at 190 they smear. Sidechain release ~60 ms. If the kick is pitched as a melody, rest the lead on those bars.",
      eq: "HP 300 Hz. Cut 400 Hz. Etch +3 dB at 3 kHz, Q 2. Cut 8 kHz+ so hats (if any) stay. Shorter than 150 BPM — less low-mid.",
    },
    chords: {
      name: "Fast offbeat stabs",
      osc: "Saw unison 4, detune low.",
      filter: "High-pass 250 Hz, cutoff 1.5 kHz.",
      env: "Pluck. No pads unless it is a Sefa-style break.",
      lfo: "Off.",
      fx: "Tiny room.",
      midi: "Break (if any): Fm – Eb – Db – C, 2 bars each, short stabs not pads. Drop: mute, or the same two-note fifths as the lead on offbeats. Never whole notes at 190.",
      eq: "HP 280 Hz. Cut 500 Hz. Light etch 2 kHz. Low-pass 6 kHz.",
    },
    mix: [
      "Release times scale with BPM. Sidechain shorter. Kick bus clipper is the loudness.",
      "Etch 3 kHz on the kick or the stab, not both. If it smears, shorten every envelope 20%.",
    ],
  },
};

export function phraseSoundTips(
  genre: GenreId,
  kind: PhraseKind,
): { title: string; steps: string[] }[] {
  const s = SOUND[genre];
  if (kind === "drop" || kind === "dropB") {
    return [
      { title: "Kick", steps: s.kick },
      { title: `Serum / Spire lead — ${s.lead.name}`, steps: serumLines(s.lead) },
      { title: "EQ / etch", steps: [s.lead.eq, s.mix[0]!] },
    ];
  }
  if (kind === "breakdown" || kind === "break") {
    return [
      { title: `Serum / Spire chords — ${s.chords.name}`, steps: serumLines(s.chords) },
      { title: "EQ / etch", steps: [s.chords.eq, s.lead.eq] },
    ];
  }
  if (kind === "build") {
    return [
      {
        title: "Drums",
        steps: [
          "Last 4–8: snare roll, then a gap. Optional kickroll on the last beat.",
          ...s.drums.slice(0, 1),
        ],
      },
      {
        title: "Serum",
        steps: [
          "Open lead/chord filter across the build. Same MIDI as the drop — do not write a new riff.",
          s.lead.midi,
        ],
      },
    ];
  }
  if (kind === "intro" || kind === "outro" || kind === "tease") {
    return [
      { title: "Kick / drums", steps: ["Filtered or half-open kick. Clap optional. Hats only.", s.kick[0]!] },
      { title: "Bass", steps: s.bass },
    ];
  }
  return [
    { title: `Serum lead — ${s.lead.name}`, steps: serumLines(s.lead) },
    { title: "EQ / etch", steps: [s.lead.eq] },
  ];
}

function serumLines(p: SerumPatch): string[] {
  return [
    `Osc: ${p.osc}`,
    `Filter: ${p.filter}`,
    `Env: ${p.env}`,
    `LFO: ${p.lfo}`,
    `FX: ${p.fx}`,
    `MIDI: ${p.midi}`,
    `EQ: ${p.eq}`,
  ];
}
