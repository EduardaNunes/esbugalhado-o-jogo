const colunaLamb = document.querySelectorAll('.section-bottom > .coluna')
const colunaRataun = document.querySelectorAll('.section-top > .coluna')
const lamb = document.querySelector('img#lamb')
const rataun = document.querySelector('img#rataun')
const lambDice = document.querySelector('.lamb-dice-container>p')
const rataunDice = document.querySelector('.rataun-dice-container')
const lambPontos = document.querySelector('#pontos-lamb');
const rataunPontos = document.querySelector("#pontos-rataun");

// Adiciona um eventListener para saber quando o jogador clicar em uma coluna
for(let i = 0; i<colunaLamb.length; i++){
    colunaLamb[i].addEventListener('click', escolherColuna)
}

let vezJogador = true
let numero
RandomizaDado()

function RandomizaDado(){
    numero = (Math.floor(Math.random()*6 + 1))

    // Verifica de quem é a vez pra jogar o dado pro jogador específica
    if(vezJogador){
        lambDice.innerHTML = '<p>' + numero + '</p>'
    }else{
        rataunDice.innerHTML = '<p>' + numero + '</p>'
        setTimeout(() => {
            rataunJoga()
        }, 2000)
        
    }
}

function escolherColuna(){

    let multiplicador = 1;

    // Se for a vez do jogador, ele verifica se existe espaço vazio na coluna escolhida
    if(vezJogador){

        for(let i = 0; i < 3; i++){
            // Verifica se existe algum numero na coluna escolhida (this) que seja igual ao numero tirado no dado
            
            if(this.querySelectorAll('.card')[i].hasChildNodes() && this.querySelectorAll('.card')[i].children[0].innerHTML == numero){
                multiplicador++
            }
            if(this.querySelectorAll('.card')[i].hasChildNodes() == false){

                // Adiciona o valor na coluna escolhida
                this.querySelectorAll('.card')[i].innerHTML = '<p>' + numero + '</p>'
                lambDice.innerHTML = ''

                // Chama a função que vai calcular a nova pontuação
                pontuar(multiplicador, vezJogador, this)

                vezJogador = false

                // Ativa a animação de jogar o dado
                lamb.src='Imgs/Lamb/Lamb-play-dice.gif'
                setTimeout(() => {
                    lamb.src='Imgs/Lamb/Lamb-idle.gif'
                }, 1335)

                // Sai do loop uma vez que encontrou um local válido
                break
            }
        }
    }

    // Randomiza o Próximo Dado
    RandomizaDado()
}

function rataunJoga(){

    let temEspaço = false;
   
    // verifica se existe local disponível na coluna
    while(temEspaço == false){

        let multiplicador = 1;

        // randomiza a coluna em que o Rataun vai jogar
        let coluna = (Math.floor(Math.random()*3))
    
        for(let i = 0; i < 3; i++){

            if(colunaRataun[coluna].children[i].hasChildNodes() && colunaRataun[coluna].children[i].children[0].innerHTML == numero){
                multiplicador++
            }
            if(colunaRataun[coluna].children[i].hasChildNodes() == false){
    
                // Adiciona o valor na coluna escolhida
                colunaRataun[coluna].children[i].innerHTML = '<p>' + numero + '</p>'
                rataunDice.innerHTML = ''

                // Chama a função que vai calcular a nova pontuação
                pontuar(multiplicador, vezJogador, colunaRataun[coluna])               
                vezJogador = true
                temEspaço = true
    
                // Ativa a animação de jogar o dado
                rataun.src='Imgs/Rataun/Rataun-play-dice.gif'
                setTimeout(() => {
                    rataun.src='Imgs/Rataun/Rataun-idle.gif'
                }, 1335)
    
                // Sai do loop uma vez que encontrou um local válido
                break
            }
        }
    }
    
    // Randomiza o Próximo Dado
    RandomizaDado()
}


function pontuar(multiplicador, vezJogador, coluna){

    let pontosColuna = parseInt(coluna.querySelector('.pontos').innerHTML)
    let totalPontosLamb = parseInt(lambPontos.innerHTML)
    let totalPontosRataun = parseInt(rataunPontos.innerHTML)
    let pontuacao = numero * multiplicador * multiplicador - numero * (multiplicador - 1) * (multiplicador - 1)

    // Atualiza a pontuação da coluna selecionada
    pontosColuna += pontuacao
    coluna.querySelector('.pontos').innerHTML = pontosColuna

    // Verifica de quem é a vez e atualiza a pontuação total
    if(vezJogador){
        totalPontosLamb += pontuacao
        lambPontos.innerHTML = totalPontosLamb
    }else{
        totalPontosRataun += pontuacao
        rataunPontos.innerHTML = totalPontosRataun
    }
}
