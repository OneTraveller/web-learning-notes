function Graph(v) {
  this.vertices = v; // 顶点数
  this.edges = 0; // 边数
  this.adj = [];
  for (var i = 0; i < this.vertices; ++i) {
      this.adj[i] = [''];
  }
  this.addEdge = addEdge;
  this.showGraph = showGraph;
}

function addEdge(v, w) {
  this.adj[v].push(w);
  this.adj[w].push(v);
  this.edges++;
}

function showGraph() {
  for (var i = 0; i < this.vertices; ++i) {
      let str = i + " -> ";
      for (var j = 0; j < this.vertices; ++j ) {
        if (this.adj[i][j] != undefined) {
            str += this.adj[i][j] + '  ';
        }
      }
      console.log(str);
    }
}

g = new Graph(5);
g.addEdge(0,1);
g.addEdge(0,2);
g.addEdge(1,3);
g.addEdge(1,4);
g.showGraph();
