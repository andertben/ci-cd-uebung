// Vitest Setup-Datei für React Testing Library

// 1️⃣ Jest-DOM Matcher registrieren (toBeInTheDocument, toHaveAttribute, etc.)
import '@testing-library/jest-dom'

// 2️⃣ Optional: globals aktivieren (wenn nicht in vite.config.ts gesetzt)
// import { expect, vi } from 'vitest'
// global.expect = expect
// global.vi = vi

// 3️⃣ Optional: Weitere Test-Utilities oder Polyfills hier einfügen
// z.B. für Fetch Polyfill oder Enzyme-Setup falls benötigt
