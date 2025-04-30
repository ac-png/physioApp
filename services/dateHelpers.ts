// e.g. Friday 25th, February
export const formatOrdinalDate = (date: Date) => {
  const day = date.getDate();
  const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
  const month = date.toLocaleDateString('en-US', { month: 'long' });

  const getOrdinalSuffix = (n: number): string => {
    if (n > 3 && n < 21) return 'th'; // 11th, 12th, 13th
    switch (n % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  const suffix = getOrdinalSuffix(day);

  return `${weekday} ${day}${suffix}, ${month}`;
};

// 19, 20, 21, 22, 23, 24, 25
export const Last7Dates = () => {
  const today = new Date();
  const dates = [];

  for (let i = -6; i <= 1; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    const formatted = date.toLocaleDateString('en-US', { day: 'numeric' });
    dates.push(formatted);
  }

  return dates;
};

// Sat 19, Sun 20, Mon 21, Tue 22, Wed 23, Thu 24, Fri 25
export const Last7DatesWithDay = () => {
  const today = new Date();
  const dates = [];

  for (let i = -6; i <= 1; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    const formatted = date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' }).replace(',', '');
    dates.push(formatted);
  }

  return dates;
};

// e.g. February 25, 2025
export const headerDate = (date: Date) => {

    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

};
