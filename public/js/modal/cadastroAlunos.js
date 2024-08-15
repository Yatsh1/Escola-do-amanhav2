function alunoMain() {
    let currentPage = 1; // Página atual
    let totalPages = 1;
    const itemsPerPage = 10; // Itens por página

    function cadastroAlunoContent() {
        document.querySelector(".content").innerHTML = createCadastroAlunoContent();
        document.getElementById('newAlunoButton').addEventListener('click', openAddForm);
        document.getElementById('searchButton').addEventListener('click', searchAlunos);
        document.getElementById('alunoForm').addEventListener('submit', submitAlunoForm);

        // Adiciona os eventos de navegação
        document.getElementById('firstPageButton').addEventListener('click', firstPage);
        document.getElementById('prevPageButton').addEventListener('click', prevPage);
        document.getElementById('nextPageButton').addEventListener('click', nextPage);
        document.getElementById('lastPageButton').addEventListener('click', lastPage);

        loadTurmas();
        loadAlunos(); // Carrega a lista de alunos
    }


    function createCadastroAlunoContent() {
        return `
        <div class="container">
            <div id="blackout" class="blackout" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 999; display: none;"></div>
            <main class="content" style="flex: 1; overflow: auto;">
                <h1>Lista de Alunos</h1>
                ${createSearchAndNewAlunoButtons()}
                <div id="alunos-lista">
                    <!-- Lista de alunos será carregada aqui -->
                </div>
                ${createPaginationControls()}
            </main>
            ${createOverlay()}
        </div>
        `;
    }

    function createSearchAndNewAlunoButtons() {
        return `
        <div class="search-container" style="display: flex; align-items: center; margin-bottom: 20px;">
            <input type="text" id="searchBox" placeholder="Buscar por nome" style="flex: 1; padding: 10px; font-size: 16px; border: 1px solid #ddd; border-radius: 4px;" />
            <button id="searchButton" class="search-button btn btn-primary" style="margin-left: 10px;">
                <i class="fas fa-search"></i> Buscar
            </button>
            <button id="newAlunoButton" class="new-aluno-button btn btn-success" style="margin-left: 10px;">
                Novo Aluno
            </button>
        </div>
        `;
    }

    function createOverlay() {
        return `
        <div id="overlay" class="overlay hide" style="position: fixed; top: 0; right: 0; width: 60%; height: 100%; background-color: #fff; box-shadow: -2px 0 5px rgba(0,0,0,0.5); z-index: 1000; transition: transform 0.3s ease, visibility 0.3s ease, opacity 0.3s ease; transform: translateX(100%); visibility: hidden; opacity: 0;">
            <div class="form-container" style="padding: 20px; height: 100%; overflow-y: auto; position: relative;">
                <span class="close-form" onclick="closeForm()" style="position: absolute; top: 10px; right: 10px; cursor: pointer; font-size: 24px; color: #333;">&times;</span>
                <h2>Cadastro de Aluno</h2>
                ${createAlunoForm()}
            </div>
        </div>
        `;
    }

    function createAlunoForm() {
        return `
        <form id="alunoForm">
            <input type="hidden" id="alunoId" name="alunoId">
            <div class="form-group full-width" style="width: 100%;">
                <label for="nome">Nome</label>
                <input type="text" id="nome" name="nome" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 5px;">
            </div>
            <div class="form-group full-width" style="width: 100%;">
                <label for="matricula">Matrícula</label>
                <input type="text" id="matricula" name="matricula" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 5px;">
            </div>
            <div class="form-group full-width" style="width: 100%;">
                <label for="email">E-mail</label>
                <input type="email" id="email" name="email" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 5px;">
            </div>
            <div class="form-group full-width" style="width: 100%;">
                <label for="telefone">Telefone</label>
                <input type="text" id="telefone" name="telefone" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 5px;">
            </div>
            <div class="form-group full-width" style="width: 100%;">
                <label for="endereco">Endereço</label>
                <input type="text" id="endereco" name="endereco" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 5px;">
            </div>
            <div class="form-group full-width" style="width: 50%;">
                <label for="fk_turma_id">ID da Turma</label>
                <select style="width: 50%; padding: 8px; border: 1px solid #ddd; border-radius: 5px;" id="fk_turma_id" name="fk_turma_id"></select>
            </div>
            <button type="submit" class="btn btn-primary" style="margin-top: 10px; padding: 10px 20px; font-size: 16px; border-radius: 5px; background-color: #007bff; color: #fff; border: none;">
                Salvar
            </button>
        </form>
        `;
    }


    function firstPage() {
        if (currentPage > 1) {
            currentPage = 1;
            loadAlunos();
        }
    }

    function lastPage() {
        if (currentPage < totalPages) {
            currentPage = totalPages;
            loadAlunos();
        }
    }

    function createPaginationControls() {
        return `
        <div id="pagination-controls">
            <button id="firstPageButton" class="btn" ${currentPage === 1 ? 'disabled' : ''}>
                <i class="fas fa-angle-double-left"></i>
            </button>
            <button id="prevPageButton" class="btn" ${currentPage === 1 ? 'disabled' : ''}>
                <i class="fas fa-angle-left"></i>
            </button>
            <span id="pagination-info" style="margin: 0 10px;">Página ${currentPage}</span>
            <button id="nextPageButton" class="btn" ${currentPage === totalPages ? 'disabled' : ''}>
                <i class="fas fa-angle-right"></i>
            </button>
            <button id="lastPageButton" class="btn" ${currentPage === totalPages ? 'disabled' : ''}>
                <i class="fas fa-angle-double-right"></i>
            </button>
        </div>
        `;
    }

    function updatePaginationControls() {
        document.getElementById('pagination-info').innerText = `Página ${currentPage} de ${totalPages}`;

        document.getElementById('firstPageButton').disabled = currentPage === 1;
        document.getElementById('prevPageButton').disabled = currentPage === 1;
        document.getElementById('nextPageButton').disabled = currentPage === totalPages;
        document.getElementById('lastPageButton').disabled = currentPage === totalPages;
    }

    function prevPage() {
        if (currentPage > 1) {
            currentPage--;
            loadAlunos();
        }
    }

    function nextPage() {
        if (currentPage < totalPages) {
            currentPage++;
            loadAlunos();
        }
    }

    function clearForm() {
        document.getElementById('alunoId').value = '';
        document.getElementById('nome').value = '';
        document.getElementById('matricula').value = '';
        document.getElementById('email').value = '';
        document.getElementById('telefone').value = '';
        document.getElementById('endereco').value = '';
        document.getElementById('fk_turma_id').value = '';
    }
    function openAddForm() {
        clearForm()
        document.getElementById('overlay').style.transform = 'translateX(0)';
        document.getElementById('overlay').style.visibility = 'visible';
        document.getElementById('overlay').style.opacity = '1';
    }


    function openEditForm(aluno) {
        document.getElementById('alunoId').value = aluno.id;
        document.getElementById('nome').value = aluno.nome;
        document.getElementById('matricula').value = aluno.matricula;
        document.getElementById('email').value = aluno.email;
        document.getElementById('telefone').value = aluno.telefone;
        document.getElementById('endereco').value = aluno.endereco;
        document.getElementById('fk_turma_id').value = aluno.fk_turma_id;
        document.getElementById('overlay').style.transform = 'translateX(0)';
        document.getElementById('overlay').style.visibility = 'visible';
        document.getElementById('overlay').style.opacity = '1';
    }



    function closeForm() {
        document.getElementById('overlay').style.transform = 'translateX(100%)';
        document.getElementById('overlay').style.visibility = 'hidden';
        document.getElementById('overlay').style.opacity = '0';
    }

    function submitAlunoForm(event) {
        event.preventDefault();

        // Obter os valores dos campos do formulário
        const alunoId = document.getElementById('alunoId').value;
        const formData = {
            nome: document.getElementById('nome').value,
            matricula: document.getElementById('matricula').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('telefone').value,
            endereco: document.getElementById('endereco').value,
            fk_turma_id: parseInt(document.getElementById('fk_turma_id').value, 10),
        };

        const url = alunoId ? `/api/alunos/${alunoId}` : '/api/alunos';
        const method = alunoId ? 'PUT' : 'POST';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao salvar aluno');
                }
                return response.json();
            })
            .then(() => {
                Toastify({
                    text: alunoId ? "Aluno atualizado com sucesso!" : "Aluno salvo com sucesso!",
                    duration: 3000,
                    close: true,
                    gravity: "top",
                    position: 'right',
                    backgroundColor: "#28a745"
                }).showToast();
                closeForm();
                loadAlunos();
            })
            .catch(error => {
                Toastify({
                    text: `Erro ao salvar aluno. Tente novamente. ${error.message}`,
                    duration: 3000,
                    close: true,
                    gravity: "top",
                    position: 'right',
                    backgroundColor: "#dc3545"
                }).showToast();
            });
    }



    function loadAlunos() {
        fetch(`/api/alunos?page=${currentPage}&limit=${itemsPerPage}`)
            .then(response => response.json())
            .then(data => {
                totalPages = data.totalPages;  // Atualiza o valor de totalPages
                renderAlunosTable(data.data);
                updatePaginationControls();
            })
            .catch(error => {
                console.error('Erro ao carregar alunos:', error);
            });
    }

    function renderAlunosTable(alunos) {
        const alunosLista = document.getElementById('alunos-lista');

        if (!alunosLista) {
            console.error('Elemento #alunos-lista não encontrado!');
            return;
        }

        if (alunos.length === 0) {
            alunosLista.innerHTML = '<p>Nenhum aluno cadastrado.</p>';
            return;
        }

        let tableHtml = `
        <table class="alunos-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th class="left-align">Nome</th>
                    <th class="left-align">Telefone</th>
                    <th class="left-align">Matricula</th>
                    <th class="left-align">ID Turma</th>
                    <th class="left-align">Email</th>
                    <th class="left-align">Endereco</th>
                    <th class="left-align">Ações</th>
                </tr>
            </thead>
            <tbody>
        `;

        alunos.forEach(aluno => {
            tableHtml += `
            <tr>
                <td>${aluno.id}</td>
                <td class="left-align">${aluno.nome}</td>
                <td class="left-align">${aluno.telefone}</td>
                <td class="left-align">${aluno.matricula}</td>
                <td class="left-align">${aluno.fk_turma_id}</td>
                <td class="left-align">${aluno.email}</td>
                <td class="left-align">${aluno.endereco}</td>
                <td class="left-align">
                    <span class="edit-icon" data-id="${aluno.id}" style="cursor: pointer; margin-right: 10px;">
                        <i class="fas fa-edit" style="color: #ffc107;"></i>
                    </span>
                    <span class="delete-icon" data-id="${aluno.id}" style="cursor: pointer;">
                        <i class="fas fa-trash" style="color: #dc3545;"></i>
                    </span>
                </td>
            </tr>
            `;
        });

        tableHtml += `
            </tbody>
        </table>
        `;

        alunosLista.innerHTML = tableHtml;

        // Adiciona eventos para os ícones de editar e excluir
        document.querySelectorAll('.edit-icon').forEach(icon => {
            icon.addEventListener('click', (event) => {
                const alunoId = event.currentTarget.getAttribute('data-id');
                fetch(`/api/alunos/${alunoId}`)
                    .then(response => response.json())
                    .then(aluno => {
                        openEditForm(aluno); // Abre o formulário com os dados do aluno
                    })
                    .catch(() => {
                        Toastify({
                            text: "Erro ao carregar dados do aluno.",
                            duration: 3000,
                            close: true,
                            gravity: "top",
                            position: 'right',
                            backgroundColor: "#dc3545"
                        }).showToast();
                    });
            });
        });


        document.querySelectorAll('.delete-icon').forEach(icon => {
            icon.addEventListener('click', (event) => {
                const alunoId = event.currentTarget.getAttribute('data-id');

                // Usando SweetAlert para confirmação
                Swal.fire({
                    title: 'Tem certeza?',
                    text: "Você não poderá reverter isso!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sim, exclua!',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        fetch(`/api/alunos/${alunoId}`, {
                            method: 'DELETE',
                        })
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('Erro ao excluir aluno');
                                }
                                return response.json();
                            })
                            .then(() => {
                                Swal.fire(
                                    'Excluído!',
                                    'O aluno foi excluído com sucesso.',
                                    'success'
                                );
                                loadAlunos(); // Recarrega a lista de alunos
                            })
                            .catch(() => {
                                Swal.fire(
                                    'Erro!',
                                    'Erro ao excluir aluno. Tente novamente.',
                                    'error'
                                );
                            });
                    }
                });
            });
        });
    }


    function searchAlunos() {
        const searchTerm = document.getElementById('searchBox').value.toLowerCase();
        console.log('Buscando alunos com o termo:', searchTerm);
        // Adicionar lógica de busca aqui se necessário
    }

    loadTurmas = function loadTurmas() {
        fetch('/api/turmas') // Substitua com o endpoint correto que fornece as turmas
            .then(response => response.json())
            .then(turmas => {
                populateTurmasSelect(turmas);
            })
            .catch(error => {
                console.error('Erro ao carregar turmas:', error);
            });
    }

    function populateTurmasSelect(turmas) {
        const fkTurmaSelect = document.getElementById('fk_turma_id');

        // Limpa as opções existentes
        fkTurmaSelect.innerHTML = '';

        // Adiciona uma opção padrão
        const defaultOption = document.createElement('option');
        defaultOption.text = 'Selecione uma turma';
        defaultOption.value = '';
        fkTurmaSelect.appendChild(defaultOption);

        // Adiciona as opções das turmas
        turmas.forEach(turma => {
            const option = document.createElement('option');
            option.value = turma.id;
            option.text = turma.nome; // Supondo que você tenha um campo `nome` para exibir
            fkTurmaSelect.appendChild(option);
        });
    }

    cadastroAlunoContent();
}