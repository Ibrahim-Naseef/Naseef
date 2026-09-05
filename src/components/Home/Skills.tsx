import { useInView } from "motion/react";
import React, { useEffect, useMemo, useRef, useState } from "react";
// Icons matched 1:1 to skills listed on the resume:
// 1 Azure DevOps, 2 Jenkins, 3 Git, 4 Python, 5 Bash, 6 MySQL,
// 7 AWS, 8 Terraform, 9 Docker, 10 Kubernetes, 11 SonarQube, 12 Checkmarx
import l_icon1 from "../../assets/skills/light/icon1.webp";
import l_icon10 from "../../assets/skills/light/icon10.webp";
import l_icon11 from "../../assets/skills/light/icon11.webp";
import l_icon12 from "../../assets/skills/light/icon12.webp";
import l_icon2 from "../../assets/skills/light/icon2.webp";
import l_icon3 from "../../assets/skills/light/icon3.webp";
import l_icon4 from "../../assets/skills/light/icon4.webp";
import l_icon5 from "../../assets/skills/light/icon5.webp";
import l_icon6 from "../../assets/skills/light/icon6.webp";
import l_icon7 from "../../assets/skills/light/icon7.webp";
import l_icon8 from "../../assets/skills/light/icon8.webp";
import l_icon9 from "../../assets/skills/light/icon9.webp";

import d_icon1 from "../../assets/skills/dark/icon1.webp";
import d_icon10 from "../../assets/skills/dark/icon10.webp";
import d_icon11 from "../../assets/skills/dark/icon11.webp";
import d_icon12 from "../../assets/skills/dark/icon12.webp";
import d_icon2 from "../../assets/skills/dark/icon2.webp";
import d_icon3 from "../../assets/skills/dark/icon3.webp";
import d_icon4 from "../../assets/skills/dark/icon4.webp";
import d_icon5 from "../../assets/skills/dark/icon5.webp";
import d_icon6 from "../../assets/skills/dark/icon6.webp";
import d_icon7 from "../../assets/skills/dark/icon7.webp";
import d_icon8 from "../../assets/skills/dark/icon8.webp";
import d_icon9 from "../../assets/skills/dark/icon9.webp";
import useIsMobile from "../../hooks/useIsMobile";
import { useThemeStore } from "../../store/themeStore";
import SkillsCanvas from "./SkillsCanvas";

const additionalSkillIcons = [
  l_icon1,
  l_icon2,
  l_icon3,
  l_icon4,
  l_icon5,
  l_icon6,
];

const lightIcons = [
  l_icon1,
  l_icon2,
  l_icon3,
  l_icon4,
  l_icon5,
  l_icon6,
  l_icon7,
  l_icon8,
  l_icon9,
  l_icon10,
  l_icon11,
  l_icon12,
  ...additionalSkillIcons,
];

const darkIcons = [
  d_icon1,
  d_icon2,
  d_icon3,
  d_icon4,
  d_icon5,
  d_icon6,
  d_icon7,
  d_icon8,
  d_icon9,
  d_icon10,
  d_icon11,
  d_icon12,
  ...additionalSkillIcons,
];

const deskstopFinalPositions = [
  { x: -500, y: 0 },
  { x: 650, y: 100 },
  { x: 600, y: -50 },
  { x: -600, y: -150 },
  { x: -600, y: 250 },
  { x: 100, y: -250 },
  { x: -400, y: -300 },
  { x: 500, y: 200 },
  { x: -300, y: 0 },
  { x: 300, y: 0 },
  { x: 250, y: 300 },
  { x: 550, y: -300 },
  { x: -700, y: 380 },
  { x: 700, y: 380 },
  { x: -750, y: 0 },
  { x: 750, y: -120 },
  { x: -500, y: 420 },
  { x: 500, y: 420 },
  { x: -300, y: 430 },
  { x: 300, y: 430 },
  { x: -750, y: 250 },
  { x: 750, y: 240 },
];

const mobileFinalPositions = [
  { x: -100, y: 120 },
  { x: 150, y: 110 },
  { x: 120, y: -150 },
  { x: -120, y: -275 },
  { x: 0, y: 325 },
  { x: 10, y: -280 },
  { x: -100, y: -150 },
  { x: 5, y: 150 },
  { x: -150, y: 300 },
  { x: 150, y: 380 },
  { x: 125, y: -360 },
  { x: -150, y: -370 },
  { x: -170, y: 440 },
  { x: 170, y: 440 },
  { x: -180, y: 40 },
  { x: 180, y: 40 },
  { x: -150, y: 520 },
  { x: 150, y: 520 },
  { x: -40, y: 560 },
  { x: 40, y: 560 },
  { x: -190, y: 250 },
  { x: 190, y: 250 },
];

const Skills: React.FC = () => {
  const isMobile = useIsMobile();
  const { darkMode } = useThemeStore();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    margin: "0px 0px -40% 0px",
    amount: 0.1,
    once: true,
  });

  const [vpWidth, setVpWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1400
  );
  useEffect(() => {
    const onResize = () => setVpWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const finalPositions = useMemo(() => {
    if (isMobile) {
      const scale = Math.min(1, Math.max(0.65, (vpWidth - 80) / 380));
      return mobileFinalPositions.map((p) => ({
        x: p.x * scale,
        y: p.y * scale,
      }));
    }

    const scale = Math.min(1, Math.max(0.7, (vpWidth - 120) / 1600));
    return deskstopFinalPositions.map((p) => ({
      x: p.x * scale,
      y: p.y * scale,
    }));
  }, [isMobile, vpWidth]);

  const iconUrls = useMemo(
    () => (darkMode ? darkIcons : lightIcons),
    [darkMode]
  );

  return (
    <div className="skills-container" ref={ref} id="skills">
      <p className="main-text" data-color-inverted={"true"}>
        Always Building, <br />
        Always Growing.
      </p>
      <SkillsCanvas
        iconUrls={iconUrls}
        finalPositions={finalPositions}
        isMobile={isMobile}
        triggerEntrance={inView}
      />
    </div>
  );
};

export default Skills;
