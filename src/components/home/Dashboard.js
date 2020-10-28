import React from 'react'
import { Grid, Header, Placeholder, Card, Feed } from 'semantic-ui-react'
import { ConnectionRequest } from '../connectedUsers/ConnectionRequests'
import { ConnectionProvider } from '../connectedUsers/ConnectionProvider'
import { UserProvider } from '../user/UserProvider'
import { DashboardFeed } from './Feed'

export const DashboardView = () => {




    return (
        <>
            <Grid divided='vertically' style={{width: '100%'}}>
                <Grid.Row columns={2} centered>
                    <Grid.Column >
                        <Header size='large'>Recently Added</Header>
                        <Placeholder>
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                        </Placeholder>
                    </Grid.Column>
                    <Grid.Column >
                        <Header size='large'>Requests</Header>
                            <Card.Group>
                        <ConnectionProvider>
                            <UserProvider>
                                <ConnectionRequest />
                            </UserProvider>
                        </ConnectionProvider>
                        </Card.Group>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row columns={1}>
                    <Grid.Column>
                        <Feed size="small">
                            <Header as='h4'>Recent Activity</Header>

                            <DashboardFeed />
                            
                        
                        </Feed>
                        
                            
                        
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        </>
    )
}