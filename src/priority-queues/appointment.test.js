'use strict';

const Appointment = require('./appointment');

const start = '05:00';
const end = '23:00';

describe('Test Appoinment', () => {
  const appointment = new Appointment(start, end);

  test('Constructor', () => {
    expect(appointment.start).toBe(start);
    expect(appointment.end).toBe(end);
  });

  test('Appointment.getDurationInMinutes()', () => {
    expect(appointment.getDurationInMinutes()).toBe(1080);
  });

  test('Appointment.getHumanReadableDuration()', () => {
    expect(appointment.getHumanReadableDuration()).toBe('18h 00m');
  });

  test('Appointment.getEndInMinutes()', () => {
    expect(appointment.getEndInMinutes()).toBe(1380);
  });

  test('Appointment.getStartInMinutes()', () => {
    expect(appointment.getStartInMinutes()).toBe(300);
  });
});
