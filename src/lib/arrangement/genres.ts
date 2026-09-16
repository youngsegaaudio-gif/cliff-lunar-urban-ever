import type { GenreDef, GenreId, LaneId, PhraseKind, PhraseRecipe, ReferenceTrack } from "./types";
import { GENRE_IDS } from "./types";

export const LANE_META: Record<
  LaneId,
  { name: string; short: string; hint: string }
> = {
  kick: {
    name: "Kick",
    short: "KICK",
    hint: "Downbeat weapon. Tok, pitch, distortion, kickrolls.",
  },
  bass: {
    name: "Reverse bass",
    short: "RB",
    hint: "Offbeat after every kick. The hardstyle groove.",
  },
  perc: {
    name: "Perc / claps",
    short: "PERC",
    hint: "Clap after kick, hats, rides, snare rolls in builds.",
  },
  fx: {
    name: "FX",
    short: "FX",
    hint: "Risers, impacts, crashes, downlifters, white noise.",
  },
  atm: {
    name: "Atmosphere",
    short: "ATM",
    hint: "Pads, noise beds, cinematic drones, filtered world.",
  },
  lead: {
    name: "Leads",
    short: "LEAD",
    hint: "Supersaw, screech, hoover, zaag. Sidechain to kick.",
  },
  chords: {
    name: "Chords / stabs",
    short: "CHD",
    hint: "Minor stabs, supersaw chords, piano in breaks.",
  },
  vox: {
    name: "Vocals",
    short: "VOX",
    hint: "Hook, MC, chops, spoken. Sit above the kick, not in it.",
  },
};

export const KIND_META: Record<
  PhraseKind,
  { name: string; dj: string }
> = {
  intro: { name: "Intro", dj: "4 or 8 to get in. Grow it later if the mix needs a longer runway." },
  tease: { name: "Tease", dj: "Flash the identity, then take it away." },
  break: { name: "Break", dj: "Groove without dumping the whole lead." },
  build: { name: "Build", dj: "Tighten it. Last 4–8 is the lift." },
  drop: { name: "Drop A", dj: "First hit. Think in 16s or 32s." },
  dropB: { name: "Drop B", dj: "Change something — kick, layer, or the riff. Don't clone A." },
  breakdown: { name: "Breakdown", dj: "Hands up or go dark. Kick usually sits out." },
  bridge: { name: "Bridge", dj: "A reset between two hits, not a second song." },
  outro: { name: "Outro", dj: "Strip it so the next DJ can actually mix." },
};

const KEYS_MINOR = [
  "C minor",
  "C# minor",
  "D minor",
  "Eb minor",
  "E minor",
  "F minor",
  "F# minor",
  "G minor",
  "Ab minor",
  "A minor",
  "Bb minor",
  "B minor",
] as const;

const KEYS_MAJOR = [
  "C major",
  "Db major",
  "D major",
  "Eb major",
  "E major",
  "F major",
  "F# major",
  "G major",
  "Ab major",
  "A major",
  "Bb major",
  "B major",
] as const;

export const KEYS_ALL: string[] = [...KEYS_MINOR, ...KEYS_MAJOR];

export function shortKey(k: string): string {
  return k.replace(" minor", "m").replace(" major", "");
}

export function pickKey(rng: () => number): string {
  // Hardstyle lives in minor. Major is there if you want it.
  const pool = rng() < 0.85 ? KEYS_MINOR : KEYS_MAJOR;
  return pool[Math.floor(rng() * pool.length)]!;
}

function ref(
  title: string,
  artist: string,
  why: string,
  form: PhraseKind[],
  steal: string,
): ReferenceTrack {
  return { title, artist, why, form, steal };
}

function R(
  partial: PhraseRecipe,
): PhraseRecipe {
  return partial;
}

