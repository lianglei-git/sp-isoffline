interface IsOnline {
    (dnses?:string[]):Promise<Boolean>
}


export const isonline:IsOnline

export const offlineListener:(obj:{
    time?:number,
    interval?:number,
    offline: (callback: ({status: Boolean}) => void ) => void,
    online:({status: Boolean}) => void
}) => void