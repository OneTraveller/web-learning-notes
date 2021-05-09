class Game {
  constructor() {
    this.rows = 4; // 总行数
    this.cols = 4; // 总列数
    this.score = 0; // 总分
    this.state = 1; // 游戏状态，1表示运行/-1表示游戏结束
    this.data = null; // 保存游戏格子的二维数组
  }

  // 开始游戏
  start() {
    this.state = 1;
    this.score = 0;
    this.data = [];
    for (let r = 0; r < this.rows; r++) {
      this.data[r] = [];
      for (let c = 0; c < this.cols; c++) {
        this.data[r][c] = 0;
      }
    }
    this.randomNum();
    this.randomNum();
    this.updateData();
    document.onkeydown = (e) => {
      this.onkeydown(e);
    };
  }

  // 生成随机数
  randomNum() {
    while (true) {
      const row = Math.floor(Math.random() * this.rows);
      const col = Math.floor(Math.random() * this.cols);
      if (this.data[row][col] === 0) {
        this.data[row][col] = Math.random() < 0.5 ? 2 : 4;
        break;
      }
    }
  }

  // 更新数据
  updateData() {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const elem = document.getElementById(`c${r}${c}`);
        const val = this.data[r][c];
        elem.classList = 'cell';
        if (val === 0) {
          elem.innerHTML = '';
        } else {
          elem.innerHTML = val;
          elem.classList.add(`n${val}`);
        }
      }
    }
    // 设置分数
    document.getElementById('score').innerHTML = this.score;
    // 判断游戏状态
    const gameOver = document.getElementById('gameOver');
    if (this.state === -1) {
      gameOver.style.display = 'block';
      document.getElementById('fScore').innerHTML = this.score;
      return;
    }
    gameOver.style.display = 'none';
  }

  // 监听键盘
  onkeydown(e) {
    const map = {
      key37: 'moveLeft',
      key38: 'moveUp',
      key39: 'moveRight',
      key40: 'moveDown',
    };
    const fnName = map[`key${e.keyCode}`];
    if (this[fnName]) {
      const beforeData = JSON.stringify(this.data);
      this[fnName]();
      const afterData = JSON.stringify(this.data);
      // 判断数据是否有改动
      if (beforeData !== afterData) {
        if (this.isGameOver()) {
          this.state = -1;
          return;
        }
        this.randomNum();
        this.updateData();
      }
    }
  }

  // 向左移动
  moveLeft() {
    for (let r = 0; r < this.rows; r++) {
      const row = this.data[r];
      for (let c = 0; c < this.cols - 1; c++) {
        let next = -1;
        for (let nextIndex = c + 1; nextIndex < this.cols; nextIndex++) {
          if (row[nextIndex] !== 0) {
            next = nextIndex;
            break;
          }
        }

        if (next === -1) {
          break;
        }

        const val = row[c];
        const nextVal = row[next];
        if (val === 0) {
          row[c] = nextVal;
          row[next] = 0;
          c--; // 停留在原地
        } else if (val === nextVal) {
          row[c] = val * 2;
          row[next] = 0;
          this.score += row[c];
        }
      }
    }
  }

  // 向上移动
  moveUp() {
    for (let c = 0; c < this.cols; c++) {
      for (let r = 0; r < this.rows - 1; r++) {
        let next = -1;
        for (let nextIndex = r + 1; nextIndex < this.rows; nextIndex++) {
          if (this.data[nextIndex][c] !== 0) {
            next = nextIndex;
            break;
          }
        }

        if (next === -1) {
          break;
        }

        const row = this.data[r];
        const nextRow = this.data[next];
        const val = row[c];
        const nextVal = nextRow[c];
        if (val === 0) {
          row[c] = nextVal;
          nextRow[c] = 0;
          r--; // 停留在原地
        } else if (val === nextVal) {
          row[c] = val * 2;
          nextRow[c] = 0;
          this.score = row[c];
        }
      }
    }
  }

  // 向右移动
  moveRight() {
    for (let r = 0; r < this.rows; r++) {
      const row = this.data[r];
      for (let c = this.cols - 1; c > 0; c--) {
        let pre = -1;
        for (let preIndex = c - 1; preIndex >= 0; preIndex--) {
          if (row[preIndex] !== 0) {
            pre = preIndex;
            break;
          }
        }

        if (pre === -1) {
          break;
        }

        const val = row[c];
        const preVal = row[pre];
        if (val === 0) {
          row[c] = preVal;
          row[pre] = 0;
          c++;
        } else if (val === preVal) {
          row[c] = val * 2;
          row[pre] = 0;
          this.score = row[c];
        }
      }
    }
  }

  // 向下移动
  moveDown() {
    for (let c = 0; c < this.cols; c++) {
      for (let r = this.rows - 1; r > 0; r--) {
        let pre = -1;
        for (let preIndex = r - 1; preIndex >= 0; preIndex--) {
          if (this.data[preIndex][c] !== 0) {
            pre = preIndex;
            break;
          }
        }

        if (pre === -1) {
          break;
        }

        const val = this.data[r][c];
        const preVal = this.data[pre][c];
        if (val === 0) {
          this.data[r][c] = preVal;
          this.data[pre][c] = 0;
          r++;
        } else if (val === preVal) {
          this.data[r][c] = val * 2;
          this.data[pre][c] = 0;
          this.score = val * 2;
        }
      }
    }
  }

  // 游戏是否结束
  isGameOver() {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const val = this.data[r][c];
        if (val === 0) {
          return false;
        }
        if (c < this.cols && val === this.data[r][c + 1]) {
          return false;
        }
        if (r < this.rows && val === this.data[r + 1][c]) {
          return false;
        }
      }
    }
    return true;
  }
}

function start() {
  const game = new Game();
  game.start();
}

window.onload = () => {
  start();
};
