import React from 'react'
import {Text,TouchableOpacity} from 'react-native'
import {Option} from '../interfaces/option'

type ItemProps = {
    current:Option |null,
    label:string,
    option:Option,
    value:string
    onPress:(option:Option)=>void
}
export default function Item(props:ItemProps){
    const {onPress,value,current,option} = props;

    const isSelected = value == current?.value;
    
    return (
        <TouchableOpacity
        onPress={()=>onPress(option)}
        style={{
            backgroundColor: isSelected?'#6AA1A4':'#FFF',
            width: '100%',
            height: 40,
            justifyContent:'center',
            alignItems:'center'
        }}
    >
        <Text
        style={{
            color:isSelected? '#FFF':'black',
            fontSize:16
        }}
        >{option.label}</Text>
    </TouchableOpacity>
    )

}