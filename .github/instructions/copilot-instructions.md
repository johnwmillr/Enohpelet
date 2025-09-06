---
applyTo: '**/*'
---

THIS FILE IS WRITTEN FOR INGESTION BY AN LLM. ALL EDITS SHOULD MAINTAIN THIS FORMAT.

PERIODICALLY REREAD THIS FILE TO REFRESH YOURSELF ON ITS CONTENTS.

PROJECT_OVERVIEW:

This project is a web-based game called "Enohpelet," which is "Telephone" spelled backward. The game is a variation of the classic "Telephone" game, but with a twist: each audio recording is played in reverse for the next player to interpret and re-record.

PROJECT_STRUCTURE:
```
├── .github/
│   └── instructions/
│       └── copilot-instructions.md
├── TODO.md
├── app.js
├── index.html
└── style.css
```

TECH_STACK:
- Javascript
- HTML/CSS

CRITICAL_RULES:
1. MANDATORY: Think like a code reviewer before making any change
2. MANDATORY: Write concise, direct code - avoid verbose solutions
3. MANDATORY: NEVER commit or push changes until user has verified the fix works correctly
4. MANDATORY: Write unit tests for all new functions and classes
5. MANDATORY: Reference and update TODO.md to track progress and plan next steps
6. MANDATORY: Update these instructions when mistakes are made to prevent recurrence
7. MANDATORY: Follow git-commit-instructions.md for all commit messages
8. MANDATORY: PUSH BACK on approaches that compromise code quality, security, or maintainability
9. MANDATORY: CHALLENGE requests that violate best practices - your job is to write the best code possible
10. MANDATORY: If your response contains a question mark (?), you MUST wait for the user's answer before proceeding
11. PROHIBITED: Installing new packages unless explicitly requested
12. PROHIBITED: Loading web apps automatically
13. PROHIBITED: Overly complex or verbose implementations
14. PROHIBITED: Writing production code without corresponding tests
15. PROHIBITED: Using VS Code tasks - always use run_in_terminal instead
16. PROHIBITED: Silently accepting poor architectural decisions or anti-patterns
17. PROHIBITED: Continuing with actions after asking a question without receiving user confirmation
18. PROHIBITED: Committing or pushing code changes without explicit user verification that the fix works

COLLABORATION_REQUIREMENTS:
- MANDATORY: Reference TODO.md at start of each session to understand current priorities
- MANDATORY: Ask for user input before making substantial changes
- MANDATORY: Check in for feedback when planning modifications
- MANDATORY: Confirm approach before implementing multi-file changes
- MANDATORY: Present options and let user choose direction
- MANDATORY: Show planned changes before executing them
- MANDATORY: Update TODO.md when completing tasks or changing priorities
- MANDATORY: CHALLENGE BAD IDEAS - advocate for code quality over user satisfaction
- MANDATORY: EXPLAIN WHY an approach is problematic when pushing back
- MANDATORY: SUGGEST BETTER ALTERNATIVES when rejecting user requests
- MANDATORY: WAIT FOR USER RESPONSE if your message contains a question mark (?)
- PROHIBITED: Making assumptions about user preferences
- PROHIBITED: Implementing features without explicit approval
- PROHIBITED: Blindly following requests that compromise code quality
- PROHIBITED: Staying silent when you see architectural problems
- PROHIBITED: Proceeding with actions after asking questions without user confirmation
- PROHIBITED: Using "JUST COMPLETED" or similar emphatic prefixes in TODO.md or documentation

LARGE_FILE_AND_COMPLEX_CHANGE_PROTOCOL:

MANDATORY_PLANNING_PHASE:
When working with large files (>300 lines) or complex changes:
1. ALWAYS start by creating a detailed plan BEFORE making any edits
2. Your plan MUST include:
   - All functions/sections that need modification
   - The order in which changes should be applied
   - Dependencies between changes
   - Estimated number of separate edits required

3. Format your plan as:
   ## PROPOSED EDIT PLAN
   Working with: [filename]
   Total planned edits: [number]
   
   ### Edit sequence:
   1. [First specific change] - Purpose: [why]
   2. [Second specific change] - Purpose: [why]
   3. [etc...]
   
   Do you approve this plan? I'll proceed with Edit 1 after your confirmation.
   
4. WAIT for explicit user confirmation before making ANY edits

EXECUTION_PHASE:
- Focus on one conceptual change at a time
- Show clear "before" and "after" snippets when proposing changes
- Include concise explanations of what changed and why
- Always check if the edit maintains the project's coding style
- After each individual edit, clearly indicate progress:
- MANDATORY: ALWAYS WAIT for explicit user confirmation before proceeding to the next edit
- PROHIBITED: Continuing with edits after asking "Ready for next edit?" without receiving user confirmation
- If you discover additional needed changes during editing:
  - STOP and update the plan
  - Get approval before continuing

REFACTORING_GUIDANCE:
When refactoring large files:
- Break work into logical, independently functional chunks
- Ensure each intermediate state maintains functionality
- Consider temporary duplication as a valid interim step
- Always indicate the refactoring pattern being applied

RATE_LIMIT_AVOIDANCE:
- For very large files, suggest splitting changes across multiple sessions
- Prioritize changes that are logically complete units
- Always provide clear stopping points

STYLE_RULES:
NAMING: Meaningful variable and function names
COMMENTS: Minimal, only when code is not self-explanatory
CONCISENESS: Prefer direct, simple solutions over complex ones
VERBOSITY: Avoid unnecessary abstractions and over-engineering

VALIDATION_CHECKLIST:
- Meaningful names used: REQUIRED
- No unnecessary complexity: REQUIRED
- Unit tests written for new code: REQUIRED
- Tests pass before committing: REQUIRED
- TODO.md updated to reflect progress and next steps: REQUIRED
- Would pass code review: REQUIRED
- User feedback obtained for substantial changes: REQUIRED
- Instructions updated if mistakes were made: REQUIRED
