import { useEffect, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Pie,
  PieChart,
  ReferenceLine,
  ResponsiveContainer,
  Sector,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "The Problem", href: "#problem" },
  { label: "Our Research", href: "#research" },
  { label: "What We Do", href: "#initiatives" },
  { label: "About", href: "#about" },
  { label: "Take Action", href: "#action" },
];

const commuteDistribution = [
  { label: "Less than 15 min", value: 34, count: 35, color: "#e8c96a" },
  { label: "15-30 min", value: 35, count: 36, color: "#c8a84b" },
  { label: "31-45 min", value: 19, count: 19, color: "#7ca3e6" },
  { label: "46-60 min", value: 5, count: 5, color: "#365786" },
  { label: "More than 60 min", value: 7, count: 7, color: "#1e3a64" },
];

const academicImpact = [
  { label: "No impact", value: 13, color: "#d9dfeb" },
  { label: "Slight impact", value: 26, color: "#f0dfa4" },
  { label: "Moderate impact", value: 31, color: "#e8c96a" },
  { label: "Significant impact", value: 25, color: "#c8a84b" },
  { label: "Severe impact", value: 5, color: "#b56f2a" },
];

const readinessMeasures = [
  { label: "Commute affects my punctuality", value: 6.3 },
  { label: "Shorter commute would improve my engagement", value: 6.3 },
  { label: "Commute affects my mental readiness at start of class", value: 6.0 },
  { label: "Commute affects my concentration during lectures", value: 5.5 },
  { label: "I feel physically tired when I arrive", value: 5.1 },
];

const literatureFindings = [
  {
    source: "Turner et al., 2024",
    text: "Readiness matters as much as attendance.",
  },
  {
    source: "Taylor and Mitra, 2021",
    text: "Commutes shape campus involvement and belonging.",
  },
  {
    source: "Razzak et al., 2023",
    text: "UAE evidence links commuting to lower wellbeing.",
  },
];

const stockImages = {
  traffic:
    "https://images.pexels.com/photos/12627426/pexels-photo-12627426.jpeg?cs=srgb&dl=pexels-axell-crz-12627426.jpg&fm=jpg",
  problem:
    "https://images.pexels.com/photos/11519475/pexels-photo-11519475.jpeg?cs=srgb&dl=pexels-seyma-savascioglu-11519475.jpg&fm=jpg",
  students:
    "https://www.ku.ac.ae/wp-content/uploads/2019/09/Untitled-design-2.png",
  lecture:
    "https://www.ku.ac.ae/wp-content/uploads/2019/09/Untitled-design-6.png",
};

const campaigns = [
  {
    title: "Buffer Time Before Class",
    text: "A short buffer before first class lets commuters arrive and reset.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    title: "Commuter Rest Spaces",
    text: "Quiet campus spaces can help commuters reset before class begins.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 13h16" />
        <path d="M7 13V9a5 5 0 0 1 10 0v4" />
        <path d="M6 13v4h12v-4" />
      </svg>
    ),
  },
  {
    title: "Awareness and Advocacy",
    text: "We use student stories and data to keep the issue visible.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 14V6l12-2v16l-12-2z" />
        <path d="M16 9a4 4 0 0 1 0 6" />
        <path d="M18 7a7 7 0 0 1 0 10" />
      </svg>
    ),
  },
];

const actionCards = [
  {
    kicker: "Students",
    title: "If You Are a KU Student",
    text: "Share what the commute changes for you before class starts.",
  },
  {
    kicker: "Faculty",
    title: "If You Are Faculty or Administration",
    text: "Use this research when thinking about first-class timing and student readiness.",
  },
  {
    kicker: "Policy",
    title: "If You Are a Policymaker",
    text: "Treat commuter support as part of student success, not an afterthought.",
  },
];

const researchHighlights = [
  "Most students commute 30 minutes or less.",
  "But punctuality and mental readiness still drop.",
  "Even shorter daily commutes can have a cumulative effect.",
];

