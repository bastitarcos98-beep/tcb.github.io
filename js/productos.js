async function renderProductos() {

  try {

    const res =
      await fetch("productos.json");

    if (!res.ok) {
      throw new Error(
        `Error HTTP: ${res.status}`
      );
    }

    const data =
      await res.json();

    const container =
      document.getElementById(
        "productos-container"
      );

    if (!container) return;

    container.innerHTML = "";

    data.productos.forEach((p, index) => {

      const delay =
        (index + 1) * 0.1;

      let iconoHTML = "";

      if (p.tipoIcono === "img") {

        iconoHTML = `
          <img
            src="${p.icono}"
            class="img-fluid rounded h-100 w-100"
            alt="${p.titulo}">
        `;

      } else {

        iconoHTML =
          `<i class="${p.icono} fa-2x"></i>`;
      }

      container.innerHTML += `
        <div
          class="col-md-6 col-lg-4 wow fadeInUp"
          data-wow-delay="${delay}s">

          <a
            href="index.html?view=producto&id=${p.id}"
            style="text-decoration:none;color:inherit;">

            <div class="service-item p-4">

              <div class="service-icon mb-4">
                ${iconoHTML}
              </div>

              <h5 class="mb-3">
                ${p.titulo}
              </h5>

              <p class="mb-0">
                ${p.descripcion}
              </p>

            </div>

          </a>

        </div>
      `;
    });

  } catch(error) {

    console.error(error);
  }
}