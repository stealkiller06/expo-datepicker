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
  backgroundColor?:string,
  borderColor?:string,
  containerStyle?: ViewStyle,
  date?: string,
  fontStyle?: TextStyle,
  icon?: any,
  inputDayStyle?:ViewStyle,
  inputMonthStyle?:ViewStyle,
  inputStyle?:ViewStyle,
  inputYearStyle?:ViewStyle
  itemStyleModal?:ViewStyle,
  modalBackgroundColor?:string,
  selectedColor?:string,
  selectedTextColor?:string,
  textStyleModal?:TextStyle,
  onChange?: (date: string) => void | undefined,
}

function getDaysInMonth(currMonth: number, currYear: number): number {
  return new Date(currYear, currMonth, 0).getDate();
}

export default function DatePicker(props: DatepickerProps) {
  const {
    backgroundColor,
    borderColor = '#577C7D',
    containerStyle = {},
    date = '',
    fontStyle = {},
    icon,
    inputDayStyle,
    inputMonthStyle,
    inputStyle,
    inputYearStyle,
    itemStyleModal,
    modalBackgroundColor = '#FFF',
    onChange,
    selectedColor = '#6AA1A4',
    selectedTextColor = '#FFF',
    textStyleModal,
  } = props;
  const [month, setMonth] = useState<Option>();
  const [day, setDay] = useState<Option>();
  const [year, setYear] = useState<Option>();
  const currentDays = useMemo(() => {
    if (!year || !month) return [];

    const numberOfDays = getDaysInMonth(
      Number(month.value),
      Number(year.value),
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

  function valueChanged(name:'month' | 'year' | 'day', currVal:Option): void {
    const currDay = name === 'day' ? currVal : day;
    const currMonth = name === 'month' ? currVal : month;
    const currYear = name === 'year' ? currVal : year;

    const currDate = `${currYear?.value || ''}/${currMonth?.value || ''}/${currDay?.value || ''}`;

    if (onChange) {
      onChange(currDate);
    }
  }

  useEffect(() => {
    const currentDate: Date = date ? new Date(date) : new Date();
    fillDate(currentDate);
  }, []);

  return (
    <View style={{
      ...styles.datePickerContainer,
      ...containerStyle,
    }}
    >
      <Input
        placeholder="No Selected"
        options={Months}
        option={month || null}
        fontStyle={fontStyle}
        selectedColor={selectedColor}
        selectedTextColor={selectedTextColor}
        textStyleModal={textStyleModal}
        itemStyleModal={itemStyleModal}
        modalBackgroundColor={modalBackgroundColor}
        borderColor={borderColor}
        flex={3}
        style={{
          ...{
            backgroundColor,
            borderColor,
          },
          ...inputStyle,
          ...inputMonthStyle,
        }}
        onSelected={(value) => { setMonth(value); valueChanged('month', value); }}
        icon={icon}

      />

      <Input
        selectedColor={selectedColor}
        selectedTextColor={selectedTextColor}
        textStyleModal={textStyleModal}
        itemStyleModal={itemStyleModal}
        modalBackgroundColor={modalBackgroundColor}
        borderColor={borderColor}
        placeholder="No Selected"
        flex={1.5}
        style={{
          ...{
            backgroundColor,
            borderColor,
          },
          ...inputStyle,
          ...inputDayStyle,
        }}
        options={currentDays}
        option={day || null}
        fontStyle={fontStyle}
        onSelected={(value) => { setDay(value); valueChanged('day', value); }}
        icon={icon}

      />

      <Input
        selectedColor={selectedColor}
        selectedTextColor={selectedTextColor}
        textStyleModal={textStyleModal}
        itemStyleModal={itemStyleModal}
        modalBackgroundColor={modalBackgroundColor}
        borderColor={borderColor}
        placeholder="No Selected"
        flex={2}
        style={{
          ...{
            backgroundColor,
            borderColor,
          },
          ...inputStyle,
          ...inputYearStyle,
        }}
        options={YEARS}
        option={year || null}
        fontStyle={fontStyle}
        onSelected={(value) => { setYear(value); valueChanged('year', value); }}
        icon={icon}
      />
    </View>
  );
}