function baseRecipes(
  overrides: Partial<Record<PhraseKind, PhraseRecipe>>,
): Record<PhraseKind, PhraseRecipe> {
  const fallback: Record<PhraseKind, PhraseRecipe> = {
    intro: R({
      intent: "Kick the session off. 4 bars of FX or 8 of a filtered kick — that's how most of these actually start.",
      energy: 2,
      defaultBars: 8,
      lanes: {
        kick: { state: "filter", put: "Filtered or half-open on every downbeat. First 4 can be FX only." },
        bass: { state: "sparse", put: "Reverse bass on the offbeat from bar 5, quieter than the drop." },
        perc: { state: "sparse", put: "Hats only. No snare roll yet." },
        fx: { state: "sparse", put: "Crash or reverse hit at bar 1. Keep the first 4 almost empty." },
        atm: { state: "full", put: "A room, not a loop. Dark or airy bed." },
        lead: { state: "off", put: "Leave the lead out. Save the surprise." },
        chords: { state: "off", put: "Not yet." },
        vox: { state: "off", put: "A whisper if you must. Not the hook." },
      },
      notes: [
        "4-bar FX pickup or 8-bar kick intro. You can duplicate later if a DJ mix needs 16.",
      ],
      howToBuild: [
        "Bars 1–4: FX / atmosphere. 5–8: filtered kick on 1-2-3-4.",
        "Program kick + reverse bass as an 8-bar loop after that. Don't open the full kick until the build or drop.",
      ],
    }),
    tease: R({
      intent: "Flash one bar of the identity, then snatch it back.",
      energy: 2,
      defaultBars: 8,
      lanes: {
        kick: { state: "filter", put: "Kick stays filtered or dry." },
        bass: { state: "sparse", put: "Reverse bass keeps walking." },
        perc: { state: "sparse", put: "Light clap." },
        fx: { state: "sparse", put: "Reverse cymbal into the next phrase." },
        atm: { state: "full", put: "Pads open a little." },
        lead: { state: "sparse", put: "One motif, 2–4 notes, then shut up." },
        chords: { state: "sparse", put: "Soft stab on the 1 of each 8." },
        vox: { state: "sparse", put: "The title word, once." },
      },
      notes: ["If you dump the whole riff here, Drop A feels cheap."],
      howToBuild: [
        "Copy 8 bars of the drop lead, mute everything except the first phrase.",
        "Low-pass the lead around 1 kHz.",
      ],
    }),
    break: R({
      intent: "A groove DJs can ride. Don't spend the hook yet.",
      energy: 3,
      defaultBars: 16,
      lanes: {
        kick: { state: "full", put: "Kick in, not climax distortion." },
        bass: { state: "full", put: "Reverse bass at drop level." },
        perc: { state: "full", put: "Clap after the kick." },
        fx: { state: "sparse", put: "Crashes on 8s." },
        atm: { state: "sparse", put: "Thin the pad so the kick has air." },
        lead: { state: "sparse", put: "A counter-riff or a muted saw. Not the main line." },
        chords: { state: "sparse", put: "Offbeat stabs if it needs glue." },
        vox: { state: "off", put: "Save the sung hook for the breakdown." },
      },
      notes: ["Treat it like a tool loop — 16 that can repeat in a set."],
      howToBuild: ["Lock kick + reverse bass + clap first. Add one extra layer, then stop."],
    }),
    build: R({
      intent: "Tighten the screws. Last 4 bars do the lift.",
      energy: 4,
      defaultBars: 16,
      lanes: {
        kick: { state: "sparse", put: "Kick often drops out, or pitches up the last 4." },
        bass: { state: "off", put: "Mute reverse bass so the drop slam actually slams." },
        perc: { state: "climax", put: "Snare roll: 8ths → 16ths → 32nds last bar." },
        fx: { state: "climax", put: "Riser, white noise, reverse crash, impact on the 1." },
        atm: { state: "filter", put: "Filter-open the pad with the riser." },
        lead: { state: "sparse", put: "Stabs or a rising motif. Not the full riff." },
        chords: { state: "sparse", put: "Hold a tension chord." },
        vox: { state: "sparse", put: "A chop or a count-in on the last 4." },
      },
      notes: [
        "Empty the low end in the last 2–4. First kick of the drop has to be the new event.",
      ],
      howToBuild: [
        "Draw a 16-bar snare, automate density.",
        "Riser + pad filter. Cut kick and reverse bass from bar 13–16.",
      ],
    }),
    drop: R({
      intent: "This is the hit. Full groove + the main idea, usually 32.",
      energy: 5,
      defaultBars: 32,
      lanes: {
        kick: { state: "full", put: "Open kick, full body, clap after it." },
        bass: { state: "full", put: "Reverse bass every offbeat, ducked under the kick." },
        perc: { state: "full", put: "Hats + clap. Don't let a snare roll fight the kick." },
        fx: { state: "sparse", put: "Crash on 1 and 17. Impacts on fills." },
        atm: { state: "off", put: "Mute pads — they smear the kick." },
        lead: { state: "full", put: "Main riff, sidechained to kick." },
        chords: { state: "sparse", put: "Stabs on 8-bar turns if the lead has space." },
        vox: { state: "sparse", put: "Hook in the gaps, not on the kick click." },
      },
      notes: [
        "32 = two 16s. Put a little fill at 16 so DJs can phrase-mix.",
        "Lead busy? Chords out.",
      ],
      howToBuild: [
        "8 bars of kick + reverse bass + clap first.",
        "Add the lead. Sidechain lead and bass to the kick.",
        "Duplicate to 32. Change the last 8 a bit — extra screech, fill, chop.",
      ],
    }),
    dropB: R({
      intent: "Same energy, new information — kick switch, extra screech, or a second riff.",
      energy: 5,
      defaultBars: 32,
      lanes: {
        kick: { state: "climax", put: "Harder kick, a pitch move, or kickroll fills." },
        bass: { state: "full", put: "Reverse bass stays. Don't reinvent the groove." },
        perc: { state: "full", put: "Same grid. Ride cymbal if you want." },
        fx: { state: "sparse", put: "Fresh crash on 1 so it reads as a new phrase." },
        atm: { state: "off", put: "Still out." },
        lead: { state: "climax", put: "Octave, extra screech, or an answer riff." },
        chords: { state: "sparse", put: "A wider chord on the 1 of each 16 if it needs glue." },
        vox: { state: "full", put: "Hook again, or a shout." },
      },
      notes: ["This is why festival tracks feel like they climb instead of looping."],
      howToBuild: [
        "Duplicate Drop A.",
        "Change one of: kick, lead layer, vocal. Not all three.",
      ],
    }),
    breakdown: R({
      intent: "The bit people film. Kick usually sits out.",
      energy: 2,
      defaultBars: 32,
      lanes: {
        kick: { state: "off", put: "Mute. A heartbeat pulse under the last 8 is fine." },
        bass: { state: "off", put: "Mute reverse bass." },
        perc: { state: "off", put: "Soft ticks only if it needs a clock." },
        fx: { state: "sparse", put: "Reverse whoosh into the build." },
        atm: { state: "full", put: "Wide pads, piano, strings — or an industrial drone if it's raw." },
        lead: { state: "full", put: "A melody you can actually sing. Clean, not distorted." },
        chords: { state: "full", put: "Full minor progression. This is the song." },
        vox: { state: "full", put: "Verse / hook. Make it singable." },
      },
      notes: [
        "Give it a melody, not just atmosphere.",
        "Last 8 should already lean into the next build.",
      ],
      howToBuild: [
        "Write 8 bars of chords, loop to 32.",
        "Vocal first, then a lead that follows it.",
        "Slow filter open toward the build.",
      ],
    }),
    bridge: R({
      intent: "A short reset between two hits. Not a second breakdown.",
      energy: 3,
      defaultBars: 16,
      lanes: {
        kick: { state: "filter", put: "Kick comes back half-open." },
        bass: { state: "sparse", put: "Reverse bass ghosted." },
        perc: { state: "sparse", put: "Hats only." },
        fx: { state: "sparse", put: "Downlifter off the previous drop." },
        atm: { state: "full", put: "Hold whatever atmosphere you had." },
        lead: { state: "sparse", put: "A motif, not the riff." },
        chords: { state: "sparse", put: "One stab pattern." },
        vox: { state: "sparse", put: "Ad-lib." },
      },
      notes: ["Use a bridge when another breakdown would stall the floor."],
      howToBuild: ["16 max. If it wants to be 32, it's a breakdown."],
    }),
    outro: R({
      intent: "Mix-out. Leave tools a DJ can actually beatmatch.",
      energy: 2,
      defaultBars: 16,
      lanes: {
        kick: { state: "full", put: "Open kick, stable. No pitch tricks." },
        bass: { state: "full", put: "Reverse bass at mix-out level." },
        perc: { state: "sparse", put: "Hats. Lose the busy fills." },
        fx: { state: "sparse", put: "One crash, then dry." },
        atm: { state: "off", put: "Mute pads." },
        lead: { state: "off", put: "Kill the lead so the next intro can speak." },
        chords: { state: "off", put: "Off." },
        vox: { state: "off", put: "Off." },
      },
      notes: ["Last 16 should mix as easily as the first 16."],
      howToBuild: ["Copy the intro groove, open the kick, strip the identity."],
    }),
  };
  return { ...fallback, ...overrides };
}

