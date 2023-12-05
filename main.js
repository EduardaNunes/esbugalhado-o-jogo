import { loadImage  } from "./src/loader.js"

Promise.all([
    loadImage('Imgs/Lamb/Lamb-idle.gif'),
    loadImage('Imgs/Lamb/Lamb-play-dice.gif'),
    loadImage('Imgs/Lamb/Lamb-take-dice.gif'),
    loadImage('Imgs/Lamb/Lamb-lose-dice.gif'),
    loadImage('Imgs/Lamb/Lamb-lose-game.gif'),
    loadImage('Imgs/Lamb/Lamb-lose-game-loop.gif'),
    loadImage('Imgs/Lamb/Lamb-win-game-loop.gif'),

    loadImage('Imgs/Rataun/Rataun-idle.gif'),
    loadImage('Imgs/Rataun/Rataun-play-dice.gif'),
    loadImage('Imgs/Rataun/Rataun-take-dice.gif'),
    loadImage('Imgs/Rataun/Rataun-lose-dice.gif'),
    loadImage('Imgs/Rataun/Rataun-lose-game.gif'),
    loadImage('Imgs/Rataun/Rataun-lose-game-loop.gif'),
    loadImage('Imgs/Rataun/Rataun-win-game.gif'),
    loadImage('Imgs/Rataun/Rataun-win-game-loop.gif')
])

const colunaLamb = document.querySelectorAll('.section-bottom > .coluna')
const colunaRataun = document.querySelectorAll('.section-top > .coluna')
const lamb = document.querySelector('img#lamb')
const rataun = document.querySelector('img#rataun')
const lambDice = document.querySelector('.lamb-dice-container>p')
const rataunDice = document.querySelector('.rataun-dice-container>p')
const lambPontos = document.querySelector('#pontos-lamb');
const rataunPontos = document.querySelector("#pontos-rataun");

// Inicia o jogo adicionando um eventListener para saber quando o jogador clicar em uma coluna
for(let i = 0; i<colunaLamb.length; i++){
    colunaLamb[i].addEventListener('click', escolherColuna)
}

// Inicia o jogo sendo a vez do jogador e randomizando o primeiro dado
let vezLamb = true
let numero
let dadosLamb = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
]
let dadosRataun = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
]
RandomizaDado()

function RandomizaDado(){
    // Randomiza o numero do dado
    numero = (Math.floor(Math.random()*6 + 1))

    // Verifica de quem é a vez pra jogar o dado pro jogador específica
    if(vezLamb){
        lambDice.innerHTML = '<p>' + numero + '</p>'
    }else{
        rataunDice.innerHTML = '<p>' + numero + '</p>'
        // Timeout adicionado para que mostre o dado tirado pelo Rataun por 2s antes de apagá-lo na função rataunJoga()
        setTimeout(() => {
            rataunEscolheInteligente()
        }, 1000)
        
    }
}

function escolherColuna(){

    let multiplicador = 1;

    // Se for a vez do jogador, ele verifica se existe espaço vazio na coluna escolhida
    if(vezLamb){

        for(let i = 0; i < 3; i++){
           // Verifica se há algum numero igual na coluna escolhina para poder fazer o bônus de pontuação
            if(this.querySelectorAll('.card')[i].hasChildNodes() && this.querySelectorAll('.card')[i].children[0].innerHTML == numero){
                multiplicador++
            }
            // Verifica se o card está vazio. Ou seja, se há espaço para adicionar o novo dado
            if(this.querySelectorAll('.card')[i].hasChildNodes() == false){
                // Adiciona o valor na coluna escolhida
                dadosLamb[this.id][i] = numero
                this.querySelectorAll('.card')[i].innerHTML = '<p>' + numero + '</p>'
                lambDice.innerHTML = ''
                // Chama a função que vai calcular a nova pontuação
                pontuar(multiplicador, vezLamb, this)
                vezLamb = false
                // Ativa os efeitos vizuais de acordo com quem está jogando
                mudarJogadorEfeitos(vezLamb);
                // Ativa a animação de jogar o dado do personagem
                lamb.src='Imgs/Lamb/Lamb-play-dice.gif'
                setTimeout(() => {
                    lamb.src='Imgs/Lamb/Lamb-idle.gif'
                }, 1335)
                // Sai do loop uma vez que encontrou um local válido
                break
            }
        }
    }

    verificaSeJogoAcabou(dadosLamb)
}

