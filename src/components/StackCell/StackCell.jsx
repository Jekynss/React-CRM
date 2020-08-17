import React from 'react'
import StackBadge from '../StackBadge/StackBadge';

const StackCell = (props) => {
    const {stacks} = props;
    return (
        <>
         {stacks?.map((elem)=>(<StackBadge key={elem} name={elem}/>))}   
        </>
    )
}

export default StackCell
