# Ciphy - Basic Encryption & Decryption Tool

Ciphy is a modern internship-level web app that demonstrates classical cryptography concepts using Caesar Cipher logic and ROT13 mode.

## Project Overview

This project helps learners understand:
- Encryption and decryption fundamentals
- Reversible transformation logic
- Character shifting techniques
- Frontend interactivity with real-time updates

It is intentionally lightweight and beginner-friendly while still polished for portfolio use.

## Features

- Encrypt plain text using Caesar Cipher
- Decrypt encrypted text back to original
- Toggle between:
  - Caesar Cipher (custom shift 1-25)
  - ROT13 (fixed shift 13)
- Real-time output updates
- Shift slider + number input sync
- Shift strength indicator (password-style meter)
- Character transformation preview
- Animated encryption flow indicator
- Typing animation for output fields
- Copy encrypted/decrypted output buttons
- Clear All reset button
- Cipher info tooltip
- Responsive, cybersecurity-inspired dark UI

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript (ES6)

## How Caesar Cipher Works

Caesar Cipher shifts each alphabet character by a fixed number (shift key).

Example with shift `3`:
- `A -> D`
- `H -> K`
- `x -> a`

Non-alphabet characters (spaces, punctuation, numbers) are preserved. Decryption applies the inverse shift to restore original text.

## Project Structure

```text
basic-encryption-decryption/
|-- index.html
|-- style.css
|-- script.js
|-- README.md
|-- assets/
|   `-- screenshots/
`-- favicon/
```

## Screenshots

Add project screenshots in:
- `assets/screenshots/`

Suggested screenshots:
- Main desktop UI
- Mobile responsive UI
- Caesar encryption example
- ROT13 mode example

## Installation

1. Clone or download this repository.
2. Navigate to the project folder.
3. Ensure these files exist:
   - `index.html`
   - `style.css`
   - `script.js`

## Run Locally

1. Open `index.html` in your browser.
2. Start typing in the Original Text area.
3. Adjust shift key or switch cipher mode.
4. Copy outputs or clear all as needed.

No backend, build tool, or dependencies required.

## Future Improvements

- Add Vigenere Cipher mode
- Add text file input/output support
- Add downloadable encrypted/decrypted results
- Add light/dark theme toggle
- Add unit tests for cipher functions
- Add multilingual character handling strategy

---

Built for cybersecurity fundamentals demonstration, internship submission, and GitHub/LinkedIn portfolio showcase.
