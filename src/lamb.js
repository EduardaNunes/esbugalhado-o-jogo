import { verificaSeJogoAcabou, pontuar, calculaMultiplicador, mudarJogadorEfeitos, retiraDadoInimigo } from "../main.js"
import { receberDadosRataun, receberPontosRataun } from "./rataun.js"

let dadosLamb = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
]

let pontosLamb =[
    0,0,0
]

let vezLamb
let numero

export function receberDadosLamb(){
    return dadosLamb
}

export function receberPontosLamb(){
    return pontosLamb
}

export function atualizaDadosLamb(dadosLambAtualizado){
    dadosLamb = dadosLambAtualizado
}

export function atualizaPontosLamb(pontosLambAtualizado){
    pontosLamb = pontosLambAtualizado
}

export function inicarJogo(){
    const colunaLamb = document.querySelectorAll('.section-bottom > .coluna')

    for(let i = 0; i<colunaLamb.length; i++){ // Inicia o jogo adicionando um eventListener para saber quando o jogador clicar em uma coluna
        colunaLamb[i].addEventListener('click', escolherColuna)
    }
}

export function atualizaVezLamb(podeJogar, dadoTirado){
    vezLamb = podeJogar
    numero = dadoTirado
}

function escolherColuna(){

    if(vezLamb){ // verificação pra evitar o jogador ficar jogando sem ser a vez dele
        if(verificaSeTemEspaco(this.id)){ // envia a coluna escolhida como parâmetro
            verificaSeRataunTemODado() // verifica se a coluna jogada irá tirar pontos do inimigo
            verificaSeJogoAcabou(dadosLamb, false) // depois, verifica se existe mais algum espaço vazio para a próxima jogada, false pois o lamb não é o próximo a jogar
        } 
    }
}

function verificaSeTemEspaco(coluna){
    for(let i = 0; i < 3; i++){ // looping que percorre os 3 cards da coluna escolhida
        if(dadosLamb[coluna][i] == 0){ // Caso tenha espaço sobrando
            dadosLamb[coluna][i] = numero // joga o dado na coluna escolhida
            lambJoga(coluna,i) // atualiza html e pontuação de lamb
            return true
        }
    }
    return false // caso não tenha espaço na coluna, retorna falso
}

function verificaSeRataunTemODado(){

    let dadosRataun = receberDadosRataun();
    let pontosRataun = receberPontosRataun();

    for(let i = 0; i < 3; i++){ // looping que passa verificando os 9 cards
        for(let j = 0; j < 3; j++){
            if(dadosRataun[i][j] == numero){ // caso o Rataun tenha em alguma das colunas o numero tirado pelo Jogador (lamb)
    /* main.js */ retiraDadoInimigo(dadosRataun, pontosRataun, i, true, numero, true) // então, retira o dado do Rataun na coluna jogada, true pois é a vez do jogador (lamb) e pq é retirada de pontos
                  return
           }
        }
    }
}

function lambJoga(coluna, card){

    const lamb = document.querySelector('img#lamb') // seleciona a imagem do lamb
    const lambDice = document.querySelector('.lamb-dice-container>p') // seleciona o dado dentro do tabuleiro
    const colunaLamb = document.querySelectorAll('.section-bottom > .coluna') // cria um vetor com as 3 colunas do lamb

    let multiplicador = calculaMultiplicador(coluna,dadosLamb, numero) // verifica se existem outros numeros iguais ao jogado na coluna
    /* main.js */
    pontuar(dadosLamb, pontosLamb, true, coluna, numero, false) // calcula a nova pontuação, true pois é a vez do lamb

    colunaLamb[coluna].children[card+1].innerHTML = '<p>' + numero + '</p>' // Adiciona o valor na coluna escolhida
    lambDice.innerHTML = '' // reseta o dado no tabuleiro

    lamb.src='Imgs/Lamb/Lamb-play-dice.gif' // muda a animação do lamb para o de jogar o dado
    setTimeout(() => {
        lamb.src='Imgs/Lamb/Lamb-idle.gif' // volta para a animação idle depois de 1.335 segundos
    }, 1335)

    /* main.js */
    mudarJogadorEfeitos() // Ativa os efeitos vizuais de acordo com quem está jogando
}