let k = 0;
let Ak, Bk, Alfa, Landa, Miu;

function iniciarAlgoritmo() {
    Ak = parseFloat(document.getElementById('Ak').value);
    Bk = parseFloat(document.getElementById('Bk').value);
    Alfa = parseFloat(document.getElementById('Alfa').value);
    k = 0;

    if (isNaN(Ak) || isNaN(Bk) || isNaN(Alfa)) return alert("Rellena los valores iniciales");

    // Paso 1: Cálculo inicial de Landa y Miu
    Landa = Ak + (1 - Alfa) * (Bk - Ak);
    Miu = Ak + Alfa * (Bk - Ak);

    document.getElementById('config-card').classList.add('hidden');
    document.getElementById('panel-operacion').classList.remove('hidden');
    actualizarPantalla();
}

function ejecutarIteracion() {
    const fLanda = parseFloat(document.getElementById('fLanda').value);
    const fMiu = parseFloat(document.getElementById('fMiu').value);

    if (isNaN(fLanda) || isNaN(fMiu)) return alert("Ingresa los valores de la función");

    let pasoLog = "";

    // LÓGICA DE HERENCIA CORREGIDA
    if (fLanda > fMiu) {
        pasoLog = "Paso 2";
        registrarEnTabla(fLanda, fMiu, pasoLog);

        // Actualizamos límites
        Ak = Landa; // El nuevo A es el Landa viejo
        // Bk se mantiene igual
        
        // El nuevo Landa hereda el valor de Miu
        Landa = Miu;
        // Se calcula el nuevo Miu
        Miu = Ak + Alfa * (Bk - Ak);
    } else {
        pasoLog = "Paso 3";
        registrarEnTabla(fLanda, fMiu, pasoLog);

        // Ak se mantiene igual
        Bk = Miu; // El nuevo B es el Miu viejo
        
        // El nuevo Miu hereda el valor de Landa
        Miu = Landa;
        // Se calcula el nuevo Landa
        Landa = Ak + (1 - Alfa) * (Bk - Ak);
    }

    k++;
    actualizarPantalla();
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
        <td style="font-weight:bold; color:#3182ce">${paso}</td>
    `;
    tabla.appendChild(fila);
}

function actualizarPantalla() {
    document.getElementById('k-label').innerText = k;
    document.getElementById('view-landa').innerText = Landa.toFixed(6);
    document.getElementById('view-miu').innerText = Miu.toFixed(6);
}