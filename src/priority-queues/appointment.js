'use strict';

class Appointment {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  static convertToMinutes(time) {
    if (!time) {
      return null;
    }

    const [hours, minutes] = time.split(':');
    return (Number(hours) * 60) + Number(minutes);
  }

  static padStart(value) {
    return value.toString().padStart(2, '0');
  }

  getDurationInMinutes() {
    const end = this.getEndInMinutes();
    const start = this.getStartInMinutes();
    return end - start;
  }

  getHumanReadableDuration() {
    const duration = this.getDurationInMinutes();
    const minutes = duration % 60;
    const hours = (duration - minutes) / 60;
    return `${Appointment.padStart(hours)}h ${Appointment.padStart(minutes)}m`;
  }

  getEndInMinutes() {
    return Appointment.convertToMinutes(this.end);
  }

  getStartInMinutes() {
    return Appointment.convertToMinutes(this.start);
  }
}

module.exports = Appointment;
