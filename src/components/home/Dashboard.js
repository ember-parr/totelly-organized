import React from 'react'
import { Grid, Header, Card, Feed } from 'semantic-ui-react'
import { ConnectionRequest } from '../connectedUsers/ConnectionRequests'
import { ConnectionProvider } from '../connectedUsers/ConnectionProvider'
import {FeedProvider} from './FeedProvider'
import { ItemProvider} from '../items/ItemProvider'
import { UserProvider } from '../user/UserProvider'
import { DashboardFeed } from './Feed'
import { RecentlyAdded } from './RecentlyAdded'

export const DashboardView = () => {




    return (
        <>
            <Grid divided='vertically' style={{width: '100%'}}>
                <Grid.Row columns={2} centered>
                <Grid.Column>
                        
                            <Header as='h4'>Recent Activity</Header>
                            <ItemProvider><FeedProvider>
                            <RecentlyAdded />
                            </FeedProvider>
                            </ItemProvider>
                            
                        
                        
                        
                            
                        
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