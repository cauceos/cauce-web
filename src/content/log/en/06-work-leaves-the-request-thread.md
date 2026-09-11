---
numero: 6
sha: "73c1b3f"
fecha: "2026-05-26"
titulo: "Work leaves the request thread"
tipo: shipped
modulos: ["cauce-orchestration"]
capitulo: engine
lang: en
limite: "The claim and reap cross tenants and didn't yet work under a least-privilege role. Resolved in unit 9."
---

A queue on the database, context assembly bounded by the model's window, a worker that claims rows without blocking its neighbours, backoff on retry, and a reaper for claims whose worker died. Everything since stands on this.
