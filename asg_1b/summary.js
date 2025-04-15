window.onload = function () {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/users", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const users = JSON.parse(xhr.responseText);
            const table = document.getElementById("userData");
            table.innerHTML = ""; 

            users.forEach(user => {
                const row = `<tr>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.mobile}</td>
                    <td>${user.address}</td>
                    <td>${user.city}</td>
                    <td>${user.hobbies}</td>
                    <td>${user.gender}</td>
                </tr>`;
                table.innerHTML += row;
            });
        }
    };

    xhr.send();
};
