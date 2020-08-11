import React from 'react'
import ImageSection from '../components/ImageSection/ImageSection'
import PageName from '../components/PageName/PageName'

export default function ProjectsPage() {
    return (
        <div className="ProjectsPage">
          <PageName name={"Projects"}/>
          <ImageSection/>
        </div>
    )
}
