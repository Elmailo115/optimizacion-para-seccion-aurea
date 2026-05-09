// Variables de estado global para recordar valores entre operaciones
let k = 0;
let Ak, Bk, Alfa, Landa, Miu;

function iniciarAlgoritmo() {
    // Captura valores iniciales
    Ak = parseFloat(document.getElementById('Ak').value);
    Bk = parseFloat(document.getElementById('Bk').value);
    Alfa = parseFloat(document.getElementById('Alfa').value);
    k = 0;

    if (isNaN(Ak) || isNaN(Bk) || isNaN(Alfa)) {
        alert("Por favor rellena los valores iniciales");
        return;
    }

    // Paso 1: Cálculo inicial
    calcularLandaMiu();
    
    // Interfaz
    document.getElementById('config-card').classList.add('hidden');
    document.getElementById('panel-operacion').classList.remove('hidden');
    actualizarPantalla();
}

function calcularLandaMiu() {
    Landa = Ak + (1 - Alfa) * (Bk - Ak);
    Miu = Ak + Alfa * (Bk - Ak);
}

function actualizarPantalla() {
    document.getElementById('k-label').innerText = k;
    document.getElementById('view-landa').innerText = Landa.toFixed(6);
    document.getElementById('view-miu').innerText = Miu.toFixed(6);
}

function ejecutarIteracion() {
    const fLanda = parseFloat(document.getElementById('fLanda').value);
    const fMiu = parseFloat(document.getElementById('fMiu').value);

    if (isNaN(fLanda) || isNaN(fMiu)) {
        alert("Ingresa los valores de las funciones para evaluar");
        return;
    }

    let pasoAplicado = "";

    // LÓGICA AUTOMÁTICA DE DECISIÓN
    if (fLanda > fMiu) {
        // --- PASO 2 ---
        pasoAplicado = "Paso 2 (fL > fM)";
        registrarEnTabla(fLanda, fMiu, pasoAplicado); // Guardamos k actual

        Ak = Landa; // A_{k+1} = Landa_k
        // Bk se mantiene igual
        Landa = Miu; // Landa_{k+1} = Miu_k
        Miu = Ak + Alfa * (Bk - Ak); // Miu se recalcula
    } else {
        // --- PASO 3 ---
        pasoAplicado = "Paso 3 (fM > fL)";
        registrarEnTabla(fLanda, fMiu, pasoAplicado); // Guardamos k actual

        // Ak se mantiene igual
        Bk = Miu; // B_{k+1} = Miu_k
        Landa = Ak + (1 - Alfa) * (Bk - Ak); // Landa se recalcula
        Miu = Landa; // Miu_{k+1} = Landa_k
    }

    // Avanzamos iteración
    k++;
    actualizarPantalla();
    
    // Limpiar campos para la siguiente entrada
    document.getElementById('fLanda').value = "";
    document.getElementById('fMiu').value = "";
}

function registrarEnTabla(fl, fm, paso) {
    const tabla = document.getElementById('cuerpo-tabla');
    const fila = document.createElement('tr');
    
    fila.innerHTML = `
        <td>${k}</td>
        <td>${Ak.toFixed(6)}</td>
        <td>${Bk.toFixed(6)}</td>
        <td>${(Bk - Ak).toFixed(6)}</td>
        <td>${Landa.toFixed(6)}</td>
        <td>${Miu.toFixed(6)}</td>
        <td>${fl.toFixed(6)}</td>
        <td>${fm.toFixed(6)}</td>
        <td style="font-weight:bold; color:#2b6cb0">${paso}</td>
    `;
    
    // Insertar al inicio de la tabla para ver lo más reciente arriba
    tabla.prepend(fila);
}