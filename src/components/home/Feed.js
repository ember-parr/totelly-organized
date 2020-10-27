import React from 'react'
import { Feed, Header } from 'semantic-ui-react'

export const DashboardFeed = () => {
    
    
    return (
        <>
            <Feed size="small">
                <Header as='h4'>Recent Activity</Header>
                <Feed.Event>
                    <Feed.Content>
                        <Feed.Summary>
                            You shared <a href="/locations">Adams House</a> with Lexi A.
                        </Feed.Summary>
                    </Feed.Content>
                </Feed.Event>
                <Feed.Event>
                    <Feed.Content>
                        <Feed.Summary>
                            Ember P. shared <a href="/items">Storage Unit</a> with Snoop C.
                        </Feed.Summary>
                    </Feed.Content>
                </Feed.Event>
                <Feed.Event>
                    <Feed.Content>
                        <Feed.Summary>
                            Ember P. Connected with <a href="/users">Snoop C.</a>
                        </Feed.Summary>
                    </Feed.Content>
                </Feed.Event>
                <Feed.Event>
                    <Feed.Content>
                        <Feed.Summary>
                            You shared <a href="/locations">Adams House</a> with Lexi A.
                        </Feed.Summary>
                    </Feed.Content>
                </Feed.Event>
            </Feed>
        </>
    )
    
}


/* <img src='#' alt="placeholder imgg"/> */