import React from 'react'
import { Grid, Image, Header, Placeholder } from 'semantic-ui-react'

export const DashboardView = () => {




    return (
        <>
            <Grid divided='vertically'>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <Header size='large'>Recently Added</Header>
                        <Placeholder>
    <Placeholder.Line />
    <Placeholder.Line />
    <Placeholder.Line />
    <Placeholder.Line />
    <Placeholder.Line />
  </Placeholder>
                    </Grid.Column>
                    <Grid.Column>
                        <Header size='large'>Requests</Header>
                        <Placeholder>
    <Placeholder.Line />
    <Placeholder.Line />
    <Placeholder.Line />
    <Placeholder.Line />
    <Placeholder.Line />
  </Placeholder>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row columns={1}>
                    <Grid.Column>
                        <Header size='large'>Feed</Header>
                        <Placeholder>
    <Placeholder.Line />
    <Placeholder.Line />
    <Placeholder.Line />
    <Placeholder.Line />
    <Placeholder.Line />
  </Placeholder>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        </>
    )
}