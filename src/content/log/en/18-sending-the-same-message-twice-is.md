---
numero: 18
sha: "e50786e"
fecha: "2026-07-04"
titulo: "Sending the same message twice is safe"
tipo: shipped
modulos: ["cauce-api", "cauce-orchestration"]
capitulo: hardening
lang: en
limite: "No request-body fingerprinting and no retention purge."
---

An optional idempotency header: a repeat with the same key for the same agent returns the original ids and ingests nothing, held by an insert-first lock on a unique constraint.
