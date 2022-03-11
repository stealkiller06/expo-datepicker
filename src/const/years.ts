import { Option } from '../interfaces/option';

export const getYears = ():Option[] => {
  const arrayOfYears:Option[] = [];
  for (let i = 1940; i <= new Date().getFullYear() ; i += 1) {
    arrayOfYears.push({
      value: i,
      label: i.toString(),
    });
  }

  return arrayOfYears.reverse();
};

export default getYears;
