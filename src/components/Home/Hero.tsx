import { motion } from 'motion/react';
import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FiDownload, FiLink } from 'react-icons/fi';
import useIsMobile from '../../hooks/useIsMobile';
import CommonButton from '../Shared/CommonButton';
import ScrambleText from '../Shared/ScrambleText';

const CanvasComponent = lazy(() => import('../Canvas/CanvasComponent'));

// Delay before content starts appearing (lets background settle first)
const BG_SETTLE_DELAY = 0.7;

const bottomTexts = [
  `Ibrahim has <span class="black">3 AWS &amp; Microsoft certifications</span>, including AWS Solutions Architect and Azure Developer Associate.`,
  `Ibrahim is a graduate from <span class="black">Yenepoya Institute of Technology</span> with a <span class="black">B.E in Computer Science (9 CGPA)</span>, 2024.`,
  `Ibrahim specializes in designing scalable <span class="black">3-tier cloud architectures</span> and automated CI/CD pipelines.`,
  `Ibrahim builds end-to-end <span class="black">Agentic AI and Machine Learning solutions</span> integrated with modern web platforms.`,
  `Ibrahim has hands-on experience containerizing applications using <span class="black">Docker &amp; Ansible</span> for seamless deployment.`,
  `Ibrahim is passionate about optimizing <span class="black">cloud infrastructure &amp; serverless architectures</span> on AWS.`,
  `Ibrahim actively develops intelligent workflows leveraging state-of-the-art <span class="black">LLM &amp; AI tools</span>.`,
];

const roles = [
  'DevOps Engineer',
  'AWS Developer',
  'Python Developer',
  'AIML Developer',
  'Agentic AI Developer',
  'Tech Enthusiast',
  'Problem Solver',
  'CI/CD Specialist',
  'Cloud Developer',
  'Kubernetes Specialist',
  'Infrastructure Architect',
];

function Hero() {
  const isMobile = useIsMobile();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [showRobot, setShowRobot] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const mountTimeRef = useRef(Date.now());

  const handleRobotReady = useCallback(() => {
    // Wait for at least BG_SETTLE_DELAY after mount so background has settled,
    // then wait one extra frame so the canvas has actually painted
    const elapsed = Date.now() - mountTimeRef.current;
    const remaining = Math.max(0, BG_SETTLE_DELAY * 1000 - elapsed);
    setTimeout(() => {
      requestAnimationFrame(() => setShowRobot(true));
    }, remaining);
  }, []);

  // Mark intro as done after all elements have faded in
  useEffect(() => {
    const timer = setTimeout(
      () => setIntroDone(true),
      (BG_SETTLE_DELAY + 1.2) * 1000,
    );
    return () => clearTimeout(timer);
  }, []);

  // Only start cycling bottom text after intro is complete
  useEffect(() => {
    if (!introDone) return;
    const interval = setInterval(() => {
      setCurrentTextIndex(prevIndex => (prevIndex + 1) % bottomTexts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [introDone]);

  return (
    <div className="hero-section">
      <motion.div
        style={{ marginTop: '48px' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: showRobot ? 1 : 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Suspense fallback={null}>
          <CanvasComponent onReady={handleRobotReady} />
        </Suspense>
      </motion.div>
      <div className="heading-section">
        <motion.div
          className="heading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: BG_SETTLE_DELAY,
            duration: 0.6,
            ease: 'easeOut',
          }}
          data-color-inverted={'true'}
        >
          <ScrambleText
            style={{
              fontSize: isMobile ? '32px' : '64px',
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              color: 'var(--primary-orange)',
            }}
            texts={roles}
            speed={100}
            pauseDuration={2000}
          />
        </motion.div>
        <motion.p
          className="desc"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: BG_SETTLE_DELAY + 0.2,
            duration: 0.6,
            ease: 'easeOut',
          }}
        >
          Ibrahim is a DevOps Engineer with 2 years of experience at TCS,
          specializing in fast CI/CD pipelines, multicloud infrastructure
          automation, and embedding security directly into developer
          workflows.
        </motion.p>
        <motion.div
          className="btn-flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: BG_SETTLE_DELAY + 0.5,
            duration: 0.4,
            ease: 'easeOut',
          }}
        >
          <CommonButton
            text="Connect"
            Icon={<FiLink className="icon-link" />}
            iconPosition="right"
            href="https://www.linkedin.com/in/ibrahim-naseef"
            target="_blank"
            rel="noopener noreferrer"
          />
          <CommonButton
            text="Download Resume"
            variant="outline"
            Icon={<FiDownload className="icon-arrow" />}
            iconPosition="right"
            onClick={() => {
              const link = document.createElement('a');
              link.href = '/Ibrahim_Naseef_Resume.pdf';
              link.download = 'Ibrahim_Naseef_Resume.pdf';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          />
        </motion.div>
        <motion.p
          key={currentTextIndex}
          className="bottom-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={
            introDone
              ? { duration: 0.5 }
              : { delay: BG_SETTLE_DELAY + 0.7, duration: 0.6, ease: 'easeOut' }
          }
          dangerouslySetInnerHTML={{ __html: bottomTexts[currentTextIndex] }}
        />
      </div>
    </div>
  );
}

export default Hero;
