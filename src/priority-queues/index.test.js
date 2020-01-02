'use strict';

const findFirstAvailableGap = require('./index');

describe('Test task2', () => {
  describe('Generic tests', () => {
    const schedules = [
      [['09:05', '13:00'], ['13:30', '16:00'], ['17:45', '18:00']],
      [['09:15', '12:00'], ['14:00', '16:30'], ['17:15', '17:30']],
      [['11:30', '12:15'], ['15:00', '16:30'], ['17:45', '18:00']],
    ];

    test('Edge case meeting can start at 9:00 if lasts 5 minutes', () => {
      const result = findFirstAvailableGap(schedules, 5);
      expect(result).toBe('09:00');
    });

    test('If no duration is established we set a minimum default', () => {
      const result = findFirstAvailableGap(schedules);
      expect(result).toBe('09:00');
    });

    test('Find first available gap for a meeting of 15 min', () => {
      const result = findFirstAvailableGap(schedules, 15);
      expect(result).toBe('13:00');
    });

    test('Find first available gap for a meeting of 30 min', () => {
      const result = findFirstAvailableGap(schedules, 30);
      expect(result).toBe('13:00');
    });

    test('Find first available gap for a meeting of 45 min', () => {
      const result = findFirstAvailableGap(schedules, 45);
      expect(result).toBe('16:30');
    });

    test('Find first available gap for a meeting of 60 min', () => {
      const result = findFirstAvailableGap(schedules, 60);
      expect(result).toBe('18:00');
    });

    test('Edge case meeting can not finish longer than 19:00', () => {
      const result = findFirstAvailableGap(schedules, 61);
      expect(result).toBe(null);
    });
  });

  describe('Provided schedule example', () => {
    const schedules = [
      [['09:00', '11:30'], ['13:30', '16:00'], ['16:00', '17:30'], ['17:45', '19:00']],
      [['09:15', '12:00'], ['14:00', '16:30'], ['17:00', '17:30']],
      [['11:30', '12:15'], ['15:00', '16:30'], ['17:45', '19:00']],
    ];

    test('Find first available gap for a meeting of 15 min', () => {
      const result = findFirstAvailableGap(schedules, 15);
      expect(result).toBe('12:15');
    });

    test('Find first available gap for a meeting of 60 min', () => {
      const result = findFirstAvailableGap(schedules, 60);
      expect(result).toBe('12:15');
    });

    test('Do not find available gap for a meeting of 90 min', () => {
      const result = findFirstAvailableGap(schedules, 90);
      expect(result).toBe(null);
    });
  });
});