const homeHighlights = [
  {
    kicker: "Before Class",
    title: "The day starts under pressure",
    text: "Traffic, parking, and timing all shape how students reach the classroom.",
  },
  {
    kicker: "In Class",
    title: "Readiness matters most",
    text: "The strongest effects show up in punctuality and mental readiness, not just attendance.",
  },
  {
    kicker: "At KU",
    title: "This is a campus issue",
    text: "The project turns one student question into a wider case for commuter-aware change.",
  },
];

const sourceNotes = [
  "Survey report with 102 KU student responses.",
  "Turner et al., 2024 on readiness and attendance.",
  "Taylor and Mitra, 2021 on belonging and campus involvement.",
  "Razzak et al., 2023 on commuting and wellbeing in the UAE.",
];

const imageCredits = [
  "Hero traffic image: Pexels photo by Axell Cruz.",
  "Problem section image: Pexels photo by Seyma Savascioglu.",
  "About section KU interior images: official Khalifa University website.",
];

function SectionLabel({ children }) {
  return <p className="section-label">{children}</p>;
}

function BrandLogo({ footer = false }) {
  return (
    <span className={`brand-lockup${footer ? " brand-lockup-footer" : ""}`}>
      <svg className="brand-logo" viewBox="0 0 96 96" aria-hidden="true">
        <path d="M68 62A31 31 0 1 1 56 20" className="brand-logo-ring" />
        <path d="M46 19v32l20-18" className="brand-logo-arrow-line" />
        <path d="M56 20h18v18" className="brand-logo-arrow-head" />
      </svg>
      <span className="brand-wordmark">
        <em>The</em>
        <strong>Commute</strong>
        <strong>Effect</strong>
      </span>
    </span>
  );
}

function ChartTooltip({ active, payload, label, suffix = "" }) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="chart-tooltip">
      <strong>{label || payload[0]?.payload?.label}</strong>
      <span>
        {payload[0]?.value}
        {suffix}
      </span>
    </div>
  );
}

function renderActiveDonutShape(props) {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={outerRadius + 12}
        outerRadius={outerRadius + 16}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={0.28}
      />
    </g>
  );
}

function useInView(options = { threshold: 0.3, rootMargin: "0px 0px -60px 0px" }) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) {
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [options]);

  return [ref, isInView];
}

function CountUpValue({ value, className = "", duration = 1400 }) {
  const ref = useRef(null);
  const [displayValue, setDisplayValue] = useState(value.includes("/10") ? "0.0/10" : value.includes("%") ? "0%" : "0");

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return undefined;
    }

    let frameId = 0;
    let hasAnimated = false;

    const targetRaw = parseFloat(value);
    const isDecimal = value.includes(".");
    const suffix = value.includes("/10") ? "/10" : value.includes("%") ? "%" : "";

    const formatValue = (number) => {
      if (isDecimal) {
        return `${number.toFixed(1)}${suffix}`;
      }
      return `${Math.round(number)}${suffix}`;
    };

    const animate = () => {
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(formatValue(targetRaw * eased));
        if (progress < 1) {
          frameId = window.requestAnimationFrame(tick);
        }
      };

      frameId = window.requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            animate();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.45 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frameId);
    };
  }, [duration, value]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}

function ResearchCounterCards() {
  const [ref, isInView] = useInView({ threshold: 0.35 });

  return (
    <div ref={ref} className="viz-block" data-reveal>
      <div className="viz-copy viz-copy-compact">
        <h3>Research at a Glance</h3>
        <p>Three headline numbers frame the scale of the issue before you dive into the charts.</p>
      </div>
      <div className="counter-card-grid">
        <article className="counter-card">
          <CountUpValue className="counter-value" value={isInView ? "102" : "0"} duration={1400} />
          <p>Students Surveyed</p>
        </article>
        <article className="counter-card">
          <CountUpValue className="counter-value" value={isInView ? "61%" : "0%"} duration={1400} />
          <p>Reported Moderate to Severe Academic Impact</p>
        </article>
        <article className="counter-card">
          <CountUpValue className="counter-value" value={isInView ? "69%" : "0%"} duration={1400} />
          <p>Commute 30 Minutes or Less</p>
        </article>
      </div>
    </div>
  );
}

