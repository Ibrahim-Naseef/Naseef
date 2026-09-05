// Tab 0: Projects — from resume "Projects" section
import project3Tier from "../assets/work-tab/projects/Docker-3-tier-app.png";
import projectExpenseTracker from "../assets/work-tab/projects/Expense-tracker-docker.png";
import projectDentalAnalysis from "../assets/work-tab/projects/Morphological-dental-image.jpeg";
import projectCodeSeek from "../assets/work-tab/projects/Python-code-seeker.jpeg";
import projectVehicleDetection from "../assets/work-tab/projects/vehicle-number-plate-detection.png";
import educationBe from "../assets/work-tab/education/education_1_be_cse_3d.png";
import educationPuc from "../assets/work-tab/education/education_2_puc_3d.png";
import educationSslc from "../assets/work-tab/education/education_3_sslc_3d.png";

// Tab 1: Certifications — from resume "Certifications" section
import certAwsDevopsPro from "../assets/work-tab/certifications/cert-aws-devops-pro.jpg";
import certAwsSa from "../assets/work-tab/certifications/cert-aws-sa.jpg";
import certAz204 from "../assets/work-tab/certifications/cert-az-204.jpg";
import certAz900 from "../assets/work-tab/certifications/cert-az-900.jpg";
import certGithubAgentic from "../assets/work-tab/certifications/cert-github-agentic.jpg";

// Tab 2: Skills — from resume "Technical Skills" section
import skillAwsServices from "../assets/work-tab/skills-tab/skill-aws-services.jpg";
import skillCicd from "../assets/work-tab/skills-tab/skill-cicd.jpg";
import skillCloud from "../assets/work-tab/skills-tab/skill-cloud.jpg";
import skillContainers from "../assets/work-tab/skills-tab/skill-containers.jpg";
import skillDevSecOps from "../assets/work-tab/skills-tab/skill-devsecops.jpg";
import skillScripting from "../assets/work-tab/skills-tab/skill-scripting.jpg";

