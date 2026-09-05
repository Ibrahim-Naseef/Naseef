import { useEffect, useRef } from "react";
import { Terminal as XTerm } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";
import { useTerminalStore } from "../../store/terminalStore";
import { useThemeStore } from "../../store/themeStore";
import { useHackerModeStore } from "../../store/hackerModeStore";
import { registerTerminalInstance } from "../../services/terminalBridge";

interface TerminalProps {
  onClose: () => void;
  hideHeader?: boolean;
  transferBuffer?: string[];
  transferState?: { commandHistory: string[]; currentDirectory: string };
}

const RED = "\x1b[1;31m";
const GREEN = "\x1b[1;32m";
const YELLOW = "\x1b[1;33m";
const CYAN = "\x1b[1;36m";
const RESET = "\x1b[0m";

// ---------------------------------------------------------------------------
// Fake filesystem (used by ls / cd / cat / pwd / tree)
// ---------------------------------------------------------------------------
type FsFile = { type: "file"; content: string };
type FsDir = { type: "dir"; children: Record<string, FsNode> };
type FsNode = FsFile | FsDir;

const ABOUT_TXT =
  "Ibrahim Naseef - DevOps Engineer\r\n" +
  "2 years of experience at Tata Consultancy Services (TCS).\r\n" +
  "Specializes in CI/CD pipelines, multicloud automation, and DevSecOps.";

const SKILLS_TXT = [
  "CI/CD & Version Control : Azure DevOps, Jenkins, Git",
  "Scripting & Databases   : Python, Bash, MySQL",
  "Cloud & IaC             : AWS, Terraform, AWS CDK",
  "AWS Cloud Services      : S3, Secrets Manager, Lambda, Glue",
  "Containers              : Docker, Docker Compose, Kubernetes",
  "DevSecOps               : SonarQube, Checkmarx, Checkov, Lint Scans",
].join("\r\n");

const EXPERIENCE_TXT = [
  "System Engineer, TCS               Aug 2024 - Present",
  "Python AI/ML Developer, TCS        Aug 2026 - Nov 2026",
  "ML Intern, The Website Makers      Dec 2023 - Mar 2024",
  "Intern, YTI                        Aug 2023 - Sep 2023",
].join("\r\n");

const EDUCATION_TXT = [
  "B.E (CSE)  Yenepoya Institute of Technology   2020-2024   8.93 CGPA",
  "PUC / +2   St Sebastian PU College            2018-2020   95%",
  "SSLC       H.S.M.E.M School                   2006-2018   88.32%",
].join("\r\n");

const CONTACT_TXT = [
  "Email    : Ibrahimnaseef19@gmail.com",
  "Phone    : +91 7892762058",
  "Location : Mangalore, Karnataka",
].join("\r\n");

const filesystem: FsDir = {
  type: "dir",
  children: {
    "about.txt": { type: "file", content: ABOUT_TXT },
    "skills.txt": { type: "file", content: SKILLS_TXT },
    "experience.txt": { type: "file", content: EXPERIENCE_TXT },
    "education.txt": { type: "file", content: EDUCATION_TXT },
    "contact.txt": { type: "file", content: CONTACT_TXT },
    "resume.pdf": {
      type: "file",
      content: "[binary file - run the 'resume' command to download it]",
    },
    projects: {
      type: "dir",
      children: {
        "3-tier-webapp.txt": {
          type: "file",
          content:
            "Multi-Container 3-Tier Web Application\r\nDocker + Docker Compose, custom bridge networks, persistent volumes.",
        },
        "expense-tracker.txt": {
          type: "file",
          content:
            "Full-Stack Expense Tracker Application\r\nMulti-stage Docker builds, Docker Compose orchestration.",
        },
      },
    },
    certifications: {
      type: "dir",
      children: {
        "aws-solutions-architect.txt": {
          type: "file",
          content: "AWS Certified Solutions Architect - Associate",
        },
        "aws-devops-professional.txt": {
          type: "file",
          content: "AWS Certified DevOps Engineer - Professional",
        },
        "azure-developer-associate.txt": {
          type: "file",
          content: "Microsoft Certified: Azure Developer Associate (AZ-204)",
        },
        "azure-fundamentals.txt": {
          type: "file",
          content: "Microsoft Certified: Azure Fundamentals (AZ-900)",
        },
        "github-agentic-ai.txt": {
          type: "file",
          content: "GitHub Certified: Agentic AI Developer",
        },
      },
    },
  },
};

