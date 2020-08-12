import React from 'react'
import People from '../components/People/People'
import { connect } from "react-redux";
import {setLimitPeopleToRedux} from '../redux/actions/CardsAction'

function PeoplePage(props) {
    const {limitPeople} = props;
    return (
        <div className="PeoplePage">
            <People buttonCreate={true} limitPeople={limitPeople} setLimitToRedux={setLimitPeopleToRedux}/>
        </div>
    )
}


const mapStateToProps = (state) => ({
    limitPeople:state.limitPeople
  });
  
  const mapDispatchToProps = {
    setLimitToRedux:setLimitPeopleToRedux
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PeoplePage);