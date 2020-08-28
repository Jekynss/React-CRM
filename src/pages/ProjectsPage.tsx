import React from 'react'
import ImageSection from '../components/ImageSection/ImageSection'
import PageName from '../components/PageName/PageName'
import ProjectsTable from '../components/ProjectsTable/ProjectsTable'

const ProjectsPage: React.FC = () =>
  (
    <div className="ProjectsPage">
      <PageName name={"Projects"} />
      <ImageSection />
      <ProjectsTable />
    </div>
  )
export default ProjectsPage;
