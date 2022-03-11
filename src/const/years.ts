export function getYears(){

    let arrayOfYears = []
    for(let i:number = 1940; i<=new Date().getFullYear(); i++){

        arrayOfYears.push({
            value:i,
            label:i
        })
  
    }

    return arrayOfYears.reverse();
}