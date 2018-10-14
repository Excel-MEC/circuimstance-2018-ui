import React from 'react'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'

const LoaderSegment = () => (
    <div>
        <Segment>
            <Dimmer active inverted>
                <Loader content='Loading'/>
            </Dimmer>
        </Segment>
    </div>
)

export default LoaderSegment
