---
description: Verify project content between old and new website
---

# Verify Portfolio Project

Compares content between the old website (reference) and the new website to ensure information is correctly migrated.

## Input Required

1. **Reference URL**: URL from the old website (e.g., `https://vdanilov.com/project-name/`)
2. **Project Slug**: The slug of the project on the new website (e.g., `coronary-insight`)

---

## Process

// turbo-all

### Step 1: Fetch Reference Content

1. Read the provided reference URL using `read_url_content`
2. Fetch all content chunks (positions 0-3 typically)
3. Extract and note:
   - Project title and description
   - Client info (name, location)
   - Tech stack
   - Resources (publications, datasets, code repositories)
   - Team members (names, roles, organizations, locations, links)
   - Highlights/STAR items
   - Content sections: Overview, Data, Methods, Results, Conclusion
   - Key metrics and numerical data

### Step 2: Read New Project Page

1. Read the project page from `app/portfolio/[slug]/page.jsx`
2. Extract: metadata, HIGHLIGHTS_ITEMS, TEAM_MEMBERS, RESOURCES, TECH_STACK, and all content sections

### Step 3: Compare Content

Compare the following aspects between old and new using a table format:

| Aspect           | Check                                               |
| ---------------- | --------------------------------------------------- |
| **Title**        | Same or improved (concise, memorable)?              |
| **Description**  | Core meaning preserved?                             |
| **Client**       | Same organization and location?                     |
| **Tech Stack**   | All technologies listed?                            |
| **Resources**    | All links/publications included?                    |
| **Team Members** | All members with correct roles/orgs/links?          |
| **Highlights**   | All 4 STAR items (Situation, Task, Action, Result)? |
| **Overview**     | Key context and significance included?              |
| **Data**         | Dataset specifications accurate?                    |
| **Methods**      | Technical approach fully preserved?                 |
| **Results**      | All metrics and findings accurate?                  |
| **Conclusion**   | Key takeaways and future work present?              |
| **Figures**      | Images with proper captions included?               |

### Step 4: Analyze Team Member Roles

For each team member, evaluate if their role title is appropriate based on:

1. **Research sphere**: Does the title match their field (medical, engineering, data science)?
2. **Professional links**: Check ResearchGate, Google Scholar, ORCID for their actual focus
3. **Domain conventions**:
   - Tech/Data Science: Use levels (Junior/Senior/Lead) ✅
   - Academia/Research: Use position titles (Researcher, Professor, Fellow) - no levels
   - Medicine/Surgery: Use specialty or position - **never use levels like Lead/Senior**

**Role appropriateness guidelines:**

| Domain       | ✅ Good Examples                                                                        | ❌ Avoid                            |
| ------------ | --------------------------------------------------------------------------------------- | ----------------------------------- |
| Medical      | Neurosurgeon, Cardiovascular Surgeon, Head of Neurosurgery, Interventional Cardiologist | Lead Neurosurgeon, Senior Surgeon   |
| Research     | Biophotonics Scientist, Research Scientist, Group Head                                  | Middle Researcher, Senior Scientist |
| Engineering  | Biomedical Engineer, ML Engineer                                                        | -                                   |
| Data Science | Lead Data Scientist, Senior Data Scientist                                              | -                                   |
| Academia     | Professor, Principal Investigator, Research Fellow                                      | Senior Professor                    |

**Medical role title rules:**

- **Never** use "Lead", "Senior", "Middle", "Junior" for surgeons/doctors
- Use **position titles** instead: "Head of Neurosurgery", "Department Chief", "Consultant"
- Use **specialty** without levels: "Neurosurgeon", "Interventional Cardiologist"
- If distinguishing seniority, use descriptive roles: "Attending Surgeon" vs "Resident"

If a role uses inappropriate levels (e.g., "Lead Neurosurgeon"), suggest the corrected title.

### Step 5: Output Verdict

Provide a structured verdict using this format:

```markdown
## Verification Verdict

### ✅ Matching Content

| Aspect     | Old Website | New Website | Status            |
| ---------- | ----------- | ----------- | ----------------- |
| **Title**  | [old]       | [new]       | ✅ Match/Improved |
| **Client** | [old]       | [new]       | ✅ Match          |
| ...        | ...         | ...         | ...               |

### ✅ Team Members Verification

| Name   | Old Role         | New Role         | Status            |
| ------ | ---------------- | ---------------- | ----------------- |
| [Name] | [old role @ org] | [new role @ org] | ✅ Match/Improved |

### 💡 Role Analysis (if applicable)

| Name   | Current Role | Background              | Suggested Role          | Rationale |
| ------ | ------------ | ----------------------- | ----------------------- | --------- |
| [Name] | [current]    | [based on links/sphere] | [suggestion or ✅ Keep] | [why]     |

### ⚠️ Minor Deviations (Acceptable)

1. [Deviation description] - [Why it's acceptable]

### ❌ Missing or Incorrect Content

- [List any critical issues, or "None identified"]

## Overall Status: ✅ PASS / ⚠️ NEEDS ATTENTION / ❌ FAIL

[Brief summary of verification result]
```

---

## Acceptance Criteria

### ✅ PASS

- All core information preserved
- Team members correctly listed with accurate roles
- All metrics and numerical data match exactly
- Resources properly linked
- Minor improvements (titles, wording) are acceptable

### ⚠️ NEEDS ATTENTION

- Some content missing but can be easily added
- Minor inaccuracies in non-critical fields
- Missing links that can be added

### ❌ FAIL

- Critical information missing
- Incorrect metrics or numerical data
- Team members incorrectly attributed or missing
- Wrong resources/publications linked

---

## Quick Reference

| Item              | Location                               |
| ----------------- | -------------------------------------- |
| **New pages**     | `app/portfolio/[slug]/page.jsx`        |
| **Slug format**   | lowercase, hyphenated                  |
| **Example slugs** | `coronary-insight`, `deep-brainwatch`  |
| **Old site URL**  | `https://vdanilov.com/[project-name]/` |
