class Snake {
  // Referência as partes da cobra
  head = [];
  tail = [];

  // Velocidade da cobra
  velX = 5;
  velY = 5;

  constructor(x, y, size=10) {
    const offset = 2;

    this.head = [x, y];
    this.tail = [
      [x - size, y],
      [x - (2 * size), y],
      [x - (3 * size), y]
    ];

    this.size = size;
    this.velX = 5;
    this.velY = 5;
  }

  grow() {
    // Faz a cobra crescer adicionando um bloco ao final da cauda

  }

  move(direction) {
    // Move a cabeça da cobra e o corpo da cobra
    // para uma nova coordenada
    const [x, y] = this.head;

    switch(direction) {
      case "RIGHT":
        this.head = [x + this.velX, y];

        // Cauda acompanha movimento da cabeça
        for(let i=0; i < this.tail.length; i++) {
          let [xTail, yTail] = this.tail[i];
          if(yTail > y) {
            // Faz a cauda subir
            yTail -= this.velY;
          }else if(yTail === y) {
            xTail += this.velX;
          }
          this.tail[i] = [xTail, yTail];
        }
        break;

      case "UP":
        this.head = [x, y - this.velY];

        // Cauda acompanha movimento da cabeça
        for(let i=0; i < this.tail.length; i++) {
          let [xTail, yTail] = this.tail[i];
          if(xTail < x) {
            xTail += this.velX;
          }else if(xTail === x) {
            // Faz a cauda subir
            yTail -= this.velY;
          }
          this.tail[i] = [xTail, yTail];
        }
        break;
      
      case "DOWN":
        this.head = [x, y + this.velY];

        // Cauda acompanha movimento da cabeça
        for(let i=0; i < this.tail.length; i++) {
          let [xTail, yTail] = this.tail[i];
          if(xTail < x) {
            xTail += this.velX;
          }else if(xTail === x) {
            // Faz a cauda subir
            yTail += this.velY;
          }
          this.tail[i] = [xTail, yTail];
        }
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
    }
  }
}