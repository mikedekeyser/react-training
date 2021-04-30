export const ButtonCell = (props:{caption:string; callback:Function;})=>{
    return <button onClick={()=>props.callback()}>{props.caption}</button>;
}