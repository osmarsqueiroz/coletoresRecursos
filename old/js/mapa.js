/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Elemento = function (meuX, meuY, passavel, elementoPai) {
    this.passavel = passavel; //1 Sim 0 nao
    this.zoom = 1;
    this.elementoPai = elementoPai;
    this.posicao = {x: meuX, y: meuY};
}
var Mapa = function (mapaImagem, cenario, mapaX, mapaY) {
    this.cenario = cenario;
    this.imagem = mapaImagem;
    this.mapaX = mapaX;
    this.mapaY = mapaY;
    this.mapa = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 1],
        [1, 2, 0, 0, 1, 6, 0, 0, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 2, 2, 1],
        [1, 0, 0, 0, 1, 0, 1, 0, 1, 2, 2, 1],
        [1, 0, 5, 0, 0, 0, 1, 5, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
        [1, 3, 0, 0, 1, 0, 0, 0, 0, 0, 4, 1],
        [1, 0, 0, 3, 1, 0, 0, 3, 3, 2, 0, 1],
        [1, 0, 0, 1, 1, 0, 0, 0, 3, 3, 2, 1],
        [1, 3, 0, 6, 0, 0, 0, 2, 0, 3, 3, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//        [1, 1, 1, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//        [1, 2, 0, 0, 0, 2, 0, 0, 2, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 1],
//        [1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
//        [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 4, 1, 2, 1, 0, 0, 1],
//        [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1],
//        [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1],
//        [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1],
//        [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1],
//        [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 4, 4, 4, 2, 0, 1, 1, 0, 1, 1, 0, 0, 1],
//        [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 2, 1],
//        [1, 2, 0, 0, 0, 2, 2, 2, 1, 1, 0, 0, 2, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1],
//        [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 2, 1, 1, 5, 1],
//        [1, 1, 4, 5, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 4, 0, 0, 1, 0, 0, 1],
//        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1],
    ];
    this.linhaMaxX = this.mapa[0].length;
    this.linhaMaxY = this.mapa.length;

    var root = this;

    this.elementosMapa = [];
    this.elementosMapa[0] = new Elemento(8, 2, 1);// terreno
    this.elementosMapa[1] = new Elemento(16, 0, 0); // parede
    this.elementosMapa[2] = new Elemento(6, 33, 0, this.elementosMapa[0]);
    this.elementosMapa[3] = new Elemento(6, 52,1, this.elementosMapa[0]); //flores
    this.elementosMapa[4] = new Elemento(16, 61, 1,this.elementosMapa[0]); //ouro
    this.elementosMapa[5] = new Elemento(17, 61, 1,this.elementosMapa[0]); //prata
    this.elementosMapa[6] = new Elemento(17, 62, 1,this.elementosMapa[0]); //pedras
    this.elementosMapa[7] = new Elemento();
    this.elementosMapa[8] = new Elemento();

    this.gerarMapa = function () {
        var objImagem = new Image;
        objImagem.src = this.imagem;
        objImagem.onload = function () {
            console.log(root.linhaMaxX)

            for (var x = 0; x < root.linhaMaxX; x++) {
                for (var y = 0; y < root.linhaMaxY; y++) {

                    var elemento = root.elementosMapa[root.mapa[y][x]];
                    console.log(typeof elemento.elementoPai == "undefined")
                    if (typeof elemento.elementoPai !== "undefined") {
                        root.cenario.drawImage(objImagem,
                                32 * elemento.elementoPai.posicao.x,
                                32 * elemento.elementoPai.posicao.y,
                                32,
                                32,
                                32 * x,
                                32 * y,
                                32,
                                32);
                    }
                    root.cenario.drawImage(objImagem,
                            32 * elemento.posicao.x,
                            32 * elemento.posicao.y,
                            32,
                            32,
                            32 * x,
                            32 * y,
                            32,
                            32);
                    
                }
            }
        }
    }

}
