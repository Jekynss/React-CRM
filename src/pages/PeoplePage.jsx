import React from 'react'
import People from '../components/People/People'
import PageName from '../components/PageName/PageName'

export default function PeoplePage() {
    return (
        <div className="PeoplePage">
            <PageName name={"People"}/>
            <People buttonCreate={true} initLimit={9}/>
        </div>
    )
}
