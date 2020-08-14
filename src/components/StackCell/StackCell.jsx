import React from 'react'
import StackBadge from '../StackBadge/StackBadge';

const StackCell = (props) => {
    const {stacks} = props;
    return (
        <>
         {stacks.map((elem)=>(<StackBadge name={elem}/>))}   
        </>
    )
}

export default StackCell
