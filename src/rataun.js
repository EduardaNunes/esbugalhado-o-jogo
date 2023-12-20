import { verificaSeJogoAcabou, pontuar, mudarJogadorEfeitos, retiraDadoInimigo } from "../main.js"
import { receberPontosLamb } from "./lamb.js"

let dadosRataun = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
]

let pontosRataun = [
    0,0,0
]

export function receberDadosRataun(){
    return dadosRataun; // retorna os valores dos dados do rataun
}

export function receberPontosRataun(){
    return pontosRataun; // retorna os valores dos pontos de cada coluna do rataun
}

export function atualizaDadosRataun(dadosRataunAtualizado){
    dadosRataun = dadosRataunAtualizado // recebe o novo valor pros dados do rataun e atualiza na variável
}

export function atualizaPontosRataun(pontosRataunAtualizado){
    pontosRataun = pontosRataunAtualizado
}

export function rataunEscolheInteligente(dadosLamb, numero){ // Rataun joga fazendo escolhas inteligentes

    if(verificaSeLambTemODado(dadosLamb, numero) == false){ // Primeiro ele irá dar preferência por retirar pontos do jogador (lamb)
        if(verificaSeRataunTemODado(numero) == false){ // Caso lamb não tenha, então ele tentará multiplicar os pontos que ja tem
            verificaSeRataunTemEspaco(numero) // Caso retorne falso nas duas procuras, vamos verificar em qual coluna ele ainda tem espaço sobrando para jogar
        }
    }
}

function verificaSeLambTemODado(dadosLamb, numero){

    let pontosLamb = receberPontosLamb()

    for(let i = 0; i < 3; i++){ // looping que passa verificando os 9 cards
        for(let j = 0; j < 3; j++){
            if(dadosLamb[i][j] == numero){ // caso o jogador tenha em alguma das colunas o numero tirado pelo Rataun
                for(let k = 0; k < 3; k++){
                    if(dadosRataun[i][k] == 0){ // e caso o rataun tenha espaço livre nessa mesma coluna
                        dadosRataun[i][k] = numero; // então, rataun joga nessa coluna
          /* main.js */ retiraDadoInimigo(dadosLamb, pontosLamb, i, false, numero, true) // sendo assim, retira o dado do jogador (lamb) na coluna jogada, false pois não é a vez do jogador (lamb) e true pois é retirada de pontos
                        rataunJoga(i,k,numero) // Atualiza as novas informações na tela
                        return true
                    }
                }
           }
        }
    }

   return false // caso não encontre o mesmo numero ou o rataun não tenha espaço pra jogar nessa coluna, retorna falso
}

function verificaSeRataunTemODado(numero){

   for(let i = 0; i < 3; i++){ // looping que passa verificando os 9 cards
       for(let j = 0; j < 3; j++){
           if(dadosRataun[i][j] == numero){ // Caso rataun tenha em alguma coluna o mesmo numero tirado no dado
               for(let k = j; k < 3; k++){
                   if(dadosRataun[i][k] == 0){ // e tenha espaço disponível nessa mesma coluna
                       dadosRataun[i][k] = numero; // então, ele joga nessa coluna
                       rataunJoga(i,k,numero) // Atualiza as novas informações na tela
                       return true
                   }
               }
           }
       }
   }
   return false // caso ele não tenha o mesmo numero ou não tenha espaço pra jogar na coluna, então, retorna falso
}

function verificaSeRataunTemEspaco(numero){

   while(true){ // Como é necessário (devido a forma como a função rataunEscolheInteligente foi feita) que ainda exista espaço, então fizemos um looping até encontrar um espaço vago
       let i = (Math.floor(Math.random()*3)) // para a jogada não ficar sequencial, radomiza-se a coluna a ser jogada
       for(let j = 0; j < 3; j++){
           if(dadosRataun[i][j] == 0){ // ao encontrar um espaço vazio
               dadosRataun[i][j] = numero; // Rataun joga nessa coluna
               rataunJoga(i,j,numero) // Atualiza as novas informações na tela
               return // assim que encontra um espaço vazio quebra o looping
           }
       }
   }
}

function rataunJoga(i,j, numero){

    const colunaRataun = document.querySelectorAll('.section-top > .coluna') // vetor com as 3 colunas do rataun
    const rataunDice = document.querySelector('.rataun-dice-container>p') // dado tirado pelo rataun
    const rataun = document.querySelector('img#rataun') // img do rataun

    colunaRataun[i].children[j].innerHTML = '<p>' + numero + '</p>' // Adiciona o valor na coluna escolhida
    rataunDice.innerHTML = '' // reseta o dado jogado por Rataun

    /* main.js */
    pontuar(dadosRataun, pontosRataun, false, i, numero, false) // Chama a função que vai calcular a nova pontuação (false pois é a vez do rataun)              

    rataun.src='Imgs/Rataun/Rataun-play-dice.gif' // Ativa a animação de jogar o dado do personagem
    setTimeout(() => {
        rataun.src='Imgs/Rataun/Rataun-idle.gif'// Volta para a animação idle depois de 1.335 segundos 
    }, 1335)

    /* main.js */
    mudarJogadorEfeitos() // Ativa os efeitos vizuais de acordo com quem está jogando
    verificaSeJogoAcabou(dadosRataun, true) // depois de jogar, verifica se existe mais algum espaço sobrando para uma proxima jogada. Envia true pois o próximo a jogar é o lamb
}