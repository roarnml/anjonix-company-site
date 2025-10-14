

// src/pages/TrainingMaterials.tsx
//import React from "react";
/*import { FileDown, BookOpen, Lock } from "lucide-react";

const TrainingMaterials = () => {
  const materials = [
    {
      week: "Week 1",
      title: "LED Traffic Light System",
      description:
        "Learn sequencing, timing logic, and basic circuits by building a working Arduino traffic light.",
      file: "downloads/traffic_light_updated.pptx",
      enabled: true,
    },
    {
      week: "Week 2",
      title: "Line-Following Robot",
      description:
        "Design a robot that follows a track using IR sensors and feedback control.",
      file: "/downloads/week2-line-follower.pdf",
      enabled: false,
    },
    {
      week: "Week 3",
      title: "Smart Home Automation",
      description:
        "IoT project to control appliances and sensors remotely via Wi-Fi.",
      file: "/downloads/week3-smart-home.pdf",
      enabled: false,
    },
    // Weeks 4–10 same pattern...
  ];

  const guides = [
    {
      title: "Student Guide",
      description:
        "Step-by-step instructions on accessing, downloading, and using training files.",
      link: "/guides/student-guides.pdf",
    },
    {
      title: "Technical Setup",
      description:
        "Quick setup guide for Arduino IDE, breadboarding, and required plugins.",
      link: "/guides/setup-guide.pdf",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Gradient *}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-200 to-white z-0"></div>

      {/* Background Robotics Video *}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-20 z-0"
      >
        <source src="/images/robotics-bg.mp4" type="video/mp4" />
        {/* fallback text *}
        Your browser does not support the video tag.
      </video>

      {/* Content Wrapper *}
      <div className="relative z-10">
        {/* Header *}
        <header className="text-center py-16">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
            STEM Training Materials Hub
          </h1>
          <p className="mt-4 text-lg text-blue-100">
            Weekly project downloads & guides to master STEM and robotics
          </p>
        </header>

        {/* Materials Section *}
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-8">
            Weekly Projects
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {materials.map((m, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition"
              >
                <div>
                  <h3 className="text-xl font-semibold text-blue-800">
                    {m.week}
                  </h3>
                  <h4 className="text-lg font-medium text-blue-600 mt-1">
                    {m.title}
                  </h4>
                  <p className="text-gray-600 mt-2">{m.description}</p>
                </div>
                {m.enabled ? (
                  <a
                    href={m.file}
                    className="mt-6 inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                    download
                  >
                    <FileDown className="w-5 h-5" />
                    Download
                  </a>
                ) : (
                  <button
                    disabled
                    className="mt-6 inline-flex items-center justify-center gap-2 bg-gray-300 text-gray-600 px-4 py-2 rounded-lg font-medium cursor-not-allowed"
                  >
                    <Lock className="w-5 h-5" />
                    Locked
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Guides Section *}
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-8">Guides</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {guides.map((g, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition"
              >
                <div>
                  <h3 className="text-xl font-semibold text-blue-800">
                    {g.title}
                  </h3>
                  <p className="text-gray-600 mt-2">{g.description}</p>
                </div>
                <a
                  href={g.link}
                  className="mt-6 inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  <BookOpen className="w-5 h-5" />
                  View Guide
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Footer 
        <footer className="text-center py-8 text-sm text-blue-900/70">
          © {new Date().getFullYear()} STEM & Robotics Curriculum Hub. All rights reserved.
        </footer>*}
      </div>
    </div>
  );
};

export default TrainingMaterials;*/

// src/pages/TrainingMaterials.tsx
import { useEffect, useState } from "react";
import { FileDown, BookOpen, Lock, Play, X } from "lucide-react";

type Material = {
  week: string;
  title: string;
  description: string;
  notes?: string; // download notes
  videoLink?: string; // watch (mp4 or external)
  videoFile?: string; // direct video download
  enabled: boolean;
  poster?: string;
};

type Guide = {
  title: string;
  description: string;
  link: string;
};

