class Node {
  constructor(value, left, right) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
  show() {
    // console.log(this.value);
    return this.value;
  }
}

class BST {
  constructor() {
    this.root = null;
  }
  insert(value) {
    const node = new Node(value);
    if (!this.root) {
      this.root = node;
      return;
    }
    var current = this.root;
    var parent;
    while(true) {
      parent = current;
      if (value < current.value) {
        current = current.left;
        if(!current) {
          parent.left = node;
          break;
        }
      } else {
        current = current.right;
        if (!current) {
          parent.right = current;
          break;
        }
      }
      
    }
    console.log(node);
  }
}

function preOrder(node) {
  console.log(node);
  if (!node) {
    return;
  }
  console.log(node.show() + '');
  preOrder(node.left);
  preOrder(node.right);
}

const bst = new BST();
bst.insert(1);
bst.insert(2);
bst.insert(33);
bst.insert(4);
bst.insert(5);

// preOrder(bst.root);
