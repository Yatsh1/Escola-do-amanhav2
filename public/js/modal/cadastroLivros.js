function livroMain() {
    setupCadastroLivro();
}

function setupCadastroLivro() {
    document.querySelector(".content").innerHTML = createCadastroLivroContent();
    setupEventListeners();
}

function createCadastroLivroContent() {
    return `
        <div class="container">
            <div id="blackout" class="blackout" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 999; display: none;"></div>
            <main class="content" style="flex: 1; overflow: auto;">
                <h1>Lista de Livros</h1>
                ${createSearchAndNewButton()}
                <div id="livros-lista">
                    <!-- Lista de livros será carregada aqui -->
                </div>
            </main>
        </div>
        ${createOverlay()}
    `;
}

function createSearchAndNewButton() {
    return `
        <div class="search-container" style="display: flex; align-items: center; margin-bottom: 20px;">
            <input type="text" id="searchBox" placeholder="Buscar por nome, gênero, etc." style="flex: 1; padding: 10px; font-size: 16px; border: 1px solid #ddd; border-radius: 4px;" />
            <button id="searchButton" class="search-button" style="background-color: #007bff; color: white; border: none; border-radius: 4px; padding: 10px 15px; font-size: 16px; cursor: pointer; margin-left: 10px;">
                <i class="fas fa-search"></i>
            </button>
            <button id="newLivroButton" class="new-livro-button" style="background-color: #007bff; color: white; border: none; border-radius: 4px; padding: 10px 15px; font-size: 16px; cursor: pointer; margin-left: 10px;">
            Novo Livro
            </button>
        </div>
    `;
}

function createOverlay() {
    return `
        <div id="overlay" class="overlay hide" style="position: fixed; top: 0; right: 0; width: 60%; height: 100%; background-color: #fff; box-shadow: -2px 0 5px rgba(0,0,0,0.5); z-index: 1000; transition: transform 0.3s ease, visibility 0.3s ease, opacity 0.3s ease; transform: translateX(100%); visibility: hidden; opacity: 0;">
            <div class="form-container" style="padding: 20px; height: 100%; overflow-y: auto; position: relative;">
                <span class="close-form" onclick="closeForm()" style="position: absolute; top: 10px; right: 10px; cursor: pointer; font-size: 24px; color: #333;">&times;</span>
                <h2>Cadastro de Livros</h2>
                <form id="livroForm">
                    ${createFormFields()}
                    <button type="submit" style="background-color: #007bff; color: white; border: none; border-radius: 4px; padding: 10px 15px; font-size: 16px; cursor: pointer;">Salvar</button>
                </form>
            </div>
        </div>
    `;
}

function createFormFields() {
    return `
        <input type="hidden" id="livroId" name="livroId">
        <div class="form-row" style="display: flex; flex-wrap: wrap; gap: 15px;">
            <div class="form-group" style="flex: 1; min-width: calc(50% - 15px);">
                <label for="nome">Título</label>
                <input type="text" id="nome" name="nome" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 5px;">
            </div>
        </div>
        ${createSelectFields()}
    `;
}

function createSelectFields() {
    return `
        <div class="form-row" style="display: flex; flex-wrap: wrap; gap: 25px;">
            ${createAuthorSelect()}
            ${createPublisherSelect()}
            ${createGenreSelect()}
        </div>
    `;
}

function createAuthorSelect() {
    return `
        <div class="form-group" style="flex: 1; min-width: calc(50% - 12.5px);">
            <select name="author" class="select-author" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 5px;">
                <option value="">Selecione um autor(a)</option>
                <option value="opcao1">Paulo Coelho</option>
                <option value="opcao2">Augusto Cury</option>
                <option value="opcao3">J.K Rowling</option>
                <option value="opcao4">George R.R. Martin</option>
                <option value="opcao5">Stephen King</option>
                <option value="opcao6">Robert C. Martin</option>
                <option value="opcao7">Martin Fowler</option>
                <option value="opcao8">Andrew Tanenbaum</option>
                <option value="opcao9">James Gosling</option>
                <option value="opcao10">Grady Booch</option>
            </select>
        </div>
    `;
}

function createPublisherSelect() {
    return `
        <div class="form-group" style="flex: 1; min-width: calc(50% - 12.5px);">
            <select name="publisher" class="select-publisher" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 5px;">
                <option value="">Selecione uma editora</option>
                <option value="opcao1">Editora Atlas</option>
                <option value="opcao2">Editora Pearson</option>
                <option value="opcao3">Editora Saraiva</option>
                <option value="opcao4">Editora Novatec</option>
                <option value="opcao5">Editora Ciência Moderna</option>
            </select>
        </div>
    `;
}

function createGenreSelect() {
    return `
        <div class="form-group" style="flex: 1; min-width: calc(50% - 12.5px);">
            <select name="genre" class="select-genre" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 5px;">
                <option value="">Selecione um gênero</option>
                <option value="opcao1">Informática</option>
                <option value="opcao2">Mecânica</option>
                <option value="opcao3">Eletrônica</option>
                <option value="opcao4">Engenharia</option>
                <option value="opcao5">Administração</option>
                <option value="opcao6">Literatura</option>
                <option value="opcao7">Ciências Exatas</option>
                <option value="opcao8">Educação</option>
                <option value="opcao9">Psicologia</option>
                <option value="opcao10">Direito</option>
            </select>
        </div>
    `;
}

function setupEventListeners() {
    document.getElementById('newLivroButton').addEventListener('click', openForm);
    document.getElementById('searchButton').addEventListener('click', searchLivros);
    document.getElementById('livroForm').addEventListener('submit', handleFormSubmit);
}

function openForm() {
    document.getElementById('overlay').style.transform = 'translateX(0)';
    document.getElementById('overlay').style.visibility = 'visible';
    document.getElementById('overlay').style.opacity = '1';
}

function closeForm() {
    document.getElementById('overlay').style.transform = 'translateX(100%)';
    document.getElementById('overlay').style.visibility = 'hidden';
    document.getElementById('overlay').style.opacity = '0';
}

function searchLivros() {
    const searchTerm = document.getElementById('searchBox').value.toLowerCase();
    console.log('Buscando livros com o termo:', searchTerm);
}

function handleFormSubmit(ev) {
    ev.preventDefault();
    console.log("Preventing default");
    alert("Formulário enviado com sucesso!");
}