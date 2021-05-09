class Snake {
  constructor() {
    this.rows = 20; // 行数
    this.cols = 40; // 列数
    this.speed = 200; // 速度
    this.direction = 0; // 方向
    this.pos = []; // 蛇的坐标数组
    this.score = 0; // 分数
    this.status = -1; // 状态 -1为暂停/1为开始
    this.timer = 0; // 定时器
    this.foodPos = { x: -1, y: -1 }; // 食物坐标
    this.table = document.querySelector('.table'); // 表格
  }

  // 初始化
  init(speed) {
    this.speed = speed || this.speed;
    this.score = 0;
    this.status = -1;
    this.direction = 0;
    this.pos = [
      { x: 2, y: 5 },
      { x: 1, y: 5 },
      { x: 0, y: 5 },
    ];
    this.initTable();
    this.createFood();
    this.pos.forEach((item, index) => {
      const elem = this.getTableElement(item);
      elem.className = index === 0 ? 'snake-head' : 'snake-body';
    });
  }

  // 初始化表格
  initTable() {
    if (this.table.firstChild) {
      this.table.removeChild(this.table.firstChild);
    }
    for (let i = 0; i < this.rows; i++) {
      const tr = this.table.insertRow();
      for (let j = 0; j < this.cols; j++) {
        tr.insertCell();
      }
    }
  }

  // 查找表格元素
  getTableElement({ x, y }) {
    return this.table.rows[y].cells[x];
  }

  // 监听键盘
  onKeydown({ keyCode }) {
    // 判断是否空格键
    if (keyCode === 32) {
      this.status *= -1;
      console.log('status', this.status);
      // 是否为开始状态，如果是，设置暂停
      if (this.status === -1) {
        window.clearInterval(this.timer);
      } else {
        this.direction = this.direction === 0 ? 39 : this.direction;
        this.timer = setInterval(() => {
          this.move();
        }, this.speed);
      }
      return;
    }
    /* 
      1.判断是否为运行状态
      2.判断是否与当前方向相同
      3.判断是否为上下左右健
      4.判断是否为相反健
    */
    const direction = this.direction;
    const result =
      this.status === 1 &&
      keyCode !== direction &&
      keyCode >= 32 &&
      keyCode <= 40 &&
      !(
        (direction === 37 && keyCode === 39) ||
        (direction === 38 && keyCode === 40) ||
        (direction === 39 && keyCode === 37) ||
        (direction === 40 && keyCode === 38)
      );
    if (result) {
      this.direction = keyCode;
      this.move();
    }
  }

  // 移动
  move() {
    /* 
      1.判断当前健值
      2.判断是否撞墙，不撞墙则加蛇头；判断是否吃到食物，如果吃到不删蛇尾，反之删蛇尾
      3.判断是否撞到自己，如果撞到游戏结束，反则设置新的蛇头，旧蛇头变为蛇身
    */
    const headerPos = this.pos[0];
    let { x, y } = headerPos;
    //  判断当前健值，判断是否撞墙，不撞墙则加蛇头
    switch (this.direction) {
      case 37:
        if (x <= 0) {
          return this.gameOver();
        }
        this.pos.unshift({ x: x - 1, y });
        break;
      case 38:
        if (y <= 0) {
          return this.gameOver();
        }
        this.pos.unshift({ x, y: y - 1 });
        break;
      case 39:
        if (x >= this.cols - 1) {
          return this.gameOver();
        }
        this.pos.unshift({ x: x + 1, y });
        break;
      case 40:
        if (y >= this.rows - 1) {
          return this.gameOver();
        }
        this.pos.unshift({ x, y: y + 1 });
        break;
    }

    //  判断是否吃到食物，如果吃到不删蛇尾，反之删蛇尾
    const newHeaderPos = this.pos[0];
    if (
      newHeaderPos.x === this.foodPos.x &&
      newHeaderPos.y === this.foodPos.y
    ) {
      this.foodPos.x = -1;
      this.createFood();
      // 判断是否init，如果是，不删蛇尾
    } else if (this.direction !== -1) {
      const pos = this.pos.pop();
      this.getTableElement(pos).className = '';
    }

    // 判断是否撞到自己, 从第四个开始判读
    const isGameOver = this.pos.some(({ x, y }, index) => {
      if (index < 3) return false;
      return newHeaderPos.x === x && newHeaderPos.y === y;
    });
    if (isGameOver) {
      this.gameOver();
      return;
    }

    // 设置新的蛇头，旧蛇头变为蛇身
    this.getTableElement(this.pos[0]).className = 'snake-head';
    this.getTableElement(this.pos[1]).className = 'snake-body';
  }

  // 生成食物
  createFood() {
    // 如果为-1，说明表格上不存在食物
    if (this.foodPos.x === -1) {
      do {
        this.foodPos.y = Math.round(Math.random() * (this.rows - 1));
        this.foodPos.x = Math.round(Math.random() * (this.cols - 1));
      } while (
        // 防止在蛇身上生成食物
        this.getTableElement(this.foodPos).className !== ''
      );
    }
    this.getTableElement(this.foodPos).className = 'food';
    document.querySelector('.score').innerHTML = this.score++;
  }

  // 游戏结束
  gameOver() {
    alert('游戏结束');
    window.clearInterval(this.timer);
    this.init();
  }
}

window.onload = () => {
  const snake = new Snake();
  snake.init();
  document.onkeydown = (e) => {
    snake.onKeydown(e);
  };
};

/* 
  键盘对应值
  空格：32
  left: 37
  up: 38
  right: 39
  down: 40
*/
