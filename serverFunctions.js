import {setHours, setMinutes} from 'date-fns'


export const countCertainDays = ( days, d0, d1 ) => {
    var ndays = 1 + Math.round((d1-d0)/(24*3600*1000));
    var sum = function(a,b) {
      return a + Math.floor( ( ndays + (d0.getDay()+6-b) % 7 ) / 7 ); };
    return days.reduce(sum,0);
  }

export const sliceTime = (time, date) => {

  const hours = time.slice(0, 2)
  const minutes = time.slice(3, 6)

  if(minutes === '30') {
    date = setHours(date, hours)
    date = setMinutes(date, minutes)
    return date
  } else {
    date = setHours(date, hours)
    return date
  }
}

export const dayToInt = (day) => {
  switch(day) {
    case 'Sunday': return [0]
    case 'Monday': return [1]
    case 'Tuesday': return [2]
    case 'Wednesday': return [3]
    case 'Thursday': return [4]
    case 'Friday': return [5]
    case 'Saturday': return [6]
    default: return 1

  }
}

export const getHoursBetweenDates = (startDate, endDate) => {

  const ms = Math.abs(startDate - endDate)
  const s = Math.floor(ms / 1000)
  const m = Math.floor(s / 60)
  return m / 60
}

export function getMonthsBetween(date1,date2,roundUpFractionalMonths)
{
    //Months will be calculated between start and end dates.
    //Make sure start date is less than end date.
    //But remember if the difference should be negative.
    var startDate=date1;
    var endDate=date2;
    var inverse=false;
    if(date1>date2)
    {
        startDate=date2;
        endDate=date1;
        inverse=true;
    }

    //Calculate the differences between the start and end dates
    var yearsDifference=endDate.getFullYear()-startDate.getFullYear();
    var monthsDifference=endDate.getMonth()-startDate.getMonth();
    var daysDifference=endDate.getDate()-startDate.getDate();

    var monthCorrection=0;
    //If roundUpFractionalMonths is true, check if an extra month needs to be added from rounding up.
    //The difference is done by ceiling (round up),  3 months and 1 day will be 4 months.
    if(roundUpFractionalMonths===true && daysDifference>0)
    {
        monthCorrection=1;
    }
    //If the day difference between the 2 months is negative, the last month is not a whole month.
    else if(roundUpFractionalMonths!==true && daysDifference<0)
    {
        monthCorrection=-1;
    }

    return (inverse?-1:1)*(yearsDifference*12+monthsDifference+monthCorrection);
};


export function weeksBetween(d1, d2) {
  return Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
}


export const intToMonth = (int) => {
  switch(int) {
    case 0: return 'January'
    case 1: return 'February' 
    case 2: return 'March' 
    case 3: return 'April' 
    case 4: return 'May' 
    case 5: return 'June' 
    case 6: return 'July' 
    case 7: return 'August' 
    case 8: return 'September' 
    case 9: return 'October' 
    case 10: return 'November' 
    case 11: return 'December' 

  }
}