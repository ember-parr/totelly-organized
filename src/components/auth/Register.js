import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import { Button, Grid, Header, Icon, Segment, Image, Input, Modal } from 'semantic-ui-react'
import horizLogo from "../../images/LLogoHoriz.png";
//import "./Login.css";

export const Register = (props) => {
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const history = useHistory();
  const [open, setOpen] = React.useState(false)

  const existingUserCheck = () => {
    return fetch(`http://localhost:8088/users?email=${email.current?.value}`)
      .then((res) => res.json())
      .then((user) => !!user.length);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    existingUserCheck().then((userExists) => {
      if (!userExists) {
        fetch("http://localhost:8088/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.current.value,
            firstName: firstName.current.value,
            lastName: lastName.current.value,
          }),
        })
          .then((_) => _.json())
          .then((createdUser) => {
            if (createdUser.hasOwnProperty("id")) {
              localStorage.setItem("user", createdUser.id);
              history.push("/");
            }
          });
      } else {
        setOpen(true)
      }
    });
  };

  return (
    
    <main style={{ textAlign: "center" }}>
    <Modal centered={false} open={open} onClose={() => setOpen(false)} onOpen={() => setOpen(true)} >
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


        <Segment padding="very" basic>
            <Image src={horizLogo} size='big' centered />
        </Segment>
      
    

      <Grid.Column>
                        <Header>
                            <h2>Register</h2>
                        </Header>
                        <div>
                        <Grid.Row><Input icon='hand point up outline' iconPosition='left' placeholder='First Name' size='large' /> </Grid.Row> <br/>
                        <Grid.Row><Input icon='hand peace outline' iconPosition='left' placeholder='Last Name' size='large' /> </Grid.Row><br/>
                        <Grid.Row><Input icon='envelope outline' iconPosition='left' placeholder='Email (used to login)' size='large' /> </Grid.Row><br/>
                        <Grid.Row><Input icon='mobile alternate' iconPosition='left' placeholder='Phone Number' size='large' /> </Grid.Row> <br/>
                        <Grid.Row><Button animated onClick={handleRegister}>
                            <Button.Content visible>Register</Button.Content>
                            <Button.Content hidden>
                                <Icon name='arrow right' />
                            </Button.Content>
                        </Button></Grid.Row>
                        </div>
                    </Grid.Column>
    </main>
  );
};






