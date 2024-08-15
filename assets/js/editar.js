const editarTabela = (user) => {
    const id = document.getElementById('idUser').value;

    if (!id) {
        getUsers();
        return;
    }
    
    document.getElementById('editUserId').value = user.id;
    document.getElementById('editName').value = user.name;
    document.getElementById('editUsername').value = user.username;
    document.getElementById('editEmail').value = user.email;
    document.getElementById('editStreet').value = user.address.street;
    document.getElementById('editCompany').value = user.company.name;

    const editModal = new bootstrap.Modal(document.getElementById('editModal'));
    editModal.show();
};

const salvarAlteracoes = () => {
    const id = document.getElementById('editUserId').value;
    const name = document.getElementById('editName').value;
    const username = document.getElementById('editUsername').value;
    const email = document.getElementById('editEmail').value;
    const street = document.getElementById('editStreet').value;
    const company = document.getElementById('editCompany').value;

    console.log('Dados atualizados:', { id, name, username, email, street, company });

    const tbody = document.getElementById('tbody');
    const rows = tbody.querySelectorAll(`tr[data-id="${id}"]`);
    rows.forEach(row => {
        row.querySelector('td:nth-child(2)').textContent = name;
        row.querySelector('td:nth-child(3)').textContent = username;
        row.querySelector('td:nth-child(4)').textContent = email;
        row.querySelector('td:nth-child(5)').textContent = street;
        row.querySelector('td:nth-child(6)').textContent = company;
    });

    const editModal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
    editModal.hide();
};

const buscarUsuario = () => {
    const id = document.getElementById('idUser').value;

    if (!id) {
        getUsers();
        return;
    }

    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('#tbody');
            tbody.innerHTML = '';

            const tr = document.createElement('tr');

            const th = document.createElement('th');
            th.textContent = data.id;
            tr.appendChild(th);

            const tdName = document.createElement('td');
            tdName.textContent = data.name;
            tr.appendChild(tdName);

            const tdUsername = document.createElement('td');
            tdUsername.textContent = data.username;
            tr.appendChild(tdUsername);

            const tdEmail = document.createElement('td');
            tdEmail.textContent = data.email;
            tr.appendChild(tdEmail);

            const tdStreet = document.createElement('td');
            tdStreet.textContent = data.address.street;
            tr.appendChild(tdStreet);

            const tdCompany = document.createElement('td');
            tdCompany.textContent = data.company.name;
            tr.appendChild(tdCompany);

            tbody.appendChild(tr);
        })
        .catch(error => console.error('Erro ao buscar usuário:', error));
};

const limparTabela = () => {
    document.getElementById('tbody').innerHTML = '';
};
const mostrarListaCompleta = () => {
    const tbody = document.getElementById('tbody');
    const users = [
        {
            id: '1',
            name: 'João da Silva',
            username: 'joaodasilva',
            email: 'joao@example.com',
            address: { street: 'Rua Fictícia, 123' },
            company: { name: 'Empresa Fictícia' }
        }
    ];

    tbody.innerHTML = '';
    users.forEach(user => {
        const row = document.createElement('tr');
        row.setAttribute('data-id', user.id);
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.address.street}</td>
            <td>${user.company.name}</td>
            <td><button class="btn btn-outline-primary" onclick="editarTabela(${JSON.stringify(user)})">Editar</button></td>
        `;
        tbody.appendChild(row);
    });
};
