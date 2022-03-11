import React from 'react';
import { Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { Option } from '../interfaces/option';

export interface ItemProps  {
  current: Option | null,
  label: string,
  option: Option,
  value: string,
  selectedColor?:string,
  selectedTextColor?:string,
  textStyleModal?:TextStyle,
  modalContainerStyle?:ViewStyle,
  containerStyle?: ViewStyle,
  itemStyleModal?:ViewStyle
  onPress: (option: Option) => void
};
export default function Item(props: ItemProps) {
  const {
    onPress,
    value,
    current,
    option,
    selectedColor,
    selectedTextColor,
    itemStyleModal,
    textStyleModal
  } = props;

  const isSelected = Number(value) === Number(current?.value);



  return (
    <TouchableOpacity
      onPress={() => onPress(option)}
      style={{
        backgroundColor: isSelected ? selectedColor: 'rgba(0,0,0,0.0)',
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        ...itemStyleModal
      }}
    >
      <Text
        style={{
          color: isSelected ? selectedTextColor : 'black',
          fontSize: 16,
          ...textStyleModal
        }}
      >
        {option.label}

      </Text>
    </TouchableOpacity>
  );
}
