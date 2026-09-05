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
    title: 'System Engineer',
    company: 'Tata Consultancy Services (TCS)',
    date: 'August 2024 - Present (Bengaluru)',
    points: [
      "Engineered a centralized <span class='black'>CI/CD blueprint repository</span> using Azure DevOps, standardizing reusable templates across <span class='black'>12+ enterprise repositories</span> and cutting setup time by 40%",
      "Integrated security quality gates (<span class='black'>Checkmarx, SonarQube, Checkov</span>) and code linters into CI pipelines, restricting analysis to PR-changed files to reduce scan times by 60%",
      "Automated infrastructure deployments using <span class='black'>AWS CDK</span> (Lambda, Glue, IAM, S3), leveraging aws s3 sync for automated file deployments",
      "Established hybrid delivery workflows where <span class='black'>Azure DevOps</span> triggers downstream <span class='black'>Jenkins</span> jobs for multi-environment deployments to AWS",
      "Built Python scripts and pipeline workflows for <span class='black'>AWS Secrets Manager</span> provisioning, securing credentials across 30+ cloud resources",
      "Automated Azure DevOps repository governance using <span class='black'>Terraform</span>, enforcing branch policies and PR validations with 100% compliance",
      "Provided production support for enterprise <span class='black'>Jenkins CI/CD pipelines</span>, troubleshooting build, deployment, and configuration issues across multiple teams",
      "Onboarded <span class='black'>8+ application teams</span> onto standardized CI/CD platforms while maintaining a 95%+ SLA",
    ],
  },
  {
    title: 'Python AI/ML Developer',
    company: 'TCS',
    date: 'August 2026 - November 2026',
    points: [
      "Worked with <span class='black'>Python</span> and the basics of AI/ML as part of an internal upskilling track",
    ],
  },
  {
    title: 'Machine Learning Intern',
    company: 'The Website Makers',
    date: 'Dec 2023 - Mar 2024',
    points: [
      "Completed a Machine Learning internship program, applying ML techniques to real-world projects under the guidance of industry professionals",
      "Developed skills in <span class='black'>data analysis, model building</span>, and deploying machine learning solutions",
    ],
  },
  {
    title: 'Intern',
    company: 'Yenepoya Technology Incubator (YTI)',
    date: 'Aug 2023 - Sep 2023',
    points: [
      "Focused on <span class='black'>image processing techniques</span> - resizing, cropping, erosion, histogram analysis, gradient computation, and edge detection",
      "Gained experience annotating images with <span class='black'>bounding boxes and polygons</span> for machine learning model training",
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
