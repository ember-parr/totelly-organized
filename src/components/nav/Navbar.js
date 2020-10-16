import React, { Component } from 'react'
import { Icon, Menu } from 'semantic-ui-react'


export default class SidebarNavigation extends Component {
    state = { activeItem: 'home' }
  
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
    render() {
      const { activeItem } = this.state
  
      return (
        <Menu icon vertical>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          >
            <Icon name='home' />
          </Menu.Item>
  
          <Menu.Item
            name='unordered list'
            active={activeItem === 'unordered list'}
            onClick={this.handleItemClick}
          >
            <Icon name='unordered list' />
          </Menu.Item>
  
          <Menu.Item
            name='pencil alternate'
            active={activeItem === 'pencil alternate'}
            onClick={this.handleItemClick}
          >
            <Icon name='pencil alternate' />
          </Menu.Item>

          <Menu.Item
            name='users'
            active={activeItem === 'users'}
            onClick={this.handleItemClick}
          >
            <Icon name='users' />
          </Menu.Item>

          <Menu.Item
            name='checked calendar'
            active={activeItem === 'checked calendar'}
            onClick={this.handleItemClick}
          >
            <Icon name='checked calendar' />
          </Menu.Item>


        </Menu>
      )
    }
  }
  