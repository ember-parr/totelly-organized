import React from 'react'
import { Grid, Header, Feed } from 'semantic-ui-react'
import { ConnectionRequest } from '../connectedUsers/ConnectionRequests'
import { ConnectionProvider } from '../connectedUsers/ConnectionProvider'
import {ActivityProvider} from './ActivityProvider'
import { ItemProvider} from '../items/ItemProvider'
import { UserProvider } from '../user/UserProvider'
import { RecentlyAdded } from './RecentlyAdded'
import { ActivityCard } from './ActivityCard'

export const DashboardView = () => {




    return (
        <div className="pageComponent">

            <Grid stackable celled='internally'>
                <Grid.Row  columns={2} centered >
                    <Grid.Column>
                        <Header as='h4'>Recent Added Items</Header>
                        <ItemProvider>
                            <ActivityProvider>
                                <RecentlyAdded />
                            </ActivityProvider>
                        </ItemProvider>
                    </Grid.Column>
                    <Grid.Column >
                        <Header as='h4'>Requests</Header>
                        {/* <Card.Group > */}
                            <ConnectionProvider>
                                <UserProvider>
                                    <ConnectionRequest />
                                </UserProvider>
                            </ConnectionProvider>
                        {/* </Card.Group> */}
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row columns={1}>
                    <Grid.Column>
                        <Feed size="small">
                            <Header as='h4'>Recent Activity</Header>
                                <ActivityProvider>
                                    <ActivityCard />
                                </ActivityProvider>
                        </Feed>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        </div>
    )
}