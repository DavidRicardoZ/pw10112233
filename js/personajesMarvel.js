async function buscarPersonajes() {
    const nombrePersonaje = document.getElementById("buscarPersonaje").value.trim();
    const url = `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=67788e74df746a1523d8ebb504ee1008&hash=cf5ec9bfa5a156f031a69417cd0e012c&nameStartsWith=${nombrePersonaje}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.code === 200) {
            mostrarInformacion(data.data.results);
        } else {
            mostrarError("No se encontraron resultados.");
        }
    } catch (error) {
        mostrarError("Error al buscar personajes.");
    }
}

function mostrarInformacion(personajes) {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = ''; // Limpiar resultados anteriores

    personajes.forEach(personaje => {
        const divPersonaje = document.createElement("div");
        divPersonaje.classList.add("personaje");

        const comicsDisponibles = personaje.comics.available;

        divPersonaje.innerHTML = `
            <h2>${personaje.name}</h2>
            <p>${personaje.description ? personaje.description : "Sin descripción disponible"}</p>
            <p>Número de cómics: ${comicsDisponibles}</p>
            <img src="${personaje.thumbnail.path}.${personaje.thumbnail.extension}" alt="${personaje.name}">
        `;
        resultado.appendChild(divPersonaje);
    });
}

function mostrarError(mensaje) {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = `<p>${mensaje}</p>`;
}
