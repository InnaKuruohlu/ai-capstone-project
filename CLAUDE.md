# Project Conventions

This file provides context and conventions for AI assistant (Cursor) working in this repository.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- ESLint

Source lives in `src/`. Import alias: `@/*` maps to `src/*`.

## Code Conventions

- Keep code modular and readable.
- Use clear, descriptive naming for files, functions, and variables.
- Prefer small, single-purpose functions/components over large ones.
- App Router routes and layouts live in `src/app/`.
- Use the `@/*` import alias for files under `src/`.

## Commit Format

This project follows Conventional Commits (https://www.conventionalcommits.org/en/v1.0.0/):

- `feat:` — a new feature
- `fix:` — a bug fix
- `docs:` — documentation only changes
- `chore:` — maintenance tasks, config, tooling
- `refactor:` — code change that neither fixes a bug nor adds a feature

Example: `docs: update README with setup instructions`

## Notes for AI Assistants

- Ask before making large structural changes.
- Follow the commit format above when suggesting or creating commits.
- Keep documentation (README.md) up to date with any significant changes.

## Rules learned from Settings Form drill
 
- When building a form, list every field explicitly in the prompt such as name, type and required or optional options. If fields are not listed, the AI assistant may add extra fields that were never requested.

- Prompts for UI components must always mention styling requirements such as colors, theme and layout. If styling is not mentioned, output will be unstyled HTML even though if the rest of the prompt is precise.

- Dropdown/select options must be visible and readable in their default state, not only on hover. 