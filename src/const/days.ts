import { Option } from '../interfaces/option';

export function getDays(numberOfDays:number):Option[] {
  const arrayOfNumbers:Option[] = [];

  for (let i = 1; i <= numberOfDays; i += 1) {
    if (i < 10) {
      arrayOfNumbers.push({
        value: `0${i}`,
        label: `0${i}`,
      });
    } else {
      arrayOfNumbers.push({
        value: i,
        label: i.toString(),
      });
    }
  }

  return arrayOfNumbers;
}

export default getDays;
