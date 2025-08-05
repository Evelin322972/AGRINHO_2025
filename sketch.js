let plantas = []; // Array para armazenar as plantas
let tempoCrescimentoBroto = 2000; // Tempo para virar broto (2 segundos)
let tempoCrescimentoPlanta = 5000; // Tempo para virar planta madura (5 segundos após broto, total de 7 segundos)

function setup() {
  createCanvas(600, 400); // Cria uma tela de 600x400 pixels
  background(139, 69, 19); // Cor de fundo que lembra terra
  textAlign(CENTER, CENTER);
  textSize(18);
  fill(255); // Cor do texto (branco)
  text("Clique para plantar! Clique na planta madura para colher!", width / 2, 30);
}

function draw() {
  background(139, 69, 19); // Redesenha o fundo para limpar a tela a cada frame
  fill(255); // Cor do texto (branco)
  text("Clique para plantar! Clique na planta madura para colher!", width / 2, 30);

  // Desenha cada planta no array
  for (let i = 0; i < plantas.length; i++) {
    let p = plantas[i];

    // Atualiza o estágio da planta com base no tempo
    if (p.estagio === 0 && millis() - p.tempoPlantio > tempoCrescimentoBroto) {
      p.estagio = 1; // Vira broto
    } else if (p.estagio === 1 && millis() - p.tempoPlantio > tempoCrescimentoBroto + tempoCrescimentoPlanta) {
      p.estagio = 2; // Vira planta madura
    }

    // Desenha a representação da planta de acordo com o estágio
    if (p.estagio === 0) { // Semente (um pequeno círculo marrom)
      fill(100, 50, 0);
      ellipse(p.x, p.y, 10, 10);
    } else if (p.estagio === 1) { // Broto (um pequeno retângulo verde claro)
      fill(100, 200, 100);
      rect(p.x - 5, p.y - 15, 10, 20);
    } else if (p.estagio === 2) { // Planta madura (um retângulo verde escuro com um "fruto" amarelo)
      fill(0, 100, 0);
      rect(p.x - 10, p.y - 25, 20, 30);
      fill(255, 200, 0); // Cor do "fruto" (amarelo)
      ellipse(p.x, p.y - 25, 15, 15); // "Fruto" no topo
    } else if (p.estagio === 3) { // Colhido (um círculo cinza indicando o local da colheita)
      fill(150);
      ellipse(p.x, p.y, 20, 20);
      fill(0);
      text("Colhido!", p.x, p.y + 30);
    }
  }
}

// Função chamada quando o mouse é clicado
function mousePressed() {
  // Verifica se o clique foi em uma planta madura para colher
  for (let i = plantas.length - 1; i >= 0; i--) { // Itera de trás para frente para remover sem problemas
    let p = plantas[i];
    let d = dist(mouseX, mouseY, p.x, p.y);
    if (d < 20 && p.estagio === 2) { // Se clicou perto de uma planta madura (raio de 20px)
      p.estagio = 3; // Marca como colhido
      // Se você quiser adicionar um som de colheita aqui, descomente e use:
      // if (somColheita && !somColheita.isPlaying()) {
      //   somColheita.play();
      // }
      return; // Sai da função para não plantar outra no mesmo clique
    }
  }

  // Se não clicou em uma planta madura, planta uma nova semente
  // Evita plantar muito perto da borda superior onde está o texto
  if (mouseY > 60) {
    let novaPlanta = {
      x: mouseX,
      y: mouseY,
      estagio: 0, // 0: semente, 1: broto, 2: planta madura, 3: colhida
      tempoPlantio: millis() // Registra o tempo que a semente foi plantada
    };
    plantas.push(novaPlanta);
  }
}