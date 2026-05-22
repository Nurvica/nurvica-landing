import type { Profile } from "@/lib/dashboard/profile";

export type RoutineBlock = {
  id: string;
  title: string;
  /** Human-readable cadence, e.g. "Every day". */
  cadence: string;
  /** iCalendar RRULE body (without the leading "RRULE:"). */
  rrule: string;
  /** Local start time, "HH:MM". */
  time: string;
  items: string[];
};

type WashInfo = { label: string; rrule: string };

function washInfo(freq: string | null): WashInfo {
  switch (freq) {
    case "1-3-days":
      return { label: "Every 2–3 days", rrule: "FREQ=DAILY;INTERVAL=3" };
    case "weekly":
      return { label: "Once a week", rrule: "FREQ=WEEKLY;BYDAY=SU" };
    case "2-weeks":
      return { label: "Every 2 weeks", rrule: "FREQ=WEEKLY;INTERVAL=2;BYDAY=SU" };
    case "monthly":
      return { label: "Monthly", rrule: "FREQ=MONTHLY;BYMONTHDAY=1" };
    default:
      return { label: "Weekly", rrule: "FREQ=WEEKLY;BYDAY=SU" };
  }
}

/**
 * Builds a structured weekly rhythm from the profile. The daily anchors reuse
 * the same personalized steps shown on the dashboard, so the two stay in sync.
 */
export function buildSchedule(profile: Profile): RoutineBlock[] {
  const wash = washInfo(profile.washFrequency);

  const dailyItems =
    profile.routine.length > 0
      ? profile.routine.map((s) => s.label)
      : [
          "Massage your scalp for 4 minutes",
          "Sleep on satin tonight",
          "Hands out of your hair",
        ];

  const blocks: RoutineBlock[] = [
    {
      id: "daily",
      title: "Daily anchors",
      cadence: "Every day",
      rrule: "FREQ=DAILY",
      time: "08:00",
      items: dailyItems,
    },
    {
      id: "wash",
      title: "Wash day",
      cadence: wash.label,
      rrule: wash.rrule,
      time: "10:00",
      items: [
        "Gentle, scalp-focused cleanse",
        "20-minute deep condition with heat",
        "Leave-in + cream + sealant on soaking-wet hair",
      ],
    },
    {
      id: "midweek",
      title: "Mid-week refresh",
      cadence: "Twice a week",
      rrule: "FREQ=WEEKLY;BYDAY=TU,FR",
      time: "08:00",
      items: [
        "Revive curls with a water-based leave-in",
        "Re-seal your ends with a little oil or butter",
      ],
    },
    {
      id: "monthly",
      title: "Monthly reset",
      cadence: "Once a month",
      rrule: "FREQ=MONTHLY;BYMONTHDAY=1",
      time: "10:00",
      items: [
        profile.concerns.includes("breakage") || profile.concerns.includes("damage")
          ? "Bond-repair or protein treatment"
          : "Deep-conditioning or protein treatment",
        "Trim only what's split",
        "Audit what's working — adjust the plan",
      ],
    },
  ];

  return blocks;
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

/** Floating local time stamp: YYYYMMDDTHHMMSS (no timezone — "wall clock"). */
function fmtLocal(d: Date): string {
  return (
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}` +
    `T${pad(d.getHours())}${pad(d.getMinutes())}00`
  );
}

/** UTC stamp with trailing Z, used for DTSTAMP. */
function fmtUTC(d: Date): string {
  return (
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}` +
    `T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`
  );
}

/** Next occurrence of "HH:MM" — today if still ahead, otherwise tomorrow. */
function nextStart(time: string): Date {
  const [h, m] = time.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  if (d.getTime() <= Date.now()) d.setDate(d.getDate() + 1);
  return d;
}

function escapeICS(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

/**
 * Serializes the schedule to an iCalendar (.ics) document with one recurring
 * event per block and a display alarm. Importable into Apple/Google Calendar.
 */
export function buildICS(blocks: RoutineBlock[]): string {
  const stamp = fmtUTC(new Date());
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//NURVICA//Hair Routine//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:NURVICA Routine",
  ];

  for (const block of blocks) {
    const start = nextStart(block.time);
    const description = escapeICS(block.items.map((i) => `• ${i}`).join("\n"));
    lines.push(
      "BEGIN:VEVENT",
      `UID:nurvica-${block.id}-${stamp}@nurvica.app`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${fmtLocal(start)}`,
      "DURATION:PT15M",
      `RRULE:${block.rrule}`,
      `SUMMARY:${escapeICS(`NURVICA — ${block.title}`)}`,
      `DESCRIPTION:${description}`,
      "BEGIN:VALARM",
      "TRIGGER:-PT10M",
      "ACTION:DISPLAY",
      `DESCRIPTION:${escapeICS(block.title)}`,
      "END:VALARM",
      "END:VEVENT"
    );
  }

  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}
