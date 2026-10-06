/**
 * Open/closed status in Penang time (Asia/Kuala_Lumpur), from the listed hours:
 * 11:00–22:30, closed Fridays. The listing is from 2010, so the UI always pairs
 * this with a "please call ahead" note.
 */
export type OpenStatus = { open: boolean; label: string };

export function penangStatus(now = new Date()): OpenStatus {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kuala_Lumpur",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = get("weekday");
  const mins = Number(get("hour")) * 60 + Number(get("minute"));
  if (day === "Fri") return { open: false, label: "Closed today (Friday)" };
  if (mins < 11 * 60) return { open: false, label: "Opens at 11 am" };
  if (mins >= 22 * 60 + 30) return { open: false, label: day === "Thu" ? "Closed. Opens Saturday, 11 am" : "Closed. Opens 11 am" };
  return { open: true, label: "Open now, until 10:30 pm" };
}
