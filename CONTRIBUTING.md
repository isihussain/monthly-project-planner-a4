# Contributing to Monthly Project & Calendar Planner (A4)

Thank you for your interest in improving this open-source template.

## Principles

1. **Zero External Dependencies:** Keep the core template pure HTML, CSS, and vanilla JavaScript. Do not add heavy frontend frameworks or build steps.
2. **Ink-Friendly Monochrome:** Avoid solid dark backgrounds, heavy gradients, or colored elements that waste printer ink or toner.
3. **Single-Page A4 Guarantee:** The layout must strictly fit on a single A4 sheet without page breaks or bottom overflow.

## How to Contribute

### 1. Adding a New Language

To add support for a new language (e.g., German, Spanish, French):

1. Open `index.html` and locate the `I18N` dictionary.
2. Add your language code (e.g., `de`, `es`, `fr`) with:
   - Month and day names (full and short)
   - Section titles, tags, and status labels
   - Realistic sample project data
3. Add a language button inside `.lang-switcher` in the toolbar.
4. Create a corresponding documentation file (e.g., `README.de.md`).
5. Submit a pull request.

### 2. Improving Print Styles

If you encounter alignment or margin issues on specific printers or operating systems:
- Test print behavior with `Ctrl + P` / `Cmd + P`.
- Keep `@page` margins balanced (8mm-9mm).
- Ensure `box-sizing: border-box` is respected across all grid containers.

## Submitting a Pull Request

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/new-language`).
3. Commit your changes (`git commit -m "Add German language support"`).
4. Push to your branch (`git push origin feature/new-language`).
5. Open a Pull Request on GitHub.
