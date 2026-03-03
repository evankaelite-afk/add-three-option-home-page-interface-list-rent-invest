# Specification

## Summary
**Goal:** Update the HOME page to prominently present three primary actions—List, Rent, and Invest—and link each option to its existing route.

**Planned changes:**
- Update `frontend/src/pages/HomePage.tsx` to display a responsive, above-the-fold 3-option interface with exactly three labels: "List", "Rent", and "Invest".
- Wire the three options to navigate via TanStack Router: "List" → `/listing`, "Rent" → `/rent`, "Invest" → `/invest`, using existing `useNavigate` patterns.

**User-visible outcome:** Visitors to `/` will immediately see three clear options (List, Rent, Invest) and can tap/click any option to navigate to the corresponding existing page.
