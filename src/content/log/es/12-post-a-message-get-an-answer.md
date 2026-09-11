---
numero: 12
sha: "5832df4"
fecha: "2026-06-03"
titulo: "Publica un mensaje, recibe una respuesta"
tipo: shipped
modulos: ["cauce-api", "cauce-orchestration"]
capitulo: public-loop
lang: es
limite: "La respuesta aceptada omitía el id de invocación, así que un cliente no podía preguntar qué había pasado. Corregido en la unidad 22."
---

Un endpoint resuelve o abre la conversación, anexa el mensaje y encola el trabajo en una sola transacción, a prueba de carreras bajo un índice único parcial. La respuesta llega de forma asíncrona.
