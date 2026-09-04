import { wedding } from "@/config/wedding";

export interface CalEvent {
  title: string;
  description: string;
  location: string;
  startISO: string;
  endISO: string;
}

export function buildWeddingEvent(): CalEvent {
  return {
    title: `Mariage ${wedding.couple.name1} & ${wedding.couple.name2}`,
    description: `${wedding.dateLabel} — ${wedding.city}. ${wedding.couple.hashtag}`,
    location: wedding.venues[0]
      ? `${wedding.venues[0].name}, ${wedding.venues[0].address}`
      : wedding.city,
    startISO: wedding.weddingDate,
    endISO: wedding.weddingEndDate,
  };
}

/** Format Google Calendar : 20270612T150000Z */
function gcalDate(iso: string): string {
  return new Date(iso).toISOString().replace(/[-:]|\.\d{3}/g, "");
}

export function googleCalendarUrl(event: CalEvent): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${gcalDate(event.startISO)}/${gcalDate(event.endISO)}`,
    details: event.description,
    location: event.location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function icsDate(iso: string): string {
  return new Date(iso).toISOString().replace(/[-:]|\.\d{3}/g, "").replace("Z", "Z");
}

export function icsContent(event: CalEvent): string {
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//mariage//FR",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@mariage`,
    `DTSTAMP:${icsDate(new Date().toISOString())}`,
    `DTSTART:${icsDate(event.startISO)}`,
    `DTEND:${icsDate(event.endISO)}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description.replace(/\n/g, "\\n")}`,
    `LOCATION:${event.location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadIcs(event: CalEvent): void {
  const blob = new Blob([icsContent(event)], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "mariage.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
