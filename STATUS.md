# AI PSYCH Explorer — Status

**Last updated**: 2026-04-16
**Status**: PRODUCTION-READY ✓
**Data integrity**: 126/126 verification checks PASSED

## Live
- URL: https://ai-psych-explorer.pages.dev/
- Password: `aipsych2026`
- GitHub: https://github.com/elad-refoua/ai-psych-explorer

## Build Pipeline
1. **R precompute**: `precompute_explorer.R` reads RDS data, outputs `explorer_data.json` (412 KB)
2. **HTML template**: `template.html` (~217k chars, 6 tabs, full JS stats engine)
3. **Inject**: `python inject_explorer.py` produces `public/index.html` (~625 KB self-contained)
4. **Deploy**: `npx wrangler pages deploy public --project-name ai-psych-explorer --branch main`

⚠ **CRITICAL**: Always deploy with `--branch main` (production). Default `--branch master` deploys to preview only — main URL stays cached on old version. Verify with `curl -sL URL | grep -c "new_keyword"`.

## 6 Tabs
1. Wave 1 Explorer (N=584) — overview cards, variable sidebar, mini-charts, AI-MH user experience
2. Wave 2 Explorer (N=379) — same plus war context + transition groups
3. Side-by-Side — paired t-tests + change-score histogram (only shared variables)
4. Advanced Analysis — Correlation, Regression (OLS/logistic), Mediation (Sobel + Bootstrap), Moderation; with 7 research question presets
5. Transition Groups — diverging change-score view across 4 groups
6. War Context — distribution of 6 W2 war items

## Key Features
- Wave provenance EVERYWHERE: `[W1]/[W2]` prefix on all variable names in all surfaces
- "Your Model" selection summary card with role + wave per variable
- "What you are testing" plain-language explanation
- Method explanation (collapsible) + "How to read these results" banner
- Narrative interpretations (template) + Gemini AI interpretation button
- Real visualizations: forest plot (regression), interaction plot (moderation), predicted probability curve (logistic), 4-path mediation diagram, correlation heatmap
- VIF column + warnings (regression)
- Hierarchical regression toggle (null + full models)
- Bootstrap 95% CI (mediation, alternative to Sobel)
- Standardized β (linear regression)
- Effective N display next to filters
- Filter presets: All / AI-MH Only / Non AI-MH / Exclude Discontinuers
- Compact multi-select dropdowns for variable picking (not chip grids)
- Export CSV per table, PNG per chart
- Back-to-overview button on every detail view
- Soft palette + larger border-radius
- Accessibility: aria-labels, keyboard nav, focus rings
- Mobile responsive (basic media query)

## Data Integrity Audit Reports
- `C:/temp/qa_a_report.md` — 77/77 PASS (RDS ↔ JSON fidelity)
- `C:/temp/qa_b_R_reference_values.txt` — 20 R-computed reference statistics
- `C:/temp/qa_b_report.md` — Statistical equivalence summary
- `C:/temp/qa_c_report.md` — 29/29 PASS (Cyberpsychology + HCB paper replications to 3 decimals)

## Cloudflare Secrets
- `GEMINI_API_KEY` — for AI interpretation endpoint
- `DASHBOARD_PASSWORD` — `aipsych2026`
- `SESSION_SECRET` — random hex

## Known Limitations
- Mobile layout is basic (works but desktop-first)
- Bootstrap CI for mediation is computed but display could be more prominent
- AI interpretation uses Gemini 2.0 Flash (free tier, English output)

## Update Workflow (for future edits)
1. Edit `template.html` for HTML/JS changes
2. Or edit `precompute_explorer.R` for data changes (then re-run R)
3. Run: `python inject_explorer.py`
4. Run: `npx wrangler pages deploy public --project-name ai-psych-explorer --branch main`
5. Verify: `curl -sL "https://ai-psych-explorer.pages.dev/?v=$(date +%s)" | grep -c "new_keyword"`
6. Commit + push to GitHub

## Critical Bug Fixes Applied (Session log)
1. `waves` field auto_unbox (R script) → use `I(waves)`
2. MHAI_why QSF numbering → iterate data columns, look up labels
3. Bar `min-width:2px` removed
4. Grouped bars now use shared cross-group max
5. `olsReg` `df_res<1` guard added
6. `tCDF` p-value bug fixed (betaCF non-convergence) → new `betaInc()` with symmetry
7. Cross-wave mediation/moderation/correlation now use `matched.link` properly
8. Variable pools widened (binary moderators, ordinal predictors)
9. Side-by-Side filtered to W1+W2 shared variables only
10. Wave labels everywhere — every variable in every surface tagged with `[W1]/[W2]`
11. Multi-select dropdowns replace chip grids (regression IVs, correlation)
12. Cloudflare `--branch main` deployment fix (was deploying to preview)

See also: `~/.claude/skills/dashboard-style/lessons.md` (17 lessons), `~/.claude/agents/dashboard-expert/memory/MEMORY.md` (agent memory).
