import { verificaSeJogoAcabou, pontuar, calculaMultiplicador, mudarJogadorEfeitos, retiraDadoInimigo } from "../main.js";

let dadosLamb = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
]

let vezLamb
let numero

export function receberDadosLamb(){
    return dadosLamb
}

export function atualizaDadosLamb(dadosLambAtualizado){
    dadosLamb = dadosLambAtualizado
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

    const lamb = document.querySelector('img#lamb')
    const lambDice = document.querySelector('.lamb-dice-container>p')

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
                pontuar(multiplicador, vezLamb, this, numero)
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