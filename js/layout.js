function cargarComponente(id, archivo) {
  fetch(archivo)
    .then(res => {
      if (!res.ok) {
        throw new Error(`Error cargando ${archivo}: ${res.status}`);
      }
      return res.text();
    })
    .then(html => {
      const contenedor = document.getElementById(id);

      if (!contenedor) {
        console.error(`No existe el contenedor #${id}`);
        return;
      }

      contenedor.innerHTML = html;
    })
    .catch(error => {
      console.error(error);
    });
}

// 🔥 Cargar componentes
cargarComponente("header", "components/header.html");
cargarComponente("footer", "components/footer.html");