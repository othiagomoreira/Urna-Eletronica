// Controle de interface
let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');


//Controle de ambiemte
let etapaAtual = 0; //Usado como index do array etapas
let numero = ''; //Armazena todos os números selecionas 

function comecarEtapa() {
    //Esta se referindo ao index 0, ou seja, ao primeiro item do array etapas
    let etapa = etapas[etapaAtual]; 

    //Quantidade de numeros do cargo ex:Vereador(5) & Prefeito(2)
    let numeroHtml = ''; 

    // Responsavel por 'gerar' as 'caixinhas' com a quantidade de digitos do cargo
    // Prefeito são 2 digítos e Verador são 5
    for(let i = 0; i<etapa.Qtdigitos; i++) {

        // Essa condição gera a primeira "caixinha" com a class pisca
        // Os números selecionas só serão armazenados e colocados na tela caso a class pisca esteja presente
        if(i === 0) { 
            numeroHtml += '<div class="numero pisca"></div>'
        } else { 
            numeroHtml += '<div class="numero"></div>';
        }
    }

    // Reseta todo o conteúdo inicial
    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface() {

}

// Responsavel por colocar os números selecionados na tela
function clicou(n) {
    let elNumero = document.querySelector('.numero.pisca');

    //Se a class .numero.pisca existir, coloque como seu conteudo o argumento n(O número  que foi clicado)
    if(elNumero !== null) {
        elNumero.innerHTML = n; //Exibi o número clicado na tela
        numero = `${numero}${n}`//Armazena o número que foi presiconado na variavel numero, concatena para que não somen os números selecionados

        // Para que a variavel pisca passe para o proximo quadradinho disponivel
        // Primeiro é preciso remove-la e depois verificar se existe um pŕoximo item disponivel
        elNumero.classList.remove('pisca');

        // nextElementSibling avança para o próximo item disponivel
        // Verificamos se o próximo item é diferente de null, ou seja se ele existe
        if(elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca'); // Adiciona a class pisca ao próximo item
        } else {
            atualizaInterface(); // Se não houver próximo item rode essa função
        };

    };
};

function branco() {
    alert('Clicou em BRANCO');
};

function corrige(n) {
    alert('Clicou em CORRIGE');
};

function confirma(n) {
    alert('Clicou em CONFIRMA');
};

comecarEtapa()