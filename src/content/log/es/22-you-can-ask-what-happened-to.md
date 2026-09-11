---
numero: 22
sha: "b97fd5f"
fecha: "2026-07-17"
titulo: "Puedes preguntar qué pasó con tu petición"
tipo: shipped
modulos: ["cauce-api", "cauce-orchestration"]
capitulo: operability
lang: es
limite: "Las invocaciones abandonadas por el reaper y los fallos de preparación ajenos al LLM no dejan mensaje en la conversación; su única señal visible es el estado de la invocación."
---

La respuesta aceptada devuelve un id de invocación, y un endpoint informa de su estado en vocabulario público desacoplado del ciclo de vida interno.
