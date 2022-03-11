import React, { useEffect, useState } from 'react'
import {View,TextStyle,ViewStyle} from 'react-native'
import Input from '../input'
import {Option} from './interfaces/option'
import {Months} from './const/months'
import {getDays} from './const/days'
import {getYears} from './const/years'
const YEARS = getYears();

interface datepickerProps  {
    date?:string,
    onChange?:(date:string)=>void|undefined,
    icon?:any,
    fontStyle?:TextStyle,
    containerStyle?:ViewStyle
}

export default function DatePicker(props:datepickerProps){

    const {onChange, date,icon,fontStyle,containerStyle} = props;
    const [month,setMonth] = useState<Option>()
    const [day,setDay] = useState<Option>()
    const [year,setYear] = useState<Option>()

    function fillDate(date:Date):void{
        let day:string = date.getUTCDate().toString();
        let year :Option|undefined = YEARS.find(y=>y.value==date.getFullYear())
        let dayOption:Option;
        let monthCurrent : Option|undefined = Months.find(mon=>mon.value ==date.getUTCMonth()+1 )
        if(parseInt(day) <10){
           day = "0"+day
        }

        dayOption= {
            value:day,
            label:day
        }

        setDay(dayOption)


        if(monthCurrent){
            setMonth(monthCurrent)
        }
        if(year){
            setYear(year)
        }

    }

    function getDaysInMonth(month: number, year: number): number {
        return new Date(year, month, 0).getDate();
    };

    function getAllDays(): Array<Option> {
        if (!year || !month) return []

        let numberOfDays = getDaysInMonth(parseInt(month.value.toString()), parseInt(year.value.toString()))

        return getDays(numberOfDays)
    }


    useEffect(()=>{
        let currentDate:Date;
        if(date){
             currentDate = new Date(date);
        }else{
            currentDate = new Date()
        }
      
        fillDate(currentDate)
    },[])


    useEffect(()=>{
        function valueChanged():void{

            let date = `${year?.value}/${month?.value}/${day?.value}`

            onChange(date)
    
        }
        valueChanged()
        
    },[day,year,month])
   
    return(

        <View style={{
            flexDirection:'row',
            width:'100%',
            padding: 10,
            ...containerStyle
        
        }}>
            
            <Input placeholder="No Selected" 
            options={Months} 
            option={month||null}
            fontStyle={fontStyle} 
            style={{flex:3}}
            onSelected={value=>{setMonth(value);}} icon={icon}   />

            <Input placeholder="No Selected"  
            style={{flex:1.5}}
            options={getAllDays()} option={day||null}onSelected={value=>{setDay(value);}} icon={icon}   />

            <Input placeholder="No Selected" 
            style={{flex:2}}
            options={YEARS} option={year||null} onSelected={value=>{setYear(value);}} icon={icon}   />
          
        </View>
    )
}