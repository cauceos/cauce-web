---
numero: 17
sha: "9ad26b0"
fecha: "2026-07-03"
titulo: "The orchestrator starts saying what it did"
tipo: shipped
modulos: ["cauce-orchestration-events"]
capitulo: hardening
lang: en
limite: "One event publishes inside the ingest transaction, so a persisting consumer will need an after-commit hook or an outbox."
---

A leaf module with a sealed contract of eight events, emitted at every step of the loop. Nothing consumes them yet — they exist so that auditing can attach later without reopening the orchestrator.
