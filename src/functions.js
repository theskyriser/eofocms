export const getAge = (birthDate) => {
    const birthConv = new Date(birthDate)
     const today = new Date()
     let age = today.getFullYear() - birthConv.getFullYear();
     var m = today.getMonth() - birthConv.getMonth();
     if (m < 0 || (m === 0 && today.getDate() < birthConv.getDate())) 
     {
        age--;
     }
     return age;
  }

export const getHoursBetweenDates = (startDate, endDate) => {

   const ms = Math.abs(startDate - endDate)
   const s = Math.floor(ms / 1000)
   const m = Math.floor(s / 60)
   return m / 60
}

export const dayToInt = (day) => {
   switch(day) {
     case 'Sunday': return 0
     case 'Monday': return 1
     case 'Tuesday': return 2
     case 'Wednesday': return 3
     case 'Thursday': return 4
     case 'Friday': return 5
     case 'Saturday': return 6
     default: return 1
 
   }
 }
