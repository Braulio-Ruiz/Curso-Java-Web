/**
 * Configuración Maestra de Temas
 * Define el esquema de colores para cada rango de lecciones.
 */
const MODULE_THEMES = [
    { range: [1, 5], color: 'blue', shade: 600, textShade: 700, bgShade: 50 },
    { range: [6, 10], color: 'purple', shade: 600, textShade: 700, bgShade: 50 },
    { range: [11, 15], color: 'yellow', shade: 500, textShade: 700, bgShade: 50 }, // Yellow usa shade 500 para mejor contraste
    { range: [16, 19], color: 'orange', shade: 500, textShade: 700, bgShade: 50 },
    { range: [20, 24], color: 'red', shade: 600, textShade: 700, bgShade: 50 },
    { range: [25, 27], color: 'cyan', shade: 600, textShade: 700, bgShade: 50 }, // Corregido a cyan según módulo 6
    { range: [28, 30], color: 'indigo', shade: 600, textShade: 700, bgShade: 50 },
    { range: [31, 34], color: 'indigo', shade: 600, textShade: 700, bgShade: 50 }  // Extensión para módulo 7
];

/**
 * Obtiene la configuración de tema para una ID de lección dada.
 */
function getThemeConfig(lessonId) {
    const id = parseInt(lessonId);
    return MODULE_THEMES.find(t => id >= t.range[0] && id <= t.range[1]) || MODULE_THEMES[0];
}

/**
 * Controla la navegación entre lecciones:
 * 1. Oculta la lección actual.
 * 2. Muestra la nueva lección.
 * 3. Actualiza los estilos de la barra lateral según el tema del módulo.
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
        // Timeout pequeño para permitir que el navegador procese el cambio de display:none antes de animar
        setTimeout(() => selected.classList.add('active'), 10);
    }

    // 2. Gestión de Botones (Navegación Lateral)
    document.querySelectorAll('.nav-btn').forEach(btn => {
        // Limpieza agresiva de clases de temas anteriores
        MODULE_THEMES.forEach(t => {
            btn.classList.remove(`bg-${t.color}-50`, `border-${t.color}-200`, 'active');

            const icon = btn.querySelector('.btn-icon');
            if (icon) icon.classList.remove(`bg-${t.color}-100`, `text-${t.color}-600`, `bg-${t.color}-600`, `bg-${t.color}-500`, 'text-white');

            const text = btn.querySelector('.btn-text');
            if (text) text.classList.remove(`text-${t.color}-${t.textShade}`, 'font-bold');

            const indicator = btn.querySelector('.btn-indicator');
            if (indicator) indicator.classList.remove(`bg-${t.color}-600`, `bg-${t.color}-500`, 'opacity-100');
        });

        // Estado base inactivo
        const icon = btn.querySelector('.btn-icon');
        if (icon) icon.classList.add('bg-slate-100', 'text-slate-500');

        const text = btn.querySelector('.btn-text');
        if (text) {
            text.classList.add('text-slate-600');
            text.classList.remove('text-slate-900');
        }

        const indicator = btn.querySelector('.btn-indicator');
        if (indicator) indicator.classList.add('opacity-0');
    });

    // 3. Activar el botón seleccionado con el tema específico
    const activeBtn = document.getElementById('btn-' + id);
    if (activeBtn) {
        activeBtn.classList.add(`bg-${theme.color}-50`, `border-${theme.color}-200`, 'active');

        const icon = activeBtn.querySelector('.btn-icon');
        if (icon) {
            icon.classList.remove('bg-slate-100', 'text-slate-500');
            // Para iconos activos, usamos el tono fuerte del tema
            icon.classList.add(`bg-${theme.color}-100`, `text-${theme.color}-600`);
        }

        const text = activeBtn.querySelector('.btn-text');
        if (text) {
            text.classList.remove('text-slate-600');
            text.classList.add(`text-${theme.color}-${theme.textShade}`, 'font-bold');
        }

        const indicator = activeBtn.querySelector('.btn-indicator');
        if (indicator) {
            indicator.classList.remove('opacity-0');
            indicator.classList.add('opacity-100', `bg-${theme.color}-${theme.shade}`);
        }
    }

    // Scroll al inicio del contenido
    const main = document.querySelector('main');
    if (main) main.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Muestra/Oculta bloques de código de solución
 */
function toggleSolution(id) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('hidden');
}

/**
 * Valida respuestas de los quizzes interactivos
 */
function checkQuiz(btn, isCorrect) {
    const parent = btn.parentElement;

    // Resetear estado visual de hermanos
    parent.querySelectorAll('.quiz-btn').forEach(b => {
        b.classList.remove('bg-green-100', 'text-green-800', 'border-green-500', 'bg-red-100', 'text-red-800', 'border-red-500');
        // Limpiar iconos previos si existen
        b.innerHTML = b.innerText.replace(' ✅', '').replace(' ❌', '');
    });

    // Aplicar estado
    if (isCorrect) {
        btn.classList.add('bg-green-100', 'text-green-800', 'border-green-500');
        btn.innerHTML += ' ✅';
    } else {
        btn.classList.add('bg-red-100', 'text-red-800', 'border-red-500');
        btn.innerHTML += ' ❌';
    }
}

/**
 * Evento especial para final del curso
 */
function graduar() {
    alert("🎓 ¡FELICIDADES! 🎓\n\nHas completado el camino del Arquitecto Java.\nEstás listo para diseñar sistemas de clase mundial.");
}

// Inicialización Automática al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    // Detectar cuál es la primera lección disponible en este archivo HTML
    const firstBtn = document.querySelector('.nav-btn');
    if (firstBtn) {
        // Extraer ID (ej: "btn-25" -> 25)
        const lessonId = parseInt(firstBtn.id.replace('btn-', ''));
        // Inicializar esa lección si tiene la clase 'active' o es la primera
        if (firstBtn.classList.contains('active') || document.querySelectorAll('.lesson-section.active').length === 0) {
            showLesson(lessonId);
        }
    }
});