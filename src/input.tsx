/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState, useRef, useMemo } from 'react';
import {
  View, FlatList, TextStyle, TouchableWithoutFeedback, Animated, ViewStyle,
} from 'react-native';
import Item from './modal/item';
import { Option } from './interfaces/option';
import styles from './styles';

interface InputProps {
  options: Array<Option>,
  option: Option | null,
  placeholder: string,
  onSelected: (option: Option) => void,
  icon: any,
  fontStyle?: TextStyle,
  style?: ViewStyle,
  flex?:number,
  selectedColor?:string,
  selectedTextColor?:string,
  textStyleModal?:TextStyle,
  modalBackgroundColor?:string,
  containerStyle?: ViewStyle,
  borderColor?:string
}

export default function Input(props: InputProps) {
  const {
    options, 
    placeholder, 
    onSelected, 
    option, 
    icon = null, 
    fontStyle = {}, 
    style = {},
    flex=1,
    containerStyle,
    modalBackgroundColor,
    selectedColor,
    selectedTextColor,
    textStyleModal,
    borderColor
  } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideSmoothAnim = useRef(new Animated.Value(0)).current;
  const containerAnim = useRef(new Animated.Value(48)).current;
  const labelAnimation = useRef(new Animated.Value(0)).current;

  const slideUp = () => {
    Animated.parallel(
      [
        Animated.timing(slideSmoothAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(containerAnim, {
          toValue: 48,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(labelAnimation, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
      ],
    ).start(({ finished }) => {
      /* completion callback */
      if (finished) {
        setModalVisible(false);
      }
    });
  };

  const slideDown = () => {
    Animated.parallel([
      Animated.timing(slideSmoothAnim, {
        toValue: 300,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(containerAnim, {
        toValue: 300,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(labelAnimation, {
        toValue: 25,
        duration: 200,
        useNativeDriver: false,
      }),

    ]).start();
  };
  const renderItem = useMemo(()=>({ item }:{ item:Option }) => (
    <Item
      onPress={(value) => { onSelected(value); slideUp(); }}
      current={option}
      option={item}
      value={item.value.toString()}
      label={item.label}
      selectedColor={selectedColor}
      selectedTextColor={selectedTextColor}
      textStyleModal={textStyleModal}
    />

  ),[option]);

  function sliceMonthInputText(month: string): string {
    if (modalVisible) return month;
    if (month.length > 4) return `${month.substring(0, 4)}...`;
    return month;
  }

  return (
    <Animated.View style={{ height: containerAnim, flex, }}>
      <View style={{ height: 48, paddingHorizontal: 2, }}>

        <TouchableWithoutFeedback
          onPress={() => { setModalVisible(true); slideDown(); }}
          style={{ height: 48 }}
        >
          <View style={{...styles.input,...style}}>
            <Animated.Text
              style={[styles.inputText, { marginBottom: labelAnimation }, fontStyle]}
            >
              {sliceMonthInputText(option?.label || placeholder)}
            </Animated.Text>
            <View
              style={{ position: 'relative', backgroundColor: 'black' }}
            />

            {!modalVisible
              ? (
                <View style={{
                  alignItems: 'flex-end',
                  position: 'absolute',
                  right: -5,
                }}
                >
                  {icon}
                </View>
              )
              : null}
          </View>
        </TouchableWithoutFeedback>

        {modalVisible
          ? (
            <Animated.View style={[
              styles.modal,
              {
                height: slideSmoothAnim,
                opacity: fadeAnim,
                backgroundColor:modalBackgroundColor,
                borderColor
              },
              
            ]}
            >
              <FlatList
                data={options}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.value.toString()}
              />
            </Animated.View>
          )
          : null}
      </View>
    </Animated.View>

  );
}
