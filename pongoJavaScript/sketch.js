//variaveis bolinha
let xBolinha = 300, yBolinha = 200, diametroBolinha = 18;
let raio = diametroBolinha / 2;

//variaveis raquete oponente

let xRaqueteOponente = 585, yRaqueteOponente = 150, raqueteComprimentoOponente = 10, alturaRaqueteOponente = 90, velocidadeYOponente;

let chanceDeErrar = 0;

//variaveis raquete
let xRaquete = 5, yRaquete = 150, raqueteComprimento = 10 ,alturaRaquete = 90;

//variaveis velocidade bolinha
let velocidadeXBolinha = 6, velocidadeYBolinha = 6;

//variaveis colisao
let colisao = false;

//variaveis pontuação
let meusPontos = 0, pontosDoOponente = 0;

//variaveis sons do jogo
let raquetada, ponto, trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}


function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete,yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaMinhaRaquete();
  movimentaRaqueteOponente();
  //movimentaRaqueteOponenteMultiplayer();
  verificaColisaoRaquete(xRaquete,yRaquete);
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
}



function mostraBolinha(){
  circle(xBolinha,yBolinha,diametroBolinha);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function mostraRaquete(x,y){
  rect(x, y, raqueteComprimento, alturaRaquete );
}

function movimentaMinhaRaquete(){
  if(keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if(keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar;
  calculaChanceDeErrar();
}

function movimentaRaqueteOponenteMultiplayer(){
   if(keyIsDown(87)){
    yRaqueteOponente -= 10;
  }
  if(keyIsDown(83)){
    yRaqueteOponente += 10;
  }
}

function verificaColisaoBorda(){
    if(xBolinha + raio > width || xBolinha - raio < 0){
       velocidadeXBolinha *= -1;
     }
  if(yBolinha + raio > height || yBolinha - raio < 0){
      velocidadeYBolinha *= -1;
  }
}

//function verificaColisaoRaquete(){
// if(xBolinha - raio < xRaquete + raqueteComprimento 
//     && yBolinha - raio < yRaquete + alturaRaquete 
//     && yBolinha + raio > yRaquete){
//    velocidadeXBolinha *= -1;
//  }
//}

function verificaColisaoRaquete(x,y){
  colisao = collideRectCircle(x, y, raqueteComprimento, alturaRaquete, xBolinha, yBolinha, raio);
  if(colisao){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }

}

function incluiPlacar(){
  stroke(255);
  textSize(16);
  textAlign(CENTER);
  fill(color(255, 140,0));
  rect(130,10,40,20);
  fill(255);
  text(meusPontos, 150, 26);
  fill(color(255, 140,0));
  rect(430,10,40,20);
  fill(255);
  text(pontosDoOponente, 450, 26);
}

function marcaPonto(){
  if(xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if(xBolinha < 10){
    pontosDoOponente += 1;
    ponto.play();
  }
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}


function bolinhaNaoFicaPresa(){
    if (XBolinha - raio < 0){
    XBolinha = 23
    }
}