function getNode(path: string[]): FsNode | null {
  let node: FsNode = filesystem;
  for (const part of path) {
    if (node.type !== "dir" || !node.children[part]) return null;
    node = node.children[part];
  }
  return node;
}

function printTree(node: FsNode, prefix = ""): string[] {
  if (node.type !== "dir") return [];
  const entries = Object.entries(node.children);
  const lines: string[] = [];
  entries.forEach(([name, child], i) => {
    const isLast = i === entries.length - 1;
    const connector = isLast ? "└── " : "├── ";
    const label = child.type === "dir" ? `${name}/` : name;
    lines.push(prefix + connector + label);
    if (child.type === "dir") {
      lines.push(...printTree(child, prefix + (isLast ? "    " : "│   ")));
    }
  });
  return lines;
}

const QUOTES = [
  '"It works on my machine." - every developer, at some point',
  '"Programs must be written for people to read, and only incidentally for machines to execute." - Harold Abelson',
  '"There are only two hard things in Computer Science: cache invalidation and naming things." - Phil Karlton',
  '"The best CI/CD pipeline is the one nobody notices because it never breaks."',
];

const ASCII_NAME = [
  " _____ ____  ____      _    _   _ ___ __  __ ",
  "|_ _/ __ )|  _ \\    / \\  | | | |_ _|  \\/  |",
  " | ||  _ \\| |_) |  / _ \\ | |_| || || |\\/| |",
  " | || |_) |  _ <  / ___ \\|  _  || || |  | |",
  "|___\\____/|_| \\_\\/_/   \\_\\_| |_|___|_|  |_|",
].join("\r\n");

function cowsay(message: string): string {
  const msg = message || "moo";
  const border = "-".repeat(msg.length + 2);
  return [
    ` ${border}`,
    `< ${msg} >`,
    ` ${border}`,
    "        \\   ^__^",
    "         \\  (oo)\\_______",
    "            (__)\\       )\\/\\",
    "                ||----w |",
    "                ||     ||",
  ].join("\r\n");
}

