# 🏗️ Ancestry Detective: Full-Stack Architecture

**Goal:** A cinematic, "Scrollytelling" web experience for DNA analysis.
**Visual Reference:** "Apple Product Page" style / Parallax scrolling.
**Deployment:** Vercel (Frontend) + Cloud Run/Render (Backend).

---

## 📂 1. Project Directory Structure (Monorepo)
*We split the project into two distinct worlds.*

```text
ancestry-detective/
├── frontend/               # Next.js (React) App -> Deploy to Vercel
│   ├── components/
│   │   ├── Globe3D.jsx     # The Three.js interactive globe
│   │   └── ScrollSection.jsx # The framer-motion container
│   ├── pages/
│   │   └── index.js        # The main scrollytelling page
│   ├── public/             # Assets (images, fonts)
│   └── package.json
│
├── backend/                # FastAPI (Python) App -> Deploy to Render/Cloud Run
│   ├── app/
│   │   ├── main.py         # The API endpoints
│   │   └── ml_logic.py     # The scikit-allel/PCA code
│   ├── models/             # Saved .joblib models
│   ├── Dockerfile
│   └── requirements.txt
│
└── PITCH_DECK.md
```

---

## 🎨 2. The Frontend: "The Scroll Experience" (Next.js)

**Tech Stack:** Next.js, Tailwind CSS, Framer Motion, React Three Fiber.

### **The User Journey (Scroll-based)**

*   **Section 1: The Hook (Sticky)**
    *   **Visual:** A massive, dark Earth floating in the void.
    *   **Scroll Action:** As user scrolls down, the text "Where do you come from?" fades out, and the Earth slowly rotates to show Africa (the origin of humanity).
*   **Section 2: The Data (Parallax)**
    *   **Visual:** DNA helix strands floating in the background (blurred).
    *   **Foreground:** Cards explaining "1000 Genomes Project" slide up over the background.
*   **Section 3: The Interaction (The "Magic" Moment)**
    *   **Action:** The scroll "locks" (Sticky positioning).
    *   **UI:** A "Drop Zone" appears. User drops their file.
    *   **Animation:** The globe spins faster, particles fly out, and a **Gold Star** slams onto the map at their predicted location.
    *   **Result:** "You are 98% East Asian."

---

## 🧠 3. The Backend: "The Engine" (FastAPI)

**Tech Stack:** Python, FastAPI, Scikit-Learn, Scikit-Allel.

**The API Contract:**
We need exactly **ONE** main endpoint.

*   `POST /predict`
    *   **Input:** The raw VCF file (or a compressed snippet).
    *   **Process:**
        1.  Parse VCF to Numpy.
        2.  Project into PCA space (Transform).
        3.  Predict Class (Random Forest).
    *   **Output JSON:**
        ```json
        {
          "super_population": "EAS",
          "nearest_population": "Han Chinese",
          "coordinates": {"x": 12.5, "y": -4.2, "z": 8.1},
          "confidence": 0.98
        }
        ```

---

## 🛠️ 4. Build Plan (2-Week Sprint)

### **Week 1: The Python Brain & Basic React**
1.  **Backend:** Train the PCA model on your laptop. Save it. Write the `fastapi` wrapper.
2.  **Frontend:** Initialize Next.js. Install `framer-motion` and `three`. Get a basic sphere rendering on the screen.

### **Week 2: The Glue & The Glamour**
1.  **Integration:** Connect the React "Upload" button to the Python API.
2.  **Animation:** Spend 3 days tweaking the scroll triggers. This is where the "feel" comes from.
3.  **Deploy:** Push Frontend to Vercel (Free), Backend to Render (Free tier).

---

## 💡 Quick Start Commands

**1. Setup Frontend:**
```bash
npx create-next-app@latest frontend
cd frontend
npm install framer-motion three @react-three/fiber @react-three/drei
```

**2. Setup Backend:**
```bash
mkdir backend
cd backend
touch main.py requirements.txt Dockerfile
```