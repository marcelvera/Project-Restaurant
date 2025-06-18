document.addEventListener('DOMContentLoaded', () => {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  let contenedorDeCarrito = null;

  function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  function renderizarCarrito() {
    if (!contenedorDeCarrito) return;

    const lista = contenedorDeCarrito.querySelector('#carritoItems');
    lista.innerHTML = '';

    carrito.forEach((item, index) => {
      const li = document.createElement('li');
      li.className = 'flex items-center justify-between bg-gray-100 p-2 rounded shadow w-full';

      li.innerHTML = `
        <div class="flex items-center gap-2 w-full">
          <img src="${item.imagen}" alt="${item.nombre}" class="w-12 h-12 object-cover rounded" />
          <div class="flex-1">
            <h4 class="font-bold text-gray-800 text-sm">${item.nombre}</h4>
            <p class="text-sm text-gray-600">$${item.precio}</p>
          </div>
        </div>
        <button class="text-red-600 font-bold text-lg hover:text-red-800 ml-2" data-index="${index}">✕</button>
      `;

      lista.appendChild(li);
    });

    
    lista.querySelectorAll('button[data-index]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = e.target.getAttribute('data-index');
        carrito.splice(index, 1);
        guardarCarrito();
        renderizarCarrito();
      });
    });
  }

  function crearCarritoUI() {
    if (document.getElementById('contenedorDeCarrito')) return;

    contenedorDeCarrito = document.createElement('div');
    contenedorDeCarrito.id = 'contenedorDeCarrito';
    contenedorDeCarrito.className = `
      fixed top-24 right-4 w-80 max-h-96 bg-white rounded-xl shadow-lg border border-blue-400 z-50 p-4 overflow-y-auto
    `;

    contenedorDeCarrito.innerHTML = `
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold text-blue-700">🛒 Tu Carrito</h2>
        <button id="cerrarCarrito" class="text-red-600 font-bold text-xl hover:text-red-800">X</button>
      </div>
      <ul id="carritoItems" class="space-y-2 max-h-60 overflow-y-auto mb-4"></ul>
      <button id="finalizarCompra" class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 font-semibold">Finalizar Compra</button>
    `;

    document.body.appendChild(contenedorDeCarrito);

    document.getElementById('cerrarCarrito').addEventListener('click', () => {
      contenedorDeCarrito.remove();
      contenedorDeCarrito = null;
    });

    document.getElementById('finalizarCompra').addEventListener('click', () => {
      if (carrito.length > 0) {
        window.location.replace('compra.html')
      } else {
        alert('El carrito está vacío.');
      }
    });

    renderizarCarrito();
  }

  // Detectar botón toggle del carrito
  const toggleCarrito = document.getElementById('toggleCart');
  if (toggleCarrito) {
    toggleCarrito.addEventListener('click', (e) => {
      e.preventDefault();
      if (!contenedorDeCarrito) crearCarritoUI();
    });
  }

  // Detectar botones de productos para agregar al carrito
  const botonesAgregar = document.querySelectorAll('.btn-add-cart');

  botonesAgregar.forEach(btn => {
    btn.addEventListener('click', () => {
      const productoCard = btn.closest('div');
      const nombre = productoCard.querySelector('h2, h3').textContent;
      const precioTexto = productoCard.querySelector('p.text-green-600, p.font-semibold').textContent || '$0';
      const precio = precioTexto.replace('REF', '').replace('$', '').trim();
      const imagen = productoCard.querySelector('img')?.src || 'https://cdn-icons-png.flaticon.com/512/1046/1046750.png';

      const item = { nombre, precio, imagen };
      carrito.push(item);
      guardarCarrito();

      // Si el carrito está visible, actualizarlo al momento
      if (contenedorDeCarrito) renderizarCarrito();

      alert(`"${nombre}" fue añadido al carrito.`);
    });
  });
});
