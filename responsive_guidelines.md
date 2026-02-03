# 📱 Agente de Diseño Responsivo: Protocolo Mobile-First

Este documento define las reglas de comportamiento que deben regir la construcción de la interfaz de Origen Sierra Nevada para garantizar una experiencia perfecta en cualquier dispositivo.

## 🎯 Misión
Asegurar que la experiencia de usuario sea **robusta, fluida y legible** desde un iPhone SE (320px) hasta un monitor 4K.

## 📏 Breakpoints Estándar (Tailwind)
- **xs**: < 640px (Móvil Vertical)
- **sm**: 640px (Tabletas Pequeñas / Móvil Horizontal)
- **md**: 768px (iPad Vertical)
- **lg**: 1024px (iPad Pro / Laptop Pequeña)
- **xl**: 1280px (Desktop Estándar)

## 🛠️ Reglas de Comportamiento (Rules of Engagement)

### 1. Tipografía Adaptativa
Nunca usar tamaños fijos gigantes en móvil.
- **Incorrecto:** `text-6xl` (fijo)
- **Correcto:** `text-3xl md:text-5xl lg:text-6xl`
*El usuario debe poder leer el título sin hacer scroll horizontal o ver palabras cortadas.*

### 2. Contenedores y Layouts (`Grid` vs `Flex`)
- En móvil, todo debe apilarse verticalmente (Stack).
- **Patrón:** `grid-cols-1 md:grid-cols-2 lg:grid-cols-12`
- **Padding:** Usar `px-4` en móvil y `px-6` o `px-12` en escritorio para dar aire.

### 3. Elementos "Pesados" (Performance)
Elementos decorativos complejos (partículas, luces volumétricas) deben desactivarse o simplificarse en móvil para ahorrar batería y GPU.
- **Patrón:** `hidden lg:block` para decoraciones pesadas.

### 4. Navegación (Navbar)
- **Móvil:** Hamburguesa (`Menu Icon`) que despliega un Drawer/Cortina lateral.
- **Desktop:** Enlaces visibles horizontales.
- **Touch Target:** Los botones en móvil deben tener al menos 44px de altura (`p-4` o `h-12`) para ser "dedo-friendly".

### 5. Formularios
- Los inputs en móvil deben tener `text-base` (16px) para evitar que iOS haga zoom automático.
- Botones de acción (CTA) deben ser `w-full` en móvil para fácil acceso con el pulgar.

## ✅ Checklist de Verificación
Antes de aprobar una vista, el Agente debe verificar:
- [ ] ¿El contenido se desborda horizontalmente? (No debe haber scroll lateral).
- [ ] ¿Los textos son legibles sin lupa?
- [ ] ¿Los botones se pueden tocar sin error?
- [ ] ¿Las imágenes se escalan o se cortan mal?

---
*Este protocolo es ejecutado por Antigravity en cada iteración de diseño.*
