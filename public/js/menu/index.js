function getHomeHTML() {
    clear(); // Limpar o conteúdo de 'show' se necessário
    const homeContent = `
        <header class="header">
            <span class="headerRow">
                <h1>Bem-vindo Jarbas!</h1>
                <span class="schoolNameAndIcon">
                    <i class="fa-solid fa-bell"></i>
                    <h1>Cedup Diomicio Freitas</h1>
                </span>
            </span>
        </header>

        <main class="main">
            <div class="stats-container">
                <div class="stat-box">
                    <div class="left-side">
                        <img src="../../assets/teacher.svg" alt="Professores">
                    </div>
                    <div class="right-side">
                        <span id="num-professores">107</span>
                        <h3>Professores</h3>
                    </div>
                </div>
                <div class="stat-box">
                    <div class="left-side">
                        <img src="../../assets/student.svg" alt="Alunos">
                    </div>
                    <div class="right-side">
                        <span id="num-alunos">742</span>
                        <h3>Alunos</h3>
                    </div>
                </div>
                <div class="stat-box">
                    <div class="left-side">
                        <img src="../../assets/class.svg" alt="Turmas">
                    </div>
                    <div class="right-side">
                        <span id="num-turmas">25</span>
                        <h3>Turmas</h3>
                    </div>
                </div>
                <div class="stat-box">
                    <div class="left-side">
                        <img src="../../assets/shake-hands.svg" alt="Colaboradores">
                    </div>
                    <div class="right-side">
                        <span id="num-colaboradores">23</span>
                        <h3>Colaboradores</h3>
                    </div>
                </div>
            </div>

            <div>
                <div class="charts-row1">
                    <div class="box">
                        <h4>Cursos com Mais Faltas</h4>
                        <div class="chart-wrapper">
                            <canvas id="cursoMaisFaltas"></canvas>
                        </div>
                    </div>
                    <div class="box">
                        <h4>Turmas com Mais Faltas</h4>
                        <div class="chart-wrapper">
                            <canvas id="turmaMaisFaltas"></canvas>
                        </div>
                    </div>
                    <div class="box">
                        <h4>Taxa de Aprovação</h4>
                        <div class="chart-wrapper">
                            <canvas id="taxaAprovacao"></canvas>
                        </div>
                    </div>
                </div>
                <div class="charts-row2">
                    <div class="box">
                        <h4>Média Diária de Faltas</h4>
                        <div class="chart-wrapper">
                            <canvas id="faltasMediaDiaria"></canvas>
                        </div>
                    </div>
                    <div class="box">
                        <h4>Média de Notas por Disciplina</h4>
                        <div class="chart-wrapper">
                            <canvas id="notasPorDisciplina"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    `;
    return homeContent;
}

function getBibliotecaHTML() {
    return `
        <p class="navTitle">Biblioteca</p>
        <ul class="submenu">
            <li><i class="fas fa-book"></i> <a href="#" onClick="livroMain()">Livros</a></li>
            <li><i class="fas fa-user"></i> <a href="#" onclick="autorMain()">Autores</a></li>
            <li><i class="fas fa-tag"></i> <a href="#">Gêneros</a></li>
            <li><i class="fas fa-sign-in-alt"></i> <a href="#">Entradas e Saídas</a></li>
        </ul>
    `;
}

function getCadastrosHTML() {
    return `
        <p class="navTitle">Cadastros</p>
        <ul class="submenu">
            <li><i class="fas fa-chalkboard-teacher"></i> <a href="#" onclick="professorMain()">Professores</a></li>
            <li><i class="fas fa-user-graduate"></i> <a href="#" onclick="alunoMain()">Alunos</a></li>
            <li><i class="fas fa-users"></i> <a href="#">Turmas</a></li>
            <li><i class="fas fa-user-tag"></i> <a href="#">Funções</a></li>
        </ul>
    `;
}

function getConfiguracoesHTML() {
    return `
        <p class="navTitle">Configurações</p>
        <ul class="submenu">
            <li><i class="fas fa-chalkboard-teacher"></i> <a href="#">Escola</a></li>
            <li><i class="fas fa-users"></i> <a href="#">Usuários</a></li>
        </ul>
    `;
}

function clear() {
    document.getElementById('show').innerHTML = ''; // Limpa o conteúdo do elemento 'show'
}

function loadModule(module) {
    const content = {
        home: getHomeHTML(),
        biblioteca: getBibliotecaHTML(),
        cadastros: getCadastrosHTML(),
        configuracoes: getConfiguracoesHTML(),
    }[module];

    if (module === 'home') {
        document.getElementById("main").innerHTML = content;
        generateGraphics()
    } else {
        document.getElementById("show").innerHTML = content;
    }
}
