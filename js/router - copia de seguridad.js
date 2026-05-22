async function loadView() {

    const params =
        new URLSearchParams(window.location.search);

    const view =
        params.get("view") || "inicio";

    const app =
        document.getElementById("app-content");

    try {

        const response =
            await fetch(`views/${view}.html`);

        const html =
            await response.text();

        app.innerHTML = html;

        // PRODUCTOS
        if (view === "productos") {
            setTimeout(() => {
                renderProductos();
            }, 0);
        }

        if (view === "producto") {
            setTimeout(() => {
                renderProductoDetalle();
            }, 0);
        }

        // WOW
        if (typeof WOW !== "undefined") {

            new WOW().init();
        }

        // OWL CAROUSEL
        $('.testimonial-carousel').owlCarousel({

            autoplay: true,
            smartSpeed: 1000,
            center: false,
            dots: true,
            loop: true,
            margin: 25,
            nav : false,

            responsive: {
                0:{
                    items:1
                },
                768:{
                    items:2
                },
                992:{
                    items:2
                }
            }
        });

    } catch(error) {

        console.error(error);
    }
}

loadView();