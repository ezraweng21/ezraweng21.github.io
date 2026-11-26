"use client";

import { useEffect, useState } from "react";
import "./practice-desk.css";

type Clock = { minutes: number; left: number; until: number | null };
const fresh = (minutes: number): Clock => ({ minutes, left: minutes * 60, until: null });
const secondsLeft = (clock: Clock) => clock.until === null ? clock.left : Math.max(0, Math.ceil((clock.until - Date.now()) / 1000));
const timerKey = "folio:practice-clock:v1";

export function FocusTimer() {
  const [clock, setClock] = useState(() => fresh(25));
  const [left, setLeft] = useState(1500);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(timerKey) ?? "null");
      if (saved && [5,15,25,45].includes(saved.minutes) && Number.isInteger(saved.left) &&
          saved.left >= 0 && saved.left <= saved.minutes * 60 && (saved.until === null || Number.isFinite(saved.until))) {
        const remaining = secondsLeft(saved);
        setClock(remaining ? saved : { ...saved, left: 0, until: null });
        setLeft(remaining);
      }
    } catch { /* An unreadable timer starts fresh. */ }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { sessionStorage.setItem(timerKey, JSON.stringify(clock)); } catch { /* Countdown still works without storage. */ }
    if (clock.until === null) return;
    function tick() {
      const remaining = secondsLeft(clock);
      setLeft(remaining);
      if (!remaining) setClock({ ...clock, left: 0, until: null });
    }
    const id = window.setInterval(tick, 200);
    document.addEventListener("visibilitychange", tick);
    return () => { clearInterval(id); document.removeEventListener("visibilitychange", tick); };
  }, [clock, ready]);

  function update(next: Clock) { setClock(next); setLeft(secondsLeft(next)); }
  const running = clock.until !== null;
  return <section className="practice-clock" aria-labelledby="timer-heading">
      <h2 id="timer-heading">Focus timer</h2>
      <span role="timer" aria-label="Time remaining" className="practice-digits">{String(Math.floor(left / 60)).padStart(2,"0")}:{String(left % 60).padStart(2,"0")}</span>
      <div className="practice-controls">
        <select aria-label="Session length" value={clock.minutes} disabled={!ready || running} onChange={e => update(fresh(Number(e.target.value)))}>
          {[5,15,25,45].map(n => <option key={n} value={n}>{n} min</option>)}
        </select>
        <button type="button" disabled={!ready} onClick={() => {
          const remaining = running ? secondsLeft(clock) : left || clock.minutes * 60;
          update({ ...clock, left: remaining, until: running ? null : Date.now() + remaining * 1000 });
        }}>{running ? "Pause" : left > 0 && left < clock.minutes * 60 ? "Resume" : "Start"}</button>
        <button type="button" disabled={!ready} onClick={() => update(fresh(clock.minutes))}>Reset</button>
      </div>
      <span role="status">{left === 0 ? "Session complete." : ""}</span>
  </section>;
}
