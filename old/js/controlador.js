/*
 * 
 * Preciso criar uma base para ler o mapa
 * 
 * 
 */

var Bloco = function(nome, cor, passavel) {
    this.nome = nome;
    this.tamanho = {x: 50, y: 50};
    this.passavel = (passavel === undefined) ? 1 : passavel;
    this.cor = cor;
    this.estilo = "10px saxmono";

};

var chegada = new Bloco("chegada", "#8FFF92");
var partida = new Bloco("partida", "#FF968F");
var parede = new Bloco("parede", "#8A5E50", 0);
var analizador = new Bloco("analizador", "#FBFBBC");
var piso = new Bloco("piso", "#F9F9F9");

//var listaChegada = [];
//var listaPartida = [];

var pontoChegada = {
    ponto: [],
    adicionarPonto: function(ponto) {
        var posicao = pontoChegada.ponto.length;
        pontoChegada.ponto[posicao] = ponto;
    }
}

var pontoPartida = {
    ponto: [],
    adicionarPonto: function(ponto) {
        var posicao = pontoPartida.ponto.length;
        pontoPartida.ponto[posicao] = ponto;
    }
}

var listaFechada = {
    lista: new Array(),
    tamanho: 0,
    adicionarLista: function(item) {
        if (!listaFechada.verificarElementoExiste(item)) {
            listaFechada.lista.push(item)
            listaFechada.tamanho = listaFechada.lista.length;
        }
    },
    verificarElementoExiste: function(item) {
        for (var i in listaFechada.lista) {
            if (listaFechada.lista[i].x == item.x && listaFechada.lista[i].y == item.y) {
                return true;
            }
        }
        return false;
    },
    atualizarElemento: function(elemento, itemId) {
        if (listaFechada.lista[itemId] !== undefined) {
            listaFechada.lista[itemId] = elemento;
        }
    },
    buscarElemento: function(itemId) {
        if (listaFechada.lista[itemId] !== undefined) {
            return listaFechada.lista[itemId];
        }
        return false;
    }
}

var listaAberta = {
    lista: new Array(),
    tamanho: 0,
    adicionarLista: function(item) {
        if (!listaAberta.verificarElementoExiste(item,listaFechada)) {
            listaAberta.lista.push(item)
            listaAberta.tamanho = listaAberta.lista.length;
        }
    },
    verificarElementoExiste: function(item,listaFechada) {
        for (var i in listaAberta.lista) {
            if (listaAberta.lista[i].x == item.x && listaAberta.lista[i].y == item.y) {
            	listaAberta.lista[i].distancia = item.distancia
            	listaAberta.lista[i].peso = item.peso
            	listaAberta.lista[i].custo = item.custo
                return true;
            }
        }
        for (var i in listaFechada.lista) {
            if (listaFechada.lista[i].x == item.x && listaFechada.lista[i].y == item.y) {
                return true;
            }
        }
        return false;
    },
    buscarElemento: function(itemId) {
        if (listaAberta.lista[itemId] !== undefined) {
            return listaAberta.lista[itemId];
        }
        return false;
    },
    removerLista: function(itemId) {
        listaAberta.lista.splice(itemId, 1)
        listaAberta.tamanho = listaAberta.lista.length;
    },
    buscarElemento: function(itemId) {
        if (listaAberta.lista[itemId] !== undefined) {
            return listaAberta.lista[itemId];
        }
        return false;
    }
}

