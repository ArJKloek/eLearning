// ---------- Helpers ----------
function parseNum(raw) {
  if (raw == null) return NaN;
  const s = String(raw).trim()
    .replace(/\s+/g, '')   // remove spaces
    .replace(',', '.');    // comma -> dot
  // Accept numbers like 1.23, -4, 5e-3, +2.5E6
  if (/^[+-]?\d+(?:\.\d+)?(?:e[+-]?\d+)?$/i.test(s)) return Number(s);
  return NaN;
}

function nearlyEqual(a, b, relTol = 0.01, absTol = 1e-12) {
  if (!isFinite(a) || !isFinite(b)) return false;
  const diff = Math.abs(a - b);
  return diff <= Math.max(absTol, relTol * Math.abs(b));
}

// mark ✔ or ✖ directly
function setMark(id, ok) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.visibility = 'visible';
  el.style.fontStyle = 'normal'; // <i> shouldn't be italic
  el.style.color = ok ? 'green' : 'red';
  el.textContent = ok ? '✔' : '✖';
}

// ---------- Checker ----------
function checkv2(answers) {
  for (let i = 0; i < answers.length; i++) {
    const input = document.getElementById('antw' + i);
    const markId = 'vrg' + i;
    if (!input) continue;

    const raw = String(input.value || '').trim();
    if (!raw) {
      // empty → hide mark
      const icon = document.getElementById(markId);
      if (icon) icon.style.visibility = 'hidden';
      input.style.borderColor = '';
      continue;
    }

    const key = answers[i];

    // --- text answers ---
    if (typeof key === 'string') {
      const ok = raw.toLowerCase() === key.toLowerCase();
      setMark(markId, ok);
      input.style.borderColor = ok ? 'green' : 'crimson';
      continue;
    }

    // --- numeric answers ---
    const val = parseNum(raw);
    if (isNaN(val)) {
      setMark(markId, false);
      input.style.borderColor = 'crimson';
      continue;
    }

    const ok = nearlyEqual(val, Number(key), 0.01, 1e-12);
    setMark(markId, ok);
    input.style.borderColor = ok ? 'green' : 'crimson';
  }
}
