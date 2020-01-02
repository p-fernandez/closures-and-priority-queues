'use strict';

const TOP = 0;

const leftIndex = (pos) => (pos << 1) + 1;
const parentIndex = (pos) => (pos - 1) >>> 1;
const rightIndex = (pos) => leftIndex(pos) + 1;

class PriorityQueue {
  constructor(comparator = (a, b) => a - b) {
    this.comparator = comparator;
    this.heap = [];
  }

  bubbleDown() {
    let pos = 0;
    const condition = true;
    const last = this.last();

    while (condition) {
      const left = leftIndex(pos);
      const right = rightIndex(pos);
      let minIndex = pos;

      if (left <= last && this.compare(left, minIndex)) {
        minIndex = left;
      }

      if (right <= last && this.compare(right, minIndex)) {
        minIndex = right;
      }

      if (minIndex !== pos) {
        this.swap(pos, minIndex);
        pos = minIndex;
      } else {
        break;
      }
    }
  }

  bubbleUp() {
    let pos = this.last();
    while (pos > 0) {
      const parent = parentIndex(pos);

      if (this.compare(pos, parent)) {
        this.swap(pos, parent);
        pos = parent;
      } else {
        break;
      }
    }
  }

  clear() {
    this.heap = [];
  }

  compare(i, j) {
    return this.comparator(this.heap[i], this.heap[j]) < 0;
  }

  dequeue() {
    const result = this.peek();
    const last = this.heap.pop();

    if (!this.isEmpty()) {
      this.heap[TOP] = last;
      this.bubbleDown();
    }

    return result;
  }

  isEmpty() {
    return this.size() === 0;
  }

  last() {
    return this.size() - 1;
  }

  peek() {
    return this.isEmpty() ? null : this.heap[TOP];
  }

  queue(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  size() {
    return this.heap.length;
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
}

module.exports = PriorityQueue;
