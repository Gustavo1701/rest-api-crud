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

                // Adiciona as células para os botões de editar e excluir
                const tdEdit = document.createElement('td');
                const btnEdit = document.createElement('button');
                btnEdit.className = 'btn btn-warning btn-sm';
                btnEdit.innerHTML = '<i class="fas fa-edit"></i>';
                btnEdit.onclick = () => {
                    alert('Editar clicado'); // Substitua pelo código real de edição
                };
                tdEdit.appendChild(btnEdit);
                tr.appendChild(tdEdit);

                const tdDelete = document.createElement('td');
                const btnDelete = document.createElement('button');
                btnDelete.className = 'btn btn-danger btn-sm';
                btnDelete.innerHTML = '<i class="fas fa-trash"></i>';
                btnDelete.onclick = () => {
                    alert('Excluir clicado'); // Substitua pelo código real de exclusão
                };
                tdDelete.appendChild(btnDelete);
                tr.appendChild(tdDelete);

                tbody.appendChild(tr);
            });
        })
        .catch(error => console.error('Erro ao buscar usuários:', error));
};

const buscarUsuario = () => {
    const id = document.getElementById('idUser').value;

    if (id >= 1 && id <= 10) {
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

                // Adiciona as células para os botões de editar e excluir
                const tdEdit = document.createElement('td');
                const btnEdit = document.createElement('button');
                btnEdit.className = 'btn btn-warning btn-sm';
                btnEdit.innerHTML = '<i class="fas fa-edit"></i>';
                btnEdit.onclick = () => {
                    const modal = new bootstrap.Modal(document.getElementById('editModal'));
                    modal.show(); // Substitua pelo código real de edição
                };
                tdEdit.appendChild(btnEdit);
                tr.appendChild(tdEdit);

                const tdDelete = document.createElement('td');
                const btnDelete = document.createElement('button');
                btnDelete.className = 'btn btn-danger btn-sm';
                btnDelete.innerHTML = '<i class="fas fa-trash"></i>';
                btnDelete.onclick = () => {
                    alert('Excluir clicado'); // Substitua pelo código real de exclusão
                };
                tdDelete.appendChild(btnDelete);
                tr.appendChild(tdDelete);

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

    // Cria um objeto de dados que só inclui os campos que foram preenchidos
    const dadosAtualizados = {};
    if (nomeAtt) dadosAtualizados.nome = nomeAtt;
    if (userNameAtt) dadosAtualizados.username = userNameAtt;
    if (emailAtt) dadosAtualizados.email = emailAtt;
    if (enderecoAtt) dadosAtualizados.address = enderecoAtt;
    if (empresaAtt) dadosAtualizados.company = empresaAtt;

    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosAtualizados)
    })
        .then(response => response.json())
        .then(json => console.log(JSON.stringify(json, null, 6)))
        .catch(error => console.error('Erro:', error));


}

const excluirUsuario = () => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'DELETE',

    })
        .then(response => response.json())
        .then(json => console.log(JSON.stringify(json, null, 4)))

    alert('O Usuário ' + id + ' foi excluido')
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

// Função para exibir o layout desejado e esconder os outros
const exibirLayout = (layoutId) => {
    document.querySelectorAll('[id^="layout"]').forEach(el => el.classList.add('hidden'));
    document.getElementById(layoutId).classList.remove('hidden');
};

// Adiciona eventos de clique para os botões de navegação
document.getElementById('nvUsers').addEventListener('click', () => exibirLayout('layoutUsers'));
document.getElementById('nvCep').addEventListener('click', () => exibirLayout('layoutCep'));

// Garante que o layout inicial seja exibido ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    exibirLayout('layoutUsers'); // Exibe o layoutUsers por padrão
});


/////////////////////  CEP   ////////////////////////
//console.log('js link');
const cep = document.querySelector('#cep');

const consultaCep = async () => {
    let cepValue = cep.value;
    console.log(cepValue);

    if (cepValue.length === 8) {
        try {
            const response =
                await axios.get(`https://brasilapi.com.br/api/cep/v2/${cepValue}`);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }
}
//consultaCep('60420670')
