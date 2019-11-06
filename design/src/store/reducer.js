
const State={

}

export  default (prevState=State,action)=>{
    let newDate=JSON.parse(JSON.stringify(prevState))
    let {type,params}=action
    return newDate

}