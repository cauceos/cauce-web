---
numero: 16
sha: "a6f962d"
fecha: "2026-06-13"
titulo: "El bucle se cierra"
tipo: shipped
modulos: ["cauce-orchestration"]
capitulo: agent
lang: es
limite: "El timeout del reaper pasó a ser doce minutos planos en lugar de un heartbeat. Los esquemas de las herramientas no cuentan contra la ventana de contexto."
---

El orquestador ofrece herramientas, ejecuta las que pide el modelo, devuelve los resultados e invoca de nuevo, hasta diez rondas. Las llamadas al modelo corren sin retener una conexión a la base de datos.
