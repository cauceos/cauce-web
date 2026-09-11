---
numero: 27
sha: "7f09be7"
fecha: "2026-07-25"
titulo: "Cada entrada lleva la anterior"
tipo: shipped
modulos: ["cauce-governance", "cauce-memory"]
capitulo: chain
lang: es
limite: "La firma sigue reservada, y con ella el residuo documentado: un atacante con privilegios que recalcule toda la cadena y reescriba la cabeza no es detectable solo con el recálculo."
---

Una cadena de hashes por tenant, con una fila de cabeza como única fuente de secuencia. Altera una entrada antigua y todos los enlaces posteriores dejan de cuadrar; el verificador reporta la secuencia exacta en la que se rompe por primera vez.
