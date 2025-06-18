document.addEventListener('DOMContentLoaded', () => {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const resumen = document.getElementById('resumenCarrito');
  const btnFinalizar = document.getElementById('btnFinalizar');

  let precioFinal = 0;

  // Mostrar productos del carrito
  carrito.forEach(producto => {
    const precio = parseFloat(producto.precio); // Convertir a número
    precioFinal += precio;

    const li = document.createElement('li');
    li.className = 'flex gap-4 items-center border p-2 rounded-lg shadow-sm';
    li.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" class="w-14 h-14 object-cover rounded">
      <div class="flex-1">
        <p class="font-bold text-gray-800 text-sm">${producto.nombre}</p>
        <p class="text-sm text-gray-600">$${producto.precio}</p>
      </div>
    `;
    resumen.appendChild(li);
  });

  // Crear y mostrar precio total
  const totalDiv = document.createElement('div');
  totalDiv.className = 'mt-6 text-right';
  totalDiv.innerHTML = `
    <p class="text-lg font-bold text-green-700">Total: $${precioFinal.toFixed(2)}</p>
  `;
  resumen.appendChild(totalDiv);

  // Botón finalizar compra
  btnFinalizar.addEventListener('click', () => {
    alert('Compra Finalizada');
    localStorage.removeItem('carrito');
    setTimeout(() => {
      window.location.replace('index.html');
    }, 1000);
  });
});
