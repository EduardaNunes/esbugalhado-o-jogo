import { receberDadosLamb, atualizaDadosLamb, atualizaPontosLamb, atualizaVezLamb, inicarJogo} from "./src/lamb.js"
import { receberDadosRataun, atualizaDadosRataun, atualizaPontosRataun, rataunEscolheInteligente } from "./src/rataun.js"

inicarJogo()  // inicia o jogo adicionando eventListener às colunas do jogador (lamb)
RandomizaDado(true) // chama a função que vai randomizar o primeiro dado, com o parametro true indicando que é a vez do jogador (lamb)

function RandomizaDado(vezLamb){

    const lambDice = document.querySelector('.lamb-dice-container>p')
    const rataunDice = document.querySelector('.rataun-dice-container>p')

    let numero = (Math.floor(Math.random()*6 + 1)) // Randomiza o numero do dado

    if(vezLamb){ // Verifica de quem é a vez pra jogar o dado pro jogador específica
        lambDice.innerHTML = '<p>' + numero + '</p>' // adiciona o dado tirado no tabuleiro do jogador (lamb)
        atualizaVezLamb(true, numero)
    }else{
        rataunDice.innerHTML = '<p>' + numero + '</p>' // adiciona o dado tirado no tabuleiro do Rataun
        setTimeout(() => {
            rataunEscolheInteligente(receberDadosLamb(), numero) // Timeout adicionado para que mostre o dado tirado pelo Rataun por 2s antes de apagá-lo na função rataunJoga()
        }, 3000)
    }
}

export function verificaSeJogoAcabou(jogador, vezLamb){ // parâmetro que recebe a coluna de cards de quem for a vez, e uma verificação se o jogador (lamb) é o próximo a jogar

    for(let i = 0; i < 3; i++){ // looping que verifica todos os 9 cards
        for(let j = 0; j < 3; j++){
            if(jogador[i][j] == 0){ // se ainda tiver espaço para jogar então joga o dado
                RandomizaDado(vezLamb)
                return
            }
        }
    }
    acabaJogo()
}

function acabaJogo(){
    window.alert('Acabou o jogo')
}

export function pontuar(jogador, pontuacaoColunas, vezLamb, coluna, numero, retiraPonto){

    const lambPontos = document.querySelector('#pontos-lamb') // seleciona os pontos totais do Lamb
    const rataunPontos = document.querySelector("#pontos-rataun") // seleciona os pontos totais do Rataun

    const colunaLambPontos = document.querySelectorAll('.section-bottom > .coluna > p') // vetor com as pontuações das 3 colunas do lamb
    const colunaRataunPontos = document.querySelectorAll('.section-top > .coluna > p') // vetor com as pontuações das 3 colunas do rataun

    let multiplicador = calculaMultiplicador(coluna, jogador, numero)

    let somaPontuacao = numero * multiplicador * multiplicador - numero * (multiplicador - 1) * (multiplicador - 1)
    let retiraPontuacao = numero * multiplicador * multiplicador

    if(retiraPonto == false){
        if(vezLamb){
            pontuacaoColunas[coluna] += somaPontuacao
            colunaLambPontos[coluna].innerHTML = pontuacaoColunas[coluna]
            lambPontos.innerHTML = pontuacaoColunas[0] + pontuacaoColunas[1] + pontuacaoColunas[2]
            atualizaPontosLamb(pontuacaoColunas)
        }else{
            pontuacaoColunas[coluna] += somaPontuacao
            colunaRataunPontos[coluna].innerHTML = pontuacaoColunas[coluna]
            rataunPontos.innerHTML = pontuacaoColunas[0] + pontuacaoColunas[1] + pontuacaoColunas[2]
            atualizaPontosRataun(pontuacaoColunas)  
        }
    }else{
        console.log('Vez Lamb: ' + vezLamb)
        console.log('Jogador: ' + jogador)
        console.log('Pontuação da coluna: ' + pontuacaoColunas[coluna])
        console.log('Coluna: ' + coluna)
        console.log('Numero: ' + numero)
        console.log('Multiplicador: ' + multiplicador)
        console.log('Retira Pontuação: ' + retiraPontuacao)
        if(vezLamb){
            pontuacaoColunas[coluna] -= retiraPontuacao
            colunaRataunPontos[coluna].innerHTML = pontuacaoColunas[coluna]
            rataunPontos.innerHTML = pontuacaoColunas[0] + pontuacaoColunas[1] + pontuacaoColunas[2]
            atualizaPontosRataun(pontuacaoColunas)
        }else{
            pontuacaoColunas[coluna] -= retiraPontuacao
            colunaLambPontos[coluna].innerHTML = pontuacaoColunas[coluna]
            lambPontos.innerHTML = pontuacaoColunas[0] + pontuacaoColunas[1] + pontuacaoColunas[2] 
            atualizaPontosLamb(pontuacaoColunas)  
        }   
    }

}

