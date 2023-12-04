const colunaJogador = document.querySelectorAll('.section-bottom > .coluna')
const colunaRataun = document.querySelectorAll('.section-top > .coluna')
const lamb = document.querySelector('img#lamb')
const rataun = document.querySelector('img#rataun')
const lambDice = document.querySelector('.lamb-dice-container')
const rataunDice = document.querySelector('.rataun-dice-container')

// Adiciona um eventListener para saber quando o jogador clicar em uma coluna
for(let i = 0; i<colunaJogador.length; i++){
    colunaJogador[i].addEventListener('click', escolherColuna)
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

    // Se for a vez do jogador, ele verifica se existe espaço vazio na coluna escolhida
    if(vezJogador){

        for(let i = 0; i < 3; i++){
            if(this.children[i].hasChildNodes() == false){

                // Adiciona o valor na coluna escolhida
                this.children[i].innerHTML = '<p>' + numero + '</p>'
                lambDice.innerHTML = ''
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

        // randomiza a coluna em que o Rataun vai jogar
        let coluna = (Math.floor(Math.random()*3))
    
        for(let i = 0; i < 3; i++){
            if(colunaRataun[coluna].children[i].hasChildNodes() == false){
    
                // Adiciona o valor na coluna escolhida
                colunaRataun[coluna].children[i].innerHTML = '<p>' + numero + '</p>'
                rataunDice.innerHTML = ''
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
