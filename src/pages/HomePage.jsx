import React from 'react';
import Header from '../components/Header/Header.jsx'
import ImageSection from '../components/ImageSection/ImageSection'
import People from '../components/People/People'

function PeoplePage() {
  return (
    <div className="PeoplePage">
      <Header header="Home"/>
      <ImageSection/>
      <People/>
    </div>
  );
}

export default PeoplePage;
