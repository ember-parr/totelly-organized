import React  from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, Divider, Grid, Header, Icon, Segment, Image, Modal } from 'semantic-ui-react'
import horizLogo from "../../images/LLogoHoriz.png";
import 'semantic-ui-css/semantic.css'


export const SignIn = () => {
    const email = React.useState()
    const history = useHistory()

    const [open, setOpen] = React.useState(false)

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${email.current?.value}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
    }

    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                if (exists) {
                    localStorage.setItem("user", exists.id)
                    history.push("/")
                } else {
                    setOpen(true)
                    console.log(email)
                }
            })
    }

    return (
        <>
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
            <Image src={horizLogo} size='huge' centered />
        </Segment>
        

        <Segment basic>
            <Grid columns={2} stackable textAlign='center'>
                <Divider vertical>Or</Divider>
                <Grid.Row verticalAlign='middle'>
                    <Grid.Column>
                        <Header>
                            <h2>Login</h2>
                        </Header>
                        <div>
                            <form onSubmit={handleLogin} >
                                
                                    <Form.Input email={email} placeholder='Email' name="email" icon='envelope outline' iconPosition='left' required /><br></br>
                                    
                                <Form.Button animated type="submit">
                                    <Button.Content visible>Sign In</Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='arrow right' />
                                    </Button.Content>
                                </Form.Button>
                                

                                
                            </form>
                        </div>
                    </Grid.Column>


                    <Grid.Column>
                        <Header>
                            <h2>Register</h2>
                        </Header>
                            <p>For A Free Account</p>
                            <Button animated onClick={() => {
                                history.push(`/register`)
                            }}>
                            <Button.Content visible>Register</Button.Content>
                            <Button.Content hidden>
                                <Icon name='arrow right' />
                            </Button.Content>
                        </Button>
                        
                    </Grid.Column>
                </Grid.Row>



            </Grid>
        </Segment>
        </>
    )
}