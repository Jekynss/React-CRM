import React from 'react';
import Header from '../components/Header/Header.jsx'
import ImageSection from '../components/ImageSection/ImageSection'
import People from '../components/People/People'
import PageName from '../components/PageName/PageName'

function PeoplePage() {
  return (
    <div className="PeoplePage">
      <PageName name={"Home"}/>
      <ImageSection/>
      <People initLimit={3}/>
    </div>
  );
}

export default PeoplePage;
