---
numero: 6
sha: "73c1b3f"
fecha: "2026-05-26"
titulo: "El trabajo sale del hilo de la petición"
tipo: shipped
modulos: ["cauce-orchestration"]
capitulo: engine
lang: es
limite: "La reclamación y el reap cruzan tenants y aún no funcionaban bajo un rol de mínimo privilegio. Resuelto en la unidad 9."
---

Una cola sobre la base de datos, ensamblado de contexto acotado por la ventana del modelo, un worker que reclama filas sin bloquear a sus vecinos, backoff en el reintento y un reaper para las reclamaciones cuyo worker murió. Todo lo que vino después se apoya en esto.
