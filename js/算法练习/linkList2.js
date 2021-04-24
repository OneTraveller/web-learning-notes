class Node {
  constructor(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class BST {
  constructor() {
    this.root = null;
  }
  insert(data) {
    const node = new Node(data);
    if (!this.root) {
      this.root = node;
      return;
    }
    let current = this.root;
    let parent;
    while(true) {
      parent = current;
      if (data < current.data) {
        current = current.left;
        if(!current) {
          parent.left = node;
          break;
        }
      }
      else {
        current = current.right;
        if (!current) {
          parent.right = node;
          break;
        }
      }
    }
  }
  find(data) {
    let current = this.root;
    while (current) {
      if (current.data === data) {
        return current;
      }
      current = data < current.data ? current.left : current.right;
    }
    return null;
  }
  findMin() {
    let current = this.root;
    while(current.left) {
      current = current.left;
    }
    return current.data;
  }
  findMax() {
    let current = this.root;
    while (current.right) {
      current = current.right;
    }
    return current.data;
  }
  getSamlllest(node) {
    if (!node.left) {
      return node;
    }
    return this.getSamlllest(node.left);
  }
  remove(data) {
    this.removeNode(this.root, data);
  }
  removeNode(node, data) {
    if (!node) {
      return null;
    }
    if (node.data === data) {
      // 没有子节点
      if (!node.left && !node.right) {
        return null;
      }
      // 没有左节点
      if (!node.left) {
        return node.right;
      }
      // 没有右节点
      if (!node.right) {
        return node.left;
      }
      // 有两个子节点
      const tempNode = this.getSamlllest(node.right);
      node.data = tempNode.data;
      node.right = this.removeNode(node.right, tempNode.data);
      return node;
    }
    if (data < node.data) {
      node.left = this.removeNode(node.left, data);
      return node;
    }
    node.right = this.removeNode(node.right, data);
    return node;
  }
}

function preOrder(node) {
  if (!node) return;
  console.log(node.data);
  preOrder(node.left);
  preOrder(node.right);
}

// 使用
const t = new BST();
t.insert(6);
t.insert(21);
t.insert(13);
t.insert(88);
t.insert(99);
t.insert(22);
t.insert(2);
t.insert(29);
preOrder(t.root);
// console.log(t.root);
t.remove(21);
console.log('------- 删除之后 ------------');
// console.log(t.root);
preOrder(t.root);