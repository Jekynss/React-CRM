import React from "react";
import Button from '@material-ui/core/Button';

type Props = {
  name:string
}

const StackBadge = (props:Props) => {
  const {name} = props;
  return <Button>{name}</Button>;
};

export default StackBadge;
