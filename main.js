import { receberDadosLamb, atualizaDadosLamb, atualizaPontosLamb, atualizaVezLamb, inicarJogo, receberPontosLamb} from "./src/lamb.js"
import { receberDadosRataun, atualizaDadosRataun, atualizaPontosRataun, rataunEscolheInteligente, receberPontosRataun } from "./src/rataun.js"

let terminouRodada = false;

inicarJogo()  // inicia o jogo adicionando eventListener às colunas do jogador (lamb)
RandomizaDado(true) // chama a função que vai randomizar o primeiro dado, com o parametro true indicando que é a vez do jogador (lamb)

function RandomizaDado(vezLamb){

    const lambDice = document.querySelector('.lamb-dice-container>.dice')
    const rataunDice = document.querySelector('.rataun-dice-container>.dice')
    const alertaContainer = document.querySelector('.section-alertas > div')
    const alertaText = document.querySelector('.section-alertas > div > p')

    let numero = (Math.floor(Math.random()*6 + 1)) // Randomiza o numero do dado
    terminouRodada = false

    if(vezLamb){ // Verifica de quem é a vez pra jogar o dado pro jogador específica
        lambDice.src = 'Imgs/Dices/Dice' + numero + '.jpeg'// adiciona o dado tirado no tabuleiro do jogador (lamb)
        lambDice.classList.toggle('dice-animation') // adiciona animação de rolagem

        alertaContainer.classList.toggle('alerta-cresce-volta')
        alertaText.innerHTML = 'Vez de Lamb'          
        setTimeout(() => {
            alertaText.innerHTML = ''         
        }, 2500);
        setTimeout(() => {
            lambDice.classList.toggle('dice-animation') // remove a animação de rolagem
            alertaContainer.classList.toggle('alerta-cresce-volta')
            terminouRodada = true
        }, 3000);

        atualizaVezLamb(true, numero)
        
    }else{
        rataunDice.src = 'Imgs/Dices/Dice' + numero + '.jpeg' // adiciona o dado tirado no tabuleiro do Rataun
        rataunDice.classList.toggle('dice-animation')

        alertaContainer.classList.toggle('alerta-cresce-volta')
        alertaText.innerHTML = 'Vez de Rataun'          
        setTimeout(() => {
            alertaText.innerHTML = ''         
        }, 2500);
        setTimeout(() => {
            rataunEscolheInteligente(receberDadosLamb(), numero)
            alertaContainer.classList.toggle('alerta-cresce-volta')   
            rataunDice.classList.toggle('dice-animation')// Timeout adicionado para que mostre o dado tirado pelo Rataun por 2s antes de apagá-lo na função rataunJoga()
            terminouRodada = true
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
    console.log('inicio acaba jogo')

    atualizaVezLamb(false)
    const lambPontos = document.querySelector('#pontos-lamb') // seleciona os pontos totais do Lamb
    const rataunPontos = document.querySelector("#pontos-rataun") // seleciona os pontos totais do Rataun

    const lamb = document.querySelector('img#lamb') // seleciona a imagem do lamb
    const rataun = document.querySelector('img#rataun') // seleceiona a imagem do Rataun

    const alertaContainer = document.querySelector('.section-alertas > div') // seleciona a div da section de alertas
    const alertaText = document.querySelector('.section-alertas > div > p') // seleciona o texto da section de alertas

    if(parseInt(lambPontos.innerHTML) > parseInt(rataunPontos.innerHTML)){
        lamb.src='Imgs/Lamb/Lamb-take-dice.gif' // muda a animação do lamb para o de take dice (feliz)
        rataun.src='Imgs/Rataun/Rataun-lose-game.gif' // muda a animação do Rataun para o de lose game (raiva)
        setTimeout(() => {
            lamb.src='Imgs/Lamb/Lamb-win-game-loop.gif' // muda para a animação win game loop depois de 1.335 segundos
            rataun.src='Imgs/Rataun/Rataun-lose-game-loop.gif' // muda a animação para lose game loop depois de 1.335 segundos
        }, 1800)

        if(terminouRodada){
            alertaContainer.classList.add('alerta-crescer') // aumenta o tamanho da faixa do alerta
            alertaText.innerHTML = 'Lamb Venceu!' // escreve no alerta quem ganhou
        }

    }else if(parseInt(rataunPontos.innerHTML) > parseInt(lambPontos.innerHTML)){
        rataun.src='Imgs/Rataun/Rataun-win-game.gif' // muda a animação do Rataun para o de win game (feliz)
        lamb.src='Imgs/Lamb/Lamb-lose-game.gif' // muda a animação do Lamb para o de lose game (raiva)
        setTimeout(() => {
            rataun.src='Imgs/Rataun/Rataun-win-game-loop.gif' // muda para a animação win game loop depois de 1.335 segundos
            lamb.src='Imgs/Lamb/Lamb-lose-game-loop.gif' // muda a animação para lose game loop depois de 1.335 segundos
        }, 1800) 
        
        if(terminouRodada){
            alertaContainer.classList.add('alerta-crescer') // aumenta o tamanho da faixa do alerta
            alertaText.innerHTML = 'Rataun Venceu!' // esreve no alerta quem ganhou
        }

    }else{ // empate
        lamb.src='Imgs/Lamb/Lamb-lose-game.gif' // muda a animação do Lamb para o de lose game (raiva)
        rataun.src='Imgs/Rataun/Rataun-lose-game.gif' // muda a animação do Rataun para o de lose game (raiva)
        setTimeout(() => {
            lamb.src='Imgs/Lamb/Lamb-lose-game-loop.gif' // muda para a animação lose game loop depois de 1.335 segundos
            rataun.src='Imgs/Rataun/Rataun-lose-game-loop.gif' // muda para a animação lose game loop depois de 1.335 segundos
        }, 1800) 

        if(terminouRodada){
            alertaContainer.classList.add('alerta-crescer') // aumenta o tamanho da faixa do alerta
            alertaText.innerHTML = 'Empatados!' // declara empate no texto do alerta
        }

    }
    console.log('final acaba jogo')
}

export function pontuar(jogador, pontuacaoColunas, vezLamb, coluna, numero, retiraPonto){

    const lambPontos = document.querySelector('#pontos-lamb') // seleciona os pontos totais do Lamb
    const rataunPontos = document.querySelector("#pontos-rataun") // seleciona os pontos totais do Rataun

    const colunaLambPontos = document.querySelectorAll('.section-bottom > .coluna > p') // vetor com as pontuações das 3 colunas do lamb
    const colunaRataunPontos = document.querySelectorAll('.section-top > .coluna > p') // vetor com as pontuações das 3 colunas do rataun

    let multiplicador = calculaMultiplicador(coluna, jogador, numero) // calcula quantos numeros iguais tem na mesma coluna

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

export function mudarCorDados(coluna, jogador, vezLamb, numero, retiraPonto){

    const colunaLamb = document.querySelectorAll('.section-bottom > .coluna') // vetor com as 3 colunas do lamb
    const colunaRataun = document.querySelectorAll('.section-top > .coluna') // vetor com as 3 colunas do rataun

    if(retiraPonto && vezLamb){
        vezLamb = false;
        numero = parseInt(colunaRataun[coluna].querySelectorAll('.card')[0].id)
    }else if(retiraPonto && vezLamb == false){
        vezLamb = true;
        numero = parseInt(colunaLamb[coluna].querySelectorAll('.card')[0].id)
    }

    let multiplicador = calculaMultiplicador(coluna, jogador, numero)

    if(vezLamb){
        if(multiplicador == 1){
            console.log('Vez Lamb - M 0 ')
            for(let i = 0; i < 3; i++){
                if(jogador[coluna][i] == numero){
                    console.log(colunaLamb[coluna].querySelectorAll('.card')[i])
                    colunaLamb[coluna].querySelectorAll('.card')[i].querySelector('.dice').classList.remove('hueRotation-blue', 'hueRotation-yellow')
                    colunaLamb[coluna].style.background = '';
                    colunaLamb[coluna].querySelector('p').style.color = 'var(--main-dark-color)'
                }
            }
        }else if(multiplicador == 2){
            console.log('Vez Lamb - M 2 ')
            for(let i = 0; i < 3; i++){
                if(jogador[coluna][i] == numero){
                    colunaLamb[coluna].querySelectorAll('.card')[i].children[0].classList.add('hueRotation-yellow')
                    colunaLamb[coluna].querySelectorAll('.card')[i].children[0].classList.remove('hueRotation-blue')
                    colunaLamb[coluna].style.background = '';
                    colunaLamb[coluna].querySelector('p').style.color = 'var(--main-dark-color)'
                }
            }     
        }else if(multiplicador == 3){
            console.log('Vez Lamb - M 3 ')
            for(let i = 0; i < 3; i++){
                if(jogador[coluna][i] == numero){
                    colunaLamb[coluna].querySelectorAll('.card')[i].children[0].classList.add('hueRotation-blue')
                    colunaLamb[coluna].querySelectorAll('.card')[i].children[0].classList.remove('hueRotation-yellow')
                    colunaLamb[coluna].style.background = 'var(--main-dark-color)'
                    colunaLamb[coluna].querySelector('p').style.color = 'var(--main-light-color)'
                }
            }
        }
    }else{
        if(multiplicador == 1){
            console.log('Vez Rataun - M 0  ')
            for(let i = 0; i < 3; i++){
                if(jogador[coluna][i] == numero){
                    colunaRataun[coluna].querySelectorAll('.card')[i].children[0].classList.remove('hueRotation-blue', 'hueRotation-yellow')
                    colunaRataun[coluna].style.background = ''
                    colunaRataun[coluna].querySelector('p').style.color = 'var(--main-dark-color)'
                }
            }
        }else if(multiplicador == 2){
            console.log('Vez Rataun - M 2 ')
            for(let i = 0; i < 3; i++){
                if(jogador[coluna][i] == numero){
                    colunaRataun[coluna].querySelectorAll('.card')[i].children[0].classList.add('hueRotation-yellow')
                    colunaRataun[coluna].querySelectorAll('.card')[i].children[0].classList.remove('hueRotation-blue')
                    colunaRataun[coluna].style.background = ''
                    colunaRataun[coluna].querySelector('p').style.color = 'var(--main-dark-color)'
                }
            }     
        }else if(multiplicador == 3){
            console.log('Vez Rataun - M 3 ')
            for(let i = 0; i < 3; i++){
                if(jogador[coluna][i] == numero){
                    colunaRataun[coluna].querySelectorAll('.card')[i].children[0].classList.add('hueRotation-blue')
                    colunaRataun[coluna].querySelectorAll('.card')[i].children[0].classList.remove('hueRotation-yellow')
                    colunaRataun[coluna].style.background = 'var(--main-dark-color)'
                    colunaRataun[coluna].style.color = 'var(--main-light-color)'
                }
            }
        }
    }
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
    arrumaEspacoVazio(inimigo, i, vezLamb, numero) // função que arruma o espaço vazio que pode ter ficado entre os numeros da coluna
}

function arrumaEspacoVazio(inimigo, i, vezLamb, numero){

    for(let k = 0; k < 3; k++){
        for(let j = 0; j < 2; j++){
            if(inimigo[i][j] == 0 && inimigo[i][j+1] != 0){ // verifica se o card está vazio e se o próximo não está
                inimigo[i][j] = inimigo[i][j+1] // dessa forma o vazio recebe o valor do próximo
                inimigo[i][j+1] = 0 // e o próximo vira 0
            }
        }
    }
    atualizaColuna(inimigo, i, vezLamb, numero) // função para atualizar o variável e o html que contém os dados dos personagens
}

function atualizaColuna(inimigo, i, vezLamb, numero){ // recebe os dados do inimigo, a coluna que foi mudada e quem foi o personagem que jogou

    const colunaLamb = document.querySelectorAll('.section-bottom > .coluna') // vetor com as 3 colunas do lamb
    const colunaRataun = document.querySelectorAll('.section-top > .coluna') // vetor com as 3 colunas do rataun

    const lamb = document.querySelector('img#lamb') // seleciona a imagem do lamb
    const rataun = document.querySelector('img#rataun') // seleceiona a imagem do Rataun

    if(vezLamb){ // se quem jogou foi o lamb então atualiza a coluna do rataun
        atualizaDadosRataun(inimigo);
        for(let j = 0; j < 3; j++){
            if(inimigo[i][j] != 0){
                colunaRataun[i].children[j].innerHTML = '<img id="' + inimigo[i][j] +'" class="dice" src="Imgs/Dices/Dice' + inimigo[i][j] + '.jpeg">'
            }else{
                colunaRataun[i].children[j].innerHTML = ''
            }
        }

    }else{ // se quem jogou foi o rataun, então atualiza a coluna do lamb
        atualizaDadosLamb(inimigo);
        for(let j = 0; j < 3; j++){
            if(inimigo[i][j] != 0){
                colunaLamb[i].getElementsByClassName('card')[j].innerHTML = '<img id="' + inimigo[i][j] +'" class="dice" src="Imgs/Dices/Dice' + inimigo[i][j] + '.jpeg">'
            }else{
                colunaLamb[i].getElementsByClassName('card')[j].innerHTML = ''
            }
        }       
    }
    mudarCorDados(i, inimigo, vezLamb, numero, true)
}