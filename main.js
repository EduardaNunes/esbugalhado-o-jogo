const colunaJogador = document.querySelectorAll('.section-bottom > .coluna')
const lamb = document.querySelector('img#lamb');

for(let i = 0; i<colunaJogador.length; i++){
    colunaJogador[i].addEventListener('click', escolherColuna)
}

let numero;
RandomizaDado();

function RandomizaDado(){
    numero = (Math.floor(Math.random()*6 + 1));
}

function escolherColuna(){

    for(let i = 0; i < 3; i++){
        if(this.children[i].hasChildNodes() == false){
            this.children[i].innerHTML = '<p>' + numero + '</p>';
            break;
        }
    }

    lamb.src='Imgs/Lamb/lamb-play-dice.gif';
    setTimeout(() => {
        lamb.src='Imgs/Lamb/lamb-idle.gif';
    }, 1335);
    RandomizaDado();

}
