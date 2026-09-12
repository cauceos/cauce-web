---
numero: 24
sha: "047bdcd"
fecha: "2026-07-23"
titulo: "Clone it and watch an agent answer"
tipo: shipped
modulos: ["docker", "scripts"]
capitulo: operability
lang: en
limite: "The CI job only builds the image."
---

A compose profile that brings up the app and a local Ollama, pulls the model, creates a demo agent and sends the first tool-using message. The default model called the clock tool five times out of five.
