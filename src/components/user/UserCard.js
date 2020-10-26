import React from 'react'
import { useHistory } from 'react-router-dom'
import { Image, List } from 'semantic-ui-react'

export const UserCard = ({connection, status, user}) => {
    const history=useHistory()

    if (status === true) {
    return (
        <>
            <List.Item onClick ={()=> history.push(`/users/edit/${connection.user.id}`)}>
                <List.Content>
                    <List.Header>{`${connection.user.firstName} ${connection.user.lastName}`}</List.Header>
                    <List.Description>
                        {`Connected on ${connection.dateConnected}`}
                    </List.Description>
                </List.Content>
            </List.Item>

        </>
    )} else {
        return (
            <>
                <List.Item onClick ={()=> history.push(`/users/add/${user.id}`)}>
                    <List.Content>
                        <List.Header>{`${user.firstName} ${user.lastName}`}</List.Header>
                        <List.Description>
                            {`You are not yet connected with ${user.firstName} ${user.lastName}`}
                        </List.Description>
                    </List.Content>
                </List.Item>
    
            </>
        )
    }
}







const ListExampleSelection = () => (
  <List selection verticalAlign='middle'>
    <List.Item>
      <Image avatar src='/images/avatar/small/helen.jpg' />
      <List.Content>
        <List.Header>Helen</List.Header>
      </List.Content>
    </List.Item>
    <List.Item>
      <Image avatar src='/images/avatar/small/christian.jpg' />
      <List.Content>
        <List.Header>Christian</List.Header>
      </List.Content>
    </List.Item>
    <List.Item>
      <Image avatar src='/images/avatar/small/daniel.jpg' />
      <List.Content>
        <List.Header>Daniel</List.Header>
      </List.Content>
    </List.Item>
  </List>
)

export default ListExampleSelection