function Terminal({ onClose, hideHeader, transferBuffer, transferState }: TerminalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<XTerm | null>(null);
  const lineBufferRef = useRef<string>("");
  const pathRef = useRef<string[]>([]);
  const matrixIntervalRef = useRef<number | null>(null);

  const { commandHistory, historyIndex, addToHistory, setHistoryIndex, setDirectory } =
    useTerminalStore();
  const { toggleDarkMode } = useThemeStore();
  const { hackerMode, toggleHackerMode } = useHackerModeStore();

  const promptString = () => {
    const path = pathRef.current.length ? "~/" + pathRef.current.join("/") : "~";
    setDirectory(path);
    const color = hackerMode ? RED : YELLOW;
    return `\r\n${color}ibrahim${RESET}@${hackerMode ? RED + "root" + RESET : "portfolio"}:${
      hackerMode ? RED : "\x1b[1;34m"
    }${path}${RESET}$ `;
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const term = new XTerm({
      cursorBlink: true,
      fontSize: 14,
      fontFamily: "'JetBrains Mono', 'SFMono-Regular', Consolas, monospace",
      theme: { background: "#1e1e2e", foreground: "#cdd6f4", cursor: "#f5e0a0" },
      convertEol: true,
    });

    term.open(containerRef.current);
    termRef.current = term;
    registerTerminalInstance(term);

    if (transferState?.currentDirectory) {
      pathRef.current = transferState.currentDirectory
        .replace(/^~\/?/, "")
        .split("/")
        .filter(Boolean);
    }

    if (transferBuffer && transferBuffer.length > 0) {
      transferBuffer.forEach(line => term.writeln(line));
    } else {
      term.writeln(`${GREEN}Portfolio OS v1.0 [Ibrahim Naseef Edition]${RESET}`);
      term.writeln("Loading modules... done.");
      term.writeln("Initializing file system... done.");
      term.writeln('\r\nType "help" to see available commands.');
    }
    term.write(promptString());

    const stopMatrix = () => {
      if (matrixIntervalRef.current) {
        window.clearInterval(matrixIntervalRef.current);
        matrixIntervalRef.current = null;
      }
    };

    const runCommand = (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed) {
        term.write(promptString());
        return;
      }

      addToHistory(trimmed);

      const [cmd, ...args] = trimmed.split(/\s+/);
      const arg = args.join(" ");

      switch (cmd) {
        case "help": {
          term.writeln(
            "\r\n" +
              [
                `${CYAN}Portfolio:${RESET}`,
                "  about           Display bio and about info",
                "  skills          List technical skills",
                "  experience      Show work experience",
                "  projects        List projects",
                "  contact         Show contact info",
                "  resume          Download resume",
                "  education       Show education details",
                "  socials         Show social links",
                "  whoami          Who are you?",
                "",
                `${CYAN}File System:${RESET}`,
                "  ls              List directory contents",
                "  cd <dir>        Change directory",
                "  cat <file>      Read a file",
                "  pwd             Print working directory",
                "  tree            Show directory tree",
                "",
                `${CYAN}Fun:${RESET}`,
                "  neofetch        System info",
                "  sudo su         Run with superuser privileges",
                "  matrix          Enter the Matrix",
                "  cowsay <msg>    ASCII cow says your message",
                "  fortune         Random programming quote",
                "  theme           Toggle theme (dark/light)",
                "  ascii           ASCII art of name",
                "",
                `${CYAN}Utility:${RESET}`,
                "  help            Show available commands",
                "  clear           Clear terminal",
                "  history         Show command history",
              ].join("\r\n")
          );
          break;
        }

        case "about":
          term.writeln("\r\n" + ABOUT_TXT);
          break;

        case "whoami":
          term.writeln(
            `\r\nibrahim - DevOps Engineer @ Tata Consultancy Services (TCS)`
          );
          break;

        case "skills":
          term.writeln("\r\n" + SKILLS_TXT);
          break;

        case "experience":
          term.writeln("\r\n" + EXPERIENCE_TXT);
          break;

        case "education":
          term.writeln("\r\n" + EDUCATION_TXT);
          break;

        case "contact":
          term.writeln("\r\n" + CONTACT_TXT);
          break;

        case "socials":
          term.writeln(
            "\r\n" +
              [
                "LinkedIn : https://linkedin.com/in/ibrahim-naseef",
                "GitHub   : https://github.com/ibrahim-naseef",
                "Email    : Ibrahimnaseef19@gmail.com",
              ].join("\r\n")
          );
          break;

        case "projects":
          term.writeln(
            "\r\n" +
              [
                "1. Multi-Container 3-Tier Web Application (Docker, Docker Compose)",
                "2. Full-Stack Expense Tracker Application (Docker Compose)",
              ].join("\r\n")
          );
          break;

        case "resume": {
          term.writeln("\r\nDownloading resume...");
          const link = document.createElement("a");
          link.href = "/Ibrahim_Naseef_Resume.pdf";
          link.download = "Ibrahim_Naseef_Resume.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          break;
        }

        // --- filesystem commands ---
        case "ls": {
          const node = getNode(pathRef.current);
          if (!node || node.type !== "dir") {
            term.writeln("\r\nls: not a directory");
          } else {
            const names = Object.entries(node.children).map(([name, child]) =>
              child.type === "dir" ? `${CYAN}${name}/${RESET}` : name
            );
            term.writeln("\r\n" + names.join("   "));
          }
          break;
        }

        case "pwd":
          term.writeln(
            "\r\n" + (pathRef.current.length ? "~/" + pathRef.current.join("/") : "~")
          );
          break;

        case "cd": {
          if (!arg || arg === "~") {
            pathRef.current = [];
          } else if (arg === "..") {
            pathRef.current = pathRef.current.slice(0, -1);
          } else {
            const target = getNode([...pathRef.current, arg]);
            if (target && target.type === "dir") {
              pathRef.current = [...pathRef.current, arg];
            } else {
              term.writeln(`\r\ncd: no such directory: ${arg}`);
            }
          }
          break;
        }

        case "cat": {
          if (!arg) {
            term.writeln("\r\ncat: missing file operand");
          } else {
            const target = getNode([...pathRef.current, arg]);
            if (target && target.type === "file") {
              term.writeln("\r\n" + target.content);
            } else {
              term.writeln(`\r\ncat: ${arg}: No such file`);
            }
          }
          break;
        }

        case "tree": {
          const node = getNode(pathRef.current) ?? filesystem;
          term.writeln("\r\n.");
          printTree(node).forEach(line => term.writeln(line));
          break;
        }

        // --- fun commands ---
        case "neofetch":
          term.writeln(
            "\r\n" +
              [
                `${GREEN}ibrahim@portfolio${RESET}`,
                "-----------------",
                "OS        : Portfolio OS v1.0",
                "Host      : Tata Consultancy Services (TCS)",
                "Role      : DevOps Engineer",
                "Stack     : Azure DevOps, Jenkins, AWS, Terraform, Docker, Kubernetes",
                "Certs     : 5 (AWS x2, Azure x2, GitHub x1)",
                "Education : B.E CSE, Yenepoya Institute of Technology (2024)",
              ].join("\r\n")
          );
          break;

        case "sudo": {
          if (args[0] === "su") {
            const activating = !hackerMode;
            toggleHackerMode();
            if (activating) {
              term.writeln(`\r\n${RED}[sudo] password for ibrahim: ********${RESET}`);
              term.writeln(`${RED}Access granted. Escalating privileges...${RESET}`);
              term.writeln(`${RED}Root shell active. Site integrity: COMPROMISED.${RESET}`);
              term.writeln(`${RED}Type 'sudo su' again to restore normal access.${RESET}`);
            } else {
              term.writeln(`\r\n${GREEN}Exiting root shell. Restoring normal parameters...${RESET}`);
            }
          } else {
            term.writeln(
              `\r\n${RED}Nice try. This incident will be reported.${RESET}\r\n(hint: try 'sudo su')`
            );
          }
          break;
        }

        case "matrix": {
          term.writeln("\r\nEntering the Matrix... press any key to stop.");
          const chars = "アイウエオカキクケコサシスセソ0123456789";
          let ticks = 0;
          matrixIntervalRef.current = window.setInterval(() => {
            let line = "";
            for (let i = 0; i < 60; i++) {
              line += chars[Math.floor(Math.random() * chars.length)];
            }
            term.writeln(`${GREEN}${line}${RESET}`);
            ticks += 1;
            if (ticks > 25) stopMatrix();
          }, 60);
          return; // don't reprint prompt yet, matrix owns output for a moment
        }

        case "cowsay":
          term.writeln("\r\n" + cowsay(arg));
          break;

        case "fortune":
          term.writeln("\r\n" + QUOTES[Math.floor(Math.random() * QUOTES.length)]);
          break;

        case "theme":
          toggleDarkMode();
          term.writeln("\r\nTheme toggled.");
          break;

        case "ascii":
          term.writeln("\r\n" + `${CYAN}${ASCII_NAME}${RESET}`);
          break;

        case "history":
          term.writeln("\r\n" + commandHistory.join("\r\n"));
          break;

        case "clear":
          term.clear();
          break;

        case "exit":
        case "close":
          onClose();
          return;

        default:
          term.writeln(`\r\ncommand not found: ${cmd} (type 'help' for a list of commands)`);
      }

      term.write(promptString());
    };

    const disposable = term.onData(data => {
      // any key stops the matrix animation
      if (matrixIntervalRef.current) {
        stopMatrix();
        term.write(promptString());
        return;
      }

      const code = data.charCodeAt(0);

      if (code === 13) {
        const cmd = lineBufferRef.current;
        lineBufferRef.current = "";
        runCommand(cmd);
        return;
      }

      if (code === 127) {
        if (lineBufferRef.current.length > 0) {
          lineBufferRef.current = lineBufferRef.current.slice(0, -1);
          term.write("\b \b");
        }
        return;
      }

      if (data === "\x1b[A") {
        if (commandHistory.length === 0) return;
        const newIndex =
          historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        const histCmd = commandHistory[newIndex] ?? "";
        term.write("\r\x1b[K" + promptString().replace(/^\r\n/, "") + histCmd);
        lineBufferRef.current = histCmd;
        return;
      }
      if (data === "\x1b[B") {
        if (historyIndex === -1) return;
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          term.write("\r\x1b[K" + promptString().replace(/^\r\n/, ""));
          lineBufferRef.current = "";
        } else {
          setHistoryIndex(newIndex);
          const histCmd = commandHistory[newIndex] ?? "";
          term.write("\r\x1b[K" + promptString().replace(/^\r\n/, "") + histCmd);
          lineBufferRef.current = histCmd;
        }
        return;
      }

      if (code >= 32) {
        lineBufferRef.current += data;
        term.write(data);
      }
    });

    return () => {
      stopMatrix();
      disposable.dispose();
      registerTerminalInstance(null);
      term.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="terminal-window terminal-wrapper">
      {!hideHeader && (
        <div className="terminal-header">
          <div className="terminal-controls" aria-hidden="true">
            <span className="terminal-control terminal-control--close" />
            <span className="terminal-control terminal-control--minimize" />
            <span className="terminal-control terminal-control--maximize" />
          </div>
          <span className="terminal-title">
            ibrahim@portfolio:{transferState?.currentDirectory ?? "~"}
          </span>
        </div>
      )}
      <div className="terminal-body">
        <div ref={containerRef} className="xterm-container" />
      </div>
    </div>
  );
}

export default Terminal;