// Range Trainer — standalone build (no bundler). React/ReactDOM are loaded
// as globals via <script> tags in index.html; this file is compiled with
// Babel (JSX only, no modules) into app.js at build time.
const {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  Fragment
} = React;

// ---- tiny local storage wrapper (mirrors the artifact window.storage API)
const storage = {
  async get(key) {
    const raw = window.localStorage.getItem(key);
    return raw === null ? null : {
      value: raw
    };
  },
  async set(key, value) {
    try {
      window.localStorage.setItem(key, value);
      return {
        value
      };
    } catch (e) {
      return null;
    }
  }
};

// ---- minimal lucide-style icon set (no icon package dependency) ---------
function makeIcon(children) {
  return function Icon({
    size = 16,
    color = "currentColor",
    style
  }) {
    return /*#__PURE__*/React.createElement("svg", {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: color,
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      style: style
    }, children);
  };
}
const ChevronLeft = makeIcon(/*#__PURE__*/React.createElement("polyline", {
  points: "15 18 9 12 15 6"
}));
const ChevronRight = makeIcon(/*#__PURE__*/React.createElement("polyline", {
  points: "9 18 15 12 9 6"
}));
const X = makeIcon(/*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("line", {
  x1: "18",
  y1: "6",
  x2: "6",
  y2: "18"
}), /*#__PURE__*/React.createElement("line", {
  x1: "6",
  y1: "6",
  x2: "18",
  y2: "18"
})));
const Download = makeIcon(/*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M12 3v12"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "7 10 12 15 17 10"
}), /*#__PURE__*/React.createElement("path", {
  d: "M5 21h14"
})));
const Upload = makeIcon(/*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M12 21V9"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "7 14 12 9 17 14"
}), /*#__PURE__*/React.createElement("path", {
  d: "M5 3h14"
})));
const BarChart3 = makeIcon(/*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("line", {
  x1: "4",
  y1: "20",
  x2: "4",
  y2: "10"
}), /*#__PURE__*/React.createElement("line", {
  x1: "12",
  y1: "20",
  x2: "12",
  y2: "4"
}), /*#__PURE__*/React.createElement("line", {
  x1: "20",
  y1: "20",
  x2: "20",
  y2: "14"
})));
const RotateCcw = makeIcon(/*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M3 12a9 9 0 1 0 3-6.7"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "3 3 3 9 9 9"
})));
const Flag = makeIcon(/*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M4 21V4"
}), /*#__PURE__*/React.createElement("path", {
  d: "M4 4h12l-2 4 2 4H4"
})));
const Undo2 = makeIcon(/*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M9 14 4 9l5-5"
}), /*#__PURE__*/React.createElement("path", {
  d: "M4 9h11a5 5 0 0 1 0 10h-1"
})));
const Settings = makeIcon(/*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("line", {
  x1: "4",
  y1: "6",
  x2: "20",
  y2: "6"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "9",
  cy: "6",
  r: "2"
}), /*#__PURE__*/React.createElement("line", {
  x1: "4",
  y1: "12",
  x2: "20",
  y2: "12"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "15",
  cy: "12",
  r: "2"
}), /*#__PURE__*/React.createElement("line", {
  x1: "4",
  y1: "18",
  x2: "20",
  y2: "18"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "9",
  cy: "18",
  r: "2"
})));
const GripVertical = makeIcon(/*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("circle", {
  cx: "9",
  cy: "5",
  r: "1"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "9",
  cy: "12",
  r: "1"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "9",
  cy: "19",
  r: "1"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "15",
  cy: "5",
  r: "1"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "15",
  cy: "12",
  r: "1"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "15",
  cy: "19",
  r: "1"
})));
const Flame = makeIcon(/*#__PURE__*/React.createElement("path", {
  d: "M8.5 14.5A2.5 2.5 0 0 0 11 17a2.5 2.5 0 0 0 2.5-2.5c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7.5 7.5 0 1 1-15 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5"
}));
const Trophy = makeIcon(/*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M8 21h8"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 17v4"
}), /*#__PURE__*/React.createElement("path", {
  d: "M7 4h10v6a5 5 0 0 1-10 0V4Z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M17 5h3a2 2 0 0 1-2 4h-1"
}), /*#__PURE__*/React.createElement("path", {
  d: "M7 5H4a2 2 0 0 0 2 4h1"
})));

// ---- Palette (fairway-at-dusk / scorecard) -------------------------------
const C = {
  turf: "#16281F",
  // background
  turfDeep: "#0F1E17",
  // deepest background
  card: "#213B2E",
  // panel surface
  cardLine: "#345043",
  // hairlines / dividers
  chalk: "#EDE7D9",
  // primary text
  chalkDim: "#A9B7AC",
  // secondary text
  gold: "#D9A93C",
  // great
  sage: "#7FA687",
  // decent
  amber: "#C97A3D",
  // stinger
  flag: "#BD4438",
  // topped
  violet: "#8B7BB8" // hook/slice — struck fine, bent off line
};
const QUALITIES = [{
  key: "great",
  label: "Great",
  color: C.gold,
  hint: "Flush & on line"
}, {
  key: "decent",
  label: "Decent",
  color: C.sage,
  hint: "Solid enough"
}, {
  key: "stinger",
  label: "Stinger",
  color: C.amber,
  hint: "Low & punchy"
}, {
  key: "topped",
  label: "Topped",
  color: C.flag,
  hint: "Thin / heavy"
}, {
  key: "hookslice",
  label: "Hook/Slice",
  color: C.violet,
  hint: "Struck ok, bent off line"
}];
const DEFAULT_CLUBS = ["Driver", "3W", "5W", "3H", "4H", "3i", "4i", "5i", "6i", "7i", "8i", "9i", "PW", "GW", "SW", "LW", "Putter"];
const STORAGE_KEY = "range-trainer-swings";
const CLUBS_STORAGE_KEY = "range-trainer-clubs";

// Local (not UTC) YYYY-MM-DD — matches what a native <input type="date"> uses,
// so picking a date and filtering swings agree on where midnight falls.
function dateKeyLocal(ts) {
  const d = new Date(ts);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function shiftDateKey(dateKey, days) {
  const d = new Date(dateKey + "T00:00:00");
  d.setDate(d.getDate() + days);
  return dateKeyLocal(d.getTime());
}
function formatDateKey(dateKey) {
  const d = new Date(dateKey + "T00:00:00");
  const today = dateKeyLocal(Date.now());
  if (dateKey === today) return "Today";
  const yesterday = shiftDateKey(today, -1);
  if (dateKey === yesterday) return "Yesterday";
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric"
  });
}
function loadFont() {
  return /*#__PURE__*/React.createElement("style", null, `
      @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;600&display=swap');
      .rt-display { font-family: 'Oswald', sans-serif; letter-spacing: 0.02em; }
      .rt-body { font-family: 'Inter', sans-serif; }
      .rt-mono { font-family: 'JetBrains Mono', monospace; }
    `);
}

// Tally mark rendered as a little scorecard hash — the signature element.
function TallyGroup({
  count,
  color
}) {
  const groups = Math.floor(count / 5);
  const remainder = count % 5;
  const strokes = (n, keyPrefix) => /*#__PURE__*/React.createElement("svg", {
    width: n === 5 ? 26 : Math.max(n * 5, 4),
    height: "18",
    viewBox: `0 0 ${n === 5 ? 26 : n * 5} 18`
  }, Array.from({
    length: Math.min(n, 4)
  }).map((_, i) => /*#__PURE__*/React.createElement("line", {
    key: `${keyPrefix}-${i}`,
    x1: 4 + i * 6,
    y1: "2",
    x2: 4 + i * 6,
    y2: "16",
    stroke: color,
    strokeWidth: "2.5",
    strokeLinecap: "round"
  })), n === 5 && /*#__PURE__*/React.createElement("line", {
    x1: "1",
    y1: "16",
    x2: "23",
    y2: "2",
    stroke: color,
    strokeWidth: "2.5",
    strokeLinecap: "round"
  }));
  if (count === 0) return /*#__PURE__*/React.createElement("span", {
    className: "rt-mono",
    style: {
      color: C.chalkDim,
      fontSize: 13
    }
  }, "—");
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      flexWrap: "wrap"
    }
  }, Array.from({
    length: groups
  }).map((_, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, strokes(5, `g${i}`))), remainder > 0 && strokes(remainder, "r"));
}

