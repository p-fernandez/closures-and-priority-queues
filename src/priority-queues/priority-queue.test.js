'use strict';

const PriorityQueue = require('./priority-queue');

const comparator = (a, b) => b - a;

describe('Test PriorityQueue', () => {
  const priorityQueue = new PriorityQueue(comparator);

  test('Constructor', () => {
    expect(priorityQueue.comparator.toString()).toBe(comparator.toString());
    expect(priorityQueue.heap.length).toBe(0);
    expect(priorityQueue.size()).toBe(0);
    expect(priorityQueue.isEmpty()).toBe(true);
  });

  test('PriorityQueue.peek', () => {
    expect(priorityQueue.peek()).toEqual(null);

    const values = [5, 2, 3];
    values.forEach((v) => priorityQueue.queue(v));
    expect(priorityQueue.size()).toBe(values.length);
    expect(priorityQueue.peek()).toEqual(5);
  });

  describe('Common initialisation', () => {
    const values = [5, 2, 3, 1, 4];

    beforeEach(() => {
      priorityQueue.clear();
      values.forEach((v) => priorityQueue.queue(v));
      expect(priorityQueue.size()).toBe(values.length);
    });

    test('PriorityQueue.clear', () => {
      priorityQueue.clear();
      expect(priorityQueue.size()).toBe(0);
    });

    test('PriorityQueue.compare. Checks if b - a is < 0.', () => {
      expect(priorityQueue.compare(0, 1)).toBe(true);
      expect(priorityQueue.compare(0, 2)).toBe(true);
      expect(priorityQueue.compare(0, 3)).toBe(true);
      expect(priorityQueue.compare(0, 4)).toBe(true);
      expect(priorityQueue.compare(1, 2)).toBe(true);
      expect(priorityQueue.compare(1, 3)).toBe(true);
      expect(priorityQueue.compare(1, 4)).toBe(true);
      expect(priorityQueue.compare(2, 3)).toBe(true);
      expect(priorityQueue.compare(2, 4)).toBe(true);
      expect(priorityQueue.compare(3, 4)).toBe(false);
    });

    test('PriorityQueue.dequeue', () => {
      expect(priorityQueue.heap).toEqual([5, 4, 3, 1, 2]);

      expect(priorityQueue.dequeue()).toEqual(5);
      expect(priorityQueue.heap).toEqual([4, 2, 3, 1]);

      expect(priorityQueue.dequeue()).toEqual(4);
      expect(priorityQueue.heap).toEqual([3, 2, 1]);

      expect(priorityQueue.dequeue()).toEqual(3);
      expect(priorityQueue.heap).toEqual([2, 1]);

      expect(priorityQueue.dequeue()).toEqual(2);
      expect(priorityQueue.heap).toEqual([1]);

      expect(priorityQueue.dequeue()).toEqual(1);
      expect(priorityQueue.heap).toEqual([]);

      expect(priorityQueue.dequeue()).toEqual(null);
    });

    test('PriorityQueue.last', () => {
      expect(priorityQueue.last()).toEqual(values.length - 1);
    });

    test('PriorityQueue.queue', () => {
      expect(priorityQueue.heap).toEqual([5, 4, 3, 1, 2]);
    });

    test('PriorityQueue.swap', () => {
      priorityQueue.swap(0, 1);
      expect(priorityQueue.heap).toEqual([4, 5, 3, 1, 2]);
    });
  });
});
