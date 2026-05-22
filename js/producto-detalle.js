async function renderProductoDetalle() {

  // 🔥 Obtener ID desde URL
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  try {

    const res = await fetch("productos.json");

    if (!res.ok) {
      throw new Error("Error cargando JSON");
    }

    const data = await res.json();

    const producto =
      data.productos.find(p => String(p.id) === String(id));

    const container = document.getElementById("producto-detalle");

    if (!container) {
      console.error("No existe #producto-detalle");
      return;
    }

    if (!producto) {
      container.innerHTML = "<p>Producto no encontrado</p>";
      return;
    }

    // 🔥 Valores seguros
    const precio = producto.precio || "Consultar";
    const stock = producto.stock || "No disponible";
    const detalle = producto.detalle || producto.descripcion || "";

    // 🔥 MAILTO DINÁMICO
    const correo = `
      <a 
        href="mailto:contacto@tcb.com.pe?subject=Consulta sobre ${encodeURIComponent(producto.titulo)}&body=Hola,%0A%0AQuiero información sobre:%20${encodeURIComponent(producto.titulo)}%0A%0AGracias"
        class="btn btn-outline-primary mt-3 me-2"
      >
        Consultar por correo
      </a>
    `;

    // 🔥 BOTÓN OPCIONAL
    const boton = `
      <a href="solicitud.html?id=${producto.id}" class="btn btn-primary mt-3">
        ${producto.accion || "Solicitar ahora"}
      </a>
    `;

    const consulte = `
      <a href="http://sys.maslandservices.com:8089/" target="_blank" class="mt-3 d-inline-block text-primary fw-bold">
        Consulte
      </a>
    `;

    // 🔥 RENDER FINAL
    container.innerHTML = `
      <div class="row align-items-center">

        <div class="col-md-6">
          <img src="${producto.imagen}" class="img-fluid rounded">
        </div>

        <div class="col-md-6">

          <h2>${producto.titulo}</h2>

          <p>${detalle}</p>

          <hr>

          <p><strong>💰 Precio:</strong> ${precio}</p>
          <p><strong>📦 Stock:</strong> ${stock}</p>

          ${correo}

          ${boton}

          ${consulte}

        </div>

      </div>
    `;

  } catch (err) {
    console.error(err);
  }
}

// 🔥 EJECUTAR
renderProductoDetalle();