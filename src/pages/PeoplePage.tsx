import React from 'react'
import People from '../components/People/People'
import { connect } from "react-redux";
import {setLimitPeopleToRedux} from '../redux/actions/CardsAction'
import {ReduxState} from '../components/utils/types'

const PeoplePage:React.FC<{limitPeople:number,setLimitPeopleToRedux:any}> = (props) => {
    const {limitPeople,setLimitPeopleToRedux} = props;
    return (
        <div className="PeoplePage">
            <People buttonCreate={true} limitPeople={limitPeople} setLimitToRedux={setLimitPeopleToRedux}/>
        </div>
    )
}


const mapStateToProps = ({limitPeople}: ReduxState) => ({
    limitPeople
  });
  
  const mapDispatchToProps = {
    setLimitPeopleToRedux
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PeoplePage);