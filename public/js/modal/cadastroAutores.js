function autorMain() {
    let currentPage = 1; // Página atual
    let totalPages = 1;
    const itemsPerPage = 10; // Itens por página

    function cadastroAutorContent() {
        document.querySelector(".content").innerHTML = createCadastroAutorContent();
        document.getElementById('newAutorButton').addEventListener('click', openAddForm);
        document.getElementById('searchButton').addEventListener('click', searchAutores);
        document.getElementById('autorForm').addEventListener('submit', submitAutorForm);

        // Adiciona os eventos de navegação
        document.getElementById('firstPageButton').addEventListener('click', firstPage);
        document.getElementById('prevPageButton').addEventListener('click', prevPage);
        document.getElementById('nextPageButton').addEventListener('click', nextPage);
        document.getElementById('lastPageButton').addEventListener('click', lastPage);

        loadAutores(); // Carrega a lista de autores
    }

    function createCadastroAutorContent() {
        return `
        <div class="container">
            <div id="blackout" class="blackout" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 999; display: none;"></div>
            <main class="content" style="flex: 1; overflow: auto;">
                <h1>Lista de Autores</h1>
                ${createSearchAndNewAutorButtons()}
                <div id="autores-lista">
                    <!-- Lista de autores será carregada aqui -->
                </div>
                ${createPaginationControls()}
            </main>
            ${createOverlay()}
        </div>
        `;
    }

    function createSearchAndNewAutorButtons() {
        return `
        <div class="search-container" style="display: flex; align-items: center; margin-bottom: 20px;">
            <input type="text" id="searchBox" placeholder="Buscar por nome" style="flex: 1; padding: 10px; font-size: 16px; border: 1px solid #ddd; border-radius: 4px;" />
            <button id="searchButton" class="search-button btn btn-primary" style="margin-left: 10px;">
                <i class="fas fa-search"></i> Buscar
            </button>
            <button id="newAutorButton" class="new-autor-button btn btn-success" style="margin-left: 10px;">
                Novo Autor
            </button>
        </div>
        `;
    }

    function createOverlay() {
        return `
        <div id="overlay" class="overlay hide" style="position: fixed; top: 0; right: 0; width: 60%; height: 100%; background-color: #fff; box-shadow: -2px 0 5px rgba(0,0,0,0.5); z-index: 1000; transition: transform 0.3s ease, visibility 0.3s ease, opacity 0.3s ease; transform: translateX(100%); visibility: hidden; opacity: 0;">
            <div class="form-container" style="padding: 20px; height: 100%; overflow-y: auto; position: relative;">
                <span class="close-form" onclick="closeForm()" style="position: absolute; top: 10px; right: 10px; cursor: pointer; font-size: 24px; color: #333;">&times;</span>
                <h2>Cadastro de Autor</h2>
                ${createAutorForm()}
            </div>
        </div>
        `;
    }

    function createAutorForm() {
        return `
        <form id="autorForm">
            <input type="hidden" id="autorId" name="autorId">
            <div class="form-group full-width" style="width: 100%;">
                <label for="nome">Nome</label>
                <input type="text" id="nome" name="nome" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 5px;">
            </div>
            <button type="submit" class="btn btn-primary" style="margin-top: 10px; padding: 10px 20px; font-size: 16px; border-radius: 5px; background-color: #007bff; color: #fff; border: none;">Salvar</button>
        </form>
        `;
    }

    function firstPage() {
        if (currentPage > 1) {
            currentPage = 1;
            loadAutores();
        }
    }

    function lastPage() {
        if (currentPage < totalPages) {
            currentPage = totalPages;
            loadAutores();
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
            loadAutores();
        }
    }

    function nextPage() {
        if (currentPage < totalPages) {
            currentPage++;
            loadAutores();
        }
    }
    function openAddForm() {
        document.getElementById('autorId').value = '';
        document.getElementById('nome').value = '';
        document.getElementById('overlay').style.transform = 'translateX(0)';
        document.getElementById('overlay').style.visibility = 'visible';
        document.getElementById('overlay').style.opacity = '1';
    }


    function openEditForm(autor) {
        document.getElementById('autorId').value = autor.id;
        document.getElementById('nome').value = autor.nome;
        document.getElementById('overlay').style.transform = 'translateX(0)';
        document.getElementById('overlay').style.visibility = 'visible';
        document.getElementById('overlay').style.opacity = '1';
    }



    function closeForm() {
        document.getElementById('overlay').style.transform = 'translateX(100%)';
        document.getElementById('overlay').style.visibility = 'hidden';
        document.getElementById('overlay').style.opacity = '0';
    }

    function submitAutorForm(event) {
        event.preventDefault();
        const autorId = document.getElementById('autorId').value;
        const formData = {
            nome: document.getElementById('nome').value
        };

        const url = autorId ? `/api/autores/${autorId}` : '/api/autores';
        const method = autorId ? 'PUT' : 'POST';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao salvar autor');
                }
                return response.json();
            })
            .then(() => {
                Toastify({
                    text: autorId ? "Autor atualizado com sucesso!" : "Autor salvo com sucesso!",
                    duration: 3000,
                    close: true,
                    gravity: "top",
                    position: 'right',
                    backgroundColor: "#28a745"
                }).showToast();
                closeForm();
                loadAutores();
            })
            .catch(() => {
                Toastify({
                    text: "Erro ao salvar autor. Tente novamente.",
                    duration: 3000,
                    close: true,
                    gravity: "top",
                    position: 'right',
                    backgroundColor: "#dc3545"
                }).showToast();
            });
    }



    function loadAutores() {
        fetch(`/api/autores?page=${currentPage}&limit=${itemsPerPage}`)
            .then(response => response.json())
            .then(data => {
                totalPages = data.totalPages;  // Atualiza o valor de totalPages
                renderAutoresTable(data.data);
                updatePaginationControls();
            })
            .catch(error => {
                console.error('Erro ao carregar autores:', error);
            });
    }

    function renderAutoresTable(autores) {
        const autoresLista = document.getElementById('autores-lista');

        if (!autoresLista) {
            console.error('Elemento #autores-lista não encontrado!');
            return;
        }

        if (autores.length === 0) {
            autoresLista.innerHTML = '<p>Nenhum autor cadastrado.</p>';
            return;
        }

        let tableHtml = `
        <table class="autores-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th class="left-align">Nome</th>
                    <th class="left-align">Ações</th>
                </tr>
            </thead>
            <tbody>
        `;

        autores.forEach(autor => {
            tableHtml += `
            <tr>
                <td>${autor.id}</td>
                <td class="left-align">${autor.nome}</td>
                <td class="left-align">
                    <span class="edit-icon" data-id="${autor.id}" style="cursor: pointer; margin-right: 10px;">
                        <i class="fas fa-edit" style="color: #ffc107;"></i>
                    </span>
                    <span class="delete-icon" data-id="${autor.id}" style="cursor: pointer;">
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

        autoresLista.innerHTML = tableHtml;

        // Adiciona eventos para os ícones de editar e excluir
        document.querySelectorAll('.edit-icon').forEach(icon => {
            icon.addEventListener('click', (event) => {
                const autorId = event.currentTarget.getAttribute('data-id');
                fetch(`/api/autores/${autorId}`)
                    .then(response => response.json())
                    .then(autor => {
                        openEditForm(autor); // Abre o formulário com os dados do autor
                    })
                    .catch(() => {
                        Toastify({
                            text: "Erro ao carregar dados do autor.",
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
                const autorId = event.currentTarget.getAttribute('data-id');

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
                        fetch(`/api/autores/${autorId}`, {
                            method: 'DELETE',
                        })
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('Erro ao excluir autor');
                                }
                                return response.json();
                            })
                            .then(() => {
                                Swal.fire(
                                    'Excluído!',
                                    'O autor foi excluído com sucesso.',
                                    'success'
                                );
                                loadAutores(); // Recarrega a lista de autores
                            })
                            .catch(() => {
                                Swal.fire(
                                    'Erro!',
                                    'Erro ao excluir autor. Tente novamente.',
                                    'error'
                                );
                            });
                    }
                });
            });
        });
    }


    function searchAutores() {
        const searchTerm = document.getElementById('searchBox').value.toLowerCase();
        console.log('Buscando autores com o termo:', searchTerm);
        // Adicionar lógica de busca aqui se necessário
    }

    cadastroAutorContent();
}