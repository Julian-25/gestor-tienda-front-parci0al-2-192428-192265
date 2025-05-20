const listUsers = async () => {
  try {
    const response = await fetch("https://api.escuelajs.co/api/v1/users");
    const users = await response.json();

    let tableBody = ``;

    users.forEach((user) => {
      tableBody += `
        <tr>
          <td>${user.id}</td>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td><img src="${user.avatar}" alt="avatar" width="40" height="40" class="rounded-circle"/></td>
          <td>${user.role}</td>
        </tr>`;
    });

    document.getElementById("tableBody_Users").innerHTML = tableBody;
  } catch (error) {
    console.error("Error al cargar los usuarios:", error);
  }
};

window.addEventListener("load", () => {
  listUsers();
});
