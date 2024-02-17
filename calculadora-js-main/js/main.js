const pantalla = document.querySelector(".pantalla");
const botones = document.querySelectorAll(".btn");

document.addEventListener("DOMContentLoaded", function () {
    Display_historial();
});

function añadir(value) {
    var display = document.getElementById("display");
    display.value += value;
}

function limpiar() {
    var display = document.getElementById("display");
    display.value = "";
}

botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const botonApretado = boton.textContent;

        if (boton.id === "c") {
            pantalla.textContent = "0";
            return;
        }

        if (boton.id === "borrar") {
            if (pantalla.textContent.length === 1 || pantalla.textContent === "Error!") {
                pantalla.textContent = "0";
            } else {
                pantalla.textContent = pantalla.textContent.slice(0, -1);
            }
            return;
        }

        if (boton.id === "igual") {
            try {
                pantalla.textContent = eval(pantalla.textContent);
            } catch {
                pantalla.textContent = "Error!";
            }
            return;
        }

        if (pantalla.textContent === "0" || pantalla.textContent === "Error!") {
            pantalla.textContent = botonApretado;
        } else {
            pantalla.textContent += botonApretado;
        }
    })
})

function Guardar_historial(operation) {
    var Lista_historial = JSON.parse(localStorage.getItem("history")) || [];
    Lista_historial.push(operation);
    localStorage.setItem("history", JSON.stringify(Lista_historial));
    Display_historial();
}

function Display_historial() {
    var Lista_historial = JSON.parse(localStorage.getItem("history")) || [];
    var historyUl = document.getElementById("history-list");
    historyUl.innerHTML = "";
    Lista_historial.forEach(function (operation) {
        var li = document.createElement("li");
        li.textContent = operation;
        historyUl.appendChild(li);
    });
}

function Limpiar_historial() {
    localStorage.removeItem("history");
    Display_historial();

}


function Mostrar_historial() {
    var Lista_historial = document.getElementById("history-list");
    var boton_mostrar = document.getElementById("toggle-button");

    if (Lista_historial.style.pantalla === "none" || Lista_historial.style.pantalla === "") {
        Lista_historial.style.pantalla = "block";
        boton_mostrar.classList.add("show");
        boton_mostrar.textContent = "Ocultar Lista";
    } else {
        Lista_historial.style.pantalla = "none";
        boton_mostrar.classList.remove("show");
        boton_mostrar.textContent = "Mostrar Lista";
    }
}