fetch("productos.json")
  .then(res => {
    console.log("Respuesta fetch:", res);

    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status} ${res.statusText}`);
    }

    return res.json();
  })
  .then(data => {
    console.log("JSON cargado:", data);

    const container = document.getElementById("productos-container");

    // 🔴 Validación 1
    if (!container) {
      console.error("No se encontró el contenedor #productos-container");
      return;
    }

    // 🔴 Validación 2
    if (!data.productos || !Array.isArray(data.productos)) {
      console.error("El JSON no tiene la estructura correcta");
      container.innerHTML = "<p>Error en estructura de datos</p>";
      return;
    }

    // 🔴 Validación 3
    if (data.productos.length === 0) {
      container.innerHTML = "<p>No hay productos disponibles</p>";
      return;
    }

    container.innerHTML = "";

    // ✅ Render dinámico
    data.productos.forEach((p, index) => {

      if (!p.titulo || !p.descripcion) {
        console.warn("Producto incompleto:", p);
        return;
      }

      const delay = (index + 1) * 0.1;

      // 🔥 ICONO DINÁMICO
      let iconoHTML = "";

      if (p.tipoIcono === "img") {
        iconoHTML = `
          <img src="${p.icono}" 
               class="img-fluid rounded h-100 w-100" 
               alt="${p.titulo}">
        `;
      } else {
        iconoHTML = `<i class="${p.icono} fa-2x"></i>`;
      }

      // 🔥 CARD COMPLETO (SIEMPRE CLICKEABLE)
      const html = `
        <div class="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="${delay}s">
          <a href="index.html?view=producto&id=${p.id}" style="text-decoration:none; color:inherit;">
            <div class="service-item p-4">
              <div class="service-icon mb-4">
                ${iconoHTML}
              </div>
              <h5 class="mb-3">${p.titulo}</h5>
              <p class="mb-0">${p.descripcion}</p>
            </div>
          </a>
        </div>
      `;

      container.innerHTML += html;
    });
  })
  .catch(error => {
    console.error("Error cargando productos.json:", error);

    const container = document.getElementById("productos-container");
    if (container) {
      container.innerHTML = "<p>Error cargando productos</p>";
    }
  });