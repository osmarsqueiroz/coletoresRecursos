/* 
 *
 *      Gerenciador de mapa, bonecos e moedas
 *  
 *            
 *   
 */

var Gerenciador = {
    objCanvas: "",
    cenario: "",
    objImagem:"",
    imagemBoneco:"image/male.png",
    imagemMapa:"image/simple_32.png",
    mapaX: 32,
    mapaY: 32,
    mapa: "",
    init: function () {
        Gerenciador.objCanvas = document.getElementById('myCanvas');
        Gerenciador.cenario = Gerenciador.objCanvas.getContext("2d");
        Gerenciador.desenharLinhas();
       //Gerenciador.gerarPersonagens();

    },
    desenharLinhas: function () {
        var cenarioMapa = new Mapa("image/simple_32.png",Gerenciador.cenario,Gerenciador.mapaX,Gerenciador.mapaY);
        cenarioMapa.gerarMapa()
      
       /* 
        var linhasX = cenarioMapa.mapa[0].length
        var linhasY = cenarioMapa.mapa.length
        var i = 0;
        var posicao = 0;

        Gerenciador.cenario.translate(20, 20);
        Gerenciador.cenario.beginPath();
        Gerenciador.cenario.lineWidth = 1
        Gerenciador.cenario.strokeStyle = 'hsl(135, 100%, 25%)';
        var lineWidth = cenario.mapa[0].length * Gerenciador.mapaX
        var lineHeight = cenario.mapa.length * Gerenciador.mapaY
        do {
            posicao = i * Gerenciador.mapaY;            
            Gerenciador.cenario.moveTo(0, posicao);
            Gerenciador.cenario.lineTo(lineWidth, posicao);
            i++;
        } while (i <= linhasY);
        i = 0;

        do {
            posicao = i * Gerenciador.mapaX;
            Gerenciador.cenario.moveTo(posicao, 0);
            Gerenciador.cenario.lineTo(posicao, lineHeight);
            i++;
        } while (i <= linhasX);

        Gerenciador.cenario.stroke();
         */
//        Gerenciador.cenario.beginPath();
//        Gerenciador.cenario.moveTo(10, 10);
//        Gerenciador.cenario.lineTo(10, Gerenciador.objCanvas.width);
//        Gerenciador.cenario.stroke();
    },
    gerarPersonagens: function () {
        Gerenciador.objImagem = new Image;
        Gerenciador.objImagem.src = Gerenciador.imagemBoneco;
        Gerenciador.objImagem.onload = function () {
            console.log("abrindo")
            var bonecos = [
            new Boneco(Gerenciador.cenario, 0, 0, Gerenciador.mapaX, Gerenciador.mapaY,Gerenciador.objImagem),
            new Boneco(Gerenciador.cenario, 1, 1, Gerenciador.mapaX, Gerenciador.mapaY,Gerenciador.objImagem),
            new Boneco(Gerenciador.cenario, 5, 4, Gerenciador.mapaX, Gerenciador.mapaY,Gerenciador.objImagem),
            new Boneco(Gerenciador.cenario, 7, 3, Gerenciador.mapaX, Gerenciador.mapaY,Gerenciador.objImagem),
        ];

        var passos = [
        [0,1],
        [0,2],
        [1,2],
        [2,2],
        [2,3],
        [2,4],
        [3,4],
        [4,4],
        [4,5],
        [5,5],
        [5,4],
        [5,3],
        [5,2],
        [5,1],
        [5,0],
        [4,0],
        [3,0],
        [2,0],
        [1,0],
        [0,0],
        ];
     //   bonecos[0].adicionarPassos(passos);
      //  bonecos[0].mostrar(); 
     //   bonecos[0].processarPassos();  
//        bonecos[1].mostrar();
//        bonecos[2].mostrar();
//        bonecos[3].mostrar();
//        bonecos[3].andar();
        }
        
    }
}


window.onload = function () {
    Gerenciador.init();
}