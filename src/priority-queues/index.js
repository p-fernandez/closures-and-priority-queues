'use strict';

const Appointment = require('./appointment');
const PriorityQueue = require('./priority-queue');

// TO-DO: Move to config file.
const SCHEDULE_END = '19:00';
const SCHEDULE_START = '09:00';

const compareEndTimes = (a, b) => a.getEndInMinutes() - b.getEndInMinutes();
const compareStartTimes = (a, b) => a.getStartInMinutes() - b.getStartInMinutes();
const areTheyIntersecting = (a, b) => a.getEndInMinutes() < b.getStartInMinutes();

const createAppointment = (start, end) => new Appointment(start, end);

const createAppointmentsFromSchedule = (
  priorityQueue,
  schedule
) => schedule.flat().map(([start, end]) => priorityQueue.queue(createAppointment(start, end)));

const createGapForAppointment = (current, peek) => createAppointment(current.end, peek.start);

const scheduleEnd = new Appointment(SCHEDULE_END, null);
const scheduleStart = new Appointment(null, SCHEDULE_START);

const findFreeGaps = (schedule) => {
  const priorityQueue = new PriorityQueue(compareStartTimes);

  createAppointmentsFromSchedule(priorityQueue, schedule);

  const result = [];
  let current = priorityQueue.dequeue();
  if (areTheyIntersecting(scheduleStart, current)) {
    result.push(createGapForAppointment(scheduleStart, current));
  }

  while (!priorityQueue.isEmpty()) {
    const peek = priorityQueue.peek();
    if (areTheyIntersecting(current, peek)) {
      result.push(createGapForAppointment(current, peek));
      current = priorityQueue.dequeue();
    } else {
      current = compareEndTimes(current, peek) >= 0 ? current : peek;
      priorityQueue.dequeue();
    }
  }

  if (areTheyIntersecting(current, scheduleEnd)) {
    result.push(createGapForAppointment(current, scheduleEnd));
  }

  return result;
};

const findFirstAvailableGap = (schedule, appointmentDuration = 1) => {
  const freeIntervals = findFreeGaps(schedule);

  let appointment = null;
  for (let i = 0; i < freeIntervals.length; i += 1) {
    if (freeIntervals[i].getDurationInMinutes() >= appointmentDuration) {
      appointment = freeIntervals[i].start;
      break;
    }
  }

  return appointment;
};

module.exports = findFirstAvailableGap;
