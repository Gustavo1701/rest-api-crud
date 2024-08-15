const totalUsuario = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then(data => {
            const total = data.length;

            if (total > 1) {
                document.getElementById('total').textContent = total + " usuários.";
            } else {
                document.getElementById('total').textContent = total + " usuário.";
            }

        })

};

const mostrarListaCompleta = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
            const users = data;
            const tbody = document.querySelector('#tbody');
            tbody.innerHTML = '';

            users.forEach(u => {
                const tr = document.createElement('tr');

                const th = document.createElement('th');
                th.textContent = u.id;
                tr.appendChild(th);

                const tdName = document.createElement('td');
                tdName.textContent = u.name;
                tr.appendChild(tdName);

                const tdUsername = document.createElement('td');
                tdUsername.textContent = u.username;
                tr.appendChild(tdUsername);

                const tdEmail = document.createElement('td');
                tdEmail.textContent = u.email;
                tr.appendChild(tdEmail);

                const tdStreet = document.createElement('td');
                tdStreet.textContent = u.address.street;
                tr.appendChild(tdStreet);

                const tdCompany = document.createElement('td');
                tdCompany.textContent = u.company.name;
                tr.appendChild(tdCompany);

                tbody.appendChild(tr);
            });
        })
        .catch(error => console.error('Erro ao buscar usuários:', error));
};

const buscarUsuario = () => {
    const id = document.getElementById('idUser').value;

    if (id >= 1 && id <= 100) {
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
    } else {
        alert('Id inválido');
    }



};

const editarUsuario = () => {
    const nomeAtt = document.getElementById('inputNome-layoutGet');
    const userNameAtt = document.getElementById('inputNomeUser-layoutGet');
    const emailAtt = document.getElementById('inputEmail-layoutGet');
    const enderecoAtt = document.getElementById('inputEndereco-layoutGet');
    const empresaAtt = document.getElementById('inputEmpresa-layoutGet');

    fetch(`https://jsonplaceholder.typicode.com/user/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id,
            nome: nomeAtt,
            username: userNameAtt,
            email: emailAtt,
            address: enderecoAtt,
            company: empresaAtt
        })
    })
        .then(response => response.json())
        .then(json => console.log(JSON.stringify(json, null, 6)))


}

const excluirUsuario = () => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'DELETE',

    })
        .then(response => response.json())
        .then(json => console.log(JSON.stringify(json, null, 4)))

        alert('O Usuário ' +id+ ' foi excluido')
}

const limparTabela = () => {
    const tbody = document.querySelector('#tbody');
    tbody.innerHTML = '';
    document.getElementById('idUser').value = '';
    document.getElementById('total').textContent = '';
};

document.addEventListener('DOMContentLoaded', () => {
    getUsers();
});

const exibirLayout = (layoutId) => {
    document.querySelectorAll('[id^="layout"]').forEach(el => el.classList.add('hidden'));
    document.getElementById(layoutId).classList.remove('hidden');
};

document.getElementById('metodoGet').addEventListener('click', () => exibirLayout('layoutGet'));
document.getElementById('metodoPut').addEventListener('click', () => exibirLayout('layoutPut'));
document.getElementById('metodoDelete').addEventListener('click', () => exibirLayout('layoutDelete'));