export const work = [
  // --- Projects ---
  [
    {
      cardData: {
        title: "Multi-Container 3-Tier Web Application",
        imgUrl: project3Tier,
        url: { githubUrl: "https://github.com/Ibrahim-Naseef/Docker-3-Tier-App" },
      },
      modalData: {
        title: "Multi-Container 3-Tier Web Application",
        desc: "Engineered a containerized microservices architecture using Docker and Docker Compose, orchestrating isolated frontend, backend, and database services. Configured custom bridge networks, environment variable injection, and persistent volume mounts to ensure data durability and parity across development and staging environments.",
        infoHeading: "Technologies Used",
        infoArr: ["Docker", "Docker Compose", "Custom Bridge Networks"],
      },
    },
    {
      cardData: {
        title: "Full-Stack Expense Tracker Application",
        imgUrl: projectExpenseTracker,
        url: { githubUrl: "https://github.com/Ibrahim-Naseef/Expense-Tracker-App-Docker" },
      },
      modalData: {
        title: "Full-Stack Expense Tracker Application",
        desc: "Containerized a full-stack financial tracking application using multi-stage Dockerfiles to optimize image sizes and reduce deployment overhead. Orchestrated multi-container lifecycle and service dependencies via Docker Compose, creating an automated, reproducible environment for rapid local testing.",
        infoHeading: "Technologies Used",
        infoArr: ["Docker", "Docker Compose", "Multi-stage Builds"],
      },
    },
    {
      cardData: {
        title: "Morphological Analysis of Dental X-Ray Images",
        imgUrl: projectDentalAnalysis,
        url: {
          githubUrl:
            "https://github.com/Ibrahim-Naseef/Morphological-Analysis-of-Dental-X-Ray-Images-Using-Deep-Learning",
        },
      },
      modalData: {
        title: "Morphological Analysis of Dental X-Ray Images",
        desc: "A deep-learning system using YOLOv8 tooth detection and instance segmentation to analyze dental X-ray images and extract morphological features. The project is under patent process, so its code, dataset, and model files are not publicly shared.",
        infoHeading: "Technologies Used",
        infoArr: ["YOLOv8", "Python", "Django", "MySQL", "Roboflow"],
      },
    },
    {
      cardData: {
        title: "CodeSeek: Python Error Explorer",
        imgUrl: projectCodeSeek,
        url: {
          githubUrl:
            "https://github.com/Ibrahim-Naseef/CodeSeek-Python-Error-Explorer",
        },
      },
      modalData: {
        title: "CodeSeek: Python Error Explorer",
        desc: "A Streamlit debugging tool that executes uploaded Python files, captures errors, detects input prompts, and retrieves relevant Stack Overflow solutions through the Stack Exchange API.",
        infoHeading: "Technologies Used",
        infoArr: ["Python", "Streamlit", "Requests", "Subprocess", "Stack Exchange API"],
      },
    },
    {
      cardData: {
        title: "Vehicle Number Plate Detection",
        imgUrl: projectVehicleDetection,
        url: {
          githubUrl:
            "https://github.com/Ibrahim-Naseef/Vehicle-NumberPlate-Detection-YOLOV8",
        },
      },
      modalData: {
        title: "Vehicle Number Plate Detection",
        desc: "A YOLOv8-based vehicle number-plate detection system with a Streamlit interface for uploading images and running trained-model predictions.",
        infoHeading: "Technologies Used",
        infoArr: ["YOLOv8", "Python", "Streamlit", "OpenCV", "NumPy", "Ultralytics"],
      },
    },
  ],

  // --- Certifications ---
  [
    {
      cardData: {
        title: "AWS Certified DevOps Engineer – Professional",
        imgUrl: certAwsDevopsPro,
        url: null,
      },
      modalData: {
        title: "AWS Certified DevOps Engineer – Professional",
        desc: "Amazon Web Services Training and Certification.",
        infoHeading: "Issuer",
        infoArr: ["Amazon Web Services Training and Certification"],
      },
    },
    {
      cardData: {
        title: "AWS Certified Solutions Architect – Associate",
        imgUrl: certAwsSa,
        url: null,
      },
      modalData: {
        title: "AWS Certified Solutions Architect – Associate",
        desc: "Amazon Web Services Training and Certification.",
        infoHeading: "Issuer",
        infoArr: ["Amazon Web Services Training and Certification"],
      },
    },
    {
      cardData: {
        title: "Microsoft Certified: Azure Developer Associate (AZ-204)",
        imgUrl: certAz204,
        url: {
          githubUrl:
            "https://learn.microsoft.com/en-in/credentials/certifications/azure-developer/",
        },
      },
      modalData: {
        title: "Microsoft Certified: Azure Developer Associate (AZ-204)",
        desc: "Issued by Microsoft.",
        infoHeading: "Credential",
        infoArr: ["learn.microsoft.com/credentials/certifications/azure-developer"],
      },
    },
    {
      cardData: {
        title: "Microsoft Certified: Azure Fundamentals (AZ-900)",
        imgUrl: certAz900,
        url: null,
      },
      modalData: {
        title: "Microsoft Certified: Azure Fundamentals (AZ-900)",
        desc: "Issued by Microsoft.",
        infoHeading: "Issuer",
        infoArr: ["Microsoft"],
      },
    },
    {
      cardData: {
        title: "GitHub Certified: Agentic AI Developer",
        imgUrl: certGithubAgentic,
        url: {
          githubUrl:
            "https://learn.microsoft.com/en-in/credentials/certifications/agentic-ai-developer/",
        },
      },
      modalData: {
        title: "GitHub Certified: Agentic AI Developer",
        desc: "Issued by GitHub.",
        infoHeading: "Credential",
        infoArr: ["learn.microsoft.com/credentials/certifications/agentic-ai-developer"],
      },
    },
  ],

  // --- Education ---
  [
    {
      cardData: {
        title: "B.E (Computer Science)",
        imgUrl: educationBe,
        details: ["Yenepoya Institute of Technology", "2020 - 2024", "9 CGPA"],
        url: null,
      },
      modalData: {
        title: "B.E (Computer Science)",
        desc: "Yenepoya Institute of Technology, 2020 - 2024.",
        infoHeading: "Academic Record",
        infoArr: ["9 CGPA"],
      },
    },
    {
      cardData: {
        title: "PUC / +2",
        imgUrl: educationPuc,
        details: ["St Sebastian PU College", "2018 - 2020", "95%"],
        url: null,
      },
      modalData: {
        title: "PUC / +2",
        desc: "St Sebastian PU College, 2018 - 2020.",
        infoHeading: "Academic Record",
        infoArr: ["95%"],
      },
    },
    {
      cardData: {
        title: "SSLC",
        imgUrl: educationSslc,
        details: ["H.S.M.E.M School", "2006 - 2018", "88.32%"],
        url: null,
      },
      modalData: {
        title: "SSLC",
        desc: "H.S.M.E.M School, 2006 - 2018.",
        infoHeading: "Academic Record",
        infoArr: ["88.32%"],
      },
    },
  ],

  // --- Skills ---
  [
    {
      cardData: {
        title: "CI/CD & Version Control",
        imgUrl: skillCicd,
        url: null,
      },
      modalData: {
        title: "CI/CD & Version Control",
        desc: "Tools used to build, automate, and version-control delivery pipelines.",
        infoHeading: "Skills",
        infoArr: ["Azure DevOps", "Jenkins", "Git"],
      },
    },
    {
      cardData: {
        title: "Scripting & Databases",
        imgUrl: skillScripting,
        url: null,
      },
      modalData: {
        title: "Scripting & Databases",
        desc: "Languages and data stores used for automation and application support.",
        infoHeading: "Skills",
        infoArr: ["Python", "Linux Shell (Bash)", "MySQL"],
      },
    },
    {
      cardData: {
        title: "Cloud & IaC",
        imgUrl: skillCloud,
        url: null,
      },
      modalData: {
        title: "Cloud & IaC",
        desc: "Cloud platforms and infrastructure-as-code tooling.",
        infoHeading: "Skills",
        infoArr: ["AWS", "Terraform", "AWS CDK"],
      },
    },
    {
      cardData: {
        title: "AWS Cloud Services",
        imgUrl: skillAwsServices,
        url: null,
      },
      modalData: {
        title: "AWS Cloud Services",
        desc: "Managed AWS services used for automation and secure infrastructure delivery.",
        infoHeading: "Skills",
        infoArr: ["AWS S3", "AWS Secrets Manager", "AWS Lambda", "AWS Glue"],
      },
    },
    {
      cardData: {
        title: "Containers",
        imgUrl: skillContainers,
        url: null,
      },
      modalData: {
        title: "Containers",
        desc: "Containerization and orchestration tooling.",
        infoHeading: "Skills",
        infoArr: ["Docker", "Docker Compose", "Kubernetes"],
      },
    },
    {
      cardData: {
        title: "DevSecOps",
        imgUrl: skillDevSecOps,
        url: null,
      },
      modalData: {
        title: "DevSecOps",
        desc: "Code quality and security scanning embedded directly into CI pipelines.",
        infoHeading: "Skills",
        infoArr: ["SonarQube", "Checkmarx", "Checkov", "Lint Scans"],
      },
    },
  ],
];
