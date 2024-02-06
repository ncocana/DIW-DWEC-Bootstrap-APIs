setTimeout(function () {
  document.querySelector(".contain-spineer").innerHTML = `
  <nav class="navbar navbar-expand-lg navbar-warning bg-warning">
  <div class="container-fluid">
    <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#mi-menu">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="mi-menu">
      <ul class="nav navbar-nav">
        <!-- Logo -->
        <li class="navbar-brand">
          <a class="nav-link" href="#"><img src="../src/imgPokemon/logo_pokemon.png" alt="Logo" height="40px"></a>
        </li>
      </ul>
      <ul class="navbar-nav ms-auto me-3">
        <!-- Primera IMG -->
        <li class="nav-item">
          <a class="nav-link" href="../src/index.html"><img src="../src/imgPokemon/pokebola.png" alt="Pokebola" height="30px" class="me-1">Inicio</a>
        </li>
        <!-- Segunda IMG -->
        <li class="nav-item">
          <a class="nav-link" href="../src/pokedex.html"><img src="../src/imgPokemon/pokedex.png" alt="Pokedex" height="30px" class="me-1">Pokédex</a>
        </li>
        <!-- Tercera IMG -->
        <li class="nav-item">
          <a class="nav-link" href="../src/videojuegos.html"><img src="../src/imgPokemon/videojuego.png" alt="Videojuego" height="30px" class="me-1">Videojuegos</a>
        </li>
        <!-- Cuarta IMG -->
        <li class="nav-item">
          <a class="nav-link" href="../src/noticias.html"><img src="../src/imgPokemon/noticias.png" alt="Noticias" height="30px" class="me-1">Noticias</a>
        </li>
      </ul>
      <!-- Busquedad -->
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
<!-- Carousel -->
<div id="carouselExampleRide" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner" id="carousel-size">
    <div class="carousel-item active">
      <img src="../src/imgPokemon/carousel1.jpg" class="d-block w-100" alt="Mewtwo" height="500px">
  </div>
  <div class="carousel-item">
      <img src="../src/imgPokemon/carousel2.jpg" class="d-block w-100" alt="Kyurem" height="500px">
  </div>
  <div class="carousel-item">
      <img src="../src/imgPokemon/carousel3.jpg" class="d-block w-100" alt="Lucario" height="500px">
  </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>  
<br>
  <!-- Cards -->
  <!-- Card 1 -->
  <div class="container">
    <h3>Descubre alguno de nuestros pokémons</h3>
    <div class="row" id="JDS">
      <div class="col-3">
        <div class="card">
          <img src="../src/imgPokemon/kyurem.png" alt="Kyurem" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">Kyurem</h5>
            <p class="card-text">Pokémon legendario que aguarda al héroe que compense el vacío de su cuerpo de hielo con verdad e ideales. Produce en su interior una intensa energía gélida, y cualquier fuga hace que su cuerpo se congele. Pokémon legendario que aguarda al héroe que compense el vacío de su cuerpo de hielo con verdad e ideales.</p>
            <button class="btn btn-danger" type="button" data-bs-toggle="modal" data-bs-placement="top" data-bs-title="Buen Pokémon" data-bs-target="#pokemonModal" onclick="actualizarInfoModal('kyurem')">Saber más</button>
          </div>
        </div>
      </div>
      <!-- Card 2 -->
      <div class="col-3">
        <div class="card">
        <img src="../src/imgPokemon/mewtwo.png" alt="Mewtwo" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">Mewtwo</h5>
          <p class="card-text">Mewtwo es sumamente hábil con sus poderes psíquicos: puede volar mediante la levitación, comunicarse telepáticamente, reflejar ataques como hiperrayo, bloquear las habilidades especiales de los demás Pokémon y tomar el mando de la mente de otra criatura viva mediante hipnosis.</p>
          <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#pokemonModal" id="mewtwo-modal" onclick="actualizarInfoModal('mewtwo')">Saber más</button>
        </div>
        </div>
      </div>
      <!-- Card 3 -->
      <div class="col-3">
        <div class="card">
        <img src="../src/imgPokemon/lucario.png" alt="Lucario" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">Lucario</h5>
          <p class="card-text">Lucario es un Pokémon de tipo lucha/acero introducido en la cuarta generación. Es la evolución de Riolu y puede megaevolucionar en Mega-Lucario.</p>
          <button class="btn btn-danger" data-bs-toggle="modal" title="Buen Pokémon" data-bs-target="#pokemonModal" id="lucario-modal" onclick="actualizarInfoModal('lucario')">Saber más</button>
        </div>
      </div>
      </div>
      <!-- Card 4 -->
      <div class="col-3">
        <div class="card">
          <img src="../src/imgPokemon/rayquaza.png" alt="Rayquaza" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">Rayquaza</h5>
            <p class="card-text">Rayquaza es un Pokémon legendario de tipo dragón/volador introducido en la tercera generación. Es la mascota de Pokémon Esmeralda. Forma parte del trío creador junto con Groudon y Kyogre. A partir de Pokémon Rubí Omega y Pokémon Zafiro Alfa puede megaevolucionar en Mega-Rayquaza.</p>
            <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#pokemonModal" id="rayquaza-modal" onclick="actualizarInfoModal('rayquaza')">Saber más</button>
          </div>
        </div>
      </div>
      </div>
      </div>
    </div>
    <br>
    <div class="container">
      <button type="button" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" title="Mira todo los pokemons" style="margin-left: auto; display: block; cursor:pointer;" class="btn btn-danger"><a href="../src/pokedex.html" style="text-decoration:none;color:inherit;">Ir a la pokedex</a></button>
    </div>
    <br>
      <!-- Modal -->
<div class="modal" id="pokemonModal" tabindex="-1" role="dialog">
<div class="modal-dialog" role="document">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title">Más info</h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div>
        <label for="Tipo">Tipo:</label>
        <span id="tipo"></span>
      </div>
      <div>
        <label for="Habilidades">Habilidades:</label>
        <span id="habilidades"></span>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" data-dismiss="modal">Cerrar</button>
      <button type="button" class="btn btn-secondary">Guardar</button>
    </div>
  </div>
</div>
</div>

<!-- Footer -->
<footer class="text-center bg-warning text-lg-start border border-white mt-xl-5 pt-4">
<div class="container-fluid p-4">
  <div class="row">
    <div class="col-lg-3 col-md-6 mb-4 mb-lg-0">
      <h5 class="text-uppercase mb-4">Nuestro mundo</h5>

      <ul class="list-unstyled mb-4">
        <li>
          <a href="#!" class="text-white">Acerca de nosotros</a>
        </li>
        <li>
          <a href="#!" class="text-white">Collecciones</a>
        </li>
        <li>
          <a href="#!" class="text-white">Filosofía ambiental</a>
        </li>
        <li>
          <a href="#!" class="text-white">Colaboraciones de artistas</a>
        </li>
      </ul>
    </div>

    <div class="col-lg-3 col-md-6 mb-4 mb-lg-0">
      <h5 class="text-uppercase mb-4">Asistencia</h5>

      <ul class="list-unstyled">
        <li>
          <a href="#!" class="text-white">Contactanos</a>
        </li>
        <li>
          <a href="#!" class="text-white">Guia de tallas</a>
        </li>
        <li>
          <a href="#!" class="text-white">Información de envío</a>
        </li>
        <li>
          <a href="#!" class="text-white">Devoluciones / Cambios</a>
        </li>
        <li>
          <a href="#!" class="text-white">Pagos</a>
        </li>
      </ul>
    </div>

    <div class="col-lg-3 col-md-6 mb-4 mb-lg-0">
      <h5 class="text-uppercase mb-4">Siguenos en Redes</h5>

      <ul class="list-unstyled">
        <li>
          <a href="facebook.com" style="margin-right: 10px;"><img src="../src/imgPokemon/facebook.svg" alt="Facebook" height="30px"></a>
          <a href="instagram.com" style="margin-right: 10px;"><img src="../src/imgPokemon/instagram.svg" alt="Instagram" height="30px"></a>
          <a href="twitter.com" style="margin-right: 10px;"><img src="../src/imgPokemon/twitter-x.svg" alt="Twitter-X" height="30px"></a>
          <a href="twitter.com" style="margin-right: 10px;"><img src="../src/imgPokemon/youtube.svg" alt="Youtube" height="30px"></a>
          <a href="tiktok.com"><img src="../src/imgPokemon/tiktok.svg" alt="TikTok"></a>
        </li>
      </ul>
    </div>

    <div class="col-lg-3 col-md-6 mb-4 mb-lg-0">
      <h5 class="text-uppercase mb-4">Suscríbase a nuestro boletín de noticias</h5>

      <div class="form-outline form-white mb-4">
        <input type="email" id="form5Example2" class="form-control" placeholder="Introduce tu correo electronico"/>
        <button type="submit" class="btn btn-dark">Suscribirse</button>
      </div>
    </div>
  </div>
</div>

<!-- Copyright -->
<div class="text-center p-3 border-top border-white">
  © 2024 Copyright:
  <a class="text-white" href="#">pokemon.com</a>
</div>
</footer>
        `;
  document.querySelector(".spinner-border").style.display = "none";
  document.getElementById("carouselExampleRide").style.visibility = "visible";
}, 2000);

// Modals
        function actualizarInfoModal(pokemon) {
            let tipo = "";
            let habilidades = "";

            switch (pokemon) {
                case "kyurem":
                    tipo = "Dragon, Hielo";
                    habilidades = "Presión, Turbo Llama, Terravoltaje";
                    break;
                case "mewtwo":
                    tipo = "Psíquico";
                    habilidades = "Presión"
                    break;
                case "lucario":
                    tipo = "Lucha, Acero";
                    habilidades = "Impasible, Fuerza Mental, Justiciero";
                    break;
                case "rayquaza":
                    tipo = "Dragón, Volador";
                    habilidades = "Esclusa de aire, Levitación";
                    break;
                default:
                    break;
            }

            document.getElementById("tipo").innerText = tipo;
            document.getElementById("habilidades").innerText = habilidades;
        }
// Tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});