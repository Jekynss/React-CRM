import React from 'react';
import ImageSection from '../components/ImageSection/ImageSection'
import People from '../components/People/People'
import PageName from '../components/PageName/PageName'
import { connect } from "react-redux";
import {setLimitHomeToRedux} from '../redux/actions/CardsAction'
import {ReduxState} from '../components/utils/types'

const HomePage:React.FC<{limitPeople:number}> = (props) => {
  const {limitPeople} = props;
  return (
    <div className="PeoplePage">
      <PageName name={"Main Page"}/>
      <ImageSection/>
      <People limitPeople={limitPeople} setLimitToRedux={setLimitHomeToRedux}/>
    </div>
  );
}

const mapStateToProps = (state:ReduxState) => ({
  limitPeople:state.limitHome
});

const mapDispatchToProps = {
  setLimitToRedux:setLimitHomeToRedux
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);