export const GENRES: Record<GenreId, GenreDef> = {
  early: {
    id: "early",
    name: "Early / Classic",
    short: "Reverse bass era. Simple phrases, long mix-ins.",
    bpm: 148,
    bpmRange: [142, 150],
    keys: KEYS_ALL,
    kick: "Long-tail reverse-bass kick. Less tok, more body. Keep it simple.",
    groove: "Kick on 1-2-3-4, reverse bass on the offbeats. That is the genre.",
    lead: "Hoovers, early screeches, analog stabs. One riff is enough.",
    vibe: "Warehouse, Scantraxx, Qlimax 2003–2008. Nostalgic and direct.",
    mixTip: "Don't stack six layers. If the reverse bass is right, leave it.",
    references: [
      ref("The Prophecy", "Deepack", "Anthem intro, then the reverse bass does the talking.", ["intro", "tease", "build", "drop", "dropB", "break", "build", "drop", "outro"], "Steal the long mix-in and the simple riff. Groove carries it, lead stays short."),
      ref("FTS", "Showtek", "Spoken intro, one riff, you still remember the drop.", ["intro", "tease", "build", "drop", "break", "build", "dropB", "outro"], "One spoken line, one riff. Don't write a second song in Drop B — just hit harder."),
      ref("The Sacrifice", "Headhunterz", "Melody on a classic kick/bass bed.", ["intro", "build", "drop", "breakdown", "build", "dropB", "outro"], "Melody in the break, same contour in the drop. Kick/bass never get fancy."),
      ref("Ti Sento", "Technoboy", "Italian reverse bass, long phrases.", ["intro", "break", "build", "drop", "dropB", "outro"], "Long 32s. Reverse bass is the star. Don't rush the outro."),
      ref("Life Beyond Earth", "Project One", "Golden-age discipline — identity, then lift.", ["intro", "tease", "build", "drop", "breakdown", "build", "dropB", "outro"], "Tease the motif, spend it in Drop A, sing it in the break, bigger in B."),
    ],
    templates: [
      ["intro", "tease", "build", "drop", "break", "build", "dropB", "outro"],
      ["intro", "build", "drop", "dropB", "breakdown", "build", "drop", "outro"],
    ],
    recipes: baseRecipes({
      drop: R({
        intent: "Classic drop: reverse bass is the star, lead is a hook not a wall.",
        energy: 5,
        defaultBars: 32,
        lanes: {
          kick: { state: "full", put: "Classic reverse-bass kick, long tail, not a modern tok." },
          bass: { state: "full", put: "Loud offbeat reverse bass. This is 80% of the drop." },
          perc: { state: "sparse", put: "Minimal. Maybe a clap, no modern 16th hats." },
          fx: { state: "sparse", put: "Crash on 1. Tape-style noise if any." },
          atm: { state: "off", put: "Off." },
          lead: { state: "full", put: "Hoover: F–C–F–C | Ab–C–F–C quarters. Gaps for reverse bass. Etch 2.5 kHz." },
          chords: { state: "off", put: "Usually off — early records are riff-led." },
          vox: { state: "sparse", put: "MC line or sample, not a sung chorus." },
        },
        notes: ["Think FTS / Ti Sento: the groove carries, the riff is short."],
        howToBuild: [
          "Program 8 bars of kick + reverse bass only. Bounce it. If it does not move you, fix this before any lead.",
          "Add a 1–2 bar hoover motif and loop it.",
        ],
      }),
    }),
  },
  nustyle: {
    id: "nustyle",
    name: "Nu-Style",
    short: "Golden age toks, bigger songs, 2008–2012.",
    bpm: 150,
    bpmRange: [148, 152],
    keys: KEYS_ALL,
    kick: "Layered tok: click + body + tail. Punchier than early.",
    groove: "Reverse bass still rules. Clap sits just after the kick.",
    lead: "More melodic, psy-tinged, festival-ready riffs.",
    vibe: "Headhunterz, Wildstylez, Noisecontrollers, Project One.",
    mixTip: "Sidechain the leads and reverse bass to the tok. Leave a hole for the click.",
    references: [
      ref("Scrap Attack", "Headhunterz", "Defqon anthem shape: identity, then the lift.", ["intro", "tease", "build", "drop", "dropB", "breakdown", "build", "drop", "outro"], "Two drops before the big vocal break. Second drop after the break is the one people remember."),
      ref("Tonight", "Headhunterz, Wildstylez, Noisecontrollers", "Long build, reverse bass payoff.", ["intro", "breakdown", "build", "drop", "dropB", "outro"], "Sing first. The drop is the payoff, not the intro. Keep the outro usable."),
      ref("Timeless", "Wildstylez", "Melody-first nu-style drop.", ["intro", "tease", "build", "drop", "breakdown", "build", "dropB", "outro"], "Write the melody before the tok. Drop B is the same line, bigger."),
      ref("Music Made Addict", "D-Block & S-te-Fan", "Actual song structure inside hardstyle.", ["intro", "break", "build", "drop", "breakdown", "build", "dropB", "outro"], "Groove break like a tool, then a proper song in the middle."),
      ref("So High", "Noisecontrollers", "Psy lead over a clean tok.", ["intro", "tease", "build", "drop", "dropB", "breakdown", "build", "drop", "outro"], "Lead has gaps. Don't wallpaper the tok with saws."),
    ],
    templates: [
      ["intro", "tease", "build", "drop", "dropB", "breakdown", "build", "drop", "outro"],
      ["intro", "break", "build", "drop", "breakdown", "build", "dropB", "outro"],
    ],
    recipes: baseRecipes({
      drop: R({
        intent: "Tok kick, reverse bass, a proper melody. Festival mainstage 2009.",
        energy: 5,
        defaultBars: 32,
        lanes: {
          kick: { state: "full", put: "Tok kick. Clap 1/16 after the transient." },
          bass: { state: "full", put: "Reverse bass sidechained hard to the tok." },
          perc: { state: "full", put: "Hats that do not steal the click." },
          fx: { state: "sparse", put: "Crash on 1 and 17." },
          atm: { state: "off", put: "Off in the drop." },
          lead: { state: "full", put: "8-bar call/answer in Fm: F G Ab C hold, then Eb C Ab F. Etch 2.8 kHz, HP 250." },
          chords: { state: "sparse", put: "Stabs on the turnarounds." },
          vox: { state: "sparse", put: "Catchphrase, not a full verse." },
        },
        notes: ["Drop A = melody A. Save a second motif for Drop B or the second drop."],
        howToBuild: [
          "Lock tok + reverse bass + clap as an 8-bar loop.",
          "Write an 8-bar lead. Duplicate to 32 with a fill at 16.",
        ],
      }),
    }),
  },
  euphoric: {
    id: "euphoric",
    name: "Euphoric",
    short: "Pitched kicks, supersaws, sing-along breakdowns.",
    bpm: 150,
    bpmRange: [148, 155],
    keys: KEYS_ALL,
    kick: "Pitched, musical, punchy — not fully distorted. Tune it to the key.",
    groove: "Reverse bass + pitched kick. Leads duck on every kick.",
    lead: "Supersaw (JP-8080 / Serum). Emotional, major-colour over minor chords.",
    vibe: "Hands in the air. Brennan Heart, Wildstylez, Da Tweekaz, Sound Rush.",
    mixTip: "Tune the kick. Duck the supersaws. Vocals live in the break, chops in the drop.",
    references: [
      ref("Imaginary", "Brennan Heart", "The vocal break is the song. Drop is the payoff.", ["intro", "tease", "build", "drop", "breakdown", "build", "dropB", "outro"], "Don't front-load the vocal. Hit first, then sing, then hit harder. Same melody both times."),
      ref("Year of Summer", "Wildstylez", "Sung hook + pitched kick. The template.", ["intro", "breakdown", "build", "drop", "dropB", "outro"], "Sing before you drop. Pitched kick, not a brick. Drop B is the hook chopped, not a new tune."),
      ref("Release", "Atmozfears", "Clean modern 32s.", ["intro", "tease", "build", "drop", "dropB", "breakdown", "build", "drop", "outro"], "Two drops, then the break, then the one that actually ends the set."),
      ref("Stay With Me", "Sound Rush & Sogma", "Festival vocal into a supersaw wall.", ["intro", "breakdown", "build", "drop", "bridge", "build", "dropB", "outro"], "Vocal identity up front. Bridge instead of a second ballad. Drop B goes wider, not darker."),
      ref("Live Forever", "Headhunterz", "Anthem break into a musical kick.", ["intro", "tease", "build", "drop", "breakdown", "build", "dropB", "outro"], "Keep the kick musical. If it turns into a wall, you wrote the wrong record."),
    ],
    templates: [
      ["intro", "tease", "build", "drop", "dropB", "breakdown", "build", "drop", "dropB", "outro"],
      ["intro", "breakdown", "build", "drop", "bridge", "build", "dropB", "outro"],
    ],
    recipes: baseRecipes({
      breakdown: R({
        intent: "This is the song. Melody, vocal, chords. Kick out.",
        energy: 2,
        defaultBars: 32,
        lanes: {
          kick: { state: "off", put: "Out. A soft pulse in the last 8 is fine." },
          bass: { state: "off", put: "Out." },
          perc: { state: "off", put: "Out, or a quiet clock." },
          fx: { state: "sparse", put: "Reverse into the build." },
          atm: { state: "full", put: "Wide pads, piano, air." },
          lead: { state: "full", put: "Sing-along 8: in Fm, C–Eb–F hold then Ab–F. Same contour as the drop." },
          chords: { state: "full", put: "Fm–Db–Ab–Eb, 2 bars each. Open voicing, C on top if you can." },
          vox: { state: "full", put: "Full hook. Stack a double. Keep lyrics short." },
        },
        notes: ["If this part is weak, the euphoric track has nothing to say."],
        howToBuild: [
          "Chords: i–bVI–III–bVII (Fm–Db–Ab–Eb). 2 bars each, C on top.",
          "Lead: minor pentatonic 8-bar, same contour you will drop.",
          "EQ: HP 200 on chords, 280 on lead. Etch lead 2.4 kHz. Open filter across 32.",
        ],
      }),
      drop: R({
        intent: "Pitched kick + reverse bass + supersaw. Musical, not brutal.",
        energy: 5,
        defaultBars: 32,
        lanes: {
          kick: { state: "full", put: "Pitched kick in key. Clap after the kick." },
          bass: { state: "full", put: "Reverse bass, sidechained, slightly quieter than rawstyle." },
          perc: { state: "full", put: "Hats that sparkle, not gabber rides." },
          fx: { state: "sparse", put: "Crash on 1 / 17." },
          atm: { state: "off", put: "Off — supersaw already fills the air." },
          lead: { state: "full", put: "Same 8-bar MIDI as the break, 8ths, rest on kick hits. Unison 7, HP 280, etch 2.4 kHz." },
          chords: { state: "sparse", put: "Same four chords, 3-note offbeat 8ths (drop the bass note)." },
          vox: { state: "sparse", put: "Hook chops on the offbeats or last 8." },
        },
        notes: ["Keep distortion musical. If the kick is a wall, you left euphoric."],
        howToBuild: [
          "Tune kick to the root or fifth.",
          "8-bar supersaw: pentatonic call/answer. Copy the break. Etch 2.4 kHz, kick click at 4 kHz.",
          "Sidechain lead + bass to kick. Clap a 16th after the kick.",
        ],
      }),
    }),
  },
  rawstyle: {
    id: "rawstyle",
    name: "Rawstyle",
    short: "Distorted kicks, screeches, darker 32s.",
    bpm: 155,
    bpmRange: [150, 160],
    keys: KEYS_ALL,
    kick: "Distorted, punchy, often slightly sharp. Kickrolls as fills.",
    groove: "Reverse bass still there, darker. Groove is aggressive, not bouncy.",
    lead: "Screeches, dissonant stabs. Melody is optional.",
    vibe: "Radical Redemption, Rebelion, D-Sturb, Warface, Crypsis.",
    mixTip: "Carve the screech around the kick click. Kickrolls live in the last 4 of a 16.",
    references: [
      ref("Brutal 3.0", "Radical Redemption", "The kick is the lead.", ["intro", "build", "drop", "dropB", "bridge", "build", "drop", "outro"], "Short intro. Kickrolls as language, not decoration. Skip the pretty break."),
      ref("Zombie", "Ran-D", "Dark hook, still a song.", ["intro", "tease", "build", "drop", "breakdown", "build", "dropB", "outro"], "Keep a hook so the raw drop has somewhere to come back to. Spoken, not a pop chorus."),
      ref("The Project", "Sub Zero Project", "Cinematic intro, then identity.", ["intro", "tease", "build", "drop", "dropB", "breakdown", "build", "drop", "outro"], "Let the intro feel like a trailer. Don't play the screech until Drop A."),
      ref("Legacy", "D-Sturb", "Modern raw phrasing.", ["intro", "build", "drop", "dropB", "breakdown", "build", "drop", "outro"], "Two full drops, short dark break, then the one with the extra kick layer."),
      ref("Hardest MF", "Rebelion", "Screech + kickroll as the whole language.", ["intro", "build", "drop", "dropB", "bridge", "build", "dropB", "outro"], "16s not 64s. Bridge, not a ballad. Change the kick pattern, not the key."),
    ],
    templates: [
      ["intro", "build", "drop", "dropB", "breakdown", "build", "drop", "outro"],
      ["intro", "tease", "build", "drop", "bridge", "build", "dropB", "outro"],
    ],
    recipes: baseRecipes({
      breakdown: R({
        intent: "Ominous, cinematic. Not a pop vocal — a threat.",
        energy: 2,
        defaultBars: 32,
        lanes: {
          kick: { state: "off", put: "Out, or a distant gated pulse." },
          bass: { state: "off", put: "Out." },
          perc: { state: "off", put: "Industrial ticks optional." },
          fx: { state: "sparse", put: "Impacts, reverse hits." },
          atm: { state: "full", put: "Drones, risers in the last 8, foundry air." },
          lead: { state: "sparse", put: "A dark motif, not a supersaw chorus." },
          chords: { state: "sparse", put: "Minor clusters, dissonance ok." },
          vox: { state: "full", put: "Spoken / shouted. Keep it short and mean." },
        },
        notes: ["Raw breakdowns fail when they copy euphoric piano. Stay dark."],
        howToBuild: ["One drone, one spoken line, one motif. Then filter into the build."],
      }),
      drop: R({
        intent: "Kick + screech. Melody takes a back seat.",
        energy: 5,
        defaultBars: 32,
        lanes: {
          kick: { state: "climax", put: "Distorted kick. Kickroll fill at bar 16 and 32." },
          bass: { state: "full", put: "Reverse bass, darker, still on the offbeat." },
          perc: { state: "sparse", put: "Clap after kick. Hats optional." },
          fx: { state: "sparse", put: "Impacts on fills, crash on 1." },
          atm: { state: "off", put: "Off." },
          lead: { state: "full", put: "Screech: F–B–C 16th offbeats. HP 400, etch 3.2 kHz, cut 8 kHz+." },
          chords: { state: "off", put: "Usually off." },
          vox: { state: "sparse", put: "Shout on the 1 of a 16, then out." },
        },
        notes: ["If you cannot hum a screech, make the kick pattern the hook."],
        howToBuild: [
          "Design the kick before anything else.",
          "8-bar screech. Duplicate. Kickroll the last bar of each 16.",
        ],
      }),
    }),
  },
  rawphoric: {
    id: "rawphoric",
    name: "Rawphoric",
    short: "Euphoric breakdown, raw drop. The 2020s hybrid.",
    bpm: 152,
    bpmRange: [150, 157],
    keys: KEYS_ALL,
    kick: "Raw / distorted in the drop. Musical in the break if it peeks in.",
    groove: "Same reverse-bass grid. Contrast is the arrangement, not the BPM.",
    lead: "Sing-able melody in the break; chopped or screech-layered in the drop.",
    vibe: "Sub Zero Project, Dual Damage, Vertile, D-Block collabs.",
    mixTip: "Contrast is the whole trick. Don't raw-ify the break or sweeten the drop too much.",
    references: [
      ref("It Will Be OK", "Sub Zero Project & Dual Damage", "Vocal break, then a wall.", ["intro", "breakdown", "build", "drop", "dropB", "outro"], "Sing the whole identity first. Drop is the same melody, uglier. Don't write a second chorus."),
      ref("Before I Wake", "Headhunterz & Vertile", "Melody identity, harder drop.", ["intro", "tease", "build", "drop", "breakdown", "build", "dropB", "outro"], "Pretty in the break, nasty in B. Same MIDI. The switch is the record."),
      ref("Burning Down", "Dual Damage", "Modern festival rawphoric.", ["intro", "tease", "build", "drop", "dropB", "breakdown", "build", "drop", "outro"], "Hit twice, then the vocal, then the one that ends it. Break doesn't need 48 bars."),
      ref("The Upside Down", "Project One", "Anthem break, heavier payoff.", ["intro", "breakdown", "build", "drop", "dropB", "bridge", "build", "drop", "outro"], "Anthem up front. Bridge instead of looping the ballad. Last drop is the rawest."),
      ref("Shivers", "D-Block & S-te-Fan & Ran-D", "Songwriting plus a raw kick.", ["intro", "breakdown", "build", "drop", "dropB", "outro"], "Write the song, then put a raw kick under the chorus chops. Keep the outro mixable."),
    ],
    templates: [
      ["intro", "tease", "build", "drop", "dropB", "breakdown", "build", "drop", "dropB", "outro"],
      ["intro", "breakdown", "build", "drop", "dropB", "bridge", "build", "drop", "outro"],
    ],
    recipes: baseRecipes({
      breakdown: R({
        intent: "Write an actual song here. The drop only punches because this bit is human.",
        energy: 2,
        defaultBars: 32,
        lanes: {
          kick: { state: "off", put: "Out." },
          bass: { state: "off", put: "Out." },
          perc: { state: "off", put: "Out." },
          fx: { state: "sparse", put: "Air into the last 8." },
          atm: { state: "full", put: "Lush pads / piano." },
          lead: { state: "full", put: "Memorable melody. Same notes you will later distort." },
          chords: { state: "full", put: "Clear minor progression." },
          vox: { state: "full", put: "Sung hook. This is the title." },
        },
        notes: ["Reuse this melody as chops or a distorted layer in Drop B."],
        howToBuild: [
          "Finish the vocal + chords before designing the raw kick.",
          "Export a dry melody stem to resample into the drop.",
        ],
      }),
      drop: R({
        intent: "Raw kick, but the melody (or a chop of it) still exists.",
        energy: 5,
        defaultBars: 32,
        lanes: {
          kick: { state: "climax", put: "Raw / distorted kick. Kickrolls as 16-bar punctuation." },
          bass: { state: "full", put: "Reverse bass at raw level." },
          perc: { state: "sparse", put: "Clap after kick." },
          fx: { state: "sparse", put: "Crash on 1." },
          atm: { state: "off", put: "Off." },
          lead: { state: "full", put: "Melody chopped, or screech answering the vocal hook." },
          chords: { state: "off", put: "Off — kick + lead only." },
          vox: { state: "sparse", put: "One-shot of the hook on bar 1 and 17." },
        },
        notes: ["If you mute the kick and still hear the song, the hybrid is working."],
        howToBuild: [
          "Design a raw kick that can sit under a melodic chop.",
          "Place 1-bar vocal chops on 8s, screech in the gaps.",
        ],
      }),
    }),
  },
  xtraraw: {
    id: "xtraraw",
    name: "Xtra Raw",
    short: "Zaag kicks, short phrases, almost no break.",
    bpm: 158,
    bpmRange: [154, 165],
    keys: KEYS_ALL,
    kick: "Reese / zaag, short tail, aggressive top. Kick is the lead.",
    groove: "Less bounce, more pressure. Reverse bass optional or distorted with the kick.",
    lead: "Screech, zaag tails, atonal. Melody is a luxury.",
    vibe: "Sickmode, Rooler, Adjuzt, Dual Damage club edits, The Straikerz.",
    mixTip: "Shorter phrases. 16-bar drops. Don't write a 48-bar breakdown — nobody asked.",
    references: [
      ref("TOO COLD", "Sickmode & Rooler", "Attitude + kick. Not a ballad.", ["intro", "build", "drop", "dropB", "bridge", "build", "drop", "outro"], "Get in fast. 16s. One arrogant line. Change the kick pattern, don't write a chorus."),
      ref("SAVE ME", "Sickmode, Rooler & Krowdexx", "Festival xtra-raw with a title hook.", ["intro", "tease", "build", "drop", "dropB", "breakdown", "build", "drop", "outro"], "A title you can shout, then kick language. Break is 16 of sneer, not a piano."),
      ref("ANNOYING MUSIC", "Rooler", "Kick language as personality.", ["intro", "build", "drop", "dropB", "build", "drop", "outro"], "No breakdown. Intro is 4. The kick pattern is the hook."),
      ref("CPU", "DEEZL", "Industrial, tight 16s.", ["intro", "build", "drop", "dropB", "bridge", "drop", "outro"], "Industrial ticks, not hats. Bridge is a breath, then straight back in."),
      ref("V4MOS", "The Straikerz & Sickmode", "Kickroll-forward phrasing.", ["intro", "build", "drop", "dropB", "build", "drop", "outro"], "Kickrolls inside the phrase, not just at the end. 16 + 16, then a bigger last hit."),
    ],
    templates: [
      ["intro", "build", "drop", "dropB", "bridge", "build", "drop", "outro"],
      ["intro", "build", "drop", "dropB", "build", "drop", "outro"],
    ],
    recipes: baseRecipes({
      intro: R({
        intent: "Get to the kick fast. 4–8 bars, then hit.",
        energy: 3,
        defaultBars: 8,
        lanes: {
          kick: { state: "filter", put: "Gated or high-passed zaag already teasing the drop kick." },
          bass: { state: "off", put: "Often skip classic reverse bass." },
          perc: { state: "sparse", put: "Hats, industrial ticks." },
          fx: { state: "sparse", put: "Impacts." },
          atm: { state: "sparse", put: "Noise bed, not a pad bed." },
          lead: { state: "off", put: "Off." },
          chords: { state: "off", put: "Off." },
          vox: { state: "sparse", put: "One arrogant line." },
        },
        notes: ["If the intro is 64 bars, you wrote the wrong genre."],
        howToBuild: ["16 of attitude, then build. If the intro is 64, wrong genre."],
      }),
      breakdown: R({
        intent: "Keep it short. A 16-bar sneer, not a ballad.",
        energy: 2,
        defaultBars: 16,
        lanes: {
          kick: { state: "off", put: "Out." },
          bass: { state: "off", put: "Out." },
          perc: { state: "off", put: "Out." },
          fx: { state: "sparse", put: "Reverse into the build." },
          atm: { state: "full", put: "Ugly drone." },
          lead: { state: "sparse", put: "A nasty motif." },
          chords: { state: "off", put: "Off." },
          vox: { state: "full", put: "Spoken hook." },
        },
        notes: ["Cap at 16 unless the vocal actually needs 32."],
        howToBuild: ["One line, one drone, out."],
      }),
      drop: R({
        intent: "Kick is the lead. 16s, not 64s.",
        energy: 5,
        defaultBars: 16,
        lanes: {
          kick: { state: "climax", put: "Zaag / reese kick. Kickrolls inside the phrase, not only at the end." },
          bass: { state: "sparse", put: "Optional. Many xtra-raw kicks carry their own bass." },
          perc: { state: "sparse", put: "Clap after kick if it needs a tick." },
          fx: { state: "sparse", put: "Impact on 1." },
          atm: { state: "off", put: "Off." },
          lead: { state: "sparse", put: "Screech answers, not a 32-bar melody." },
          chords: { state: "off", put: "Off." },
          vox: { state: "sparse", put: "Chant on the 1." },
        },
        notes: ["Prefer 16 + 16 Drop B over one 32 that does not change."],
        howToBuild: [
          "Design the kick as if it were a bassline.",
          "Write kickroll patterns as MIDI, not as afterthoughts.",
        ],
      }),
    }),
  },
  uptempo: {
    id: "uptempo",
    name: "Uptempo",
    short: "180–200 BPM. Kick-on-kick. Relentless 16s and 32s.",
    bpm: 190,
    bpmRange: [175, 205],
    keys: KEYS_ALL,
    kick: "Tight, compressed, often the entire low-mid. Kick is the track.",
    groove: "Four-on-the-floor at speed. Reverse bass is optional / gabber-like.",
    lead: "Screeches, stamped motifs, sometimes a happy-hardcore quote.",
    vibe: "Angerfist-adjacent energy, Sefa/Peacock when it goes euphoric-fast, Deadly Guns darkness.",
    mixTip: "Everything shorter. A 32 at 190 is already a long time on the floor.",
    references: [
      ref("Penitentiary", "Angerfist", "Hook plus relentless kick.", ["intro", "build", "drop", "dropB", "bridge", "build", "drop", "outro"], "Identity sample, then kick pressure. Don't pause for a ballad unless the sample needs it."),
      ref("Obey", "Sefa", "Faster, still phrased in clean 16s.", ["intro", "drop", "build", "dropB", "breakdown", "build", "drop", "outro"], "Hit early. A short sung/shouted break, then back. 16s stay 16s even at 190."),
      ref("Street Fighter", "Angerfist", "Sample identity, then the kick.", ["intro", "tease", "build", "drop", "dropB", "outro"], "Tease the sample, dump it in the drop, mix out. No mid-track TED talk."),
      ref("Trip to Ireland", "Dr. Peacock", "Melodic uptempo, still in phrases.", ["intro", "breakdown", "build", "drop", "dropB", "outro"], "Melody in the break, kicks at speed after. Don't hold pads across a 190 drop."),
      ref("This Is Dedicated", "Partyraiser", "Classic hardcore phrase discipline, just faster.", ["intro", "build", "drop", "dropB", "bridge", "drop", "outro"], "Two drops, a breath, last hit. Outro is kick-only so the next record can come in."),
    ],
    templates: [
      ["intro", "build", "drop", "dropB", "bridge", "build", "drop", "outro"],
      ["intro", "drop", "build", "dropB", "breakdown", "build", "drop", "outro"],
    ],
    recipes: baseRecipes({
      intro: R({
        intent: "Fast mix-in. 4–8 of usable kick.",
        energy: 3,
        defaultBars: 8,
        lanes: {
          kick: { state: "full", put: "Kick already mostly open — DJs mix at this speed." },
          bass: { state: "sparse", put: "Optional gabber offbeat." },
          perc: { state: "sparse", put: "Hats." },
          fx: { state: "sparse", put: "Impacts." },
          atm: { state: "sparse", put: "Noise / siren bed." },
          lead: { state: "off", put: "Off." },
          chords: { state: "off", put: "Off." },
          vox: { state: "sparse", put: "Stamp a sample." },
        },
        notes: ["Don't write a 64-bar ambient intro at 190."],
        howToBuild: ["16 bars of kick + sample. Build. Drop."],
      }),
      drop: R({
        intent: "Kick pressure. Motif stamped every 8.",
        energy: 5,
        defaultBars: 32,
        lanes: {
          kick: { state: "climax", put: "Full kick, variations every 8, fills every 16." },
          bass: { state: "sparse", put: "Only if the kick does not already own 80 Hz–200 Hz." },
          perc: { state: "sparse", put: "Claps if they read at this BPM." },
          fx: { state: "sparse", put: "Crash on 1." },
          atm: { state: "off", put: "Off." },
          lead: { state: "full", put: "Short screech or stamped riff every 8 bars." },
          chords: { state: "off", put: "Off unless it is euphoric-uptempo." },
          vox: { state: "full", put: "Shouts, chops, gang vocals on 8s." },
        },
        notes: ["At 190, 32 bars is ~40 seconds. That is a full thought. Change something at 16."],
        howToBuild: [
          "Write 8 bars of kick + vocal stamp.",
          "Duplicate to 32. Mutate bars 17–32 (pitch, extra screech, extra kick layer).",
        ],
      }),
      breakdown: R({
        intent: "Brief. A hook or a threat, then back.",
        energy: 2,
        defaultBars: 16,
        lanes: {
          kick: { state: "off", put: "Out." },
          bass: { state: "off", put: "Out." },
          perc: { state: "off", put: "Out." },
          fx: { state: "sparse", put: "Reverse into build." },
          atm: { state: "full", put: "Pad or organ if happy; drone if dark." },
          lead: { state: "full", put: "The melody, if this is the euphoric-fast cousin." },
          chords: { state: "sparse", put: "Optional." },
          vox: { state: "full", put: "Hook. Keep it 8–16 bars." },
        },
        notes: ["Cap it. Uptempo crowds punish long silence."],
        howToBuild: ["16 bars of hook, 8-bar build, drop."],
      }),
    }),
  },
};

export const GENRE_LIST = GENRE_IDS.map((id) => GENRES[id]);

export function barsToTime(bars: number, bpm: number): string {
  const beats = bars * 4;
  const seconds = (beats / bpm) * 60;
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
