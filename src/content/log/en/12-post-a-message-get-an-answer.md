---
numero: 12
sha: "5832df4"
fecha: "2026-06-03"
titulo: "Post a message, get an answer"
tipo: shipped
modulos: ["cauce-api", "cauce-orchestration"]
capitulo: public-loop
lang: en
limite: "The accepted response dropped the invocation id, so a client couldn't ask what happened. Fixed in unit 22."
---

One endpoint resolves or opens the conversation, appends the message and queues the work in a single transaction, race-safe under a partial unique index. The reply arrives asynchronously.
