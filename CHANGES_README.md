# ✅ This project now builds and runs

I reconstructed the missing pieces so this is a working project again:
- `package.json`, `vite.config.ts`, `tsconfig.json`
- `src/styles/index.css` (recovered from the real compiled CSS that was
  still present in the old `assets/` build output — so styling matches
  the live site)
- `src/components/Terminal/Terminal.tsx` (was missing entirely; I rebuilt
  it as an xterm-based terminal with commands: `help`, `about`, `whoami`,
  `skills`, `projects`, `experience`, `certifications`, `education`,
  `contact`, `resume`, `clear`, `exit` — simpler than the original's "27
  commands + AI chat" mentioned in the site's SEO text, but fully working)
- `src/vite-env.d.ts` for image/CSS module types

**To run it locally:**
```bash
npm install
npm run dev       # dev server at http://localhost:5173
```

**To build for production:**
```bash
npm run build     # outputs to dist/
npm run preview   # serve the production build locally to check it
```

I verified both `npm install` and `npm run build` succeed, and smoke-tested
`npm run preview` — the page loads and the title bar correctly shows
"Ibrahim Naseef." Note: `node_modules`, `dist`, and lockfiles were stripped
from this zip to keep it small — running `npm install` will regenerate them.

---

# What was changed

This zip contains source-code edits based on your resume + instructions.
**Important: this zip cannot be built/run as-is** (see "Missing pieces" below).
You'll need to copy these changed/added files into your real project repo
(the one that has `package.json`, `vite.config`, and `src/styles/`).

## 1. Hero section (`src/components/Home/Hero.tsx`)
- "Connect" button now scrolls to the new Contact Me section (`#contact`)
  instead of opening LinkedIn directly.
- "See Work" replaced with "Download Resume" — downloads
  `Ibrahim_Naseef_Resume.pdf` (placed at the project root, next to
  `index.html`, alongside `favicon.ico`).
- Rotating headline words, bio paragraph, and bottom rotating captions
  rewritten with your details (TCS, certifications, Yenepoya Institute of
  Technology). Trimmed to 2 rotating captions per your request to cut down
  the "interests" text.

## 2. Skill icons (`src/components/Home/Skills.tsx` + `src/assets/skills/`)
Replaced the original 13 generic icons with the exact 12 tools from your
resume: Azure DevOps, Jenkins, Git, Python, Bash, MySQL, AWS, Terraform,
Docker, Kubernetes, SonarQube, Checkmarx. (Checkov and "Lint Scans" have no
distinct brand logo, so they're covered under the DevSecOps category card
in Find My Work instead.)

## 3. Find My Work (`src/components/Home/FindMyWork.tsx`, `src/constants/work.ts`)
Tabs changed from `Personal / Projects / Published / Terminal` to
`Projects / Certifications / Skills / Terminal`.
- **Projects**: your 2 resume projects (3-Tier Web App, Expense Tracker)
- **Certifications**: all 5 certs from item #6, with links where given
- **Skills**: 6 category cards mirroring your resume's skill groupings
- **Terminal**: untouched

New card artwork was generated (branded logo cards) since the original
project photos were placeholder files in this zip, not real images.

## 4. Interests trimmed
Hero's rotating bottom captions cut from 3 to 2, dropping the
hobby/interests line that didn't apply to you.

## 5. Contact Me section (`src/components/Home/ContactMe.tsx` + `.css`)
New section placed right after Work Experience, wired to **Web3Forms** so
form submissions email you directly — no backend needed.

**You must do one thing to activate it:**
1. Go to https://web3forms.com/, enter your email, and copy the Access Key
   it gives you (free, no account/login needed).
2. Open `src/components/Home/ContactMe.tsx` and replace:
   ```ts
   const WEB3FORMS_ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";
   ```
   with your real key.

That's it — every message submitted on the live site will land in your inbox.

## 6. Certifications (`src/constants/work.ts`)
Updated to the 5 certifications you listed, with links for the two that
had them.

## 7. Education & Experience
- New `Education.tsx` component (+ `.css`) added after Work Experience,
  listing B.E, PUC, and SSLC with institute/year/score, per your message.
- `WorkExperience.tsx` rewritten with your real TCS role (full bullet
  points from the resume), plus the TCS Python AI/ML stint, the ML
  internship at The Website Makers, and the YTI internship.

## Other cleanup
- `src/components/Navbar/Navbar.tsx`, `src/components/Shared/Footer.tsx`,
  and `index.html` (title/meta/JSON-LD/SEO fallback text) — all references
  to the previous developer's name, bio, employer history, and socials
  replaced with yours.
- **LinkedIn/GitHub URLs are placeholders** (`linkedin.com/in/ibrahim-naseef`,
  `github.com/ibrahimnaseef19`) since your resume only listed the labels,
  not the actual URLs. Search for `TODO` in `Navbar.tsx` and `Footer.tsx`
  and swap in your real profile links.

---

# Remaining TODOs for you

1. **Web3Forms key** — get a free access key at web3forms.com and paste it
   into `src/components/Home/ContactMe.tsx` (replacing
   `"YOUR_WEB3FORMS_ACCESS_KEY"`), so the Contact form actually emails you.
2. **Real LinkedIn/GitHub URLs** — placeholders are in `Navbar.tsx` and
   `Footer.tsx` (search for `TODO`). Your resume only listed the labels,
   not the actual links.
3. The Terminal is a simplified rebuild (see above) — not a big deal, but
   worth knowing it's not pixel-identical to the original's feature set.

---

# Current Content Editing Guide

The instructions above describe an earlier version of the project. The
following section matches the current source code.

## Add a Project

1. Put the project image in:
  `src/assets/work-tab/projects/`
2. Import the image at the top of `src/constants/work.ts`:
  ```ts
  import projectNew from "../assets/work-tab/projects/project-new.jpg";
  ```
3. Add an object inside the first array in `work`:
  ```ts
  {
    cardData: {
     title: "New Project",
     imgUrl: projectNew,
     url: {
      githubUrl: "https://github.com/username/repository",
     },
    },
    modalData: {
     title: "New Project",
     desc: "A complete description of the project.",
     infoHeading: "Technologies Used",
     infoArr: ["Docker", "AWS", "Python"],
    },
  }
  ```

The project card image opens the full detail window. Clicking the same card
again closes its detail window. The GitHub icon opens the repository.

## Add a Certification

1. Put the real badge image in:
  `src/assets/work-tab/certifications/`
2. Import it in `src/constants/work.ts`:
  ```ts
  import certNew from "../assets/work-tab/certifications/cert-new.jpg";
  ```
3. Add an object inside the Certifications array, which is the second array
  in `work`:
  ```ts
  {
    cardData: {
     title: "Certification Name",
     imgUrl: certNew,
     url: null,
    },
    modalData: {
     title: "Certification Name",
     desc: "Issued by the certification provider.",
     infoHeading: "Issuer",
     infoArr: ["AWS or Microsoft"],
    },
  }
  ```

Certifications use a three-column grid on desktop and one column on small
screens.

## Education

Education is the fourth tab in `FindMyWork.tsx` and its data is stored in the
third array in `src/constants/work.ts` only because the Skills tab is mapped
to the fourth array for compatibility with the existing data layout.

Education cards do not use certificate images. Use `details` instead:
```ts
cardData: {
  title: "B.E (Computer Science)",
  details: ["Yenepoya Institute of Technology", "2020 - 2024", "9 CGPA"],
  url: null,
}
```

The Education tab shows three cards in a row on desktop and one card per row
on mobile. The card detail window contains the longer description and score.

## Skills and Floating Icons

The animated floating icons are rendered by:
`src/components/Home/Skills.tsx` and `src/components/Home/SkillsCanvas.tsx`.

- `lightIcons` and `darkIcons` contain the images drawn on the canvas.
- `deskstopFinalPositions` and `mobileFinalPositions` control each icon's
  resting position.
- The positions are scaled to the viewport so icons remain on screen.
- Use local assets whenever possible. A failed image no longer cancels the
  complete preload batch, but local files avoid network 404s.

The regular Skills cards are separate data in the fourth array in
`src/constants/work.ts` and are displayed through the Skills tab.

## Navigation and Terminal

The navigation order is defined in `src/components/Navbar/Navbar.tsx`:
Projects, Certifications, Skills, Education, Terminal.

The Terminal implementation is in `src/components/Terminal/Terminal.tsx`.
Its current commands include:
`help`, `about`, `whoami`, `skills`, `projects`, `experience`, `contact`,
`resume`, `education`, `socials`, `ls`, `cd`, `cat`, `pwd`, `tree`, `neofetch`,
`sudo su`, `matrix`, `cowsay`, `fortune`, `theme`, `ascii`, `clear`,
`history`, `exit`, and `close`.

Terminal appearance and responsive sizing are in `src/styles/index.css`.
The desktop terminal can grow to 1280px, is centered in the page, and hides
the internal xterm scrollbar.

## Replace the 3D Robot

The current robot file is:
`assets/3d/cute_robot.glb`

It is loaded in `src/components/Canvas/CanvasComponent.jsx` with:
```js
useGLTF("/assets/3d/cute_robot.glb")
```

### Simple replacement

Replace `assets/3d/cute_robot.glb` with another GLB using the same filename.
This works only when the replacement model has the same node names and
material names used by the component:
`Object_4`, `Object_5`, `Object_6`, `Object_7`, `Object_8`, `Plastik`,
`Scratch_Metal`, `Darker_Metal`, `Layar`, and `Material.001`.

### Replacement with a different GLB structure

1. Put the new model in `assets/3d/`, for example `my-robot.glb`.
2. Change both model paths in `CanvasComponent.jsx`:
  ```js
  useGLTF("/assets/3d/my-robot.glb")
  useGLTF.preload("/assets/3d/my-robot.glb")
  ```
3. Inspect the new GLB with the Drei `useGLTF` result and update the mesh
  `nodes.*.geometry` and `materials.*` references in the `Model` component.
4. Keep the outer `<group ref={group}>` so the existing mouse and camera
  tracking continues rotating the replacement model.
5. Adjust the Canvas camera position or model scale if the new model is too
  large, too small, or outside the camera frame.

The other 3D assets are `assets/3d/ball.glb` and
`assets/3d/parts-assembling.glb`; they are used by separate canvas components
and should not be replaced unless those scenes are also being changed.

## Run and Build

```bash
npm install
npm run dev
npm run build
npm run preview
```

After adding or replacing an image/GLB, restart Vite if the browser keeps an
old asset in its cache. A hard refresh with `Ctrl+F5` also clears stale
development bundles.