const materials: Material[] = [
  {
    week: "Week 1",
    title: "LED Traffic Light System",
    description:
      "Learn sequencing, timing logic, and basic circuits by building a working Arduino traffic light.",
    notes: "/downloads/traffic_light_updated.pptx",
    videoLink: "/downloads/videos/week1-traffic_light.mp4",
    videoFile: "/downloads/videos/week1-traffic_light.mp4",
    poster: "/images/week1-poster.jpg",
    enabled: true,
  },
  {
    week: "Week 2",
    title: "Traffic Light System With Timer",
    description:
      "Design a Traffic Light with Timer and a beeping sound count down for time to go",
    notes: "/downloads/MULTIPURPOSE 7-SEGEMENT DISPLAY SYSTEM.pptx",
    videoLink: "/downloads/videos/Led_with_Buzzer_and_timer1.mp4",
    videoFile: "/downloads/videos/Led_with_Buzzer_and_timer1.mp4",
    enabled: true,
  },
  {
    week: "Week 3",
    title: "Smart Home Automation",
    description:
      "IoT project to control appliances and sensors remotely via Wi-Fi.",
    notes: "/downloads/week3-smart-home.pdf",
    videoLink: "/https://www.youtube.com/watch?v=dQw4w9WgXcQ".replace(
      "https://",
      ""
    ), // placeholder showing youtube example (fix to actual URL)
    videoFile: "/downloads/week3-smart-home.mp4",
    enabled: false,
  },
  {
    week: "Week 4",
    title: "Ultrasonic Distance Sensing",
    description: "Measure distance, build obstacle avoidance & reactive behaviors.",
    notes: "/downloads/week4-ultrasonic.pdf",
    videoLink: "/videos/week4-ultrasonic.mp4",
    videoFile: "/downloads/week4-ultrasonic.mp4",
    enabled: false,
  },
  {
    week: "Week 5",
    title: "Servo Motor Control",
    description: "Control servos, PWM, and robot articulation basics.",
    notes: "/downloads/week5-servo.pdf",
    videoLink: "/videos/week5-servo.mp4",
    videoFile: "/downloads/week5-servo.mp4",
    enabled: false,
  },
  {
    week: "Week 6",
    title: "Bluetooth Remote Control",
    description: "Control your robot via Bluetooth and mobile apps.",
    notes: "/downloads/week6-bluetooth.pdf",
    videoLink: "/videos/week6-bluetooth.mp4",
    videoFile: "/downloads/week6-bluetooth.mp4",
    enabled: false,
  },
  {
    week: "Week 7",
    title: "Camera Vision Basics",
    description: "Intro to computer vision, OpenCV/processing basics.",
    notes: "/downloads/week7-vision.pdf",
    videoLink: "/videos/week7-vision.mp4",
    videoFile: "/downloads/week7-vision.mp4",
    enabled: false,
  },
  {
    week: "Week 8",
    title: "PID Control Theory",
    description: "Closed-loop control fundamentals applied to motors.",
    notes: "/downloads/week8-pid.pdf",
    videoLink: "/videos/week8-pid.mp4",
    videoFile: "/downloads/week8-pid.mp4",
    enabled: false,
  },
  {
    week: "Week 9",
    title: "Sensor Fusion",
    description: "Combining inputs (IMU, encoders, range sensors) for robust sensing.",
    notes: "/downloads/week9-fusion.pdf",
    videoLink: "/videos/week9-fusion.mp4",
    videoFile: "/downloads/week9-fusion.mp4",
    enabled: false,
  },
  {
    week: "Week 10",
    title: "Final Project: Integration",
    description: "Bring everything together: build a project for demo day.",
    notes: "/downloads/week10-final.pdf",
    videoLink: "/videos/week10-final.mp4",
    videoFile: "/downloads/week10-final.mp4",
    enabled: false,
  },
];

const guides: Guide[] = [
  {
    title: "Student Guide",
    description:
      "Step-by-step instructions on accessing, downloading, and using training files.",
    link: "/guides/student-guides.pdf",
  },
  {
    title: "Technical Setup",
    description:
      "Quick setup guide for Arduino IDE, breadboarding, and required plugins.",
    link: "/guides/setup-guide.pdf",
  },
  {
    title: "Safety & Lab Rules",
    description: "Guidelines for safe prototyping in the lab.",
    link: "/guides/safety.pdf",
  },
];

