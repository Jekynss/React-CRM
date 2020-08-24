import React from 'react'
import { Grid } from '@material-ui/core'
import ProjectProfile from '../components/ProjectProfile/ProjectProfile'

function ProjectPage(props) {
    return (
        <Grid>
            <ProjectProfile params={props.match.params}/>
        </Grid>
    )
}

export default ProjectPage
