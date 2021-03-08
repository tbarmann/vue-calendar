type language = "en";

interface DayNames {
  en: string[];
}

type MonthNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
enum Month { JAN, FEB, MAR, APR, MAY, JUN, JUL, AUG, SEP, OCT, NOV, DEC }

const monthNamesFull = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const dayNamesFull: DayNames = {
  en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
};

const isLeapYear = function(utc: Date) {
  const y = utc.getUTCFullYear();
  return !(y % 4) && (y % 100) || !(y % 400) ? true : false;
};

export default {
  methods: {
    getDayNamesFull(lang: language = "en") {
      return dayNamesFull[lang];
    },
    getDayNamesAbbr(lang: language = "en") {
      const dayNamesFull = this.getDayNamesFull(lang);
      return dayNamesFull.map((day) => day.substring(0,3));
    },
    getNameOfMonth(monthNumber: MonthNumber) {
      return monthNamesFull[monthNumber - 1]; // monthNamesFull array is 0 indexed
    },
    // Return the number of days in the month
    getDaysInMonth(utc: Date) {
      const monthNumber = utc.getUTCMonth();
      // If feb.
      if (monthNumber === 1) {
        return isLeapYear(utc) ? 29 : 28;
      }
      // If Apr, Jun, Sep or Nov return 30; otherwise 31
      return (
        monthNumber === Month.APR ||
        monthNumber === Month.JUN ||
        monthNumber === Month.SEP ||
        monthNumber === Month.NOV)
        ? 30
        : 31;
    },
    getCalendarMonthArray(month: MonthNumber, year: number) {
      const weeks = [];
      const d = new Date(year, month, 1);
      const beginCell = d.getDay();
      const endDay = this.getDaysInMonth(d);
      let currDay = 1;
      let cellPtr = 0;

      while (currDay <= endDay) {
        const days = [];
        for (let j = 0; j < 7; j++) {
          if (cellPtr < beginCell || currDay > endDay) {
            days.push(null);
          }
          else {
            days.push(currDay);
            currDay++;
          }
          cellPtr++;
        }
        weeks.push(days);
      }
      return weeks;
    },
    getNextMonthYear(currentMonth: MonthNumber, currentYear: number) {
      if (currentMonth === 12) {
        return {
          month: 1,
          year: currentYear + 1
        };
      }
      return {
        month: currentMonth + 1,
        year: currentYear
      };
    },
    getPreviousMonthYear(currentMonth: MonthNumber, currentYear: number) {
      if (currentMonth === 1) {
        return {
          month: 12,
          year: currentYear - 1
        };
      }
      return {
        month: currentMonth - 1,
        year: currentYear
      };
    },
    isValidDate(month: MonthNumber, year: number) {
      const d = new Date(year, month, 1, 0, 0, 0, 0);
      // An invalid date object returns NaN for getTime() and NaN is the only
      // object not strictly equal to itself.
      return d.getTime() === d.getTime();
    }    
  }
};
