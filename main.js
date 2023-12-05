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
let vezJogador = true
let numero
RandomizaDado()

function RandomizaDado(){
    // Randomiza o numero do dado
    numero = (Math.floor(Math.random()*6 + 1))

    // Verifica de quem é a vez pra jogar o dado pro jogador específica
    if(vezJogador){
        lambDice.innerHTML = '<p>' + numero + '</p>'
    }else{
        rataunDice.innerHTML = '<p>' + numero + '</p>'
        // Timeout adicionado para que mostre o dado tirado pelo Rataun por 2s antes de apagá-lo na função rataunJoga()
        setTimeout(() => {
            rataunJoga()
        }, 4000)
        
    }
}

function escolherColuna(){

    let multiplicador = 1;

    // Se for a vez do jogador, ele verifica se existe espaço vazio na coluna escolhida
    if(vezJogador){

        for(let i = 0; i < 3; i++){
           // Verifica se há algum numero igual na coluna escolhina para poder fazer o bônus de pontuação
            if(this.querySelectorAll('.card')[i].hasChildNodes() && this.querySelectorAll('.card')[i].children[0].innerHTML == numero){
                multiplicador++
            }
            // Verifica se o card está vazio. Ou seja, se há espaço para adicionar o novo dado
            if(this.querySelectorAll('.card')[i].hasChildNodes() == false){
                // Adiciona o valor na coluna escolhida
                this.querySelectorAll('.card')[i].innerHTML = '<p>' + numero + '</p>'
                lambDice.innerHTML = ''
                // Chama a função que vai calcular a nova pontuação
                pontuar(multiplicador, vezJogador, this)
                vezJogador = false
                // Ativa os efeitos vizuais de acordo com quem está jogando
                mudarJogadorEfeitos(vezJogador);
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

            // Verifica se há algum numero igual na coluna escolhina para poder fazer o bônus de pontuação
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
                // Ativa os efeitos vizuais de acordo com quem está jogando
                mudarJogadorEfeitos(vezJogador);
                temEspaço = true
    
                // Ativa a animação de jogar o dado do personagem
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