function pontuar(multiplicador, vezLamb, coluna){

    let pontosColuna = parseInt(coluna.querySelector('.pontos').innerHTML)
    let totalPontosLamb = parseInt(lambPontos.innerHTML)
    let totalPontosRataun = parseInt(rataunPontos.innerHTML)
    let pontuacao = numero * multiplicador * multiplicador - numero * (multiplicador - 1) * (multiplicador - 1)

    // Atualiza a pontuação da coluna selecionada
    pontosColuna += pontuacao
    coluna.querySelector('.pontos').innerHTML = pontosColuna

    // Verifica de quem é a vez e atualiza a pontuação total
    if(vezLamb){
        totalPontosLamb += pontuacao
        lambPontos.innerHTML = totalPontosLamb
    }else{
        totalPontosRataun += pontuacao
        rataunPontos.innerHTML = totalPontosRataun
    }

    if(multiplicador == 3){
        coluna.style.background = 'var(--main-dark-color)';
        coluna.querySelector('p').style.color = 'var(--main-light-color)';
    }
}

// Função responsável pela resposta visual de quem está jogando (efeito de onda no nome, deixar imagem em preto e branco)
function mudarJogadorEfeitos(){

    const lambText = document.querySelector(".aside-left > .info-container > .info-text-container > div");
    const rataunText = document.querySelector(".aside-right > .info-container > .info-text-container > div");
    const lambDiceContainer = document.querySelector('.lamb-dice-container > img')
    const rataunDiceContainer = document.querySelector('.rataun-dice-container > img')

        // Adiciona ou remove efeito de onda no texto
        lambText.classList.toggle('wavy')
        rataunText.classList.toggle('wavy')

        // Adiciona ou remove o efeito preto e branco da imagem do jogador
        lamb.classList.toggle('BlackAndWhite')
        rataun.classList.toggle('BlackAndWhite')

        // Adiciona ou remove o efeito preto e branco da container do dado
        lambDiceContainer.classList.toggle('BlackAndWhite')
        rataunDiceContainer.classList.toggle('BlackAndWhite')   
}

function calculaMultiplicador(coluna,jogador){

    let multiplicador = 0;

    for(let j = 0; j < 3; j++){
        if(jogador[coluna][j] == numero){
            multiplicador++;
        }
    }
    
    return multiplicador;
}

function acabaJogo(){
    window.alert('Acabou o jogo')
}

function verificaSeJogoAcabou(jogador){

    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            if(jogador[i][j] == 0){
                RandomizaDado()
                return
            }
        }
    }
    acabaJogo()
}

function verificaSeLambTemODado(){
     for(let i = 0; i < 3; i++){
         for(let j = 0; j < 3; j++){
             if(dadosLamb[i][j] == numero){
                 for(let k = 0; k < 3; k++){
                     if(dadosRataun[i][k] == 0){
                         dadosRataun[i][k] = numero;
                         rataunJoga(i,k,1)
                         return true
                     }
                 }
            }
         }
     }

    return false
}

function verificaSeRataunTemODado(){

    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            if(dadosRataun[i][j] == numero){
                for(let k = j; k < 3; k++){
                    if(dadosRataun[i][k] == 0){
                        dadosRataun[i][k] = numero;
                        let multiplicador = calculaMultiplicador(i,dadosRataun)
                        rataunJoga(i,k,multiplicador)
                        return true
                    }
                }
            }
        }
    }
    return false 
}

function verificaSeRataunTemEspaco(){
    while(true){
        let i = (Math.floor(Math.random()*3))
        for(let j = 0; j < 3; j++){
            if(dadosRataun[i][j] == 0){
                dadosRataun[i][j] = numero;
                rataunJoga(i,j,1)
                return true
            }
        }
    }
}

function rataunEscolheInteligente(){

    if(verificaSeLambTemODado() == false){
        if(verificaSeRataunTemODado() == false){
            if(verificaSeRataunTemEspaco() == false){
                acabaJogo()
            }else{
                verificaSeJogoAcabou(dadosRataun)
            }
        }
    }
}

function rataunJoga(i,j,multiplicador){

    // Adiciona o valor na coluna escolhida
    colunaRataun[i].children[j].innerHTML = '<p>' + numero + '</p>'
    rataunDice.innerHTML = ''

    // Chama a função que vai calcular a nova pontuação
    pontuar(multiplicador, vezLamb, colunaRataun[i])               
    vezLamb = true
    // Ativa os efeitos vizuais de acordo com quem está jogando
    mudarJogadorEfeitos(vezLamb);

    // Ativa a animação de jogar o dado do personagem
    rataun.src='Imgs/Rataun/Rataun-play-dice.gif'
    setTimeout(() => {
        rataun.src='Imgs/Rataun/Rataun-idle.gif'
    }, 1335)
}