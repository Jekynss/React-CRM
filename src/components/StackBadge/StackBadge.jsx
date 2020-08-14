import React from "react";
import Button from '@material-ui/core/Button';

const StackBadge = (props) => {
  const {name} = props;
  return <Button sizeSmall>{name}</Button>;
};

export default StackBadge;
