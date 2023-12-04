const colunaJogador = document.querySelectorAll('.section-bottom > .coluna')

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

    RandomizaDado();

}
