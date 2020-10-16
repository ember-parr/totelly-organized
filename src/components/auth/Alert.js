import React from 'react'
import { Button, Modal } from 'semantic-ui-react'

function UserDoesNotExist()  {
  const [open, setOpen] = React.useState(false)

  return (
    <Modal
      centered={false}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={<Button>Show Modal</Button>}
    >
      <Modal.Header>Whoops!</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          This email does not exist. Please try again or register a new account. 
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>OK</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default UserDoesNotExist