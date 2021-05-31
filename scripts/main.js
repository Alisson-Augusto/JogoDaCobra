const BACKGROUND_COLOR = '#9CC604';
const FOOD_COLOR = '#FF6347';
const BLOCK_SIZE = 10;
const {innerWidth : WIDTH, innerHeight : HEIGHT} = window;

let pontos = 0;

let food = [];
let personagem = new Snake(100, 100, BLOCK_SIZE);


// Velocidade da cobra
velX = 5;
velY = 5;

// Informa direção que a cobra está seguindo
let direction = '';

function setup() {
  createCanvas(WIDTH, HEIGHT);
  frameRate(30);
}

function generateFood(MAX_FOOD) {
  // Gera uma lista de coordenadas aleatórias para comidas
  let generatedFood = [];
  
  let count = 0;
  while(count < MAX_FOOD) {
    // Gera uma coordenada para a comida
    let x = Math.floor((Math.random() * WIDTH ) + BLOCK_SIZE + 20);
    let y = Math.floor((Math.random() * HEIGHT) + BLOCK_SIZE + 20);
    
    generatedFood.push([x, y]);
    count++;
  }
  
  return generatedFood;
}

function foodCollision(x, y) {
  // Percorre todas as coordenadas de comidas
  // e busca por colisões entre a comida e a cabeça da cobra
  
  if(food.length === 0) return false; // Ignora se não tiver comida na tela

  const radius = parseInt(BLOCK_SIZE / 2);
  const offset = 2; // Espaço para aumentar a hitbox da comida

  for(let i=0; i<food.length; i++) {
    let [xFood, yFood] = food[i];
    
    if(
      x >= xFood - radius && x <= xFood + radius && // na Horizontal
      y >= yFood - radius - offset && y <= yFood + radius + offset   // Vertical
      ) {
        // Remove Comida
        console.log("Removendo Comida!");
        food.splice(i, 1);
        pontos += 5;
        personagem.grow();
        return true;
      }
  }
}

function collision(x, y) {
  // Detecta colisão de fim de jogo 
  // entre a cabeça da cobra e os objetos

  if(x + BLOCK_SIZE > WIDTH || x < 0) {
    return true;
  }
  else if(y < 0 || y + BLOCK_SIZE > HEIGHT) {
    return true;
  }
  return false;
}

function move() {
  // Move personagem de acordo com a direção
  const [x, y] = personagem.head;
  
  if(direction === 'UP') {
    if(!collision(x, y - velY)) {
      foodCollision(x, y - velY);
      personagem.move(direction);
    }
  }
  else if(direction === 'DOWN') {
    if(!collision(x, y + velY)) {
      foodCollision(x, y + velY);
      personagem.move(direction);
    }
  }
  else if(direction === 'LEFT') {
    if(!collision(x - velX, y)) {
      foodCollision(x - velX, y);
      personagem.move(direction);
    }
  }
  else if(direction === 'RIGHT') {
    if(!collision(x + velX, y)) {
      foodCollision(  x + velX, y);
      personagem.move(direction);
    }
  }
  
  // Desenha a cobrinha
  personagem.draw();
}

function renderFood(coords) {
  // Desenha comida nas coordenadas especificadas
  
  for(let i=0; i < coords.length; i++) {
    // Coordenadas da comida
    let [xFood, yFood] = coords[i];
    
    // Desenha a comida
    fill(FOOD_COLOR)
    circle(xFood, yFood, BLOCK_SIZE);
  }
}

function keyPressed() {
  /*
    Usuário pressionou alguma tecla
  */
  switch(key) {
    // Controle do usuário
    case 'ArrowUp':
    case 'w':
      // Não permite mudar a direção para uma oposta
      direction = direction !== 'DOWN' ? 'UP' : direction;
      break;
    case 'ArrowDown':
    case 's':
      direction = direction !== 'UP' ? 'DOWN' : direction;
      break;
    case 'ArrowLeft':
    case 'a':
      direction = direction !== 'RIGHT' ? 'LEFT' : direction;
      break;
    case 'ArrowRight':
    case 'd':
      direction = direction !== 'LEFT' ? 'RIGHT' : direction;
      break;
  }
}

function draw() {
  background(BACKGROUND_COLOR);
  // Retira a cor das bordas dos objetos
  strokeWeight(0);
  
  if(food.length > 0) {
    // Desenha comidas que já foram geradas
    renderFood(food);
  }
  else {
    // Gera novas comidas
    food = generateFood(3);
    renderFood(food);
  }

  move();
}