export function calculaMultiplicador(coluna,jogador,numero){ // calcula quantos numeros iguais existem na coluna que o personagem jogou

    let multiplicador = 0;

    for(let i = 0; i < 3; i++){ // looping que passa somando ao contador toda vez que encontra um numero igual ao jogado
        if(jogador[coluna][i] == numero){
            multiplicador++;
        }
    } 
    return multiplicador;
}

export function mudarJogadorEfeitos(){

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

export function retiraDadoInimigo(inimigo, pontosInimigo, i, vezLamb, numero){

    pontuar(inimigo, pontosInimigo, vezLamb, i, numero, true)
    for(let j = 0; j < 3; j++){ // looping passando pelos 3 cards da coluna selecionada
        if(inimigo[i][j] == numero){ // procura o numero igual ao jogado
            inimigo[i][j] = 0; // ao encontrar retira ele da coluna
        }
    }
    console.log('Retira dado Inimigo Main Chama Pontuar')
    arrumaEspacoVazio(inimigo, i, vezLamb) // função que arruma o espaço vazio que pode ter ficado entre os numeros da coluna
}

function arrumaEspacoVazio(inimigo, i, vezLamb){

    for(let k = 0; k < 3; k++){
        for(let j = 0; j < 2; j++){
            if(inimigo[i][j] == 0 && inimigo[i][j+1] != 0){ // verifica se o card está vazio e se o próximo não está
                inimigo[i][j] = inimigo[i][j+1] // dessa forma o vazio recebe o valor do próximo
                inimigo[i][j+1] = 0 // e o próximo vira 0
            }
        }
    }
    atualizaColuna(inimigo, i, vezLamb) // função para atualizar o variável e o html que contém os dados dos personagens
}

function atualizaColuna(inimigo, i, vezLamb){ // recebe os dados do inimigo, a coluna que foi mudada e quem foi o personagem que jogou

    const colunaLamb = document.querySelectorAll('.section-bottom > .coluna') // vetor com as 3 colunas do lamb
    const colunaRataun = document.querySelectorAll('.section-top > .coluna') // vetor com as 3 colunas do rataun

    if(vezLamb){ // se quem jogou foi o lamb então atualiza a coluna do rataun
        atualizaDadosRataun(inimigo);
        for(let j = 0; j < 3; j++){
            if(inimigo[i][j] != 0){
                colunaRataun[i].children[j].innerHTML = '<p>' + inimigo[i][j] + '</p>'
            }else{
                colunaRataun[i].children[j].innerHTML = ''
            }
        }

    }else{ // se quem jogou foi o rataun, então atualiza a coluna do lamb
        atualizaDadosLamb(inimigo);
        for(let j = 0; j < 3; j++){
            if(inimigo[i][j] != 0){
                colunaLamb[i].getElementsByClassName('card')[j].innerHTML = '<p>' + inimigo[i][j] + '</p>'
            }else{
                colunaLamb[i].getElementsByClassName('card')[j].innerHTML = ''
            }
        }       
    }
}