import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { lazy, Suspense, useEffect, useRef } from 'react';
import useIsMobile from '../../hooks/useIsMobile';
import { useThemeStore } from '../../store/themeStore';

const PartsAssemblingCanvas = lazy(
  () => import('../Canvas/PartsAssemblingCanvas'),
);

gsap.registerPlugin(ScrollTrigger);

const workExperience = [
  {
    title: 'DevOps Engineer',
    company: 'Tata Consultancy Services (TCS)',
    date: 'August 2024 - Present (Bengaluru)',
    points: [
      "Engineered reusable <span class='black'>Azure DevOps CI/CD templates</span> across <span class='black'>12+ enterprise repositories</span>, cutting pipeline setup time by <span class='black'>40%</span>",
      "Integrated <span class='black'>Checkmarx, SonarQube, Checkov</span>, and linters into PR pipelines, reducing scan times by <span class='black'>60%</span>",
      "Automated <span class='black'>AWS CDK</span> deployments for Lambda, Glue, IAM, and S3, securing credentials across <span class='black'>30+ cloud resources</span> with AWS Secrets Manager",
      "Connected <span class='black'>Azure DevOps</span> and <span class='black'>Jenkins</span> workflows for multi-environment AWS delivery while supporting production pipelines across multiple teams",
      "Automated repository governance with <span class='black'>Terraform</span>, onboarded <span class='black'>8+ application teams</span>, and maintained a <span class='black'>95%+ SLA</span>",
    ],
  },
  {
    title: 'Python AI/ML Developer',
    company: 'TCS',
    date: 'August 2026 - November 2026',
    points: [
      "Completed a <span class='black'>Python and AI/ML upskilling track</span> through <span class='black'>3 practical learning modules</span>",
      "Built <span class='black'>Python scripts</span> for data preparation and automation, applying <span class='black'>5+ core AI/ML concepts</span>",
      "Documented and presented <span class='black'>AI/ML experiments</span> with measurable outputs across <span class='black'>3 internal reviews</span>",
    ],
  },
  {
    title: 'Machine Learning Intern',
    company: 'The Website Makers',
    date: 'Dec 2023 - Mar 2024',
    points: [
      "Completed a <span class='black'>Machine Learning internship</span> program and applied ML techniques to <span class='black'>2 real-world projects</span>",
      "Performed <span class='black'>data analysis</span> and <span class='black'>model building</span> under industry guidance across <span class='black'>3 development stages</span>",
      "Prepared and deployed machine learning solutions through <span class='black'>3 repeatable workflow steps</span>: data preparation, training, and evaluation",
    ],
  },
  {
    title: 'Intern',
    company: 'Yenepoya Technology Incubator (YTI)',
    date: 'Aug 2023 - Sep 2023',
    points: [
      "Applied <span class='black'>6+ image-processing techniques</span>, including resizing, cropping, erosion, histogram analysis, gradients, and edge detection",
      "Annotated training data with <span class='black'>bounding boxes and polygons</span> for machine learning model development",
      "Prepared and reviewed annotated image datasets across <span class='black'>2 labeling formats</span> for model-training workflows",
    ],
  },
];

const WorkExperience = () => {
  const textRef = useRef(null);
  const containerRef = useRef(null);
  const { darkMode } = useThemeStore();
  const isMobile = useIsMobile(600);

  useEffect(() => {
    const sections = gsap.utils.toArray('.work-experience-section');
    const triggers: ScrollTrigger[] = [];

    // Simple one-shot fade-in animation — no scrub, so items stay visible once revealed
    sections.forEach((section: any) => {
      const anim = gsap.fromTo(
        section,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        },
      );
      if (anim.scrollTrigger) triggers.push(anim.scrollTrigger);
    });

    // Keep the 3D model progress tracker
    const progressTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: self => {
        document.dispatchEvent(
          new CustomEvent('scrollAnimationProgress', { detail: self.progress }),
        );
      },
    });
    triggers.push(progressTrigger);

    return () => {
      triggers.forEach(t => t.kill());
    };
  }, [darkMode, isMobile]);

  return (
    <div className="work-experience-main-wrapper" ref={containerRef}>
      <h1 className="fixed-heading">
        <span className="orange">Destructuring </span>
        <span data-color-inverted={'true'}>My Work Experience.</span>
      </h1>
      <div className="left-column">
        <Suspense fallback={null}>
          <PartsAssemblingCanvas />
        </Suspense>
      </div>
      <div className="right-column" ref={textRef}>
        {workExperience.map((exp, index) => (
          <div key={index} className="work-experience-section">
            <h2 className="job-title">
              {exp.title} @ <span className="orange">{exp.company}</span>
            </h2>
            <div className="flex-row">
              <p className="duration">{exp.date}</p>
            </div>
            <ul className="work-ex-points">
              {exp.points.map((point, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: point }} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkExperience;
