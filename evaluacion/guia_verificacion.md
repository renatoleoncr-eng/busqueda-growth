# Sistema de Verificación de Postulantes (Criterio de Growth)
Este sistema aplica los principios de **GSD Verifier** para evaluar las propuestas de los candidatos para el puesto de Growth.

---

## 📊 Matriz de Calificación (Rubro: Criterio de Growth en Hotel de Piura)

Para evaluar una propuesta, califica cada una de las 3 partes en una escala de **0 a 5** basándote en los siguientes criterios de verificación:

### 1. Diagnóstico Rápido (Días 1-7)
*   **✓ VERIFICADO (4-5 pts):** Identifica cuellos de botella reales en el embudo comercial (ej. conversión en web, fugas en canal de reservas directo, falta de remarketing a ex-huéspedes, fricción en el WhatsApp actual).
*   **⚠️ WARNING (2-3 pts):** Diagnóstico genérico. Menciona "falta de publicidad" o "pocas redes" sin entrar al embudo de conversión ni entender la operación hotelera.
*   **🛑 BLOCKER / RED FLAG (0-1 pt):** Se enfoca en branding, estética visual de las publicaciones de Instagram, o en métricas de vanidad (likes, seguidores) en lugar de ventas directas.

### 2. Priorización e Impacto (Días 8-15)
*   **✓ VERIFICADO (4-5 pts):** Propone experimentos rápidos de bajo costo y alto retorno (quick wins) como configurar automatizaciones sencillas en WhatsApp, flujos de correo a base de datos de clientes antiguos, o campañas meta orientadas a conversión directa de reservas.
*   **⚠️ WARNING (2-3 pts):** Propuestas viables pero lentas (ej. "hacer un estudio de mercado durante un mes" o "reestructurar todo el SEO").
*   **🛑 BLOCKER / RED FLAG (0-1 pt):** Sugiere contratar software carísimo de inmediato, rehacer la web desde cero sin datos, o lanzar pauta masiva sin configurar primero la conversión ni el tracking de origen.

### 3. Plan 7 / 15 / 30 Días e Integración de Sistemas
*   **✓ VERIFICADO (4-5 pts):** Plan realista y ejecutable. Muestra lógica de cómo conectar sistemas (Ad -> Landing/WhatsApp -> Automatización -> CRM/Seguimiento) y define KPIs medibles para cada fase (ej. Costo por reserva, tasa de conversión en WhatsApp, etc.).
*   **⚠️ WARNING (2-3 pts):** Propone un plan pero es ambiguo en los detalles técnicos de cómo se ejecutan las automatizaciones y cómo se miden.
*   **🛑 BLOCKER / RED FLAG (0-1 pt):** Plan totalmente genérico sacado de ChatGPT o copiado de un libro de texto (ej. "Día 1: Analizar competidores; Día 15: Publicar posts; Día 30: Reportar"). Sin lógica de sistemas ni criterio propio.

---

## 🛠️ Cómo Iniciar la Verificación de un Candidato

Elige uno de los siguientes métodos para que empiece a evaluar las respuestas:

### Opción A: Pegar directamente en el chat
Pega la propuesta del candidato aquí indicando su nombre. Ejemplo:
```text
Candidato: Juan Pérez
Propuesta: [Pega el texto aquí]
```

### Opción B: Crear un archivo de propuesta en el proyecto
Guarda la propuesta del candidato en la carpeta `evaluacion/postulaciones/nombre_candidato.md` y pídeme que la evalúe.
Yo leeré el archivo, aplicaré el filtro de verificación de GSD Verifier y generaré un reporte `VERIFICATION_REPORT.md` con su puntaje final, fortalezas, alertas rojas detectadas y veredicto.
