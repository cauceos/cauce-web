---
numero: 17
sha: "9ad26b0"
fecha: "2026-07-03"
titulo: "El orquestador empieza a decir lo que hizo"
tipo: shipped
modulos: ["cauce-orchestration-events"]
capitulo: hardening
lang: es
limite: "Un evento se publica dentro de la transacción de ingesta, así que un consumidor que persista necesitará un hook after-commit o un outbox."
---

Un módulo hoja con un contrato sellado de ocho eventos, emitidos en cada paso del bucle. Nada los consume todavía: existen para que la auditoría pueda engancharse después sin reabrir el orquestador.
