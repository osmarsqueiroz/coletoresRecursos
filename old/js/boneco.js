var Boneco = function (cenario, posicaoInicialX, posicaoInicialY, celulaX, celulaY, imagem) {

    var root = this;
    this.cenario = cenario;
    this.celulaX = celulaX;
    this.celulaY = celulaY;
    this.passoCelulaX = posicaoInicialX;
    this.passoCelulaY = posicaoInicialY;
    this.passoProximoCelulaX = posicaoInicialX;
    this.passoProximoCelulaY = posicaoInicialY;
    this.decalquePassoX = 0;
    this.decalquePassoY = 0;
    this.imagem = imagem;
    //this.imagemBoneco = "image/male.png";
    this.linha = 0;
    this.parado = 2;
    this.limite = 3;
    this.passoListaAnimacao = [0, 1, 2, 3];
    this.animacaoPasso = 0;
    this.coluna = 0;
    this.imagemLargura = 80;
    this.imagemAltura = 105;
    this.animacaoInterval = null;
    this.animacaoIntervalTime = 80;
    this.zoom = 2;
    this.passo = 3;
    this.passoX = 20;
    this.passoY = 20;
    this.ListaPassos = [];
    this.totalPassosProximoQuadro;

    this.calcularCentroCelula = function () {
        this.passoX = (this.celulaX * this.passoCelulaX) + (this.celulaX * 0.1);
        this.passoY = (this.celulaY * this.passoCelulaY) - (this.celulaY * 0.30);
//        console.log(this.celulaX, this.celulaY);
    }

    this.mostrar = function () {
        this.calcularCentroCelula()

        root.cenario.drawImage(root.imagem,
                root.imagemLargura * root.coluna,
                root.imagemAltura * root.coluna,
                root.imagemLargura,
                root.imagemAltura,
                root.passoX,
                root.passoY,
                Math.ceil(root.imagemLargura / root.zoom),
                Math.ceil(root.imagemAltura / root.zoom));

    }
    this.direcaoPassos = function () {

        if (this.passoCelulaX > this.passoProximoCelulaX || this.passoCelulaX < this.passoProximoCelulaX) {
            this.totalPassosProximoQuadro = root.celulaX / root.passo;

        }
        if (this.passoCelulaY > this.passoProximoCelulaY || this.passoCelulaY < this.passoProximoCelulaY) {
            this.totalPassosProximoQuadro = root.celulaY / root.passo;

        }
    }

    this.andar = function () {
        this.direcaoPassos();
        if (this.passoCelulaX !== this.passoProximoCelulaX || this.passoCelulaY !== this.passoProximoCelulaY) {

            console.log("andando");

            var tempPassos = 0;
            this.animacaoInterval = setInterval(function () {
                tempPassos++;
                root.coluna = root.passoListaAnimacao[root.animacaoPasso];
                root.animacaoPasso++;
                if (root.animacaoPasso > (root.passoListaAnimacao.length - 1)) {
                    root.animacaoPasso = 0;
                }
                root.animar();

                if (tempPassos >= root.totalPassosProximoQuadro) {
                    tempPassos = 0;
                    clearInterval(root.animacaoInterval);
//                    root.parar();
                    root.processarPassos()
                }
            }, root.animacaoIntervalTime);

        }
    }
    this.adicionarPassos = function (listaPassos) {
        this.ListaPassos = listaPassos;
    }

    this.processarPassos = function () {
        //
        console.log(this.ListaPassos.length)
        if (this.ListaPassos.length > 0) {
            for (var item in this.ListaPassos) {
                if (this.ListaPassos[item] != null) {
                    this.passoCelulaX = this.passoProximoCelulaX;
                    this.passoCelulaY = this.passoProximoCelulaY;
                    this.passoProximoCelulaX = this.ListaPassos[item][0];
                    this.passoProximoCelulaY = this.ListaPassos[item][1];
                    this.ListaPassos[item] = null;
                    this.andar()
                    break;
                }
            }
        }

    }

    this.limparBoneco = function () {
        this.cenario.clearRect(
                this.passoX - this.passo*2,
                this.passoY - this.passo*2,
                Math.ceil((this.imagemLargura) / this.zoom)+this.passo*2,
                Math.ceil((this.imagemAltura) / this.zoom)+this.passo*2
                );
//        this.cenario.rect(this.passoX - this.passo * 2,
//                this.passoY - this.passo * 2,
//                Math.ceil((this.imagemLargura) / this.zoom)+10,
//                Math.ceil((this.imagemAltura) / this.zoom)+10);
//        this.cenario.stroke();
    }


    this.animar = function () {
//        this.animarDirecao();
        this.limparBoneco();
//        this.passoX += 2
//        this.passoY += this.passo;

        if (this.passoCelulaX > this.passoProximoCelulaX) {
            this.linha = 1
            this.passoX -= this.passo;
        }

        if (this.passoCelulaX < this.passoProximoCelulaX) {
            this.linha = 2
            this.passoX += this.passo;
        }

        if (this.passoCelulaY > this.passoProximoCelulaY) {
            this.linha = 3
            this.passoY -= this.passo;
        }

        if (this.passoCelulaY < this.passoProximoCelulaY) {
            this.linha = 0
            this.passoY += this.passo;
        }

        this.cenario.drawImage(this.imagem,
                this.imagemLargura * this.coluna,
                this.imagemAltura * this.linha,
                this.imagemLargura,
                this.imagemAltura,
                this.passoX, this.passoY,
                Math.ceil(this.imagemLargura / this.zoom),
                Math.ceil(this.imagemAltura / this.zoom));
    }
    this.parar = function () {
        this.limparBoneco();
//        this.passoX += 2
//        this.passoY += this.passo;
        this.cenario.drawImage(this.imagem,
                this.imagemLargura * this.parado,
                this.imagemAltura * this.linha,
                this.imagemLargura,
                this.imagemAltura,
                this.passoX, this.passoY,
                Math.ceil(this.imagemLargura / this.zoom),
                Math.ceil(this.imagemAltura / this.zoom));
    }
}
