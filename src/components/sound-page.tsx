import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { PageKicker, SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { GENRE_LIST } from "@/lib/arrangement/genres";
import { SERUM_FROM_SCRATCH, SPIRE_FROM_SCRATCH } from "@/lib/arrangement/init-synth";
import { DAW_SESSION, EQ_ETCH, SOUND } from "@/lib/arrangement/sound";

export function SoundPage() {
  return (
    <SiteShell active="sound">
      <PageKicker>Any DAW</PageKicker>
      <h1 className="mt-3 font-display text-5xl uppercase leading-[0.95] tracking-wide">
        Kick, Serum, Spire, mix
      </h1>
      <p className="mt-4 text-base text-pretty text-muted">
        Same session in every DAW. Leads and chords start from Init in Serum or Spire — never from a
        factory preset. MIDI and EQ stay the same; only the knobs change.
      </p>

      <Section title="Session" n="01">
        <ol className="list-decimal space-y-2 pl-4">
          {DAW_SESSION.map((s) => (
            <li key={s} className="text-sm text-pretty text-muted">
              {s}
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Kick and drums" n="02">
        <p className="text-sm text-pretty text-muted">
          Kick on its own track. Clap a 16th after it. Hats off the transient. Snare rolls only in
          the last 4–8 of a build. Kickrolls are extra hits on the kick track, not a separate drum
          loop. Pitch the kick to the key unless it is pure raw noise.
        </p>
      </Section>

      <Section title="Reverse bass" n="03">
        <p className="text-sm text-pretty text-muted">
          Offbeat after every kick. Reverse a short bass hit, or an envelope that swells into the
          next downbeat. Sidechain it to the kick so the punch stays. If the kick is already
          full-range (xtra raw, uptempo), mute it.
        </p>
      </Section>

      <Section title="Serum from Init" n="04">
        <p className="text-sm text-pretty text-muted">
          Menu → Init Preset. Empty default. Then saw, unison, filter, two envelopes, one LFO, FX.
        </p>
        <ol className="mt-3 list-decimal space-y-2 pl-4">
          {SERUM_FROM_SCRATCH.lead.map((s) => (
            <li key={s} className="text-sm text-pretty text-muted">
              {s}
            </li>
          ))}
        </ol>
        <p className="mt-4 font-display text-sm uppercase tracking-wide">Chords (second Init)</p>
        <ol className="mt-2 list-decimal space-y-2 pl-4">
          {SERUM_FROM_SCRATCH.chords.map((s) => (
            <li key={s} className="text-sm text-pretty text-muted">
              {s}
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Spire from Init" n="05">
        <p className="text-sm text-pretty text-muted">
          Click Init in the preset browser. OSC 1 Classic SAW, then Uni, filter, ENV 1/2, matrix,
          FX. Same MIDI as Serum.
        </p>
        <ol className="mt-3 list-decimal space-y-2 pl-4">
          {SPIRE_FROM_SCRATCH.lead.map((s) => (
            <li key={s} className="text-sm text-pretty text-muted">
              {s}
            </li>
          ))}
        </ol>
        <p className="mt-4 font-display text-sm uppercase tracking-wide">Chords (second Init)</p>
        <ol className="mt-2 list-decimal space-y-2 pl-4">
          {SPIRE_FROM_SCRATCH.chords.map((s) => (
            <li key={s} className="text-sm text-pretty text-muted">
              {s}
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Leads (the riff)" n="06">
        <p className="text-sm text-pretty text-muted">
          One lead track (Serum or Spire). Write an 8-bar riff in the session key — minor pentatonic for
          euphoric (1 b3 4 5 b7), octaves and fifths for early, chromatic 2–3 notes for screech.
          Call in bars 1–4, answer in 5–8. Rest on kick downbeats. Copy that 8 through the drop;
          Drop B is the same MIDI up an octave or with extra 8ths, not a new song.
        </p>
      </Section>

      <Section title="Chords (the loop)" n="07">
        <p className="text-sm text-pretty text-muted">
          Workhorse loop: i – bVI – III – bVII, two bars each. In Fm that is Fm – Db – Ab – Eb. Open
          voicing in the break (root in the left, a C on top if you can). Drop: drop the bass note,
          8th-note offbeats on the +. Duplicate the patch for pad vs stab envelopes. Invert so the
          top note does not jump.
        </p>
      </Section>

      <Section title="EQ / etch" n="08">
        <ol className="list-decimal space-y-2 pl-4">
          {EQ_ETCH.map((s) => (
            <li key={s} className="text-sm text-pretty text-muted">
              {s}
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Mix" n="09">
        <p className="text-sm text-pretty text-muted">
          Kick owns 50–80 Hz and the click at 3–5 kHz. Bass 80–250. Leads above 250. Duck music with
          the kick. Clip the kick bus. Limiter last. If it is loud but small, the sidechain is too
          slow, the kick has no click, or the lead etch is sitting on the same band as the tok.
        </p>
      </Section>

      <h2 className="mt-12 font-display text-3xl uppercase tracking-wide">Per kit</h2>
      <p className="mt-2 text-sm text-muted">
        Open a genre for the kit knobs (Serum and Spire) and the kick stack.
      </p>
      <ul className="mt-4 space-y-2">
        {GENRE_LIST.map((g) => (
          <li key={g.id}>
            <Link
              to="/genres/$id"
              params={{ id: g.id }}
              className="block rounded-lg bg-surface px-4 py-3 ring-1 ring-border hover:bg-surface-2"
            >
              <p className="font-display uppercase tracking-wide">{g.name}</p>
              <p className="mt-1 text-xs text-muted">
                {SOUND[g.id].lead.name} · {SOUND[g.id].chords.name}
              </p>
            </Link>
          </li>
        ))}
      </ul>
      <Button asChild className="mt-8">
        <Link to="/studio">Open the studio</Link>
      </Button>
    </SiteShell>
  );
}

function Section({ title, n, children }: { title: string; n: string; children: ReactNode }) {
  return (
    <section className="mt-10 border-t border-border pt-6">
      <p className="font-mono text-[11px] text-subtle">{n}</p>
      <h2 className="mt-1 font-display text-2xl uppercase tracking-wide">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}
