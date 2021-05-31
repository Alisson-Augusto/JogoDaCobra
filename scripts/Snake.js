class Snake {
  // Referência as partes da cobra
  head = [];
  tail = [];

  // Velocidade da cobra
  speed = 5;

  // Exibe o centro de cada bloco da cobra
  showCenter = false;

  constructor(x, y, size=10, showCenter=true) {
    const offset = 2;

    this.head = [x, y];
    this.tail = [
      [x - size, y],
      [x - (2 * size), y],
      [x - (3 * size), y]
    ];

    this.size = size;

    this.showCenter = showCenter;
  }

  grow() {
    // Faz a cobra crescer adicionando um bloco ao final da cauda
    const [x, y] = this.head;
    this.tail.push([x - ((this.tail.length+1) * this.size), y])
  }

  moveHorizontal(horizontalSpeed) {
    const [xHead, yHead] = this.head;

    // Move a cabeça
    this.head = [xHead + horizontalSpeed, yHead];

    // "Pescoço" da cobra
    let [xNeck, yNeck] = this.tail[0];

    if(yNeck === yHead) {
      // Alinha Horizontalmente
      xNeck += horizontalSpeed;
    }else {
      // Alinha Verticalmente
      if(yNeck > yHead) {
        yNeck -= this.speed;
      }else {
        yNeck += this.speed;
      }
    }

    this.tail[0] = [xNeck, yNeck];

    // Resto da cauda
    for(let i=1; i < this.tail.length; i++) {
      // Cauda mais distante da cabeça
      // se alinha à mais próxima dela
      let [xNextTail, yNextTail] = this.tail[i-1]; // Mais Próxima
      let [xFarTail , yFarTail ] = this.tail[i]; // Distante
      
      // Esta alinhado Verticalmente
      if(yFarTail === yNextTail) {
        // Alinha Horizontal, movendo para direita a cauda distante
        xFarTail += horizontalSpeed;
      }else {
        // Alinha Verticalmente
        if(yFarTail > yNextTail) {
          yFarTail -= this.speed;
        }else {
          yFarTail += this.speed;
        }
      }

      // Ajusta a cauda mais distante
      this.tail[i] = [xFarTail, yFarTail]
    }
  }

  moveVertical(verticalSpeed) {
    const [xHead, yHead] = this.head;

    // Move a cabeça
    this.head = [xHead, yHead + verticalSpeed];

    // "Pescoço" da cobra
    let [xNeck, yNeck] = this.tail[0];

    // Pescoço alinhado com a cabeça
    if(xNeck === xHead) {
      yNeck += verticalSpeed;
    }else {
      if(xNeck < xHead) {
        xNeck += this.speed;
      }else{
        xNeck -= this.speed;
      }
    }

    this.tail[0] = [xNeck, yNeck];

    // Resto da cauda
    for(let i=1; i < this.tail.length; i++) {
      // Cauda mais distante da cabeça
      // se alinha à mais próxima dela
      let [xNextTail, yNextTail] = this.tail[i-1]; // Mais Próxima
      let [xFarTail , yFarTail ] = this.tail[i]; // Distante

      if(xFarTail === xNextTail){
        yFarTail += verticalSpeed;
      }else {
        if(xFarTail < xNextTail) {
          xFarTail += this.speed;
        }else {
          xFarTail -= this.speed;
        }
      }

      // Ajusta a cauda mais distante
      this.tail[i] = [xFarTail, yFarTail];
    }

  }

  move(direction) {
    // Move a cabeça da cobra e o corpo da cobra
    // para uma nova coordenada
    switch(direction) {
      case "RIGHT":
        this.moveHorizontal(this.speed);
        break;
      case "LEFT":
        this.moveHorizontal(-this.speed);
        break;
      case "UP":
        this.moveVertical(-this.speed);
        break;
      case "DOWN":
        this.moveVertical(this.speed);
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