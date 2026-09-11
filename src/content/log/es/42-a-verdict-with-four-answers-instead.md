---
numero: 42
sha: "18e2401"
fecha: "2026-09-11"
titulo: "Un veredicto con cuatro respuestas en lugar de dos"
tipo: breaking
modulos: ["cauce-governance", "cauce-api", "playground"]
capitulo: signatures
lang: es
limite: "La pantalla del playground todavía no consume los campos nuevos. Una verificación aterriza en la cadena un tick de drenado después, no en la respuesta que la produjo."
---

La verificación responde ahora `VALID`, `BROKEN`, `TRUNCATED` o `UNVERIFIABLE`, lleva un informe de firmas y se escribe a sí misma en la cadena que acaba de verificar. La truncación solo se afirma contra un ancla que aporta quien llama: una cadena no puede detectar su propia cola ausente.
