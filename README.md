```markdown
# Recycling Production Line Candidate Ranking System

A minimal full-stack application built for ranking candidates for a **recycling production line manager** role.  
It includes database design, mock AI evaluation, random candidate generation, and a clean React dashboard.

## Features
- MySQL database with tables for candidates, evaluations, and auto-updated rankings (trigger-based)
- 40 realistic candidate profiles generated using Faker.js
- Mock AI scoring for: Crisis Management, Sustainability Knowledge, Team Motivation
- React + Vite + Mantine UI dashboard showing:
  - Top 10 Leaderboard (sortable table)
  - Skill Heatmap (color-coded scores)
  - Detailed candidate cards with "Share" button (bonus)
- Simple Express backend API

## Tech Stack
- **Backend**: Node.js, Express, mysql2, @faker-js/faker
- **Frontend**: React (Vite), Mantine UI, Axios
- **Database**: MySQL
- **AI**: Mock random scores (as per assignment tip)

## Project Structure
```
Recycling Production Line/
├── backend/                # Node.js server & data generator
│   ├── server.js
│   ├── generateData.js
│   └── package.json
├── frontend/               # React + Vite dashboard
│   ├── src/
│   └── package.json
├── sql/                    # Database schema & sample data
│   ├── schema.sql
│   └── sample_data.sql     (optional export)
├── ai-prompts/             # AI evaluation prompts
│   └── ai_prompts.md
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v18+ recommended) → https://nodejs.org
- MySQL Server (installed and running) → set root password during install
- Git (already used for cloning)

### 1. Clone the repository
```bash
git clone https://github.com/MyUsername/is-recycling-product-line.git
cd is-recycling-product-line
```

### 2. Database Setup
Create the database and import the schema:

```bash
# In any terminal/command prompt
mysql -u root -p
```

Inside MySQL prompt:
```sql
CREATE DATABASE candidate_ranking;
EXIT;
```

Then import schema:
```bash
mysql -u root -p candidate_ranking < sql/schema.sql
```

(Enter your root password when prompted)

### 3. Generate Sample Data (40 candidates)
```bash
cd backend
npm install
node generateData.js
```

You should see: `40 candidates generated!`

### 4. Run Backend (API server)
Still in `backend` folder:
```bash
node server.js
```

→ Should print: `Server running on http://localhost:3000`

Keep this terminal open.

### 5. Run Frontend (Dashboard)
Open a **new** terminal/command prompt, go to frontend:
```bash
cd ..\frontend
npm install
npm run dev
```

→ Open the link shown (usually http://localhost:5173)

### 6. View the Dashboard
- http://localhost:5173  
  You should see the leaderboard, heatmap, and be able to click for candidate details.

**Note**: Make sure the backend is running — otherwise you'll see a connection error in the dashboard.

## AI Prompts
See `/ai-prompts/ai_prompts.md` for the three evaluation prompts used (Crisis Management, Sustainability, Team Motivation).

## Notes
- Mock AI used (random scores 0–100) as allowed in assignment tips.
- Rankings auto-update via MySQL trigger when evaluations are inserted.
- Tested on Windows with MySQL 8.0+.

Feel free to reach out if any setup step fails!

```

### How to update README.md **directly on github.com** (no local git commands needed)

1. Go to your repository in browser:  
   https://github.com/MyUsername/is-recycling-product-line

2. Click on the file list → find (or create) **README.md**  
   - If it already exists → click on **README.md**  
   - If it does **not** exist → click the **Add file** button (top-right) → **Create new file** → name it `README.md`

3. Click the **pencil icon** (Edit this file) — or if new file, just start typing.

4. **Delete** any old content (if present) and **paste** the full README content from above.

5. Scroll down to the bottom of the page.

6. In the **Commit changes** section:
   - Write a commit message, e.g.:  
     `Add detailed README with setup instructions`
   - (Optional) Add extended description:  
     `Includes prerequisites, step-by-step local setup, project structure, and notes`
   - Choose **Commit directly to the main branch**

7. Click green **Commit changes** button.

Done!  
Refresh the repo page — the README should now appear beautifully formatted at the bottom of your repository main page.

That completes the assignment requirements: repo with code + README + setup instructions.

Now you can proceed with the final submission reply (repo link, AI prompts file, screenshot/video).  
Good luck!
