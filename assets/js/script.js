// IIFE para asegurar que nuestro código se ejecute al cargar la página
(function() {
    // Módulo que maneja la lógica de la aplicación
    const UserModule = (() => {
      // URL de la API
      const apiUrl = 'https://randomuser.me/api/?results=10';
  
      // Función para realizar la petición a la API
      const fetchUsers = async () => {
        try {
          const response = await fetch(apiUrl);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          return data.results;
        } catch (error) {
          console.error('Error fetching users:', error);
          return [];
        }
      };
  
      // Función para mostrar los usuarios en el DOM
      const displayUsers = (users) => {
        const userDataDiv = document.getElementById('user-data');
        userDataDiv.innerHTML = ''; // Limpiar cualquier contenido previo
  
        const userList = document.createElement('ul'); // Crear una lista desordenada
  
        users.forEach(user => {
          const userItem = document.createElement('li'); // Crear un elemento de lista
  
          // Crear y añadir elementos al userItem
          userItem.innerHTML = `
            <img src="${user.picture.medium}" alt="${user.name.first} ${user.name.last}">
            <p>Nombre: ${user.name.first} ${user.name.last}</p>
            <p>País: ${user.location.country}</p>
            <p>Email: ${user.email}</p>
            <p>Fono: ${user.phone}</p>
            <p>Celular: ${user.cell}</p>
          `;
  
          userList.appendChild(userItem); // Añadir el elemento de lista a la lista desordenada
        });
  
        userDataDiv.appendChild(userList); // Añadir la lista desordenada al contenedor principal
      };
  
      // Función principal para inicializar el módulo
      const init = async () => {
        const users = await fetchUsers();
        displayUsers(users);
      };
  
      // Exponer la función init para ser llamada desde fuera del módulo
      return {
        init
      };
    })();
  
    // Ejecutar la función init al cargar la página
    UserModule.init();
  })();
  