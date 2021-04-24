class Node {
  constructor(val) {
    this.value = val;
    this.next = null;
  }
}
class LinkList {
  constructor() {
    this.size = 0;
    // 虚拟头部
    this.dummyNode = new Node(null, null);
  }
  size() {
    return this.size;
  }
  head() {
    return this.getNode(0);
  }
  add(val) {
    return this.addNode(val, this.size);
  }
  addAt(val, index) {
    return this.addNode(val, index);
  }
  remove(val) {}
  // 根据index查找
  find(head, index, currentIndex) {
    if (index === currentIndex) return head;
    return this.find(head.next, index, currentIndex + 1);
  }
  // 根据节点查找
  findNode(val, head = this.head()) {
    if (val === head.value) return head;
    return this.findNode(val, head.next);
  }
  addNode(val, index) {
    this.checkIndex(index);
    // 当往链表末尾插入时，prev.next 为空
    // 其他情况时，因为要插入节点，所以插入的节点的 next 应该是 prev.next
    // 然后设置 prev.next 为插入的节点
    let prev = this.find(this.dummyNode, index, 0);
    prev.next = new Node(val, prev.next);
    this.size++;
    return prev.next;
  }
  removeAt(index) {
    this.checkIndex(index);
    let prev = this.find(this.dummyNode, index, 0);
    let node = prev.next;
    prev.next = node.next;
    node.next = null;
    this.size--;
    return node;
  }
  checkIndex(index) {
    if (index < 0 || index > this.size) throw Error('Index error');
  }
  getNode(index) {
    this.checkIndex(index);
    if (this.size === 0) return;
    return this.find(this.dummyNode, index, 0).next;
  }
}

function print(str) {
  console.log(str);
}

