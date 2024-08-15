function generateGraphics() {
    function responsiveFonts() {
        if(window.outerWidth > 1200){
            return 14
        }else if(window.outerWidth <= 1200){
            return 12
        }
    }

    function responsivePadding() {
        if(window.outerWidth > 1200){
            return 15
        }else if(window.outerWidth <= 1200){
            return 10
        }
    }

    Chart.defaults.font.family = 'Arial, sans-serif';
    Chart.defaults.color = '#000';
    Chart.defaults.scale.grid.color = 'rgba(200, 200, 200, 0.1)';
    Chart.defaults.font.size = responsiveFonts();
    
    // Gráfico de Pizza - Curso com Mais Faltas
    const cursoMaisFaltasCtx = document.getElementById('cursoMaisFaltas').getContext('2d');
    new Chart(cursoMaisFaltasCtx, {
        type: 'pie',
        data: {
            labels: ['Mecânica', 'Internet', 'Vendas'],
            datasets: [{
                data: [150, 100, 100],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)', 
                    'rgba(54, 162, 235, 0.7)', 
                    'rgba(255, 206, 86, 0.7)'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom', 
                    labels: {
                        boxWidth: 20, 
                        padding: responsivePadding(),
                        usePointStyle: true
                    }
                }
            }
        }
    });

    // Gráfico de Barras - Turma com Mais Faltas
    const turmaMaisFaltasCtx = document.getElementById('turmaMaisFaltas').getContext('2d');
    new Chart(turmaMaisFaltasCtx, {
        type: 'bar',
        data: {
            labels: ['204 - VEN', '302 - MEC', '104 - VEN', '203 - INT', '202 - MEC'],
            datasets: [{
                data: [120, 190, 50, 100, 120],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)', 
                    'rgba(54, 162, 235, 0.6)', 
                    'rgba(255, 206, 86, 0.6)', 
                    'rgba(75, 192, 192, 0.6)', 
                    'rgba(153, 102, 255, 0.6)'
                ],
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 10
                    }
                }
            }
        }
    });

    // Gráfico de Linha - Média Diária de Faltas
    const faltasMediaDiariaCtx = document.getElementById('faltasMediaDiaria').getContext('2d');
    new Chart(faltasMediaDiariaCtx, {
        type: 'line',
        data: {
            labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
            datasets: [{
                label: 'Média Diária de Faltas',
                data: [20, 40, 30, 10, 60],
                backgroundColor: 'rgba(54, 162, 235, 0.2)', 
                borderColor: 'rgba(54, 162, 235, 0.7)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 10
                    }
                }
            }
        }
    });

    // Gráfico de Barras - Distribuição de Notas por Disciplina
    const notasPorDisciplinaCtx = document.getElementById('notasPorDisciplina').getContext('2d');
    new Chart(notasPorDisciplinaCtx, {
        type: 'bar',
        data: {
            labels: ['Matemática', 'Português', 'Biologia', 'História', 'Geografia'],
            datasets: [{
                data: [6, 9, 7, 8, 7.5],
                backgroundColor: [
                    'rgba(255, 159, 64, 0.8)',  
                    'rgba(75, 192, 192, 0.8)',  
                    'rgba(153, 102, 255, 0.8)', 
                    'rgba(201, 203, 207, 0.8)', 
                    'rgba(255, 205, 86, 0.8)'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });

    // Gráfico de Doughnut - Taxa de Aprovação
    const taxaAprovacaoCtx = document.getElementById('taxaAprovacao').getContext('2d');
    new Chart(taxaAprovacaoCtx, {
        type: 'doughnut',
        data: {
            labels: ['Aprovados', 'Reprovados'],
            datasets: [{
                data: [75, 25],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.7)', 
                    'rgba(255, 99, 132, 0.7)'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 20,
                        padding: responsivePadding(),
                        usePointStyle: true
                    }
                }
            }
        }
    });
}
