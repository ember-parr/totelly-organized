import React from 'react'
import { Icon, Menu } from 'semantic-ui-react'
import { useHistory } from "react-router-dom";
import "./footer.css"

function exampleReducer(state, action) {
  switch (action.type) {
    case 'SHOW_ANIMATION':
      return { ...state, animation: action.animation, visible: true}
    case 'HIDE_ANIMATION':
        return { ...state, animation: action.animation, visible: false }  
    case 'ICON_CLICKED':
        return { ...state, color: "teal", active: true}
    case 'CHANGE_DIMMED':
      return { ...state, dimmed: action.dimmed }
    case 'CHANGE_DIRECTION':
      return { ...state, direction: action.direction, visible: false }
    default:
      throw new Error()
  }
}


  export const SidebarNavitation = () => {

    const [state ] = React.useReducer(exampleReducer, {
      animation: 'show',
      direction: "left",
      dimmed: false,
      visible: false,
      color: 'grey'
    })
    const { color } = state
    
    const history=useHistory()

    return (
      <>
          <Menu.Item as='a' onClick={() => history.push("/")} class="sidebarBox">
            <Icon name='home' />
            Home
          </Menu.Item>
          <Menu.Item as='a' onClick={() => history.push("/items")}>
            <Icon name='list alternate outline' color={color} />
            Items
          </Menu.Item>
          <Menu.Item as='a' onClick={() => history.push("/locations")}>
            <Icon name='map outline' color={color} />
            Locations
          </Menu.Item>
          <Menu.Item as='a' onClick={() => history.push("/lists")}>
            <Icon name='tags' color={color} />
            My Lists
          </Menu.Item>
          <Menu.Item as='a' onClick={() => history.push("/users")}>
            <Icon name='users' color={color} />
            Connected Users
          </Menu.Item>
          <Menu.Item as='a' onClick={() => history.push("/settings")}>
            <Icon name='setting' color={color} />
            Settings
          </Menu.Item>
      </>
    )
  }