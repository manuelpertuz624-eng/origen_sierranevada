# Prompts de app basada en datos {#prompts-de-app-basada-en-datos}

# Resumen

Este documento consolida una serie de prompts estructurados para el desarrollo y lanzamiento de una aplicación basada en datos. Utilizando herramientas avanzadas de inteligencia artificial como NotebookLM y Gemini, la estrategia se divide en tres fases clave: investigación profunda, definición del producto y estrategia de difusión.

El flujo de trabajo propuesto comienza con NotebookLM Deepresearch para fundamentar la aplicación en estudios científicos, análisis de competidores y feedback de usuarios. Posteriormente, se utiliza un reporte detallado para guiar el diseño y prototipado. Finalmente, se emplea Gemini para simular un equipo multidisciplinario que analice el código del proyecto y desarrolle una estrategia integral de marketing, ventas y negocio, asegurando un lanzamiento sólido y escalable.

## Índice

[Prompts de app basada en datos](#prompts-de-app-basada-en-datos)

[NotebookLM Deepresearch](#notebooklm-deepresearch)

[NotebookLM Report](#notebooklm-report)

[Difusión en gemini](#difusión-en-gemini)

[INPUT](#input)

[OBJETIVO DE LA APLICACIÓN](#objetivo-de-la-aplicación)

[1\. Marketing Digital](#1.-marketing-digital)

[2\. Ventas](#2.-ventas)

[3\. Negocio](#3.-negocio)

[FUNCIONALIDADES DE LA APP](#funcionalidades-de-la-app)

[ANÁLISIS DEL ZIP](#análisis-del-zip)

[OUTPUT ESPERADO](#output-esperado)

[REGLAS](#reglas)

## 

[**🏫 Curso intensivo ampliado de IA con DTO Navidad**](https://academiartificial.com/curso-ia/)

## NotebookLM Deepresearch {#notebooklm-deepresearch}

Quiero realizar una investigación profunda para crear una aplicación totalmente funcional centrada en rutinas de ejercicio y seguimiento del mismo. Necesito que organices toda la información en torno a tres pilares:

1. **Estudios científicos aplicados al ejercicio y la adherencia a rutinas.**  
   Reúne investigaciones académicas y papers que expliquen qué factores aumentan la adherencia al entrenamiento, cómo se deben estructurar las rutinas para maximizar resultados, mantenerlo con constancia, como seguir avanzando y qué principios científicos son clave en apps de fitness.

2. **Análisis de apps de éxito en el sector fitness.**  
   Investiga aplicaciones actuales líderes en rutinas de ejercicio, identifica qué funcionalidades y enfoques han demostrado funcionar mejor y extrae los patrones que podríamos aprovechar para nuestra propia aplicación.

3. **Necesidades reales de los usuarios.**  
   Examina comentarios y discusiones en foros, reviews de usuarios y valoraciones en tiendas de apps sobre este tipo de aplicaciones. Identifica qué funcionalidades echan en falta, qué problemas encuentran y qué mejoras desean.

## NotebookLM Report {#notebooklm-report}

Según los estudios científicos, aprendizajes del éxito de apps y las necesidades de los usuarios, lista un conjunto de funcionalidades para que mi app llamada fitnavi se posicione como líder. Tu tarea es desarrollar un informe para un diseñador web que va a prototipar la app ideal basándose en las instrucciones de este reporte

# Difusión en gemini {#difusión-en-gemini}

Actúa como un **equipo completo senior** formado por:

* Product Manager  
* Growth & Digital Marketing Strategist  
* Sales & Business Strategist  
* UX/UI Designer  
* Full-Stack Developer  
* Data Analyst

Tu objetivo es **analizar un proyecto de aplicación que te entregaré en formato ZIP** y **construir una herramienta interactiva** que ayude a definir, evaluar y priorizar **estrategias de marketing digital y negocio**, orientadas a la toma de decisiones reales.

---

### **INPUT** {#input}

Te entregaré:

* Un ZIP con el proyecto de la app (estructura, código, assets y documentación si existe).  
* El contexto implícito del producto a partir del código y ficheros.

No asumas nada que no esté justificado por el proyecto. Si falta información crítica, propón hipótesis claras y explícitas.

---

### **OBJETIVO DE LA APLICACIÓN** {#objetivo-de-la-aplicación}

Crear una **herramienta estratégica interactiva** que permita:

#### **1\. Marketing Digital** {#1.-marketing-digital}

Analizar y proponer estrategias por canal:

* **Medios Propios**: web, blog, SEO, email, comunidad, contenidos, automatizaciones  
* **Medios Pagados**: Google Ads, Meta Ads, LinkedIn Ads, influencers pagados, afiliación  
* **Medios Ganados**: PR, partnerships, menciones, reviews, UGC, viralidad

Para cada canal:

* Objetivo estratégico  
* Casos de uso recomendados  
* Métricas clave (KPI)  
* Nivel de madurez del proyecto  
* Esfuerzo vs impacto  
* Prioridad sugerida

#### **2\. Ventas** {#2.-ventas}

* Propuesta de valor  
* Buyer persona  
* Funnel (TOFU–MOFU–BOFU)  
* Estrategias inbound y outbound  
* Automatización de ventas  
* Upsell, cross-sell y retención

#### **3\. Negocio** {#3.-negocio}

* Modelo de ingresos  
* Pricing y packaging  
* CAC, LTV, márgenes (estimados si no existen)  
* Escalabilidad  
* Riesgos y oportunidades  
* Palancas de crecimiento

---

### **FUNCIONALIDADES DE LA APP** {#funcionalidades-de-la-app}

La aplicación debe incluir:

* Panel visual tipo **dashboard**  
* Sistema de **recomendaciones dinámicas** basadas en:  
  * Tipo de producto  
  * Estado del proyecto  
  * Recursos detectados  
* Matriz **impacto / esfuerzo**  
* Checklist accionable por área  
* Roadmap estratégico a 30 / 60 / 90 días  
* Posibilidad de exportar:  
  * Resumen estratégico  
  * Roadmap  
  * Acciones prioritarias

---

### **ANÁLISIS DEL ZIP** {#análisis-del-zip}

1. Analiza la arquitectura del proyecto.  
2. Detecta:  
   * Tipo de producto  
   * Público objetivo  
   * Estado de desarrollo  
   * Stack tecnológico  
3. Identifica oportunidades de mejora o extensión del producto con esta herramienta.

---

### **OUTPUT ESPERADO** {#output-esperado}

Debes devolver:

1. **Estructura funcional de la app** (pantallas, flujos, lógica)  
2. **Componentes clave** (UI \+ lógica)  
3. **Esquema de datos** necesario  
4. **Lógica de recomendaciones**  
5. **Código o pseudocódigo** integrado con el proyecto existente  
6. Propuesta de **UX clara y orientada a negocio**  
7. Explicación de cómo escalar la herramienta en el futuro

---

### **REGLAS** {#reglas}

* Todo debe ser **accionable**, no teórico  
* Evita frases genéricas  
* Prioriza claridad, impacto y usabilidad  
* Piensa como si esta app fuera a usarse en empresas reales  
* Si detectas incoherencias en el proyecto, señálalas y propón soluciones

[**🏫 Curso intensivo ampliado de IA con DTO Navidad**](https://academiartificial.com/curso-ia/)