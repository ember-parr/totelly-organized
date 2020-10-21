import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Grid, Header, Icon, Segment, Image, Modal, Form } from 'semantic-ui-react'
import horizLogo from "../../images/LLogoHoriz.png";
//import "./Login.css";

export const Register = () => {
  const history = useHistory()

    //sets state for 'email is already used' modal 
    const [open, setOpen] = React.useState(false)
    
    //deals with input change of email field
    const handleInputChange = e => {
        const {name, value} = e.target
        setValues({...values, [name]: value})
    }

    //checks that user exists in the database
    const existingUserCheck = (email) => {
        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
    }

  const handleRegister = (e) => {
    e.preventDefault();

    existingUserCheck(values.email).then((userExists) => {
      if (!userExists && values.email !== '') {
        fetch("http://localhost:8088/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            firstName: values.firstName,
            lastName: values.lastName,
            phoneNumber: values.phoneNumber,
            darkMode: false,
            lastFmUsername: ""
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

  const [values, setValues] = useState({email: '', firstName: '', lastName: '', phoneNumber: 0})

  return (
    <>
    
    <main style={{ textAlign: "center" }}>
    <Modal centered={false} open={open} onClose={() => setOpen(false)} onOpen={() => setOpen(true)} >
            <Modal.Header>Whoops!</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    This email is already used for a Totelly Organized Account. Please try again or login to your account. 
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
                        <form onSubmit={handleRegister} >
                          <Grid.Row><Form.Input onChange={handleInputChange} name="firstName" icon='hand point up outline' iconPosition='left' placeholder='First Name' size='large' value={values.firstName}/> </Grid.Row> <br/>
                          <Grid.Row><Form.Input onChange={handleInputChange} name="lastName" icon='hand peace outline' iconPosition='left' placeholder='Last Name' size='large' value={values.lastName}/> </Grid.Row><br/>
                          <Grid.Row><Form.Input onChange={handleInputChange} name="email" icon='envelope outline' iconPosition='left' placeholder='Email (used to login)' size='large' value={values.email}/> </Grid.Row><br/>
                          <Grid.Row><Form.Input onChange={handleInputChange} name="phoneNumber" icon='mobile alternate' iconPosition='left' placeholder='Phone Number' size='large' value={values.phoneNumber}/> </Grid.Row> <br/>
                          <Grid.Row><Form.Button animated onClick={handleRegister}>
                              <Button.Content visible>Register</Button.Content>
                              <Button.Content hidden>
                                  <Icon name='arrow right' />
                              </Button.Content>
                          </Form.Button></Grid.Row>
                          </form>
                        </div>
                    </Grid.Column>
    </main>
    </>
  );
};






