// 1. VARIÁVEIS GLOBAIS
// Array que armazenará todos os alunos
let alunos = [];

// Variável para controlar se estamos editando um aluno
let editando = false;

// ====== 2. FUNÇÕES DE ARMAZENAMENTO (LocalStorage) ======

/**
 * Salva os alunos no LocalStorage do navegador
 * LocalStorage permite armazenar dados que persistem mesmo após fechar o aplicativo
 */
function salvarNoStorage() {
    // Converte o array de alunos para texto JSON e salva
    localStorage.setItem('alunos', JSON.stringify(alunos));
}

/**
 * Carrega os alunos salvos no LocalStorage
 * Executada quando o aplicativo inicia
 */
function carregarDoStorage() {
    // Busca os dados salvos
    const dadosSalvos = localStorage.getItem('alunos');

    // Se existem dados salvos, converte de texto JSON para array
    if (dadosSalvos) {
        alunos = JSON.parse(dadosSalvos);
        console.log('Dados carregados do LocalStorage:', alunos);
    }
    else {
        // Se não existem dados, inicializa array vazio
        alunos = [];
        console.log('Nenhum dado encontrado no LocalStorage');
    }
}

// ====== 3. FUNÇÕES DO CRUD ======

/**
 * CREATE - Adiciona um novo aluno ao sistema
 * '@'param {Object} aluno - Objeto contendo os dados do aluno 
 */
function adicionarAluno(aluno) {
    // Gera um ID único usando timestamp (data/hora atual em milisegundos)
    aluno.id = Date.now();

    // Adiciona o aluno no array
    alunos.push(aluno);

    // Salva no LocalStorage
    salvarNoStorage();

    console.log('Aluno adicionado:', aluno);
}

/**
 * UPDATE - Atualiza os dados de um aluno existente
 * '@'param {number} id - ID do aluno a ser atualizado
 * '@'param {Object} dadosAtualizados - Novos dados do aluno 
*/
function atualizarAluno(id, dadosAtualizados) {
    // Encontra o índice do aluno array pelo ID
    const index = alunos.findIndex((aluno) => aluno.id === id);

    // Se encontrou o aluno
    if (index !== -1) {
        // Atualiza os dados mantendo ID original
        alunos[index] = { ...dadosAtualizados, id: id }

        // Salva no LocalStorage
        salvarNoStorage();
        
        console.log('Aluno atualizado', alunos[index]);
    }
}

/**
 * DELETE - Remove um aluno do sistema
 * '@'param {number} id - ID do aluno a ser removido
*/
function excluirAluno(id) {
    // Filtra o array removendo o aluno com o ID especificado
    alunos = alunos.filter(aluno => aluno.id !== id);

    // Salva no LocalStorage
    salvarNoStorage();

    console.log('Aluno excluído. ID:', id);

}

/**
 * READ - Retorna todos os alunos cadastrados
 * '@'returns {Arrays} Array com todos os alunos
*/
function listarAlunos() {
    return alunos;
}

// ====== FUNÇÕES DE INTERFACE (UI) ======

/**
 * Renderiza a tabela de alunos na tela
 * Atualiza o HTML da tabela com os dados atuais
 */
function renderizarTabela() {
    // Pega a referência do elemento tbody da tabela
    const tbody = document.getElementById('tabelaAlunos');

    // 
    const frase = document.getElementsByName('frase');

    // Limpa o conteúdo atual da tabela
    tbody.innerHTML = '';

    // Busca todos os alunos
    const todosAlunos = listarAlunos();

    // Se não há alunos cadastrados
    if (todosAlunos.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="no-data">Nenhum aluno cadastrado ainda.</td> 
            </tr>
        `;
               
        return;
    }

    // Para cada aluno, cria uma linha na tabela
    todosAlunos.forEach(aluno => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${aluno.nome}</td>
            <td>${aluno.cpf}</td>
            <td>${aluno.rg}</td>
            <td>${aluno.numMatricula}</td> 
            <td>${aluno.email}</td> 
            <td>${aluno.dataNasc}</td> 
            <td>${aluno.sexo}</td> 
            <td>${aluno.telefone}</td> 
            <td>${aluno.responsavel}</td> 
            <td>${aluno.telefoneResp}</td> 
            <td>${aluno.endereco}</td> 
            <td>${aluno.turma}</td> 
            <td>
                <button class="btn-editar" onclick="editarAluno(${aluno.id})">✏️ Editar</button>
                <button class="btn-excluir" onclick="confirmarExclusao(${aluno.id})">🗑️ Excluir</button>
            </td>
        `;

        tbody.appendChild(tr);
    });
    console.log('Tabela renderizada com', todosAlunos.length, 'aluno(s)');
}

/**
 * Limpa todos os campos do formulario
 * 
 */
function limparFormulario() {
    document.getElementById('alunoId').value = ''; 
    document.getElementById('nome').value = '';        
    document.getElementById('cpf').value = '';        
    document.getElementById('rg').value = '';        
    document.getElementById('numMatricula').value = '';        
    document.getElementById('email').value = '';       
    document.getElementById('dataNasc').value = '';        
    document.querySelector('input[name="sexo"]:checked')?.value || '';        
    document.getElementById('telefone').value = '';        
    document.getElementById('responsavel').value = '';        
    document.getElementById('telefoneResp').value = '';        
    document.getElementById('endereco').value = '';        
    document.getElementById('turma').value = '';        

    // Reseta o estado de edicao
    editando = false;
    document.getElementById('btnSalvar').textContent = '✅ Salvar Aluno';

    console.log('Formulário limpo!');
}

