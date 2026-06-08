console.log("JavaScript funcionando!");

const imagens = [
    
    "imagem2.webp",
    "imagem3.webp",
    "imagem4.webp",
];

let indiceAtual = 0;

const imagemCarrossel = document.getElementById("imagem-carrossel");

const botaoEsquerda = document.getElementById("btn-esquerda");

const botaoDireita = document.getElementById("btn-direita");

botaoDireita.addEventListener("click", function () {

    indiceAtual++;

    if (indiceAtual >= imagens.length) {
        indiceAtual = 0;
    }

    imagemCarrossel.src = imagens[indiceAtual];

});

botaoEsquerda.addEventListener("click", function () {

    indiceAtual--;

    if (indiceAtual < 0) {
        indiceAtual = imagens.length - 1;
    }

    imagemCarrossel.src = imagens[indiceAtual];

});