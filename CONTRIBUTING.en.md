# Contributing Guide

Thanks for your interest in contributing to Cvolt.

This is a simple, practical guide so you can contribute quickly.

## 1. Before you start

- Check open issues or create a new one to discuss larger changes.
- Keep PRs focused on a single improvement or fix.

## 2. Recommended workflow

1. Fork the repository.
2. Create a branch from `main`:

```bash
git checkout -b feat/change-name
```

3. Install dependencies:

```bash
npm install
```

4. Run the project:

```bash
npm run dev
```

5. Make sure it builds:

```bash
npm run build
```

6. Run lint when applicable:

```bash
npm run lint
```

7. Commit and open a Pull Request.

## 3. Minimum quality bar

- No TypeScript errors.
- Successful build.
- No regressions in mobile/desktop UX.
- Do not commit generated artifacts (`dist`, `dist-netlify`, `test-results`, etc.).

## 4. Suggested commit convention

Conventional Commits are recommended:

- `feat: ...` new feature
- `fix: ...` bug fix
- `docs: ...` documentation
- `refactor: ...` refactor without behavior change
- `chore: ...` maintenance

## 5. Pull Requests

Please include:

- Problem being solved.
- What changed.
- Screenshots/video for UI changes.
- Known risks or areas to review.

## 6. High-value contribution areas

- Accessibility improvements.
- Mobile UX refinements.
- i18n improvements (ES/EN).
- New templates or existing template quality upgrades.
- PDF export optimization.
- Documentation improvements.

## 7. Code of conduct

- Respectful and collaborative communication.
- Clear, constructive technical feedback.

Thanks for helping maintain a free open source project for the community.
