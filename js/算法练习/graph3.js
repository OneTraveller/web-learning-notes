class Graph {
  constructor(v) {
    this.vertices = v; // 顶点数
    this.edges = 0; // 边数
    this.adj = []; // 邻边表
    this.marked = [];
    this.edgeTo = [];
    for (let i = 0; i < this.vertices; ++i) {
      this.adj[i] = [];
      this.marked[i] = false;
    }
  }

  // 添加边
  addEdge(v, w) {
    this.adj[v].push(w);
    this.adj[w].push(v);
    this.edges += 1;
  }

  // 显示图
  showGraph() {
    for (let i = 0; i < this.vertices; ++i) {
      let graph = i + ' -> ';
      for (let j = 0; j < this.vertices; ++j) {
        if (this.adj[i][j] !== undefined) {
          graph += this.adj[i][j] + '  ';
        }
      }
      console.log(graph);
    }
  }

  // 深度优先搜索
  dfs(v) {
    this.marked[v] = true;
    if (this.adj[v] !== undefined) {
      console.log('Visisted vertex: ' + v);
    }
    this.adj[v].forEach((w) => {
      if (!this.marked[w]) {
        this.dfs(w);
      }
    });
  }

  // 广度优先搜索
  bfs(s) {
    let queue = [];
    this.marked[s] = true;
    queue.push(s);
    while (queue.length > 0) {
      let v = queue.shift();
      if (v !== undefined) {
        console.log('Visisted vertex: ' + v);
      }
      this.adj[v].forEach((w) => {
        if (!this.marked[w]) {
          this.edgeTo[w] = v;
          this.marked[w] = true;
          queue.push(w);
        }
      });
    }
  }

  // 用于展示图中连接到不同顶点的路径。函数pathTo创建了一个栈，用来存储与指定顶点有共同边的所有顶点。
  pathTo(begin, end) {
    for (let i = 0; i < this.vertices; i++) {
      this.marked[i] = false;
    }
    this.bfs(begin);
    if (!this.marked[begin]) {
      return undefined;
    }
    let paths = [];
    for (let i = end; i != begin; i = this.edgeTo[i]) {
      paths.unshift(i);
    }
    paths.unshift(begin);
    const path = paths.reduce((pre, item) => `${pre}->${item}`);
    console.log(path);
    return paths;
  }
}

const g = new Graph(5);
g.addEdge(0, 1);
g.addEdge(0, 2);
g.addEdge(1, 3);
g.addEdge(2, 4);
g.pathTo(0, 4);
