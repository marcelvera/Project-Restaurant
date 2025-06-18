
let userList = JSON.parse(localStorage.getItem('userList')) || [{
  nombre: 'Marcel',
  email: 'marcelruiz234@gmail.com',
  password: 'Marcelvera08034885'
}];

let currentUser = null

class Usuario {
  constructor(nombUser, emailUser, passwordUser) {
    this.nombUserBack = nombUser
    this.emailUserBack = emailUser
    this.passwordUserBack = passwordUser
  }

  registrar() {
    const repetido = userList.some(user => user.email === this.emailUserBack)
    if (!repetido) {
      userList.push({
        nombre: this.nombUserBack,
        email: this.emailUserBack,
        password: this.passwordUserBack
      })
      alert("Usuario registrado exitosamente")
      localStorage.setItem('userList', JSON.stringify(userList)); 
    } else {
      alert("El correo ya está registrado")
    }
  }

  accesoUser() {
    for (let i = 0; i < userList.length; i++) {
      if (
        this.emailUserBack === userList[i].email &&
        this.passwordUserBack === userList[i].password
      ) {
        currentUser = userList[i]
      
        alert(`Bienvenido ${currentUser.nombre}`);
      
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        window.location.replace("index.html");
        return; 
      }
    }
    alert("Credenciales incorrectas");
  
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const storedUser = localStorage.getItem('currentUser');
  if (storedUser) {
    currentUser = JSON.parse(storedUser)
    actualizarHeader(); 
  } else {
    
    
    console.log("Usuario no ha iniciado seccion aun!");
  }
});

function actualizarHeader() {
  const headerUL = document.querySelector("header nav ul")
  headerUL.innerHTML = `
    <li class="bg-sky-50 p-2 rounded-2xl border-solid  border-r-4 border-r-blue-500  hover:bg-yellow-300">
      <a href="aboutUs.html">Acerca de</a>
    </li>
    <li class="bg-sky-50 p-2 rounded-2xl border-solid  border-r-4 border-r-blue-500  hover:bg-yellow-300">
      <a href="productos.html">Productos</a>
    </li>
    <li class="bg-sky-50 p-2 rounded-2xl border-solid border-r-4 border-r-blue-500  hover:bg-yellow-300">
      <a href="#" id="toggleCart">🛒 Carrito</a>
    <li class="relative">
      <a href="#" id="userDropdown" class="bg-sky-50 p-2 rounded-2xl border-solid border-r-4 border-r-blue-500 hover:bg-yellow-300 font-bold block">
        👤 ${currentUser.nombre}</a>
      <div id="userMenu" class="absolute right-0 mt-2 bg-white border border-blue-400 rounded shadow-lg hidden z-50">
        <button id="cerrarSesion" class="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 font-semibold">Cerrar sesión</button>
      </div>
    </li>
  `;

  setTimeout(() => {
    const userDropdown = document.getElementById('userDropdown');
    const userMenu = document.getElementById('userMenu');
    const cerrarSesionBtn = document.getElementById('cerrarSesion');

    userDropdown.addEventListener('click', (e) => {
      e.preventDefault(); // para que no suba al hacer click
      userMenu.classList.toggle('hidden');
    });

    cerrarSesionBtn.addEventListener('click', () => {
      localStorage.removeItem('currentUser');
      alert("Has cerrado sesión correctamente.");
      window.location.href = 'loginReg.html';
    });
  }, 100); // espera corta para asegurarse que el HTML esté renderizado
}

const acceso = document.getElementById("buttonAcceso")
const reg = document.getElementById("buttonReg")
const toggleForm = document.getElementById("toggle-form")
const loginForm = document.getElementById("form-login")
const registerForm = document.getElementById("form-register")
const formTitle = document.getElementById("form-title")
const emailUser = document.getElementById("emailUser")
const passwordUser = document.getElementById("passwordUser")
const nombUserNew = document.getElementById("nombUserNew")
const emailUserNew = document.getElementById("emailUserNew")
const passwordUserNew = document.getElementById("passwordUserNew")

toggleForm.addEventListener("click", () => {
  loginForm.classList.toggle("hidden");
  registerForm.classList.toggle("hidden");
  if (loginForm.classList.contains("hidden")) {
    formTitle.textContent = "Registro";
    toggleForm.textContent = "¿Ya tienes cuenta? Inicia sesión";
  } else {
    formTitle.textContent = "Iniciar Sesión";
    toggleForm.textContent = "¿No tienes cuenta? Regístrate aquí";
  }
});

acceso.addEventListener("click", () =>{

  const email = emailUser.value;   
  const password = passwordUser.value;

  const miUser = new Usuario(null, email, password)
  miUser.accesoUser()

})

reg.addEventListener("click", () => {

  const nombNew = nombUserNew.value
  const emailNew = emailUserNew.value
  const passwordNew = passwordUserNew.value

  const miUser = new Usuario(nombNew, emailNew, passwordNew)
  miUser.registrar()
  location.reload()

})