function CommuteDonutChart() {
  const [ref, isInView] = useInView({ threshold: 0.35 });
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <div ref={ref} className="viz-block" data-reveal>
      <div className="viz-copy viz-copy-compact">
        <span className="figure-tag">Visualization 1</span>
        <h3>How Long Do KU Students Commute?</h3>
        <p>Most surveyed students live within a 30-minute trip, but the commute still shapes how they arrive to class.</p>
      </div>
      <div className="viz-card viz-card-donut">
        <div className="donut-wrap">
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Tooltip content={<ChartTooltip suffix="%" />} cursor={false} />
              <Pie
                data={commuteDistribution}
                dataKey="value"
                nameKey="label"
                cx="50%"
                cy="50%"
                innerRadius={84}
                outerRadius={122}
                paddingAngle={2}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth={2}
                startAngle={90}
                endAngle={-270}
                activeIndex={activeIndex}
                activeShape={renderActiveDonutShape}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                isAnimationActive={isInView}
                animationDuration={1400}
              >
                {commuteDistribution.map((entry) => (
                  <Cell key={entry.label} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="donut-center">
            <CountUpValue className="donut-value" value={isInView ? "69%" : "0%"} duration={1500} />
            <span>commute 30 min or less</span>
          </div>
        </div>
        <div className="donut-legend">
          {commuteDistribution.map((item, index) => (
            <div
              key={item.label}
              className={`donut-legend-item ${isInView ? "is-visible" : ""}`}
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <span className="legend-swatch" style={{ background: item.color }} />
              <div>
                <strong>{item.label}</strong>
                <p>{item.value}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LikertImpactChart() {
  const [ref, isInView] = useInView({ threshold: 0.3 });

  return (
    <div ref={ref} className="viz-block" data-reveal>
      <div className="viz-copy viz-copy-compact">
        <span className="figure-tag">Visualization 2</span>
        <h3>Where Commuting Hits Hardest</h3>
        <p>Average agreement scores show the strongest effects around punctuality, engagement, and mental readiness.</p>
      </div>
      <div className={`viz-card viz-card-impact ${isInView ? "is-visible" : ""}`}>
        <p className="viz-subtitle">Average agreement scores out of 10 - 102 KU students</p>
        <div className={`bar-chart-shell ${isInView ? "is-visible" : ""}`}>
          <ResponsiveContainer width="100%" height={360}>
            <BarChart
              data={readinessMeasures}
              layout="vertical"
              margin={{ top: 20, right: 28, bottom: 10, left: 10 }}
              barCategoryGap={18}
            >
              <CartesianGrid horizontal={false} stroke="rgba(255,255,255,0.05)" />
              <Tooltip content={<ChartTooltip suffix=" / 10" />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
              <XAxis
                type="number"
                domain={[0, 10]}
                tick={{ fill: "rgba(237,243,255,0.72)", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                width={210}
                dataKey="label"
                tick={{ fill: "#ffffff", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <ReferenceLine
                x={5}
                stroke="rgba(255,255,255,0.38)"
                strokeDasharray="5 6"
                label={{ value: "Neutral midpoint", position: "insideTopRight", fill: "rgba(237,243,255,0.7)", fontSize: 11 }}
              />
              <ReferenceLine
                x={6}
                stroke="rgba(232,201,106,0.8)"
                strokeDasharray="5 6"
                label={{ value: "Moderate impact", position: "insideTopLeft", fill: "#e8c96a", fontSize: 11 }}
              />
              <Bar
                dataKey="value"
                radius={[0, 12, 12, 0]}
                fill="url(#impactGold)"
                isAnimationActive={isInView}
                animationDuration={1200}
                animationBegin={200}
              >
                <LabelList dataKey="value" position="right" formatter={(value) => value.toFixed(1)} fill="#fff7d0" />
              </Bar>
              <defs>
                <linearGradient id="impactGold" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#e8c96a" />
                  <stop offset="55%" stopColor="#c8a84b" />
                  <stop offset="100%" stopColor="#f4deb0" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="impact-note-row">
          <div className={`impact-note ${isInView ? "is-visible" : ""}`} style={{ transitionDelay: "180ms" }}>
            <span className="impact-note-dot" />
            <strong>Neutral midpoint</strong>
            <p>Scores above 5.0 suggest a noticeable effect.</p>
          </div>
          <div className={`impact-note ${isInView ? "is-visible" : ""}`} style={{ transitionDelay: "320ms" }}>
            <span className="impact-note-dot impact-note-dot-gold" />
            <strong>Moderate impact zone</strong>
            <p>The strongest scores cluster around 6.0 and above.</p>
          </div>
          <div className={`impact-note ${isInView ? "is-visible" : ""}`} style={{ transitionDelay: "460ms" }}>
            <span className="impact-note-dot impact-note-dot-blue" />
            <strong>Top pressures</strong>
            <p>Punctuality, engagement, and mental readiness lead the chart.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function OverallImpactSegment() {
  const [ref, isInView] = useInView({ threshold: 0.35 });

  return (
    <div ref={ref} className="viz-block" data-reveal>
      <div className="viz-copy viz-copy-compact">
        <span className="figure-tag">Visualization 3</span>
        <h3>How Students Rate the Overall Impact of Commuting</h3>
        <p>This distribution shows that moderate and significant impact are much more common than no impact at all.</p>
      </div>
      <div className="viz-card">
        <p className="impact-callout">61% reported moderate to severe impact</p>
        <div className="impact-story-bar">
          {academicImpact.map((item, index) => (
            <div
              key={item.label}
              className={`impact-story-segment ${isInView ? "is-visible" : ""}`}
              style={{
                width: `${item.value}%`,
                background: item.color,
                transitionDelay: `${index * 110}ms`,
              }}
              title={`${item.label}: ${item.value}%`}
            />
          ))}
        </div>
        <div className="impact-story-labels">
          {academicImpact.map((item) => (
            <div key={item.label} className="impact-story-label">
              <span className="legend-swatch" style={{ background: item.color }} />
              <strong>{item.label}</strong>
              <span>{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [introVisible, setIntroVisible] = useState(true);
  const [homeCardsVisible, setHomeCardsVisible] = useState(false);
  const [storySubmitted, setStorySubmitted] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    const activePanel = document.querySelector(".tab-panel.is-active");
    const revealElements = activePanel?.querySelectorAll("[data-reveal]") ?? [];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealElements.forEach((element) => {
      element.classList.remove("is-visible");
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [activeSection]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  useEffect(() => {
    const updatePointer = (event) => {
      document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
    };

    window.addEventListener("mousemove", updatePointer, { passive: true });
    return () => window.removeEventListener("mousemove", updatePointer);
  }, []);

  useEffect(() => {
    const currentIndex = navItems.findIndex((item) => item.href === activeSection);
    const nextProgress = currentIndex >= 0 ? ((currentIndex + 1) / navItems.length) * 100 : 0;
    setScrollProgress(nextProgress);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [activeSection]);

  const handleStorySubmit = (event) => {
    event.preventDefault();
    setStorySubmitted(true);
    event.currentTarget.reset();
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIntroVisible(false);
    }, 1400);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    setHomeCardsVisible(false);

    if (activeSection !== "#home") {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setHomeCardsVisible(true);
    }, introVisible ? 3400 : 2000);

    return () => window.clearTimeout(timer);
  }, [activeSection, introVisible]);

  const closeMenu = () => setMenuOpen(false);
  const handleNavSelect = (href) => {
    setActiveSection(href);
    setMenuOpen(false);
  };

  return (
    <div className="page-shell">
        <div className="cursor-glow" aria-hidden="true" />
        <div className="cursor-trailer" aria-hidden="true" />
        <div className="page-progress" aria-hidden="true">
          <span style={{ width: `${scrollProgress}%` }} />
        </div>
        <div className={`intro-overlay ${introVisible ? "is-active" : "is-hidden"}`} aria-hidden={!introVisible}>
          <div className="intro-simple">
            <span className="intro-label">Khalifa University</span>
            <h2>The Commute Effect</h2>
            <p>The hidden cost of getting to class.</p>
            <div className="intro-loader" aria-hidden="true">
              <span />
            </div>
          </div>
        </div>

      <div className="site-content">
        <div className="bg-orb bg-orb-one" />
        <div className="bg-orb bg-orb-two" />
        <div className="bg-grid" />

        <header className="site-header">
          <nav className="navbar">
            <a
              className="brand"
              href="#home"
              onClick={(event) => {
                event.preventDefault();
                handleNavSelect("#home");
              }}
            >
              <BrandLogo />
            </a>

            <button
              className="nav-toggle"
              type="button"
              aria-expanded={menuOpen}
              aria-label="Toggle navigation"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
              <span />
            </button>

            <div className={`nav-menu ${menuOpen ? "is-open" : ""}`}>
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(event) => {
                    event.preventDefault();
                    handleNavSelect(item.href);
                  }}
                  className={activeSection === item.href ? "is-active" : ""}
                >
                  <span className="nav-dot" aria-hidden="true" />
                  {item.label}
                </a>
              ))}
            </div>

          </nav>
        </header>

      <main>
        <section className={`hero section tab-panel ${activeSection === "#home" ? "is-active" : ""}`} id="home">
          <div className="container hero-layout">
            <div className="hero-copy">
              <div className="eyebrow" data-reveal>
                Student-led nonprofit at Khalifa University
              </div>
              <h1 data-reveal>The Commute Effect</h1>
              <p className="hero-tagline" data-reveal>
                The hidden cost of getting to class.
              </p>
              <p className="hero-text" data-reveal>
                KU students commute through Abu Dhabi traffic every day. Even short daily commutes can follow students into the classroom.
              </p>
              <div className="hero-actions" data-reveal>
                <a className="button button-primary" href="#research" onClick={(event) => { event.preventDefault(); handleNavSelect("#research"); }}>
                  See Our Research
                </a>
                <a className="button button-secondary" href="#problem" onClick={(event) => { event.preventDefault(); handleNavSelect("#problem"); }}>
                  Learn More
                </a>
              </div>
            </div>

            <div className="hero-panel" data-reveal>
              <div className="hero-glow hero-glow-one" />
              <div className="hero-glow hero-glow-two" />
              <div className="hero-photo-frame">
                <img src={stockImages.traffic} alt="Traffic moving through a city at night" loading="eager" />
              </div>
              <div className="hero-float hero-float-one">
                <span>Abu Dhabi traffic</span>
              </div>
              <div className="hero-float hero-float-two">
                <span>Classroom impact</span>
              </div>
              <div className="hero-card hero-card-top">
                <span className="hero-kicker">Daily Reality</span>
                <p>Traffic, parking, and reduced readiness before class even starts.</p>
              </div>
              <div className="hero-rings">
                <div className="ring ring-one" />
                <div className="ring ring-two" />
                <div className="ring ring-three" />
              </div>
              <div className="hero-card hero-card-bottom">
                <span className="hero-kicker">Why It Matters</span>
                <p>The challenge is not just getting to class. It is arriving ready to learn.</p>
              </div>
            </div>
          </div>

          <div className="stats-strip">
            <div className="container stats-grid">
              {homeHighlights.map((item, index) => (
                <article
                  className={`stat-card stat-card-insight${homeCardsVisible ? " is-visible" : ""}`}
                  key={item.title}
                  style={{ "--float-delay": `${index * 180}ms` }}
                >
                  <span className="stat-kicker">{item.kicker}</span>
                  <strong>{item.title}</strong>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`section section-light tab-panel ${activeSection === "#problem" ? "is-active" : ""}`} id="problem">
          <div className="container problem-layout">
            <div className="section-copy">
              <SectionLabel>The Problem</SectionLabel>
              <h2 data-reveal>Commuting Is More Than a Daily Inconvenience.</h2>
              <p data-reveal>
                Getting to campus can mean traffic, parking, and arriving drained. Research links commuting to lower
                belonging and weaker campus involvement.
              </p>
              <p data-reveal>At KU, commuting appears to affect readiness more consistently than attendance itself.</p>
              <aside className="quote-card" data-reveal>
                <p>&quot;It&apos;s not about the distance. It&apos;s about what the journey costs you.&quot;</p>
              </aside>
            </div>

            <div className="problem-visual" data-reveal>
              <div className="visual-frame">
                <img
                  className="visual-photo"
                  src={stockImages.problem}
                  alt="Road scene with Abu Dhabi skyline in the background"
                  loading="lazy"
                />
                <div className="signal-panel">
                  <span className="signal-label">Commute Pressure</span>
                  <strong>Traffic. Delay. Fatigue.</strong>
                </div>
              </div>
            </div>
          </div>

            <div className="container literature-panel" data-reveal>
            <div className="panel-heading">
              <h3>What earlier studies show</h3>
              <p>These earlier studies from the literature review show why commuting matters before we even get to the KU survey.</p>
            </div>
            <div className="literature-grid">
              {literatureFindings.map((item) => (
                <article className="literature-card" key={item.source}>
                  <span className="literature-source">{item.source}</span>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`section section-dark tab-panel ${activeSection === "#research" ? "is-active" : ""}`} id="research">
          <div className="container research-story">
            <SectionLabel>Our Research</SectionLabel>
            <h2 data-reveal>What We Found at KU.</h2>
            <p className="section-intro" data-reveal>
              These visuals show the clearest pattern in the KU survey: many students have relatively short commutes, but readiness and punctuality still take a hit.
            </p>
            <div className="research-snap-scroller">
              <section className="research-snap-panel research-snap-panel-intro">
                <div className="research-guided" data-reveal>
                  {researchHighlights.map((item, index) => (
                    <article className="research-guided-card" key={item} style={{ transitionDelay: `${index * 120}ms` }}>
                      <span>{`0${index + 1}`}</span>
                      <p>{item}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section className="research-snap-panel">
                <ResearchCounterCards />
              </section>

              <section className="research-snap-panel">
                <CommuteDonutChart />
              </section>

              <section className="research-snap-panel">
                <LikertImpactChart />
              </section>

              <section className="research-snap-panel">
                <OverallImpactSegment />
              </section>

              <section className="research-snap-panel">
                <div className="methodology" data-reveal>
                  <h3>How We Collected This Data</h3>
                  <p>We surveyed 102 full-time KU undergraduates who commute regularly and collected responses anonymously through YouForm.</p>
                  <div className="methodology-grid">
                    <article className="method-card">
                      <span className="method-card-label">Participants</span>
                      <p>All participants were full-time undergraduate students at Khalifa University who commute to campus on a regular basis.</p>
                    </article>
                    <article className="method-card">
                      <span className="method-card-label">Survey Design</span>
                      <p>The survey used one commute-duration question plus Likert-scale items on punctuality, readiness, concentration, tiredness, and overall impact.</p>
                    </article>
                    <article className="method-card">
                      <span className="method-card-label">Analysis</span>
                      <p>YouForm analytics was used to summarize responses, calculate percentages, and report mean agreement scores across the main measures.</p>
                    </article>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>

        <section className={`section section-light tab-panel ${activeSection === "#initiatives" ? "is-active" : ""}`} id="initiatives">
          <div className="container">
            <SectionLabel>What We Do</SectionLabel>
            <h2 data-reveal>Our Campaigns and Initiatives.</h2>
            <p className="section-intro" data-reveal>
              These recommendations come directly from the report: reduce morning pressure, support the transition into class, and keep the issue visible.
            </p>
            <div className="recommendation-mockup" data-reveal>
              <div className="recommendation-mockup-copy">
                <span className="figure-tag">Recommendation mockup</span>
                <h3>A protected arrival window could make first-period classes more realistic for commuters.</h3>
                <p>Instead of changing the official start time, KU could recognize the first few minutes as transition time for parking, walking in, and settling mentally.</p>
              </div>
              <div className="schedule-card" aria-hidden="true">
                <div className="schedule-card-head">
                  <strong>First-Period Policy</strong>
                  <span>Prototype</span>
                </div>
                <div className="schedule-row">
                  <span>9:00 AM</span>
                  <p>Official class start stays the same</p>
                </div>
                <div className="schedule-row schedule-row-highlight">
                  <span>9:00-9:10</span>
                  <p>Protected transition window for arrival, parking, and settling in</p>
                </div>
                <div className="schedule-row">
                  <span>After 9:10</span>
                  <p>Full instruction begins once more students are actually ready to engage</p>
                </div>
              </div>
            </div>

            <div className="campaign-grid">
              {campaigns.map((campaign) => (
                <article className="campaign-card" key={campaign.title} data-reveal>
                  <div className="icon-wrap">{campaign.icon}</div>
                  <h3>{campaign.title}</h3>
                  <p>{campaign.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`section section-dark tab-panel ${activeSection === "#about" ? "is-active" : ""}`} id="about">
          <div className="container about-layout">
            <div className="section-copy">
              <SectionLabel>About</SectionLabel>
              <h2 data-reveal>Why We Started The Commute Effect.</h2>
              <p data-reveal>The Commute Effect began with one KU student asking whether commuting changes how students learn.</p>
              <p data-reveal>That question became a study of 102 commuters and a clearer case for change.</p>
              <p data-reveal>This site turns that report into a public-facing call for action.</p>
              <div className="about-detail-grid" data-reveal>
                <article className="about-detail-card">
                  <span className="about-detail-label">Started with</span>
                  <strong>One student question</strong>
                  <p>Does the daily drive affect how ready students feel when class begins?</p>
                </article>
                <article className="about-detail-card">
                  <span className="about-detail-label">Built into</span>
                  <strong>A KU commuter study</strong>
                  <p>The project grew into a survey-based report focused on punctuality, readiness, and engagement.</p>
                </article>
                <article className="about-detail-card">
                  <span className="about-detail-label">Now used as</span>
                  <strong>A call for change</strong>
                  <p>This website translates the report into something students and staff can quickly understand.</p>
                </article>
              </div>
            </div>

            <div className="about-visual-stack" data-reveal>
              <div className="about-portrait">
                <div className="about-photo about-photo-main">
                  <img src={stockImages.students} alt="Khalifa University student hub interior" loading="lazy" />
                </div>
                <div className="about-photo about-photo-secondary">
                  <img src={stockImages.lecture} alt="Khalifa University campus lounge interior" loading="lazy" />
                </div>
                <div className="portrait-orbit portrait-orbit-one" />
                <div className="portrait-orbit portrait-orbit-two" />
                <div className="portrait-core">
                  <span>Student-led</span>
                  <strong>From commute to research to action</strong>
                </div>
              </div>
              <div className="mission-box">
                <p>Our mission is simple: make KU take the commuter experience seriously.</p>
              </div>
            </div>
          </div>
        </section>

        <section className={`section section-light tab-panel ${activeSection === "#action" ? "is-active" : ""}`} id="action">
          <div className="container">
            <SectionLabel>Take Action</SectionLabel>
            <h2 data-reveal>What You Can Do.</h2>
            <p className="section-intro" data-reveal>
              The research is only useful if it pushes change. This is where the project turns from findings into action.
            </p>

            <div className="action-spotlight" data-reveal>
              <div className="action-spotlight-copy">
                <span className="figure-tag">Campaign focus</span>
                <h3>Push for a campus experience built around readiness, not just arrival.</h3>
                <p>Small changes in timing, space, and awareness could make the first hour of the academic day feel very different for commuters.</p>
              </div>
              <div className="action-spotlight-visual" aria-hidden="true">
                <span className="spotlight-beam spotlight-beam-one" />
                <span className="spotlight-beam spotlight-beam-two" />
                <span className="spotlight-node spotlight-node-one" />
                <span className="spotlight-node spotlight-node-two" />
                <span className="spotlight-node spotlight-node-three" />
              </div>
            </div>

            <div className="action-banner" data-reveal>
              <div className="action-banner-copy">
                <span className="figure-tag">Collective action</span>
                <p>Small schedule changes, better spaces, and louder student voices can all shift the commuter experience.</p>
              </div>
              <div className="action-banner-visual" aria-hidden="true">
                <span className="action-node action-node-one" />
                <span className="action-node action-node-two" />
                <span className="action-node action-node-three" />
                <span className="action-link action-link-one" />
                <span className="action-link action-link-two" />
              </div>
            </div>

            <div className="action-stack">
              {actionCards.map((card) => (
                <article className="action-card" key={card.title} data-reveal>
                  <span className="action-card-kicker">{card.kicker}</span>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>

            <div className="action-cta" data-reveal>
              <div className="story-form-shell">
                <div className="story-form-copy">
                  <span className="figure-tag">Share your story</span>
                  <h3>Tell us what the commute feels like for you.</h3>
                  <p>A short student story helps turn the research into something real, personal, and harder to ignore.</p>
                </div>

                <form className="story-form" onSubmit={handleStorySubmit}>
                  <div className="story-form-grid">
                    <label className="field">
                      <span>Your name</span>
                      <input name="name" type="text" placeholder="Optional" />
                    </label>
                    <label className="field">
                      <span>Your role</span>
                      <select name="role" defaultValue="KU student">
                        <option>KU student</option>
                        <option>Faculty or staff</option>
                        <option>Parent</option>
                        <option>Other supporter</option>
                      </select>
                    </label>
                    <label className="field">
                      <span>Commute length</span>
                      <select name="commute-length" defaultValue="15-30 min">
                        <option>Less than 15 min</option>
                        <option>15-30 min</option>
                        <option>31-45 min</option>
                        <option>46-60 min</option>
                        <option>More than 60 min</option>
                      </select>
                    </label>
                    <label className="field">
                      <span>Biggest effect</span>
                      <select name="effect" defaultValue="Mental readiness">
                        <option>Punctuality</option>
                        <option>Mental readiness</option>
                        <option>Concentration</option>
                        <option>Physical tiredness</option>
                        <option>Engagement in class</option>
                      </select>
                    </label>
                  </div>

                  <label className="field field-full">
                    <span>Your story</span>
                    <textarea
                      name="story"
                      rows="5"
                      placeholder="What does your daily commute change about how you arrive, focus, or engage in class?"
                      required
                    />
                  </label>

                  <div className="story-form-actions">
                    <button className="button button-primary button-large" type="submit">
                      Submit Story
                    </button>
                    <p className={`story-form-status${storySubmitted ? " is-visible" : ""}`} aria-live="polite">
                      Thanks. Your story has been added to the campaign demo.
                    </p>
                  </div>
                </form>
              </div>
            </div>

            <details className="sources-drawer" data-reveal>
              <summary>
                <span>Sources / Research Notes</span>
                <strong>Open</strong>
              </summary>
              <div className="sources-list">
                {sourceNotes.map((note) => (
                  <p key={note}>{note}</p>
                ))}
                <div className="sources-subgroup">
                  <span className="method-card-label">Image Credits</span>
                  {imageCredits.map((credit) => (
                    <p key={credit}>{credit}</p>
                  ))}
                </div>
              </div>
            </details>

            <footer className="site-footer site-footer-embedded" data-reveal>
              <div className="footer-content">
                <div>
                  <p className="footer-title">
                    <BrandLogo footer />
                  </p>
                  <p className="footer-tagline">The hidden cost of getting to class.</p>
                  <p className="footer-closing">The commute does not end at the campus gate.</p>
                </div>
                <p className="footer-meta">Khalifa University - Academic English II - Spring 2026.</p>
              </div>
            </footer>
          </div>
        </section>
      </main>
      </div>
    </div>
  );
}

export default App;

