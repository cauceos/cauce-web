---
numero: 42
sha: "18e2401"
fecha: "2026-09-11"
titulo: "A verdict with four answers instead of two"
tipo: breaking
modulos: ["cauce-governance", "cauce-api", "playground"]
capitulo: signatures
lang: en
limite: "The playground screen doesn't consume the new fields yet. A verification lands in the chain one drain tick later, not in the response that produced it."
---

Verification now answers `VALID`, `BROKEN`, `TRUNCATED` or `UNVERIFIABLE`, carries a signature report, and writes itself into the chain it verified. Truncation is only claimed against an anchor the caller supplies — a chain cannot detect its own missing tail.
