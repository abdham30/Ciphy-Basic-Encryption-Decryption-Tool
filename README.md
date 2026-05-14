# Ciphy - Basic Encryption & Decryption Tool

Ciphy is a modern web app that demonstrates classical cryptography concepts using Caesar Cipher logic and ROT13 mode.

## Project Overview

This project helped me  understand:
- Encryption and decryption fundamentals
- Reversible transformation logic
- Character shifting techniques
- Frontend interactivity with real-time updates

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
---

Built for cybersecurity fundamentals demonstration and internship submission.
