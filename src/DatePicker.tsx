/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useMemo, useState } from 'react';
import { View, TextStyle, ViewStyle } from 'react-native';
import Input from './input';
import { Option } from './interfaces/option';
import { Months } from './const/months';
import { getDays } from './const/days';
import { getYears } from './const/years';
import styles from './styles';

const YEARS = getYears();

export interface DatepickerProps {
  date?: string,
  onChange?: (date: string) => void | undefined,
  icon?: any,
  fontStyle?: TextStyle,
  containerStyle?: ViewStyle
}

function getDaysInMonth(currMonth: number, currYear: number): number {
  return new Date(currYear, currMonth, 0).getDate();
}

export default function DatePicker(props: DatepickerProps) {
  const {
    onChange,
    date = '',
    icon,
    fontStyle = {},
    containerStyle = {},
  } = props;
  const [month, setMonth] = useState<Option>();
  const [day, setDay] = useState<Option>();
  const [year, setYear] = useState<Option>();
  const currentDays = useMemo(() => {
    if (!year || !month) return [];

    const numberOfDays = getDaysInMonth(
      Number(month.value.toString()),
      Number(year.value.toString()),
    );

    return getDays(numberOfDays);
  }, [year, month]);

  function fillDate(currDate: Date): void {
    let currDay: string = currDate.getUTCDate().toString();
    const currYear: Option | undefined = YEARS.find((y) => y.value === currDate.getFullYear());
    const monthCurrent: Option | undefined = Months.find(
      (mon) => mon.value === currDate.getUTCMonth() + 1,
    );
    if (Number(currDay) < 10) {
      currDay = `0${currDay}`;
    }

    const dayOption = {
      value: currDay,
      label: currDay,
    };

    setDay(dayOption);

    if (monthCurrent) {
      setMonth(monthCurrent);
    }
    if (currYear) {
      setYear(currYear);
    }
  }

  useEffect(() => {
    const currentDate: Date = new Date(date || '');
    fillDate(currentDate);
  }, []);

  useEffect(() => {
    function valueChanged(): void {
      const currDate = `${year?.value || ''}/${month?.value || ''}/${day?.value || ''}`;

      if (onChange) {
        onChange(currDate);
      }
    }
    valueChanged();
  }, [day, year, month, onChange]);

  return (
    <View style={[
      styles.datePickerContainer,
      containerStyle,
    ]}
    >
      <Input
        placeholder="No Selected"
        options={Months}
        option={month || null}
        fontStyle={fontStyle}
        style={{ flex: 3 }}
        onSelected={(value) => { setMonth(value); }}
        icon={icon}
      />

      <Input
        placeholder="No Selected"
        style={{ flex: 1.5 }}
        options={currentDays}
        option={day || null}
        onSelected={(value) => { setDay(value); }}
        icon={icon}
      />

      <Input
        placeholder="No Selected"
        style={{ flex: 2 }}
        options={YEARS}
        option={year || null}
        onSelected={(value) => { setYear(value); }}
        icon={icon}
      />
    </View>
  );
}
