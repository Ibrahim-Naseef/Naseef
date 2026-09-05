import { lazy, Suspense, useEffect, useState } from "react";
import { work } from "../../constants/work";
import Tabs from "./Tabs";
import WorkCard from "./WorkCard";

const Terminal = lazy(() => import("../Terminal/Terminal"));

function FindMyWork() {
  const tabs = ["Projects", "Certifications", "Skills", "Education", "Terminal"];
  const tabIds = ["projects", "certifications", "skills-tab", "education", "terminal"];
  const [activeTab, setActiveTab] = useState<number>(0);

  useEffect(() => {
    const handlePortfolioTab = (event: Event) => {
      const tabIndex = (event as CustomEvent<number>).detail;
      setActiveTab(tabIndex);
      requestAnimationFrame(() => {
        document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
      });
    };
    window.addEventListener("portfolio-tab", handlePortfolioTab);
    return () => window.removeEventListener("portfolio-tab", handlePortfolioTab);
  }, []);
  return (
    <div className="find-my-work" id="work">
      <h1 className="heading" data-color-inverted={"true"}>
        Find My Work
      </h1>
      <Tabs tabs={tabs} tabIds={tabIds} activeTab={activeTab} setActiveTab={setActiveTab} badges={{ 4: "New" }} />
      {activeTab === 3 ? (
        <div id="education" className="work-content education-grid">
          {work[2]?.map((data, i) => (
            <WorkCard key={i} data={data} cardIndex={300 + i} />
          ))}
        </div>
      ) : activeTab === 4 ? (
        <Suspense fallback={null}>
          <div id="terminal" className="terminal-panel">
            <Terminal onClose={() => setActiveTab(0)} />
          </div>
        </Suspense>
      ) : (
        <div
          className={`work-content ${activeTab === 0 || activeTab === 2 ? "cards-grid" : ""} ${activeTab === 1 ? "certifications-grid" : ""}`}
          id="work-content-scroll-div"
        >
          {(activeTab === 2 ? work[3] : work[activeTab])?.map((data, i) => (
            <WorkCard key={i} data={data} cardIndex={activeTab * 100 + i} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FindMyWork;
