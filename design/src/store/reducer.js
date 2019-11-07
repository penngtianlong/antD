
const State={
    tokenModal:true
}

export  default (prevState=State,action)=>{
    let newDate=JSON.parse(JSON.stringify(prevState))
    let {type,params}=action
    switch (type){
        case 'CHANGE_TOKENMODAL':
            newDate.tokenModal=params
            break;
        default:
            break;
    }
    return newDate

}