import React, { Component } from 'react'

import styled from 'styled-components'

export const AppLayoutWrapper = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 100px 250px 1fr;
  grid-template-rows: auto 1fr auto;
`

class AppLayout extends Component {
  render() {
    return <AppLayoutWrapper>{this.props.children}</AppLayoutWrapper>
  }
}

export default AppLayout
