export const getBangkokFormattedString = (date: Date | string = new Date()): string => {
  const now = new Date(date);
  const formatted = now.toLocaleString('en-GB', { 
    timeZone: 'Asia/Bangkok',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
  
  return formatted.replace(',', '');
};