export default function TrainingMaterials() {
  const [showVideo, setShowVideo] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);
  const [currentTitle, setCurrentTitle] = useState<string | null>(null);

  const openVideo = (url: string | undefined, title?: string) => {
    if (!url) return;
    // If the stored videoLink accidentally lacks protocol in examples above, normalize:
    const normalized = url.startsWith("/") || url.startsWith("http")
      ? url
      : url.startsWith("https://") || url.startsWith("http://")
      ? url
      : url.replace(/^\/+/, "");
    setCurrentVideo(normalized);
    setCurrentTitle(title ?? null);
    setShowVideo(true);
  };

  const closeVideo = () => {
    setShowVideo(false);
    // give the player a moment to stop playback (cleanup)
    setTimeout(() => {
      setCurrentVideo(null);
      setCurrentTitle(null);
    }, 200);
  };

  // Prevent background scroll while modal open
  useEffect(() => {
    if (typeof window === "undefined") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = showVideo ? "hidden" : prev || "";
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [showVideo]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeVideo();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // helpers to detect embed vs file
  const isYouTube = (url: string) =>
    /(?:youtube\.com|youtu\.be)/i.test(url || "");
  const isVimeo = (url: string) => /vimeo\.com/i.test(url || "");
  const isMp4 = (url: string) => /\.mp4($|\?)/i.test(url || "");

  const youTubeEmbedUrl = (url: string) => {
    try {
      const u = new URL(url.startsWith("/") ? window.location.origin + url : url);
      // youtu.be short url
      if (u.hostname.includes("youtu.be")) {
        const id = u.pathname.slice(1);
        return `https://www.youtube.com/embed/${id}?autoplay=1`;
      }
      // youtube.com watch?v=ID
      if (u.hostname.includes("youtube.com")) {
        const params = new URLSearchParams(u.search);
        const v = params.get("v");
        if (v) return `https://www.youtube.com/embed/${v}?autoplay=1`;
        // /embed/ID or /shorts/ID
        const pathPart = u.pathname.split("/").pop();
        if (pathPart) return `https://www.youtube.com/embed/${pathPart}?autoplay=1`;
      }
    } catch (e) {
      // fallback
    }
    return null;
  };

  const vimeoEmbedUrl = (url: string) => {
    try {
      const u = new URL(url.startsWith("/") ? window.location.origin + url : url);
      const id = u.pathname.split("/").pop();
      if (id) return `https://player.vimeo.com/video/${id}?autoplay=1`;
    } catch (e) {}
    return null;
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-200 to-white z-0" />
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-20 z-0"
      >
        <source src="/images/robotics-bg.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10">
        {/* Header */}
        <header className="text-center py-16">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
            STEM Training Materials Hub
          </h1>
          <p className="mt-4 text-lg text-blue-100">
            Weekly project downloads & guides to master STEM and robotics
          </p>
        </header>

        {/* Materials */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-8">Weekly Projects</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {materials.map((m, idx) => (
              <article
                key={idx}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition"
                aria-labelledby={`week-${idx}`}
              >
                <div>
                  <h3 id={`week-${idx}`} className="text-xl font-semibold text-blue-800">
                    {m.week}
                  </h3>
                  <h4 className="text-lg font-medium text-blue-600 mt-1">{m.title}</h4>
                  <p className="text-gray-600 mt-2">{m.description}</p>
                </div>

                {m.enabled ? (
                  <div className="mt-6 flex flex-col gap-3">
                    <button
                      onClick={() => openVideo(m.videoLink, `${m.week} — ${m.title}`)}
                      className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition"
                      aria-label={`Watch lesson video for ${m.title}`}
                    >
                      <Play className="w-5 h-5" />
                      Watch Lesson
                    </button>

                    {m.notes ? (
                      <a
                        href={m.notes}
                        download
                        className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                      >
                        <BookOpen className="w-5 h-5" />
                        Lesson Notes
                      </a>
                    ) : null}

                    {m.videoFile ? (
                      <a
                        href={m.videoFile}
                        download
                        className="inline-flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition"
                      >
                        <FileDown className="w-5 h-5" />
                        Download Video
                      </a>
                    ) : null}
                  </div>
                ) : (
                  <button
                    disabled
                    className="mt-6 inline-flex items-center justify-center gap-2 bg-gray-300 text-gray-600 px-4 py-2 rounded-lg font-medium cursor-not-allowed"
                  >
                    <Lock className="w-5 h-5" />
                    Locked
                  </button>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Guides */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-8">Guides</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {guides.map((g, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition"
              >
                <div>
                  <h3 className="text-xl font-semibold text-blue-800">{g.title}</h3>
                  <p className="text-gray-600 mt-2">{g.description}</p>
                </div>
                <a
                  href={g.link}
                  className="mt-6 inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  <BookOpen className="w-5 h-5" />
                  View Guide
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Footer (optional) */}
        <footer className="text-center py-8 text-sm text-blue-900/70">
          © {new Date().getFullYear()} STEM & Robotics Curriculum Hub. All rights reserved.
        </footer>
      </div>

      {/* Video Modal */}
      {showVideo && currentVideo && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={currentTitle ?? "Lesson video"}
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
        >
          <div className="relative bg-black rounded-xl shadow-2xl max-w-4xl w-full overflow-hidden">
            <button
              onClick={closeVideo}
              className="absolute top-3 right-3 z-40 bg-white/10 hover:bg-white/20 rounded-full p-1.5"
              aria-label="Close video"
            >
              <X className="w-6 h-6 text-black" />
            </button>

            <div className="w-full aspect-video">
              {/* YouTube */}
              {isYouTube(currentVideo) && youTubeEmbedUrl(currentVideo) ? (
                <iframe
                  title={currentTitle ?? "YouTube lesson"}
                  src={youTubeEmbedUrl(currentVideo) as string}
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                  className="w-full h-full"
                  frameBorder={0}
                />
              ) : isVimeo(currentVideo) && vimeoEmbedUrl(currentVideo) ? (
                <iframe
                  title={currentTitle ?? "Vimeo lesson"}
                  src={vimeoEmbedUrl(currentVideo) as string}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                  frameBorder={0}
                />
              ) : isMp4(currentVideo) || currentVideo.startsWith("/") ? (
                <video
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover bg-black"
                >
                  {/* provide source with type (helps browsers choose correct decoder) */}
                  <source src={currentVideo} type="video/mp4" />
                  {/* fallback */}
                  Sorry, your browser doesn't support embedded video.{" "}
                  <a href={currentVideo} className="text-blue-400 underline">
                    Click here to download / open.
                  </a>
                </video>
              ) : (
                // Fallback: attempt to open in iframe (may or may not work)
                <iframe
                  title={currentTitle ?? "Video"}
                  src={currentVideo}
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                  className="w-full h-full"
                  frameBorder={0}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