window.onload = function() {

    var meuCanvas = document.getElementById("myCanvas");
    var telaHeight = meuCanvas.offsetHeight - 2;
    var telaWidth = meuCanvas.offsetWidth - 2;
    var ctx = meuCanvas.getContext("2d");

    var mapa = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1],
        [1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1],
        [1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1],
        [1, 0, 0, 0, 1, 3, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
/*
    var mapa = [
        [1, 1,1, 1, 1, 1, 1, 1, 1,1,1, 1],
        [1, 0,0, 0, 0, 0, 0, 0, 0,0,0, 1],
        [1, 0,0, 0, 0, 0, 0, 0, 0,0,0, 1],
        [1, 0,0, 0, 0, 0, 0, 0, 0,0,0, 1],
        [1, 0,0, 0, 0, 1, 0, 0, 0,0,0, 1],
        [1, 0,0, 2, 0, 1, 0, 3, 0,0,0, 1],
        [1, 0,0, 0, 0, 1, 0, 0, 0,0,0, 1],
        [1, 0,0, 0, 0, 0, 0, 0, 0,0,0, 1],
        [1, 0,0, 0, 0, 0, 0, 0, 0,0,0, 1],
        [1, 0,0, 0, 0, 0, 0, 0, 0,0,0, 1],
        [1, 1,1, 1, 1, 1, 1, 1, 1,1,1, 1]
    ];*/

    var mapeador = new Array();
    mapeador[0] = piso;
    mapeador[1] = parede;
    mapeador[2] = partida;
    mapeador[3] = chegada;
    mapeador[4] = analizador;

    ctx.strokeStyle = "#ccc";
    var maxX = mapa[0].length;
    var maxY = mapa.length;

    /*
     * Localizar os elementos iniciais e finais
     */

    for (var i = 0; i < maxY; i++) {
        for (var j = 0; j < maxX; j++) {
            if (mapa[i][j] == 3) {
                pontoChegada.adicionarPonto({x: i, y: j});
            }
            if (mapa[i][j] == 2) {
                pontoPartida.adicionarPonto({x: i, y: j});
            }
        }
    }
    // preciso criar a lista aberta
    //pego meu ponto inicial e coloco na lista fechada

    // console.log(mapa[pontoPartida.ponto[0].x][pontoPartida.ponto[0].y]); // == 2


    //metodo de processar passo;
    //metodo de definir peso;

    //proximo passo passo os eixos
    var calcularPassoParaListaAberta = function(itemPartida, itemChegada, listaAberta,listaFechada,basePeso) {
        //calcular 

//        console.log(itemPartida)
        var idPassavel = mapa[itemPartida.x][itemPartida.y];

        switch (mapeador[idPassavel].passavel) {
            case 0: //elemento passavel
//                console.log("nao passavel");
                break;
            case 1: //parede
               // console.log("passavel");
                var distancia = (Math.abs(itemPartida.x - itemChegada.x) + Math.abs(itemPartida.y - itemChegada.y));
               // console.log(distancia)
                //var peso = 10;
                var peso = (basePeso === undefined?10:basePeso+10);
                
                var novoItem = {
                    x: itemPartida.x,
                    y: itemPartida.y,
                    pai: itemPartida.pai,
                    distancia: distancia,
                    peso: peso,
                    custo: peso + distancia
                }
                listaAberta.adicionarLista(novoItem,listaFechada);
                break;
        }
    }


    
    var verificarMenorPesoAdicionaNaListaFechada = function(listaAberta, listaFechada) {

        var custoMenor = undefined;
        var distanciaMenor = undefined;
        var elementoMenor;

            //console.log(listaAberta);
        for (var i =0;i < listaAberta.tamanho;i++) {
            var elemTest = listaAberta.buscarElemento(i);		
            if (custoMenor === undefined) {
                custoMenor = elemTest.custo;
                distanciaMenor = elemTest.distancia;
                elementoMenor = i;
            } else if (elemTest.custo < custoMenor && elemTest.distancia < distanciaMenor) {
                custoMenor = elemTest.custo;
                distanciaMenor = elemTest.distancia;
                elementoMenor = i;
            }
        }

        if (custoMenor !== undefined) {            
			var elementoFinal = listaAberta.buscarElemento(elementoMenor)
            //console.log(custoMenor,elementoFinal);
			listaFechada.adicionarLista(elementoFinal)			
            listaAberta.removerLista(elementoMenor)           
        }
    }



    var validadorPosicao = function(idPartida, itemChegada, listaAberta,listaFechada) {
//        formato cruz
        //console.log(itemPartida, itemChegada, listaAberta)
        itemPartida = listaFechada.buscarElemento(idPartida)
        var teste1 = {x: itemPartida.x - 1, y: itemPartida.y,pai:idPartida};
        var teste2 = {x: itemPartida.x + 1, y: itemPartida.y,pai:idPartida};
        var teste3 = {x: itemPartida.x, y: itemPartida.y - 1,pai:idPartida};
        var teste4 = {x: itemPartida.x, y: itemPartida.y + 1,pai:idPartida};
		//console.log(itemPartida)
        calcularPassoParaListaAberta(teste1, itemChegada, listaAberta,listaFechada,itemPartida.peso);
        calcularPassoParaListaAberta(teste2, itemChegada, listaAberta,listaFechada,itemPartida.peso);
        calcularPassoParaListaAberta(teste3, itemChegada, listaAberta,listaFechada,itemPartida.peso);
        calcularPassoParaListaAberta(teste4, itemChegada, listaAberta,listaFechada,itemPartida.peso);

        //return listaAberta;
    }



    listaFechada.adicionarLista({x: pontoPartida.ponto[0].x,y: pontoPartida.ponto[0].y})

    //calcularPassoParaListaAberta({x: pontoPartida.ponto[0].x, y: pontoPartida.ponto[0].y}, pontoChegada.ponto[0], listaFechada);
    
//    console.log(listaFechada.lista);
    var achou = false;
  // for (var i = 0; i < 50; i++) { ///***********************
   for (var i = 0; i < listaFechada.tamanho; i++) {
        //console.log(i+" - "+ listaFechada.tamanho)
        validadorPosicao(i, pontoChegada.ponto[0], listaAberta,listaFechada);
        
	   //verificar se já chegou no alvo
	   //definir o proximo menor
      // console.log('procurando menor')
       //console.log(listaAberta.lista.length,listaFechada.lista.length)

       verificarMenorPesoAdicionaNaListaFechada(listaAberta,listaFechada);
     
       if(listaFechada.lista[i+1] !== undefined && listaFechada.lista[i+1].distancia == 0){
            achou = true;
            break;
       }
        
    }
//selecinar o elemento
var buscaRecursiva = function(listaFechada){
	var i = listaFechada.tamanho-1;
	var elementoTest
	console.log(i,elementoTest)
	do{
		elementoTest = listaFechada.buscarElemento(i);
		 	if(elementoTest !== undefined){
				ctx.fillStyle = "rgba(0,255,0,0.3)";
				//console.log('aqui carai',elementoTest)
            	//ctx.fillRect(50,50, 50, 50);
            	ctx.fillRect(50 * elementoTest.y, 50 * elementoTest.x, 50, 50);
				i = elementoTest.pai;
			}else{
				i=0;	
			}
	}while(i!=0);
		
}

/*
 var processoReversoDeBusca = function(listaFechada){

        var baseElemento = listaFechada.buscarElemento(listaFechada.tamanho-1)

        var baseElemento2 = listaFechada.buscarElemento(baseElemento.pai)
        
        for(var i = listaFechada.tamanho-1; i>0;i--){
        	///***********************
        	//movendo de volta até sue quadro pai tem que definir uma origem
            //console.log(listaFechada.buscarElemento(i));
        }
        console.log(baseElemento,);
    }
*/



var calcularPessoPasso = function(lista,cor) {

        for (var i in lista) {
              //  console.log(lista[i])
                ctx.fillStyle = cor||"#000";
                ctx.textAlign = "left";
                ctx.font = "10px saxmono";
                if(lista[i].custo !== undefined){
                ctx.fillText(lista[i].custo, (lista[i].y * 50) + 5, (lista[i].x * 50) + 10);//Total
                ctx.fillText(lista[i].peso, (lista[i].y * 50) + 5, (lista[i].x * 50) + 45);//Peso
                ctx.fillText(lista[i].distancia, (lista[i].y * 50) + 30, (lista[i].x * 50) + 45);//Distancia
                ctx.fillText(lista[i].pai, (lista[i].y * 50) + 15, (lista[i].x * 50) + 25);//Distancia
            }
        }
    }

    

     
    for (var i = 0; i < maxY; i++) {
        for (var j = 0; j < maxX; j++) {
            ctx.fillStyle = mapeador[mapa[i][j]].cor;
            ctx.fillRect(50 * j, 50 * i, 50, 50);
            ctx.strokeRect(50 * j, 50 * i, 50, 50);
        }
    }

    calcularPessoPasso(listaFechada.lista,'#0EBCED')  
    calcularPessoPasso(listaAberta.lista,'#ED870E')   
    //console.log(listaFechada)
 
    if(achou==true){
        buscaRecursiva(listaFechada)
    }
    //console.log(listaFechada.lista)
    console.log(achou)



    //mover o ponto central do mapa
//   
//    ctx.fillStyle = "#8FFF92"; //verde
//    ctx.fillStyle = "#FF968F"; //vermelho
//    ctx.fillStyle = "#8A5E50"; //parede
//    ctx.strokeStyle = "#FFFFFF"; //analizador

//bloco de informacoes
//    ctx.fillStyle = "#000";
//    ctx.textAlign = "left";
//    ctx.font = "10px saxmono";
//    ctx.fillText(240, 5, 10);//Total
//    ctx.fillText(10, 5, 45);//Peso
//    ctx.fillText(230, 30, 45);//Distancia

    // console.log(telaWidth, telaHeight)

};

//mapear o cenario