/**
 * Preenche o formulário com os dados de um aluno para edição
 * '@'param {number} id - ID do aluno a ser editado
 */
function editarAluno(id) {
    // Busca o aluno pelo ID
    const aluno = alunos.find(a => a.id === id);

    if (aluno) {
        // Preenche os campos do formulário
        document.getElementById('alunoId').value = aluno.id; 
        document.getElementById('nome').value = aluno.nome;        
        document.getElementById('cpf').value = aluno.cpf;        
        document.getElementById('rg').value = aluno.rg;        
        document.getElementById('numMatricula').value = aluno.numMatricula;        
        document.getElementById('email').value = aluno.email;       
        document.getElementById('dataNasc').value = aluno.dataNasc;        
        document.querySelector(`input[name="sexo"][value="${aluno.sexo}"]`).checked = true;  
        document.getElementById('telefone').value = aluno.telefone;        
        document.getElementById('responsavel').value = aluno.responsavel;        
        document.getElementById('telefoneResp').value = aluno.telefoneResp;        
        document.getElementById('endereco').value = aluno.endereco;        
        document.getElementById('turma').value = aluno.turma;   

        // Muda o estado para edição
        editando = true;
       document.getElementById('btnSalvar').textContent = '🔄 Atualizar Aluno';
    document.getElementById('btnLimpar').style.display = 'inline-block';

        // Rola a página para o topo (formulário)
        window.scrollTo({ top: 0, behavior: 'smooth' });

        console.log('Editando aluno:', aluno);
    }
}

/**
 * Confirma a exclusão de um aluno
 * '@'param {number} id - ID do Aluno a ser excluído
 */
function confirmarExclusao(id) {
    // Busca o aluno para mostrar o nome na confirmação
    const aluno = alunos.find(a => a.id === id);

    if (aluno) {
        // Mostra caixa de confirmação
        const confirmacao = confirm(
            `Tem certeza que deseja excluir o aluno:\n\n${aluno.nome}?\n\nEsta ação não pode ser desfeita!`
        );

        // Se confirmou, exclui o aluno
        if (confirmacao) {
            excluirAluno(id);
            renderizarTabela();
            alert('Aluno excluído com sucesso!');
        }
    }
}

/**
 * Evento do botão Cancelar
 * Cancela a edição e limpa o formulário
 */
document.getElementById('btnLimpar').addEventListener('click', function() {
    if (confirm('Deseja cancelar a edição?')) {
        limparFormulario();
    }
});


// ===== 5. EVENTOS E INCIALIZAÇÃO =====

/**
 * Evento de submit do Formulário
 * Executado quando o usuário clica em "Salvar" ou "Atualizar"
 */
document.getElementById('formAluno').addEventListener('submit', function(e) {
    // Previne o comportamento padrão do formulário (recarrega a página)
    e.preventDefault();

    // Captura os valores dos campos
    const id = document.getElementById('alunoId').value;
    const nome = document.getElementById('nome').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const rg = document.getElementById('rg').value.trim();
    const numMatricula = document.getElementById('numMatricula').value.trim();
    const email = document.getElementById('email').value.trim();
    const dataNasc = document.getElementById('dataNasc').value;
    const sexo = document.querySelector('input[name="sexo"]:checked')?.value || '';
    const telefone = document.getElementById('telefone').value;
    const responsavel = document.getElementById('responsavel').value;
    const telefoneResp = document.getElementById('telefoneResp').value;
    const endereco = document.getElementById('endereco').value;
    const turma = document.getElementById('turma').value;
    
    // Validações básicas 
    if (!nome || !cpf || !rg || !numMatricula || !email || !dataNasc 
        || !sexo || !telefone || !responsavel || !telefoneResp || !endereco || !turma) { 
        alert(`Por favor, preencha todos os campos!`);
        return;
    }

    // Cria objeto com os dados do aluno
    const aluno = {
        nome: nome,
        cpf: cpf,
        rg: rg,
        numMatricula: numMatricula,
        email: email,
        dataNasc: dataNasc,
        sexo: sexo,
        telefone: telefone,
        responsavel: responsavel,
        telefoneResp: telefoneResp,
        endereco: endereco,
        turma: turma
    }

    // Verifica se está editando ou adicionando
    if (editando && id) {
        // Atualiza aluno existente
        atualizarAluno(parseInt(id), aluno);
        alert(`Aluno atualizado com sucesso!`);
    }
    else {
        // Adiciona novo aluno
        adicionarAluno(aluno);
        alert(`Aluno cadastrado com sucesso!`)
    }

    // Limpa o formulário e atualiza a tabela 
    limparFormulario();
    renderizarTabela();
});

/**
 * Inicialização do aplicativo
 * Executado quando a página carrega
 */
window.addEventListener('DOMContentLoaded', function() {
    console.log('=== Sistema de Cadastro de Alunos V2.0  ===');
    console.log('Aplicativo iniciado!');

    // Carrega os dados salvos
    carregarDoStorage();
    //Renderiza a tabela inicial 
    renderizarTabela();
    

    console.log('Sistema pronto para uso!');
});