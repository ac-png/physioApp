export const numberToWords = (num: number): string => {
  const words: string[] = [
    'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
    'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
  ];
  const tens: string[] = [
    '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
  ];

  if (num < 20) return words[num];
  if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 === 0 ? '' : ' ' + words[num % 10]);  // Numbers from 20 to 99
  return '';
};

export const arrayRange = (start: number, stop:number, step:number) =>
	Array.from(
	{ length: (stop - start) / step + 1 },
	(value, index) => start + index * step
);