// One club's row in the stats breakdown: a proportional bar for a quick
// glance, plus the exact count for every quality so nothing's left to guess.
function ClubBreakdownRow({
  club,
  tally,
  max
}) {
  const total = tally.great + tally.decent + tally.stinger + tally.topped;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "10px 0",
      borderBottom: `1px solid ${C.cardLine}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "rt-display",
    style: {
      minWidth: 34,
      color: C.chalk,
      fontSize: 14,
      fontWeight: 600,
      flexShrink: 0
    }
  }, club), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      height: 12,
      borderRadius: 4,
      overflow: "hidden",
      background: C.turfDeep
    }
  }, QUALITIES.map(q => {
    const val = tally[q.key];
    if (!val) return null;
    return /*#__PURE__*/React.createElement("div", {
      key: q.key,
      style: {
        width: `${val / max * 100}%`,
        background: q.color
      }
    });
  })), /*#__PURE__*/React.createElement("div", {
    className: "rt-mono",
    style: {
      width: 22,
      textAlign: "right",
      color: C.chalk,
      fontSize: 12,
      fontWeight: 600,
      flexShrink: 0
    }
  }, total)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      paddingLeft: 44,
      flexWrap: "wrap"
    }
  }, QUALITIES.map(q => /*#__PURE__*/React.createElement("div", {
    key: q.key,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: 3.5,
      background: q.color,
      display: "inline-block",
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "rt-mono",
    style: {
      color: C.chalkDim,
      fontSize: 11
    }
  }, tally[q.key] || 0)))));
}

// Vertical stacked bars over time — replaces Recharts' 5-category trend BarChart.
function TrendChart({
  data
}) {
  if (!data || data.length < 2) return null;
  const max = Math.max(1, ...data.map(d => d.total));
  const barMaxHeight = 130;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 5,
      height: barMaxHeight + 30,
      overflowX: "auto",
      paddingBottom: 4
    }
  }, data.map(d => /*#__PURE__*/React.createElement("div", {
    key: d.day,
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flexShrink: 0,
      width: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    title: `${d.label}: ${d.total} swings`,
    style: {
      display: "flex",
      flexDirection: "column-reverse",
      width: 14,
      height: barMaxHeight,
      borderRadius: 3,
      overflow: "hidden",
      background: C.card
    }
  }, QUALITIES.map(q => {
    const val = d[q.key];
    if (!val) return null;
    return /*#__PURE__*/React.createElement("div", {
      key: q.key,
      style: {
        height: `${val / max * barMaxHeight}px`,
        background: q.color,
        width: "100%"
      }
    });
  })), /*#__PURE__*/React.createElement("div", {
    className: "rt-mono",
    style: {
      fontSize: 8,
      color: C.chalkDim,
      marginTop: 4,
      whiteSpace: "nowrap"
    }
  }, d.label))));
}

// Accuracy % line over time — replaces Recharts' LineChart, fixed 0-100 axis.
function AccuracyLineChart({
  data
}) {
  if (!data || data.length < 2) return null;
  const width = 600;
  const height = 180;
  const padL = 30;
  const padR = 8;
  const padT = 10;
  const padB = 4;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  const stepX = data.length > 1 ? plotW / (data.length - 1) : 0;
  const yFor = pct => padT + plotH * (1 - pct / 100);
  const points = data.map((d, i) => ({
    x: padL + i * stepX,
    y: yFor(d.pct),
    d
  }));
  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  const gridPcts = [0, 25, 50, 75, 100];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${width} ${height}`,
    style: {
      width: "100%",
      height: 200,
      display: "block"
    },
    preserveAspectRatio: "none"
  }, gridPcts.map(pct => /*#__PURE__*/React.createElement(Fragment, {
    key: pct
  }, /*#__PURE__*/React.createElement("line", {
    x1: padL,
    x2: width - padR,
    y1: yFor(pct),
    y2: yFor(pct),
    stroke: C.cardLine,
    strokeWidth: "1",
    strokeDasharray: "3 3"
  }), /*#__PURE__*/React.createElement("text", {
    x: padL - 6,
    y: yFor(pct) + 3,
    fill: C.chalkDim,
    fontSize: "9",
    textAnchor: "end"
  }, pct, "%"))), /*#__PURE__*/React.createElement("path", {
    d: pathD,
    fill: "none",
    stroke: C.gold,
    strokeWidth: "2.5",
    strokeLinejoin: "round",
    strokeLinecap: "round"
  }), points.map((p, i) => /*#__PURE__*/React.createElement("circle", {
    key: i,
    cx: p.x,
    cy: p.y,
    r: "3",
    fill: C.gold
  }, /*#__PURE__*/React.createElement("title", null, `${p.d.label}: ${p.d.pct}% (${p.d.good}/${p.d.total})`))), points.map((p, i) => i === 0 || i === points.length - 1 || i === Math.floor(points.length / 2) ? /*#__PURE__*/React.createElement("text", {
    key: `lbl-${i}`,
    x: p.x,
    y: height - 2,
    fill: C.chalkDim,
    fontSize: "9",
    textAnchor: i === 0 ? "start" : i === points.length - 1 ? "end" : "middle"
  }, p.d.label) : null)));
}
function RangeTrainer() {
  const [loading, setLoading] = useState(true);
  const [swings, setSwings] = useState([]); // {id, club, quality, ts, sessionId}
  const [clubs, setClubs] = useState(DEFAULT_CLUBS);
  const [screen, setScreen] = useState("club-select"); // club-select | active | summary
  const [selectedClub, setSelectedClub] = useState(null);
  const [showQualityModal, setShowQualityModal] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [statsScope, setStatsScope] = useState("date"); // 'date' | 'all'
  const [selectedDate, setSelectedDate] = useState(() => dateKeyLocal(Date.now()));
  const [statsTab, setStatsTab] = useState("breakdown"); // 'breakdown' | 'accuracy'
  const [accuracyClub, setAccuracyClub] = useState("all");
  const [showSettings, setShowSettings] = useState(false);
  const [newClubName, setNewClubName] = useState("");
  const [sessionDate, setSessionDate] = useState(() => dateKeyLocal(Date.now())); // which day new swings get logged under
  const [liveSessionId, setLiveSessionId] = useState(() => Date.now()); // groups a real-time (today) session
  const [saveError, setSaveError] = useState(false);
  const [importMessage, setImportMessage] = useState(null); // { type: 'ok' | 'error', text }
  const fileInputRef = useRef(null);

  // ---- load persisted swings & clubs -------------------------------------
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const result = await storage.get(STORAGE_KEY);
        if (mounted && result?.value) {
          const parsed = JSON.parse(result.value);
          if (Array.isArray(parsed)) setSwings(parsed);
        }
      } catch (e) {
        // key not found on first run — fine, start empty
      }
      try {
        const clubResult = await storage.get(CLUBS_STORAGE_KEY);
        if (mounted && clubResult?.value) {
          const parsedClubs = JSON.parse(clubResult.value);
          if (Array.isArray(parsedClubs) && parsedClubs.length > 0) setClubs(parsedClubs);
        }
      } catch (e) {
        // no custom club list saved yet — use defaults
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);
  const persist = useCallback(async next => {
    try {
      const result = await storage.set(STORAGE_KEY, JSON.stringify(next));
      if (!result) setSaveError(true);else setSaveError(false);
    } catch (e) {
      setSaveError(true);
    }
  }, []);
  const persistClubs = useCallback(async next => {
    try {
      await storage.set(CLUBS_STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      // best-effort; club list will just fall back to last-known state in memory
    }
  }, []);
  const addClub = () => {
    const name = newClubName.trim();
    if (!name) return;
    if (clubs.some(c => c.toLowerCase() === name.toLowerCase())) {
      setNewClubName("");
      return;
    }
    const next = [...clubs, name];
    setClubs(next);
    persistClubs(next);
    setNewClubName("");
  };
  const removeClub = name => {
    const next = clubs.filter(c => c !== name);
    setClubs(next);
    persistClubs(next);
    if (selectedClub === name) {
      setSelectedClub(null);
      setScreen("club-select");
    }
  };

  // ---- full backup / restore (JSON) --------------------------------------
  const exportBackup = () => {
    const payload = {
      app: "range-trainer",
      version: 1,
      exportedAt: Date.now(),
      clubs,
      swings
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `range-trainer-backup-${dateKeyLocal(Date.now())}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const triggerImport = () => fileInputRef.current?.click();
  const handleImportFile = async e => {
    const file = e.target.files?.[0];
    e.target.value = ""; // reset so picking the same file again still fires onChange
    if (!file) return;
    setImportMessage(null);
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (!data || !Array.isArray(data.swings) || !Array.isArray(data.clubs)) {
        setImportMessage({
          type: "error",
          text: "That file doesn't look like a Range Trainer backup."
        });
        return;
      }
      const confirmed = window.confirm(`Import ${data.swings.length} swing${data.swings.length === 1 ? "" : "s"} and ${data.clubs.length} club${data.clubs.length === 1 ? "" : "s"}?\n\nThis merges with what you already have — matching swings are skipped, not duplicated.`);
      if (!confirmed) return;
      const existingIds = new Set(swings.map(s => s.id));
      const validImported = data.swings.filter(s => s && s.id && s.club && s.quality && typeof s.ts === "number" && !existingIds.has(s.id));
      const mergedSwings = [...swings, ...validImported];
      setSwings(mergedSwings);
      persist(mergedSwings);
      const mergedClubs = clubs.slice();
      data.clubs.forEach(c => {
        if (typeof c === "string" && c.trim() && !mergedClubs.some(x => x.toLowerCase() === c.toLowerCase())) {
          mergedClubs.push(c);
        }
      });
      setClubs(mergedClubs);
      persistClubs(mergedClubs);
      setImportMessage({
        type: "ok",
        text: `Imported ${validImported.length} new swing${validImported.length === 1 ? "" : "s"}${mergedClubs.length > clubs.length ? ` and ${mergedClubs.length - clubs.length} new club${mergedClubs.length - clubs.length === 1 ? "" : "s"}` : ""}.`
      });
    } catch (err) {
      setImportMessage({
        type: "error",
        text: "Couldn't read that file — make sure it's a valid backup JSON."
      });
    }
  };

  // ---- drag-to-reorder the bag list (pointer events — works for touch & mouse) ----
  const rowRefs = useRef({});
  const dragBaseline = useRef(null); // clubs order snapshot at drag start
  const dragOriginIndex = useRef(null);
  const dragStepRef = useRef(46); // measured row height + gap, px
  const dragStartYRef = useRef(0);
  const latestOrderRef = useRef(null);
  const [dragClub, setDragClub] = useState(null);
  const [dragOffsetY, setDragOffsetY] = useState(0);
  const beginDragClub = (club, e) => {
    e.preventDefault();
    const idx = clubs.indexOf(club);
    if (idx === -1) return;
    dragBaseline.current = clubs.slice();
    dragOriginIndex.current = idx;
    dragStartYRef.current = e.clientY;
    const el = rowRefs.current[club];
    const rect = el?.getBoundingClientRect();
    dragStepRef.current = rect ? rect.height + 8 : 46; // 8 = row gap
    latestOrderRef.current = null;
    setDragOffsetY(0);
    setDragClub(club);
  };
  useEffect(() => {
    if (!dragClub) return;
    const handleMove = e => {
      const offsetY = e.clientY - dragStartYRef.current;
      setDragOffsetY(offsetY);
      const baseline = dragBaseline.current;
      const originIdx = dragOriginIndex.current;
      if (!baseline || originIdx === null) return;
      const step = dragStepRef.current;
      const deltaIdx = Math.round(offsetY / step);
      const targetIdx = Math.min(Math.max(originIdx + deltaIdx, 0), baseline.length - 1);
      const reordered = baseline.slice();
      const [moved] = reordered.splice(originIdx, 1);
      reordered.splice(targetIdx, 0, moved);
      latestOrderRef.current = reordered;
      setClubs(reordered);
    };
    const handleUp = () => {
      setDragClub(null);
      setDragOffsetY(0);
      if (latestOrderRef.current) persistClubs(latestOrderRef.current);
      dragBaseline.current = null;
      dragOriginIndex.current = null;
      latestOrderRef.current = null;
    };
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    window.addEventListener("pointercancel", handleUp);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
      window.removeEventListener("pointercancel", handleUp);
    };
  }, [dragClub, persistClubs]);
  const todayKey = dateKeyLocal(Date.now());
  const isBackdated = sessionDate !== todayKey;
  // Real-time sessions get a unique id per app "New session" press (so two
  // separate range visits today stay distinct). Backdated sessions collapse
  // to one id per chosen date, so re-opening the app and adding more swings
  // for the same past day lands in the same session instead of splintering.
  const activeSessionId = isBackdated ? Number(sessionDate.replace(/-/g, "")) : liveSessionId;
  const recordSwing = quality => {
    const ts = isBackdated ? new Date(sessionDate + "T12:00:00").getTime() + sessionSwings.length * 60000 : Date.now();
    const swing = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      club: selectedClub,
      quality,
      ts,
      sessionId: activeSessionId
    };
    const next = [...swings, swing];
    setSwings(next);
    persist(next);
    setShowQualityModal(false);
  };
  const sessionSwings = useMemo(() => swings.filter(s => s.sessionId === activeSessionId), [swings, activeSessionId]);
  const lastSessionSwing = useMemo(() => {
    if (sessionSwings.length === 0) return null;
    return sessionSwings.reduce((a, b) => a.ts > b.ts ? a : b);
  }, [sessionSwings]);
  const undoLastSwing = () => {
    if (!lastSessionSwing) return;
    const next = swings.filter(s => s.id !== lastSessionSwing.id);
    setSwings(next);
    persist(next);
  };
  const clubSessionSwings = useMemo(() => sessionSwings.filter(s => s.club === selectedClub), [sessionSwings, selectedClub]);
  const clubTally = useMemo(() => {
    const t = {
      great: 0,
      decent: 0,
      stinger: 0,
      topped: 0
    };
    clubSessionSwings.forEach(s => t[s.quality] = (t[s.quality] || 0) + 1);
    return t;
  }, [clubSessionSwings]);
  const sessionTallyByClub = useMemo(() => {
    const map = {};
    sessionSwings.forEach(s => {
      if (!map[s.club]) map[s.club] = {
        great: 0,
        decent: 0,
        stinger: 0,
        topped: 0
      };
      map[s.club][s.quality]++;
    });
    return map;
  }, [sessionSwings]);
  const scopedSwings = useMemo(() => {
    if (statsScope === "date") return swings.filter(s => dateKeyLocal(s.ts) === selectedDate);
    return swings;
  }, [swings, statsScope, selectedDate]);
  const scopedTally = useMemo(() => {
    const t = {
      great: 0,
      decent: 0,
      stinger: 0,
      topped: 0
    };
    scopedSwings.forEach(s => t[s.quality] = (t[s.quality] || 0) + 1);
    return t;
  }, [scopedSwings]);
  const chartData = useMemo(() => {
    const map = {};
    scopedSwings.forEach(s => {
      if (!map[s.club]) map[s.club] = {
        club: s.club,
        great: 0,
        decent: 0,
        stinger: 0,
        topped: 0
      };
      map[s.club][s.quality]++;
    });
    const known = clubs.filter(c => map[c]);
    const retired = Object.keys(map).filter(c => !clubs.includes(c));
    return [...known, ...retired].map(c => map[c]);
  }, [scopedSwings, clubs]);
  const dailyTrend = useMemo(() => {
    const map = {};
    swings.forEach(s => {
      const day = dateKeyLocal(s.ts);
      if (!map[day]) map[day] = {
        day,
        great: 0,
        decent: 0,
        stinger: 0,
        topped: 0,
        total: 0
      };
      map[day][s.quality]++;
      map[day].total++;
    });
    const days = Object.keys(map).sort();
    const trimmed = days.slice(-30);
    return trimmed.map(d => ({
      ...map[d],
      label: new Date(d + "T00:00:00").toLocaleDateString(undefined, {
        month: "short",
        day: "numeric"
      })
    }));
  }, [swings]);
  const accuracyRelevantSwings = useMemo(() => accuracyClub === "all" ? swings : swings.filter(s => s.club === accuracyClub), [swings, accuracyClub]);
  const accuracyOverall = useMemo(() => {
    let good = 0;
    let bad = 0;
    accuracyRelevantSwings.forEach(s => {
      if (s.quality === "great" || s.quality === "decent") good++;else bad++;
    });
    const total = good + bad;
    return {
      good,
      bad,
      total,
      pct: total ? Math.round(good / total * 100) : 0
    };
  }, [accuracyRelevantSwings]);
  const accuracyTrend = useMemo(() => {
    const map = {};
    accuracyRelevantSwings.forEach(s => {
      const day = dateKeyLocal(s.ts);
      if (!map[day]) map[day] = {
        day,
        good: 0,
        bad: 0
      };
      if (s.quality === "great" || s.quality === "decent") map[day].good++;else map[day].bad++;
    });
    const days = Object.keys(map).sort();
    const trimmed = days.slice(-30);
    return trimmed.map(d => {
      const total = map[d].good + map[d].bad;
      return {
        ...map[d],
        total,
        pct: total ? Math.round(map[d].good / total * 100) : 0,
        label: new Date(d + "T00:00:00").toLocaleDateString(undefined, {
          month: "short",
          day: "numeric"
        })
      };
    });
  }, [accuracyRelevantSwings]);
  const MIN_SESSION_FOR_BEST = 5;
  const bests = useMemo(() => {
    const isGood = s => s.quality === "great" || s.quality === "decent";
    const chrono = accuracyRelevantSwings.slice().sort((a, b) => a.ts - b.ts);

    // longest good-contact streak ever, and the streak currently in progress
    let bestStreak = 0;
    let run = 0;
    chrono.forEach(s => {
      if (isGood(s)) {
        run++;
        bestStreak = Math.max(bestStreak, run);
      } else {
        run = 0;
      }
    });
    let currentStreak = 0;
    for (let i = chrono.length - 1; i >= 0; i--) {
      if (isGood(chrono[i])) currentStreak++;else break;
    }

    // best single session (grouped by sessionId), min swing count so a
    // 2-swing 100% session doesn't dominate
    const bySession = {};
    chrono.forEach(s => {
      const id = s.sessionId != null ? String(s.sessionId) : "unknown";
      if (!bySession[id]) bySession[id] = {
        id,
        good: 0,
        total: 0,
        firstTs: s.ts
      };
      bySession[id].total++;
      bySession[id].firstTs = Math.min(bySession[id].firstTs, s.ts);
      if (isGood(s)) bySession[id].good++;
    });
    let bestSession = null;
    Object.values(bySession).forEach(sess => {
      if (sess.total < MIN_SESSION_FOR_BEST) return;
      const pct = Math.round(sess.good / sess.total * 100);
      if (!bestSession || pct > bestSession.pct || pct === bestSession.pct && sess.total > bestSession.total) {
        bestSession = {
          ...sess,
          pct
        };
      }
    });

    // best single calendar day, same minimum
    const byDay = {};
    chrono.forEach(s => {
      const day = dateKeyLocal(s.ts);
      if (!byDay[day]) byDay[day] = {
        day,
        good: 0,
        total: 0
      };
      byDay[day].total++;
      if (isGood(s)) byDay[day].good++;
    });
    let bestDay = null;
    Object.values(byDay).forEach(d => {
      if (d.total < MIN_SESSION_FOR_BEST) return;
      const pct = Math.round(d.good / d.total * 100);
      if (!bestDay || pct > bestDay.pct || pct === bestDay.pct && d.total > bestDay.total) {
        bestDay = {
          ...d,
          pct
        };
      }
    });
    return {
      bestStreak,
      currentStreak,
      bestSession,
      bestDay,
      totalSwings: chrono.length
    };
  }, [accuracyRelevantSwings]);
  const exportCSV = () => {
    const header = "date,time,club,quality\n";
    const rows = swings.slice().sort((a, b) => a.ts - b.ts).map(s => {
      const d = new Date(s.ts);
      return `${dateKeyLocal(s.ts)},${d.toTimeString().slice(0, 8)},${s.club},${s.quality}`;
    }).join("\n");
    const blob = new Blob([header + rows], {
      type: "text/csv"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `range-trainer-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const startNewSession = () => {
    setSessionDate(dateKeyLocal(Date.now()));
    setLiveSessionId(Date.now());
    setSelectedClub(null);
    setScreen("club-select");
  };
  const totalAllTime = swings.length;

  // ---- shared chrome ------------------------------------------------------
  const AppBar = ({
    title,
    onBack
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 18px",
      borderBottom: `1px solid ${C.cardLine}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      minWidth: 40
    }
  }, onBack && /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: iconBtnStyle
  }, /*#__PURE__*/React.createElement(ChevronLeft, {
    size: 20,
    color: C.chalk
  }))), /*#__PURE__*/React.createElement("div", {
    className: "rt-display",
    style: {
      color: C.chalk,
      fontSize: 18,
      fontWeight: 600,
      textTransform: "uppercase"
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowSettings(true),
    style: iconBtnStyle
  }, /*#__PURE__*/React.createElement(Settings, {
    size: 19,
    color: C.chalk
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowStats(true),
    style: iconBtnStyle
  }, /*#__PURE__*/React.createElement(BarChart3, {
    size: 20,
    color: C.chalk
  }))));
  const iconBtnStyle = {
    background: "none",
    border: "none",
    padding: 10,
    borderRadius: 8,
    cursor: "pointer",
    minWidth: 46,
    minHeight: 46,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };
  if (loading) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        ...outerStyle,
        alignItems: "center",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "rt-body",
      style: {
        color: C.chalkDim,
        fontSize: 14
      }
    }, "Loading your range history…"));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: outerStyle
  }, loadFont(), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: 420,
      background: C.turf,
      borderRadius: 20,
      overflow: "hidden",
      boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
      border: `1px solid ${C.cardLine}`
    }
  }, screen === "club-select" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AppBar, {
    title: "Range Trainer"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "18px 18px 4px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "rt-body",
    style: {
      color: C.chalkDim,
      fontSize: 13,
      marginBottom: 10
    }
  }, totalAllTime > 0 ? `${totalAllTime} swings logged all-time` : "Pick a club to start your session"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setSessionDate(d => shiftDateKey(d, -1)),
    style: {
      ...iconBtnStyle,
      minWidth: 38,
      minHeight: 38,
      background: C.card,
      border: `1px solid ${C.cardLine}`,
      borderRadius: 8,
      padding: 6
    },
    "aria-label": "Previous day"
  }, /*#__PURE__*/React.createElement(ChevronLeft, {
    size: 15,
    color: C.chalk
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: sessionDate,
    max: todayKey,
    onChange: e => {
      if (e.target.value) setSessionDate(e.target.value);
    },
    className: "rt-body",
    style: {
      width: "100%",
      boxSizing: "border-box",
      background: isBackdated ? `${C.amber}1A` : C.card,
      border: `1px solid ${isBackdated ? C.amber : C.cardLine}`,
      borderRadius: 8,
      padding: "8px 10px",
      color: C.chalk,
      fontSize: 13,
      colorScheme: "dark"
    }
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => setSessionDate(d => shiftDateKey(d, 1)),
    disabled: sessionDate >= todayKey,
    style: {
      ...iconBtnStyle,
      minWidth: 38,
      minHeight: 38,
      background: C.card,
      border: `1px solid ${C.cardLine}`,
      borderRadius: 8,
      padding: 6,
      opacity: sessionDate >= todayKey ? 0.4 : 1
    },
    "aria-label": "Next day"
  }, /*#__PURE__*/React.createElement(ChevronRight, {
    size: 15,
    color: C.chalk
  }))), isBackdated && /*#__PURE__*/React.createElement("div", {
    className: "rt-body",
    style: {
      color: C.amber,
      fontSize: 11,
      marginTop: 6,
      display: "flex",
      alignItems: "center",
      gap: 5
    }
  }, "Backdated — swings you log now will be recorded under ", formatDateKey(sessionDate), ".", /*#__PURE__*/React.createElement("button", {
    onClick: () => setSessionDate(todayKey),
    className: "rt-body",
    style: {
      background: "none",
      border: "none",
      color: C.gold,
      fontSize: 11,
      fontWeight: 600,
      cursor: "pointer",
      padding: 0,
      textDecoration: "underline"
    }
  }, "Back to today"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 10,
      padding: 18
    }
  }, clubs.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "rt-body",
    style: {
      gridColumn: "1 / -1",
      color: C.chalkDim,
      fontSize: 13,
      textAlign: "center",
      padding: "20px 0"
    }
  }, "No clubs in your bag yet — add some in settings."), clubs.map(club => {
    const clubAllTimeCount = swings.filter(s => s.club === club).length;
    return /*#__PURE__*/React.createElement("button", {
      key: club,
      onClick: () => {
        setSelectedClub(club);
        setScreen("active");
      },
      className: "rt-display",
      style: {
        background: C.card,
        border: `1px solid ${C.cardLine}`,
        borderRadius: 12,
        padding: "20px 4px",
        minHeight: 68,
        color: C.chalk,
        fontSize: 17,
        fontWeight: 600,
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 5
      }
    }, club, /*#__PURE__*/React.createElement("span", {
      className: "rt-mono",
      style: {
        fontSize: 10,
        color: C.chalkDim,
        fontWeight: 500
      }
    }, clubAllTimeCount > 0 ? clubAllTimeCount : "\u00A0"));
  }))), screen === "active" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AppBar, {
    title: selectedClub,
    onBack: () => setScreen("club-select")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "22px 20px 8px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "rt-body",
    style: {
      color: isBackdated ? C.amber : C.chalkDim,
      fontSize: 12,
      textTransform: "uppercase",
      letterSpacing: "0.08em"
    }
  }, formatDateKey(sessionDate), isBackdated ? " · backdated" : ""), /*#__PURE__*/React.createElement("div", {
    className: "rt-display",
    style: {
      color: C.chalk,
      fontSize: 40,
      fontWeight: 700,
      marginTop: 2
    }
  }, clubSessionSwings.length), /*#__PURE__*/React.createElement("div", {
    className: "rt-body",
    style: {
      color: C.chalkDim,
      fontSize: 11,
      marginTop: -2
    }
  }, "swings this session")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "10px 20px",
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, QUALITIES.map(q => /*#__PURE__*/React.createElement("div", {
    key: q.key,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: C.card,
      border: `1px solid ${C.cardLine}`,
      borderRadius: 10,
      padding: "10px 14px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "rt-body",
    style: {
      color: q.color,
      fontSize: 13,
      fontWeight: 600
    }
  }, q.label), /*#__PURE__*/React.createElement(TallyGroup, {
    count: clubTally[q.key] || 0,
    color: q.color
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "18px 20px 8px"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowQualityModal(true),
    className: "rt-display",
    style: {
      width: "100%",
      padding: "26px 0",
      minHeight: 96,
      background: C.gold,
      border: "none",
      borderRadius: 18,
      color: C.turfDeep,
      fontSize: 24,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.03em",
      cursor: "pointer"
    }
  }, "I hit it")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px 8px",
      display: "flex",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: undoLastSwing,
    disabled: !lastSessionSwing,
    className: "rt-body",
    style: {
      background: "none",
      border: "none",
      color: lastSessionSwing ? C.chalkDim : "transparent",
      fontSize: 13,
      cursor: lastSessionSwing ? "pointer" : "default",
      display: "flex",
      alignItems: "center",
      gap: 6,
      padding: "10px 8px",
      minHeight: 40,
      pointerEvents: lastSessionSwing ? "auto" : "none"
    }
  }, /*#__PURE__*/React.createElement(Undo2, {
    size: 14
  }), lastSessionSwing ? `Undo last: ${lastSessionSwing.club} · ${QUALITIES.find(q => q.key === lastSessionSwing.quality)?.label}` : "\u00A0")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "4px 20px 20px",
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setScreen("club-select"),
    className: "rt-body",
    style: {
      flex: 1,
      padding: "14px 0",
      minHeight: 50,
      background: "transparent",
      border: `1px solid ${C.cardLine}`,
      borderRadius: 10,
      color: C.chalkDim,
      fontSize: 14,
      cursor: "pointer"
    }
  }, "Switch club"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setScreen("summary"),
    className: "rt-body",
    style: {
      flex: 1,
      padding: "14px 0",
      minHeight: 50,
      background: "transparent",
      border: `1px solid ${C.cardLine}`,
      borderRadius: 10,
      color: C.chalkDim,
      fontSize: 14,
      cursor: "pointer"
    }
  }, "End session"))), screen === "summary" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AppBar, {
    title: "Session Summary",
    onBack: () => setScreen("active")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "rt-body",
    style: {
      color: isBackdated ? C.amber : C.chalkDim,
      fontSize: 12,
      textTransform: "uppercase",
      letterSpacing: "0.08em"
    }
  }, formatDateKey(sessionDate), isBackdated ? " · backdated" : ""), /*#__PURE__*/React.createElement("div", {
    className: "rt-display",
    style: {
      color: C.chalk,
      fontSize: 30,
      fontWeight: 700,
      marginTop: 2
    }
  }, sessionSwings.length, " swings"), /*#__PURE__*/React.createElement("div", {
    className: "rt-body",
    style: {
      color: C.chalkDim,
      fontSize: 13,
      marginBottom: 6
    }
  }, "across ", Object.keys(sessionTallyByClub).length, " club", Object.keys(sessionTallyByClub).length === 1 ? "" : "s"), lastSessionSwing && /*#__PURE__*/React.createElement("button", {
    onClick: undoLastSwing,
    className: "rt-body",
    style: {
      background: "none",
      border: "none",
      color: C.chalkDim,
      fontSize: 13,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: 6,
      padding: "10px 4px 12px",
      minHeight: 40
    }
  }, /*#__PURE__*/React.createElement(Undo2, {
    size: 14
  }), "Undo last: ", lastSessionSwing.club, " · ", QUALITIES.find(q => q.key === lastSessionSwing.quality)?.label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, Object.entries(sessionTallyByClub).map(([club, t]) => /*#__PURE__*/React.createElement("div", {
    key: club,
    style: {
      background: C.card,
      border: `1px solid ${C.cardLine}`,
      borderRadius: 10,
      padding: "12px 14px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "rt-display",
    style: {
      color: C.chalk,
      fontSize: 14,
      fontWeight: 600,
      marginBottom: 6
    }
  }, club), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      flexWrap: "wrap"
    }
  }, QUALITIES.map(q => /*#__PURE__*/React.createElement("div", {
    key: q.key,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 4,
      background: q.color,
      display: "inline-block"
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "rt-mono",
    style: {
      color: C.chalkDim,
      fontSize: 12
    }
  }, t[q.key] || 0))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: startNewSession,
    className: "rt-body",
    style: {
      flex: 1,
      padding: "15px 0",
      minHeight: 52,
      background: C.gold,
      border: "none",
      borderRadius: 10,
      color: C.turfDeep,
      fontSize: 14,
      fontWeight: 600,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(RotateCcw, {
    size: 15
  }), " New session"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowStats(true),
    className: "rt-body",
    style: {
      flex: 1,
      padding: "15px 0",
      minHeight: 52,
      background: "transparent",
      border: `1px solid ${C.cardLine}`,
      borderRadius: 10,
      color: C.chalkDim,
      fontSize: 14,
      cursor: "pointer"
    }
  }, "View all-time stats"))))), showQualityModal && /*#__PURE__*/React.createElement("div", {
    style: overlayStyle,
    onClick: () => setShowQualityModal(false)
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: "100%",
      maxWidth: 420,
      background: C.turfDeep,
      borderRadius: "20px 20px 0 0",
      padding: "22px 18px 28px",
      border: `1px solid ${C.cardLine}`,
      borderBottom: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 4,
      borderRadius: 2,
      background: C.cardLine
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "rt-body",
    style: {
      color: C.chalkDim,
      fontSize: 13,
      textAlign: "center",
      marginBottom: 16
    }
  }, "How'd that ", selectedClub, " go?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10
    }
  }, QUALITIES.slice(0, 4).map(q => /*#__PURE__*/React.createElement("button", {
    key: q.key,
    onClick: () => recordSwing(q.key),
    className: "rt-display",
    style: {
      padding: "22px 8px",
      minHeight: 84,
      borderRadius: 14,
      border: `2px solid ${q.color}`,
      background: `${q.color}22`,
      color: q.color,
      fontSize: 18,
      fontWeight: 700,
      textTransform: "uppercase",
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, q.label, /*#__PURE__*/React.createElement("span", {
    className: "rt-body",
    style: {
      fontSize: 11,
      color: C.chalkDim,
      fontWeight: 500,
      textTransform: "none"
    }
  }, q.hint))), QUALITIES.slice(4).map(q => /*#__PURE__*/React.createElement("button", {
    key: q.key,
    onClick: () => recordSwing(q.key),
    className: "rt-display",
    style: {
      gridColumn: "1 / -1",
      padding: "18px 8px",
      minHeight: 64,
      borderRadius: 14,
      border: `2px solid ${q.color}`,
      background: `${q.color}22`,
      color: q.color,
      fontSize: 17,
      fontWeight: 700,
      textTransform: "uppercase",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8
    }
  }, q.label, /*#__PURE__*/React.createElement("span", {
    className: "rt-body",
    style: {
      fontSize: 11,
      color: C.chalkDim,
      fontWeight: 500,
      textTransform: "none"
    }
  }, q.hint)))))), showStats && /*#__PURE__*/React.createElement("div", {
    style: overlayStyle,
    onClick: () => setShowStats(false)
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: "100%",
      maxWidth: 420,
      maxHeight: "85vh",
      overflowY: "auto",
      background: C.turf,
      borderRadius: 18,
      padding: 0,
      border: `1px solid ${C.cardLine}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 18px",
      borderBottom: `1px solid ${C.cardLine}`,
      position: "sticky",
      top: 0,
      background: C.turf,
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "rt-display",
    style: {
      color: C.chalk,
      fontSize: 16,
      fontWeight: 600,
      textTransform: "uppercase"
    }
  }, /*#__PURE__*/React.createElement(Flag, {
    size: 15,
    style: {
      display: "inline",
      marginRight: 6,
      verticalAlign: -2
    },
    color: C.gold
  }), "Stats"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowStats(false),
    style: iconBtnStyle
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.chalkDim,
      fontSize: 20
    }
  }, "×"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      background: C.turfDeep,
      border: `1px solid ${C.cardLine}`,
      borderRadius: 10,
      padding: 3,
      marginBottom: 16
    }
  }, [{
    key: "breakdown",
    label: "Breakdown"
  }, {
    key: "accuracy",
    label: "Accuracy"
  }, {
    key: "bests",
    label: "Bests"
  }].map(opt => /*#__PURE__*/React.createElement("button", {
    key: opt.key,
    onClick: () => setStatsTab(opt.key),
    className: "rt-display",
    style: {
      flex: 1,
      padding: "10px 0",
      background: statsTab === opt.key ? C.card : "transparent",
      border: statsTab === opt.key ? `1px solid ${C.cardLine}` : "1px solid transparent",
      borderRadius: 8,
      color: statsTab === opt.key ? C.chalk : C.chalkDim,
      fontSize: 13,
      fontWeight: 600,
      textTransform: "uppercase",
      cursor: "pointer"
    }
  }, opt.label))), statsTab === "breakdown" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      background: C.card,
      border: `1px solid ${C.cardLine}`,
      borderRadius: 10,
      padding: 3,
      marginBottom: 10
    }
  }, [{
    key: "date",
    label: "By date"
  }, {
    key: "all",
    label: "All time"
  }].map(opt => /*#__PURE__*/React.createElement("button", {
    key: opt.key,
    onClick: () => setStatsScope(opt.key),
    className: "rt-body",
    style: {
      flex: 1,
      padding: "9px 0",
      background: statsScope === opt.key ? C.gold : "transparent",
      border: "none",
      borderRadius: 8,
      color: statsScope === opt.key ? C.turfDeep : C.chalkDim,
      fontSize: 13,
      fontWeight: 600,
      cursor: "pointer"
    }
  }, opt.label))), statsScope === "date" && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setSelectedDate(d => shiftDateKey(d, -1)),
    style: {
      ...iconBtnStyle,
      background: C.card,
      border: `1px solid ${C.cardLine}`,
      borderRadius: 8
    },
    "aria-label": "Previous day"
  }, /*#__PURE__*/React.createElement(ChevronLeft, {
    size: 16,
    color: C.chalk
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: selectedDate,
    max: dateKeyLocal(Date.now()),
    onChange: e => {
      if (e.target.value) setSelectedDate(e.target.value);
    },
    className: "rt-body",
    style: {
      width: "100%",
      boxSizing: "border-box",
      background: C.card,
      border: `1px solid ${C.cardLine}`,
      borderRadius: 8,
      padding: "9px 10px",
      color: C.chalk,
      fontSize: 13,
      colorScheme: "dark"
    }
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => setSelectedDate(d => shiftDateKey(d, 1)),
    disabled: selectedDate >= dateKeyLocal(Date.now()),
    style: {
      ...iconBtnStyle,
      background: C.card,
      border: `1px solid ${C.cardLine}`,
      borderRadius: 8,
      opacity: selectedDate >= dateKeyLocal(Date.now()) ? 0.4 : 1
    },
    "aria-label": "Next day"
  }, /*#__PURE__*/React.createElement(ChevronRight, {
    size: 16,
    color: C.chalk
  })), selectedDate !== dateKeyLocal(Date.now()) && /*#__PURE__*/React.createElement("button", {
    onClick: () => setSelectedDate(dateKeyLocal(Date.now())),
    className: "rt-body",
    style: {
      background: "none",
      border: "none",
      color: C.gold,
      fontSize: 12,
      fontWeight: 600,
      cursor: "pointer",
      padding: "6px 4px",
      flexShrink: 0
    }
  }, "Today")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "rt-display",
    style: {
      color: C.chalk,
      fontSize: 34,
      fontWeight: 700
    }
  }, scopedSwings.length), /*#__PURE__*/React.createElement("div", {
    className: "rt-body",
    style: {
      color: C.chalkDim,
      fontSize: 12,
      marginBottom: 10
    }
  }, "swings ", statsScope === "date" ? formatDateKey(selectedDate).toLowerCase() === "today" ? "today" : `on ${formatDateKey(selectedDate)}` : "all-time"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      flexWrap: "wrap"
    }
  }, QUALITIES.map(q => /*#__PURE__*/React.createElement("div", {
    key: q.key,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 4,
      background: q.color,
      display: "inline-block"
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "rt-body",
    style: {
      color: C.chalkDim,
      fontSize: 12
    }
  }, q.label), /*#__PURE__*/React.createElement("span", {
    className: "rt-mono",
    style: {
      color: C.chalk,
      fontSize: 12,
      fontWeight: 600
    }
  }, scopedTally[q.key] || 0))))), /*#__PURE__*/React.createElement("div", {
    className: "rt-body",
    style: {
      color: C.chalkDim,
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      marginBottom: 8
    }
  }, "By club"), chartData.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "rt-body",
    style: {
      color: C.chalkDim,
      fontSize: 13,
      textAlign: "center",
      padding: "20px 0"
    }
  }, statsScope === "date" ? `No swings logged ${formatDateKey(selectedDate).toLowerCase() === "today" ? "today" : `on ${formatDateKey(selectedDate)}`}.` : "No swings logged yet — get out on the range.") : /*#__PURE__*/React.createElement("div", null, chartData.map(d => /*#__PURE__*/React.createElement(ClubBreakdownRow, {
    key: d.club,
    club: d.club,
    tally: d,
    max: Math.max(1, ...chartData.map(c => c.great + c.decent + c.stinger + c.topped))
  }))), /*#__PURE__*/React.createElement("div", {
    className: "rt-body",
    style: {
      color: C.chalkDim,
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      margin: "22px 0 8px"
    }
  }, "Over time"), dailyTrend.length < 2 ? /*#__PURE__*/React.createElement("div", {
    className: "rt-body",
    style: {
      color: C.chalkDim,
      fontSize: 13,
      textAlign: "center",
      padding: "16px 0"
    }
  }, "Log swings on a few different days to see a trend.") : /*#__PURE__*/React.createElement(TrendChart, {
    data: dailyTrend
  })), statsTab === "accuracy" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("select", {
    value: accuracyClub,
    onChange: e => setAccuracyClub(e.target.value),
    className: "rt-body",
    style: {
      width: "100%",
      boxSizing: "border-box",
      background: C.card,
      border: `1px solid ${C.cardLine}`,
      borderRadius: 10,
      padding: "11px 12px",
      color: C.chalk,
      fontSize: 14,
      marginBottom: 18,
      colorScheme: "dark"
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "all"
  }, "All clubs"), clubs.map(c => /*#__PURE__*/React.createElement("option", {
    key: c,
    value: c
  }, c))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "rt-display",
    style: {
      color: C.chalk,
      fontSize: 34,
      fontWeight: 700
    }
  }, accuracyOverall.total === 0 ? "—" : `${accuracyOverall.pct}%`), /*#__PURE__*/React.createElement("div", {
    className: "rt-body",
    style: {
      color: C.chalkDim,
      fontSize: 12,
      marginBottom: 10
    }
  }, "good contact ", accuracyClub === "all" ? "across all clubs" : `with ${accuracyClub}`, accuracyOverall.total > 0 ? ` · ${accuracyOverall.total} swing${accuracyOverall.total === 1 ? "" : "s"}` : ""), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 16,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 4,
      background: C.sage,
      display: "inline-block"
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "rt-body",
    style: {
      color: C.chalkDim,
      fontSize: 12
    }
  }, "Good (great + decent)"), /*#__PURE__*/React.createElement("span", {
    className: "rt-mono",
    style: {
      color: C.chalk,
      fontSize: 12,
      fontWeight: 600
    }
  }, accuracyOverall.good)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 4,
      background: C.flag,
      display: "inline-block"
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "rt-body",
    style: {
      color: C.chalkDim,
      fontSize: 12
    }
  }, "Bad (stinger, topped, hook/slice)"), /*#__PURE__*/React.createElement("span", {
    className: "rt-mono",
    style: {
      color: C.chalk,
      fontSize: 12,
      fontWeight: 600
    }
  }, accuracyOverall.bad)))), /*#__PURE__*/React.createElement("div", {
    className: "rt-body",
    style: {
      color: C.chalkDim,
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      marginBottom: 8
    }
  }, "Over time"), accuracyTrend.length < 2 ? /*#__PURE__*/React.createElement("div", {
    className: "rt-body",
    style: {
      color: C.chalkDim,
      fontSize: 13,
      textAlign: "center",
      padding: "16px 0"
    }
  }, "Log swings ", accuracyClub === "all" ? "" : `with ${accuracyClub} `, "on a few different days to see a trend.") : /*#__PURE__*/React.createElement(AccuracyLineChart, {
    data: accuracyTrend
  })), statsTab === "bests" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("select", {
    value: accuracyClub,
    onChange: e => setAccuracyClub(e.target.value),
    className: "rt-body",
    style: {
      width: "100%",
      boxSizing: "border-box",
      background: C.card,
      border: `1px solid ${C.cardLine}`,
      borderRadius: 10,
      padding: "11px 12px",
      color: C.chalk,
      fontSize: 14,
      marginBottom: 18,
      colorScheme: "dark"
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "all"
  }, "All clubs"), clubs.map(c => /*#__PURE__*/React.createElement("option", {
    key: c,
    value: c
  }, c))), bests.totalSwings === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "rt-body",
    style: {
      color: C.chalkDim,
      fontSize: 13,
      textAlign: "center",
      padding: "20px 0"
    }
  }, "No swings logged ", accuracyClub === "all" ? "yet" : `with ${accuracyClub} yet`, " — get out on the range.") : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: C.card,
      border: `1px solid ${C.cardLine}`,
      borderRadius: 12,
      padding: "14px 14px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement(Flame, {
    size: 14,
    color: C.amber
  }), /*#__PURE__*/React.createElement("span", {
    className: "rt-body",
    style: {
      color: C.chalkDim,
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: "0.04em"
    }
  }, "Current streak")), /*#__PURE__*/React.createElement("div", {
    className: "rt-display",
    style: {
      color: C.chalk,
      fontSize: 28,
      fontWeight: 700
    }
  }, bests.currentStreak), /*#__PURE__*/React.createElement("div", {
    className: "rt-body",
    style: {
      color: C.chalkDim,
      fontSize: 11
    }
  }, "good in a row")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: C.card,
      border: `1px solid ${C.cardLine}`,
      borderRadius: 12,
      padding: "14px 14px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement(Trophy, {
    size: 14,
    color: C.gold
  }), /*#__PURE__*/React.createElement("span", {
    className: "rt-body",
    style: {
      color: C.chalkDim,
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: "0.04em"
    }
  }, "Best streak")), /*#__PURE__*/React.createElement("div", {
    className: "rt-display",
    style: {
      color: C.chalk,
      fontSize: 28,
      fontWeight: 700
    }
  }, bests.bestStreak), /*#__PURE__*/React.createElement("div", {
    className: "rt-body",
    style: {
      color: C.chalkDim,
      fontSize: 11
    }
  }, "good in a row, ever"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.card,
      border: `1px solid ${C.cardLine}`,
      borderRadius: 12,
      padding: "14px 14px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "rt-body",
    style: {
      color: C.chalkDim,
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: "0.04em",
      marginBottom: 6
    }
  }, "Best session"), bests.bestSession ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "rt-display",
    style: {
      color: C.chalk,
      fontSize: 26,
      fontWeight: 700
    }
  }, bests.bestSession.pct, "%"), /*#__PURE__*/React.createElement("div", {
    className: "rt-body",
    style: {
      color: C.chalkDim,
      fontSize: 12
    }
  }, formatDateKey(dateKeyLocal(bests.bestSession.firstTs)), " · ", bests.bestSession.good, "/", bests.bestSession.total, " good")) : /*#__PURE__*/React.createElement("div", {
    className: "rt-body",
    style: {
      color: C.chalkDim,
      fontSize: 12
    }
  }, "Need a session of ", MIN_SESSION_FOR_BEST, "+ swings to qualify.")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.card,
      border: `1px solid ${C.cardLine}`,
      borderRadius: 12,
      padding: "14px 14px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "rt-body",
    style: {
      color: C.chalkDim,
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: "0.04em",
      marginBottom: 6
    }
  }, "Best day"), bests.bestDay ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "rt-display",
    style: {
      color: C.chalk,
      fontSize: 26,
      fontWeight: 700
    }
  }, bests.bestDay.pct, "%"), /*#__PURE__*/React.createElement("div", {
    className: "rt-body",
    style: {
      color: C.chalkDim,
      fontSize: 12
    }
  }, formatDateKey(bests.bestDay.day), " · ", bests.bestDay.good, "/", bests.bestDay.total, " good")) : /*#__PURE__*/React.createElement("div", {
    className: "rt-body",
    style: {
      color: C.chalkDim,
      fontSize: 12
    }
  }, "Need a day of ", MIN_SESSION_FOR_BEST, "+ swings to qualify.")))), /*#__PURE__*/React.createElement("button", {
    onClick: exportCSV,
    disabled: swings.length === 0,
    className: "rt-body",
    style: {
      width: "100%",
      marginTop: 20,
      padding: "15px 0",
      minHeight: 50,
      background: swings.length === 0 ? C.card : C.gold,
      border: "none",
      borderRadius: 10,
      color: swings.length === 0 ? C.chalkDim : C.turfDeep,
      fontSize: 14,
      fontWeight: 600,
      cursor: swings.length === 0 ? "default" : "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Download, {
    size: 15
  }), " Export CSV"), saveError && /*#__PURE__*/React.createElement("div", {
    className: "rt-body",
    style: {
      color: C.flag,
      fontSize: 11,
      textAlign: "center",
      marginTop: 8
    }
  }, "Couldn't save last update — your data may not persist.")))), showSettings && /*#__PURE__*/React.createElement("div", {
    style: overlayStyle,
    onClick: () => setShowSettings(false)
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: "100%",
      maxWidth: 420,
      maxHeight: "85vh",
      overflowY: "auto",
      background: C.turf,
      borderRadius: 18,
      padding: 0,
      border: `1px solid ${C.cardLine}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 18px",
      borderBottom: `1px solid ${C.cardLine}`,
      position: "sticky",
      top: 0,
      background: C.turf
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "rt-display",
    style: {
      color: C.chalk,
      fontSize: 16,
      fontWeight: 600,
      textTransform: "uppercase"
    }
  }, /*#__PURE__*/React.createElement(Settings, {
    size: 15,
    style: {
      display: "inline",
      marginRight: 6,
      verticalAlign: -2
    },
    color: C.gold
  }), "Edit your bag"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowSettings(false),
    style: iconBtnStyle
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.chalkDim,
      fontSize: 20
    }
  }, "×"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "rt-body",
    style: {
      color: C.chalkDim,
      fontSize: 12,
      marginBottom: 12
    }
  }, "Only clubs you actually carry show up on the picker screen. Drag the handle to reorder — removing a club here doesn't touch any swings you've already logged with it."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      marginBottom: 16
    }
  }, clubs.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "rt-body",
    style: {
      color: C.chalkDim,
      fontSize: 13,
      textAlign: "center",
      padding: "10px 0"
    }
  }, "Your bag is empty — add a club below."), clubs.map(club => {
    const isDragging = dragClub === club;
    return /*#__PURE__*/React.createElement("div", {
      key: club,
      ref: el => {
        rowRefs.current[club] = el;
      },
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: C.card,
        border: `1px solid ${isDragging ? C.gold : C.cardLine}`,
        borderRadius: 10,
        padding: "10px 12px",
        transform: isDragging ? `translateY(${dragOffsetY}px)` : "none",
        boxShadow: isDragging ? "0 8px 20px rgba(0,0,0,0.4)" : "none",
        position: "relative",
        zIndex: isDragging ? 5 : 1,
        touchAction: isDragging ? "none" : "auto"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      onPointerDown: e => beginDragClub(club, e),
      style: {
        display: "flex",
        cursor: "grab",
        touchAction: "none",
        padding: 4,
        marginLeft: -4
      },
      "aria-label": `Reorder ${club}`
    }, /*#__PURE__*/React.createElement(GripVertical, {
      size: 16,
      color: C.chalkDim
    })), /*#__PURE__*/React.createElement("span", {
      className: "rt-display",
      style: {
        color: C.chalk,
        fontSize: 15,
        fontWeight: 600
      }
    }, club)), /*#__PURE__*/React.createElement("button", {
      onClick: () => removeClub(club),
      style: {
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 10,
        minWidth: 40,
        minHeight: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      },
      "aria-label": `Remove ${club}`
    }, /*#__PURE__*/React.createElement(X, {
      size: 16,
      color: C.flag
    })));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: newClubName,
    onChange: e => setNewClubName(e.target.value),
    onKeyDown: e => {
      if (e.key === "Enter") addClub();
    },
    placeholder: "e.g. 4W, 2H, 60° wedge",
    className: "rt-body",
    style: {
      flex: 1,
      minHeight: 46,
      boxSizing: "border-box",
      background: C.card,
      border: `1px solid ${C.cardLine}`,
      borderRadius: 10,
      padding: "11px 12px",
      color: C.chalk,
      fontSize: 14,
      outline: "none"
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: addClub,
    disabled: !newClubName.trim(),
    className: "rt-body",
    style: {
      padding: "0 20px",
      minHeight: 46,
      background: newClubName.trim() ? C.gold : C.card,
      border: `1px solid ${C.cardLine}`,
      borderRadius: 10,
      color: newClubName.trim() ? C.turfDeep : C.chalkDim,
      fontSize: 14,
      fontWeight: 600,
      cursor: newClubName.trim() ? "pointer" : "default"
    }
  }, "Add")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: C.cardLine,
      margin: "22px 0 16px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "rt-body",
    style: {
      color: C.chalkDim,
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      marginBottom: 6
    }
  }, "Backup & restore"), /*#__PURE__*/React.createElement("div", {
    className: "rt-body",
    style: {
      color: C.chalkDim,
      fontSize: 12,
      marginBottom: 12
    }
  }, "Everything lives only on this device. Export a backup before you clear your browser data or switch phones — importing merges it back in without creating duplicates."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: exportBackup,
    disabled: swings.length === 0 && clubs.length === 0,
    className: "rt-body",
    style: {
      flex: 1,
      minHeight: 46,
      padding: "12px 0",
      background: C.card,
      border: `1px solid ${C.cardLine}`,
      borderRadius: 10,
      color: C.chalk,
      fontSize: 13,
      fontWeight: 600,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 7
    }
  }, /*#__PURE__*/React.createElement(Download, {
    size: 15
  }), " Export backup"), /*#__PURE__*/React.createElement("button", {
    onClick: triggerImport,
    className: "rt-body",
    style: {
      flex: 1,
      minHeight: 46,
      padding: "12px 0",
      background: C.card,
      border: `1px solid ${C.cardLine}`,
      borderRadius: 10,
      color: C.chalk,
      fontSize: 13,
      fontWeight: 600,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 7
    }
  }, /*#__PURE__*/React.createElement(Upload, {
    size: 15
  }), " Import backup"), /*#__PURE__*/React.createElement("input", {
    ref: fileInputRef,
    type: "file",
    accept: "application/json,.json",
    onChange: handleImportFile,
    style: {
      display: "none"
    }
  })), importMessage && /*#__PURE__*/React.createElement("div", {
    className: "rt-body",
    style: {
      fontSize: 12,
      color: importMessage.type === "ok" ? C.sage : C.flag,
      padding: "8px 10px",
      background: C.card,
      border: `1px solid ${C.cardLine}`,
      borderRadius: 8
    }
  }, importMessage.text)))));
}
const outerStyle = {
  minHeight: "100vh",
  width: "100%",
  background: `radial-gradient(circle at 50% 0%, #1D3527 0%, ${C.turfDeep} 70%)`,
  display: "flex",
  justifyContent: "center",
  padding: "20px 12px",
  boxSizing: "border-box"
};
const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.55)",
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  zIndex: 50
};
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(RangeTrainer, null));