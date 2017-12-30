import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const TeamsWrapper = styled.div`
  grid-column: 1;
  grid-row: 1 / 4;
  background-color: #362234;
  color: #958993;
`

const TeamsList = styled.ul`
  width: 100%;
  padding-left: 0px;
  list-style: none;
`

const TeamsListItem = styled.li`
  height: 50px;
  width: 50px;
  background-color: #676066;
  color: #fff;
  margin: auto;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border-radius: 11px;
  cursor: pointer;
  &:hover {
    border-style: solid;
    border-width: thick;
    border-color: #767676;
  }
`

const team = ({ id, name }) => (
  <Link key={`team-${id}`} to={`/view-team/${id}`}>
    <TeamsListItem>{name.charAt(0).toUpperCase()}</TeamsListItem>
  </Link>
)

const Teams = ({ teams }) => (
  <TeamsWrapper>
    <TeamsList>
      {teams.map(team)}
      <Link to="/create-team">
        <TeamsListItem>+</TeamsListItem>
      </Link>
    </TeamsList>
  </TeamsWrapper>
)

export default Teams
