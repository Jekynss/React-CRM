import React from 'react'
import StackBadge from '../StackBadge/StackBadge';

type Props = {
    stacks:string[]
}

const StackCell = (props:Props) => {
    const {stacks} = props;
    return (
        <>
         {stacks?.map((elem)=>(<StackBadge key={elem} name={elem}/>))}   
        </>
    )
}

export default StackCell
