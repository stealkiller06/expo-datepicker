export function getDays(numberOfDays:number){

    let arrayOfNumbers = []
    for(let i:number = 1; i<=numberOfDays; i++){

        if(i<10){
            arrayOfNumbers.push({
                value:"0"+i,
                label:"0"+i
            })
        }else{
            arrayOfNumbers.push({
                value:i,
                label:i
            })

        }
  
    }

    return arrayOfNumbers;
}