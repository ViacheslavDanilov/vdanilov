---
description: Verify project content between old and new website
---

# Verify Portfolio Project

Compares content between the old website (reference) and the new website to ensure information is correctly migrated.

## Input Required

1. **Reference URL**: URL from the old website (e.g., `https://old-website.com/portfolio/project-name`)
2. **Project Slug**: The slug of the project on the new website (e.g., `coronary-insight`)

---

## Process

// turbo-all

### Step 1: Fetch Reference Content

1. Read the provided reference URL using `read_url_content`
2. Extract and note:
   - Project title
   - Description/overview
   - Key sections and their content
   - Team members (names, roles, organizations)
   - Technical details (methods, data, results)
   - Resources (publications, datasets, code repositories)
   - Highlights/key achievements

### Step 2: Read New Project Page

1. Read the project page from `app/portfolio/[slug]/page.jsx`
2. Extract and note the same information categories as Step 1

### Step 3: Compare Content

Compare the following aspects between old and new:

| Aspect           | Check                                  |
| ---------------- | -------------------------------------- |
| **Title**        | Same or improved?                      |
| **Description**  | Core meaning preserved?                |
| **Overview**     | Key context included?                  |
| **Team Members** | All members present with correct info? |
| **Highlights**   | Main achievements captured?            |
| **Data**         | Dataset info accurate?                 |
| **Methods**      | Technical approach preserved?          |
| **Results**      | Metrics and findings accurate?         |
| **Resources**    | All links/publications included?       |
| **Conclusion**   | Key takeaways present?                 |

### Step 4: Output Verdict

Provide a structured verdict:

```
## Verification Verdict

### ✅ Matching Content
- [List items that match or are improved]

### ⚠️ Minor Deviations (Acceptable)
- [List acceptable differences, e.g., improved wording, restructuring]

### ❌ Missing or Incorrect Content
- [List any critical issues that need fixing]

### Overall Status: [PASS / NEEDS ATTENTION / FAIL]
```

---

## Acceptance Criteria

A project **PASSES** verification if:

- All core information is preserved
- Team members are correctly listed
- Technical content (methods, results) is accurate
- Resources are properly linked
- Minor improvements or restructuring are acceptable

A project **NEEDS ATTENTION** if:

- Some content is missing but can be easily added
- Minor inaccuracies exist

A project **FAILS** if:

- Critical information is missing
- Incorrect data or metrics
- Team members incorrectly attributed

---

## Quick Reference

**New project pages location**: `app/portfolio/[slug]/page.jsx`

**Common slugs format**: lowercase, hyphenated (e.g., `coronary-insight`, `ai-dissects-arterial-risk`)
