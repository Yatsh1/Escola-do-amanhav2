function professorMain() {

    function createCadastroProfessorContent() {
        return `
        <div class="container">
        <div id="blackout" class="blackout" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 999; display: none;"></div>
        <main class="content" style="flex: 1; overflow: auto;">
        <h1>Lista de professores</h1>
        ${createSearchAndNewProfessorButtons()}
        <div id="professores-lista">
        <!-- Lista de professores será carregada aqui -->
        </div>
        </main>
        </div>
        ${createOverlay()}
        `;
    }

    function createSearchAndNewProfessorButtons() {
        return `
        <div class="search-container" style="display: flex; align-items: center; margin-bottom: 20px;">
        <input type="text" id="searchBox" placeholder="Buscar por nome, telefone, etc." style="flex: 1; padding: 10px; font-size: 16px; border: 1px solid #ddd; border-radius: 4px;" />
        <button id="searchButton" class="search-button" style="background-color: #007bff; color: white; border: none; border-radius: 4px; padding: 10px 15px; font-size: 16px; cursor: pointer; margin-left: 10px;">
        <i class="fas fa-search"></i>
        </button>
        <button id="newProfessorButton" class="new-professor-button" style="background-color: #007bff; color: white; border: none; border-radius: 4px; padding: 10px 15px; font-size: 16px; cursor: pointer; margin-left: 10px;">
        Novo Professor
        </button>
        </div>
        `;
    }

    function createOverlay() {
        return `
        <div id="overlay" class="overlay hide" style="position: fixed; top: 0; right: 0; width: 60%; height: 100%; background-color: #fff; box-shadow: -2px 0 5px rgba(0,0,0,0.5); z-index: 1000; transition: transform 0.3s ease, visibility 0.3s ease, opacity 0.3s ease; transform: translateX(100%); visibility: hidden; opacity: 0;">
        <div class="form-container" style="padding: 20px; height: 100%; overflow-y: auto; position: relative;">
        <span class="close-form" onclick="closeForm()" style="position: absolute; top: 10px; right: 10px; cursor: pointer; font-size: 24px; color: #333;">&times;</span>
        <h2>Cadastro de Professor</h2>
        ${createProfessorForm()}
        </div>
        </div>
        `;
    }

    function createProfessorForm() {
        return `
        <form id="professorForm">
        <input type="hidden" id="professorId" name="professorId">
        <div class="form-row" style="display: flex; flex-wrap: wrap; gap: 15px;">
        <div class="form-group" style="flex: 1; min-width: calc(50% - 15px);">
        <label for="nome">Nome</label>
        <input type="text" id="nome" name="nome" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 5px;">
        </div>
        <div class="form-group" style="flex: 1; min-width: calc(50% - 15px);">
        <label for="sobrenome">Sobrenome</label>
        <input type="text" id="sobrenome" name="sobrenome" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 5px;">
        </div>
        </div>
        <div class="form-row" style="display: flex; flex-wrap: wrap; gap: 15px;">
                    <div class="form-group" style="flex: 1; min-width: calc(50% - 15px);">
                        <label for="cpf">CPF</label>
                        <input type="text" id="cpf" name="cpf" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 5px;">
                        </div>
                        <div class="form-group" style="flex: 1; min-width: calc(50% - 15px);">
                        <label for="data_nascimento">Data de Nascimento</label>
                        <input type="date" id="data_nascimento" name="data_nascimento" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 5px;">
                        </div>
                        </div>
                        <div class="form-group full-width" style="width: 100%;">
                        <label for="email">E-mail</label>
                        <input type="email" id="email" name="email" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 5px;">
                        </div>
                        <div class="form-group full-width" style="width: 100%;">
                        <label for="telefone">Telefone</label>
                        <input type="text" id="telefone" name="telefone" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 5px;">
                        </div>
                        <div class="form-group full-width" style="width: 100%;">
                        <label for="endereco">Endereço</label>
                        <input type="text" id="endereco" name="endereco" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 5px;">
                        </div>
                        <div class="form-group full-width" style="width: 100%;">
                        <label for="formacao">Formação</label>
                        <input type="text" id="formacao" name="formacao" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 5px;">
                        </div>
                        <div class="form-group full-width" style="width: 100%;">
                        <label for="experiencia">Experiência</label>
                        <textarea id="experiencia" name="experiencia" rows="4" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 5px;"></textarea>
                        </div>
                        <button type="submit" style="background-color: #007bff; color: white; border: none; border-radius: 4px; padding: 10px 15px; font-size: 16px; cursor: pointer;">Salvar</button>
                        </form>
                        `;
    }

    function cadastroProfessorContent() {
        document.querySelector(".content").innerHTML = createCadastroProfessorContent();
        document.getElementById('newProfessorButton').addEventListener('click', openForm);  // Passa a referência da função
        document.getElementById('searchButton').addEventListener('click', searchProfessores);  // Passa a referência da função
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

    function searchProfessores() {
        const searchTerm = document.getElementById('searchBox').value.toLowerCase();
        console.log('Buscando professores com o termo:', searchTerm);
    }

    cadastroProfessorContent();
}