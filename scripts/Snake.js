class Snake {
  // Referência as partes da cobra
  head = [];
  tail = [];

  // Velocidade da cobra
  speed;

  // Exibe o centro de cada bloco da cobra
  showCenter = false;

  constructor(x, y, size=10, showCenter=false) {
    const offset = 2;

    this.head = [x, y];
    this.tail = [
      [x - size, y],
      [x - (2 * size), y],
      [x - (3 * size), y]
    ];

    this.size = size;
    this.speed = size;
    this.showCenter = showCenter;
  }

  grow() {
    // Faz a cobra crescer adicionando um bloco ao final da cauda
    const [xLastTail, yLastTail] = this.tail[ this.tail.length-1 ];
    let [xNewTail, yNewTail] = [xLastTail, yLastTail];

    this.tail.push([xNewTail, yNewTail]);
  }

  move(horizontalSpeed, verticalSpeed = 0) {
    const [xHead, yHead] = this.head;

    // Move a cabeça
    this.head = [xHead + horizontalSpeed, yHead + verticalSpeed];

    // Valor anterior de x e y, antes de modifica-los
    let xPrevious, yPrevious;
    for(let i=0; i < this.tail.length; i++) {
      if(i === 0) {
        // "Pescoço" da cobra
        const [xNeck, yNeck] = this.tail[0];
        xPrevious = xNeck;
        yPrevious = yNeck;
        // Move pescoço para a posição anterior da cabeça
        this.tail[0] = [xHead, yHead];
      }else {
        let [xTemp, yTemp] = this.tail[i];
        this.tail[i] = [xPrevious, yPrevious];
        xPrevious = xTemp;
        yPrevious = yTemp;
      }

    }

  }

  moveDirection(direction) {
    // Move a cabeça da cobra e o corpo da cobra
    // para uma nova coordenada
    switch(direction) {
      case "RIGHT":
        this.move(this.speed);
        break;
      case "LEFT":
        this.move(-this.speed);
        break;
      case "UP":
        this.move(0, -this.speed);
        break;
      case "DOWN":
        this.move(0, this.speed);
        break;
    }
  }

  draw() {
    // Renderiza a cobra
    const [x, y] = this.head;
    
    // Desenha a cabeça da cobra
    fill(0);
    rect(x, y, BLOCK_SIZE, BLOCK_SIZE);
    
    for(let i=0; i<this.tail.length; i++) {
      fill(100);
      // Desenha a cauda
      const [xTail, yTail] = this.tail[i];
      rect(xTail, yTail, this.size, this.size);
      
      // Exibe o centro de cada bloco da cauda
      if(this.showCenter) {
        const radius = parseInt(this.size / 2);
        fill([255, 0, 0]);
        circle(xTail + radius, yTail + radius, 2);
      }
    }
  }
}