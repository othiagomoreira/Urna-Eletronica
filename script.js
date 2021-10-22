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
let votoBranco = false;
let votosComputados = []; //Armazena em quem você votou, caso queira usar essa informação depois

function comecarEtapa() {
    //Esta se referindo ao index 0, ou seja, ao primeiro item do array etapas
    let etapa = etapas[etapaAtual]; 

    //Quantidade de numeros do cargo ex:Vereador(5) & Prefeito(2)
    let numeroHtml = ''; 
    numero = '';
    votoBranco = false;

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
    let etapa = etapas[etapaAtual]; 

    //Verifica se o número do candidato dentro do array é o mesmo que foi digitado
    let candidato = etapa.candidatos.filter((item) => { 
        if(item.numero === numero) { //Se sim, retorna um objeto com as informações do candidato 
            return true;
        } else {
            return false;
        };
    });

    // Verifica se candidato é maior que 0, ou seja, se achou algum candidto com esse número
    if(candidato.length >  0) {
        // Se sim, carregue as informaçoes do mesmo
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome} <br/> Partido: ${candidato.partido}`;
        aviso.style.display = 'block';

        // Cada candidato tem um array de fotos, ou seja pode ter diversas fotos
        let fotosHtml = ''
        for(let i in candidato.fotos) {//Faz uma veficaçao em candidatos fotos e monda elas em uma tag img padrão
            if(candidato.fotos[i].small) {
                fotosHtml += `<div class="d-1-image small"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`
            } else {
                fotosHtml += `<div class="d-1-image"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`
            }
        }

        lateral.innerHTML = fotosHtml;



    } else { //Caso o lenght seja 0(nao exista um candidato com esse numero), o voto será nulo
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca"> VOTO NULO</div>';
    }
};

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
    if(numero === '') { //Se nenhum número foi pressionado atenda essa requisição
        votoBranco = true; //Começa como false

        // Exibi esses itens na tela, para sinalizar que o voto em branco foi confirmado
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso--grande pisca"> VOTO EM BRANCO</div>';
    } else {
        alert('Para votar em branco NÃO pode pressionar nenhum número!');
    };
};

function corrige(n) {
    comecarEtapa(); //Quando esse botão for clicado essa função resetará tudo
};

function confirma(n) {
    let etapa = etapas[etapaAtual]; 
    let etapaCompleta = false; //Verifica se a etapa atual já foi completada, se ja votou para prefeito ou vereador!

    if(votoBranco === true) { //votoBranco só sera true caso número esteja vazio
        etapaCompleta = true //Se votou em branco então a etapa foi completada
        
        votosComputados.push({ //Armazena o resultado dos votos nessa variavel
            etapa: etapas[etapaAtual].titulo,
            voto: 'Branco'
        })
    } else if(numero.length === etapa.Qtdigitos) { 
        //Numeros tem que ter a mesma quantidade de digitos do array etapa para que o voto seja confirmado
        
        etapaCompleta = true; //Se votou em branco então a etapa foi completada
        
        votosComputados.push({ //Armazena o resultado dos votos nessa variavel
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        })
    }

    if(etapaCompleta) {
        etapaAtual++ //Incrementa mais um, faz com que avance para o proximo item do array
        if(etapas[etapaAtual] !== undefined) { //Se ainda existir alguma etapa começara todo o processo dnv
            comecarEtapa(); 
        } else { //Caso não tenha mas nenhuma, encerre a votação
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca"> FIM</div>';
            console.log(votosComputados);
        } 
            
    }
};

comecarEtapa();