// Configuración de temas por rango de lecciones
// Esto permite que el script sepa qué colores usar según el ID de la lección
const MODULE_THEMES = [
    { range: [1, 5], color: 'blue', shade: 600, textShade: 700, bgShade: 50 },
    { range: [6, 10], color: 'purple', shade: 600, textShade: 700, bgShade: 50 },
    { range: [11, 15], color: 'yellow', shade: 500, textShade: 700, bgShade: 50 }, // Nota: Yellow usa shade 500
    { range: [16, 19], color: 'orange', shade: 500, textShade: 700, bgShade: 50 }, // Nota: Orange usa shade 500
    { range: [20, 24], color: 'red', shade: 600, textShade: 700, bgShade: 50 },
    { range: [25, 27], color: 'emerald', shade: 600, textShade: 700, bgShade: 50 },
    { range: [28, 30], color: 'indigo', shade: 600, textShade: 700, bgShade: 50 }
];

/**
 * Encuentra la configuración del tema para una lección específica
 */
function getThemeConfig(lessonId) {
    const id = parseInt(lessonId);
    return MODULE_THEMES.find(t => id >= t.range[0] && id <= t.range[1]) || MODULE_THEMES[0];
}

/**
 * Función Principal de Navegación
 */
function showLesson(id) {
    const theme = getThemeConfig(id);

    // 1. Gestión de Secciones (Contenido)
    document.querySelectorAll('.lesson-section').forEach(el => {
        el.classList.add('hidden');
        el.classList.remove('active');
    });

    const selected = document.getElementById('lesson-' + id);
    if (selected) {
        selected.classList.remove('hidden');
        setTimeout(() => selected.classList.add('active'), 10);
    }

    // 2. Gestión de Botones (Navegación)
    document.querySelectorAll('.nav-btn').forEach(btn => {
        // Limpiar estilos activos de TODOS los temas posibles para evitar conflictos
        MODULE_THEMES.forEach(t => {
            btn.classList.remove(`bg-${t.color}-50`, `border-${t.color}-100`);

            const icon = btn.querySelector('.btn-icon');
            if (icon) icon.classList.remove(`bg-${t.color}-${t.shade}`, `bg-${t.color}-600`, `bg-${t.color}-500`, 'text-white');

            const text = btn.querySelector('.btn-text');
            if (text) text.classList.remove(`text-${t.color}-${t.textShade}`, 'font-bold');
        });

        // Resetear a estado inactivo base
        const indicator = btn.querySelector('.btn-indicator');
        if (indicator) {
            indicator.classList.remove('opacity-100');
            indicator.classList.add('opacity-0');
            // Limpiar color del indicador
            MODULE_THEMES.forEach(t => indicator.classList.remove(`bg-${t.color}-600`, `bg-${t.color}-500`));
        }

        const icon = btn.querySelector('.btn-icon');
        if (icon) {
            icon.classList.add('bg-slate-100', 'text-slate-500');
        }
    });

    // 3. Activar el botón seleccionado con el tema correcto
    const activeBtn = document.getElementById('btn-' + id);
    if (activeBtn) {
        // Fondo y borde del botón
        activeBtn.classList.add(`bg-${theme.color}-50`, `border-${theme.color}-100`, 'active');

        // Indicador lateral
        const indicator = activeBtn.querySelector('.btn-indicator');
        if (indicator) {
            indicator.classList.remove('opacity-0');
            indicator.classList.add('opacity-100', `bg-${theme.color}-${theme.shade === 500 ? 500 : 600}`);
        }

        // Icono
        const activeIcon = activeBtn.querySelector('.btn-icon');
        if (activeIcon) {
            activeIcon.classList.remove('bg-slate-100', 'text-slate-500');
            activeIcon.classList.add(`bg-${theme.color}-${theme.shade}`, 'text-white');
        }

        // Texto
        const activeText = activeBtn.querySelector('.btn-text');
        if (activeText) {
            activeText.classList.add(`text-${theme.color}-${theme.textShade}`, 'font-bold');
        }
    }

    // Scroll top
    const main = document.querySelector('main');
    if (main) main.scrollTop = 0;
}

/**
 * Utilidad: Mostrar/Ocultar Soluciones
 */
function toggleSolution(id) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('hidden');
}

/**
 * Utilidad: Validación de Quizzes
 */
function checkQuiz(btn, isCorrect) {
    const parent = btn.parentElement;
    parent.querySelectorAll('.quiz-btn, .quiz-option').forEach(b => {
        // Resetear estilos inline y clases
        b.classList.remove('correct', 'wrong');
        b.style.borderColor = '';
        b.style.color = '';
        b.style.fontWeight = '';
        b.style.backgroundColor = '';
    });

    if (isCorrect) {
        // Estilo de éxito unificado
        btn.classList.add('correct');
        btn.style.borderColor = '#22c55e'; // Green 500
        btn.style.color = '#15803d';      // Green 700
        btn.style.backgroundColor = '#dcfce7'; // Green 100
        btn.style.fontWeight = 'bold';
    } else {
        // Estilo de error unificado
        btn.classList.add('wrong');
        btn.style.borderColor = '#ef4444'; // Red 500
        btn.style.color = '#b91c1c';      // Red 700
        btn.style.backgroundColor = '#fee2e2'; // Red 100
    }
}

/**
 * Utilidad: Graduación (Solo Módulo 7)
 */
function graduar() {
    // Efecto de confeti simple usando alert por ahora, o integración futura
    alert("🎉 ¡FELICIDADES! 🎉\n\nHas completado el Curso de Ingeniería Java de Nivel Élite.\nEstás listo para diseñar, construir y desplegar sistemas robustos.\n\n¡El mundo del software te espera!");
}

// Auto-inicialización inteligente
document.addEventListener('DOMContentLoaded', () => {
    // Busca el primer botón de navegación disponible en el HTML actual para saber dónde empezar
    const firstBtn = document.querySelector('.nav-btn');
    if (firstBtn) {
        // Extrae el ID del botón (ej: "btn-6" -> 6)
        const startLessonId = firstBtn.id.replace('btn-', '');
        showLesson(parseInt(startLessonId));
    }
});