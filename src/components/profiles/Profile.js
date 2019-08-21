import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import ItemTypes from '../../ItemTypes'
import Increment from '../Increment'
import moment from 'moment'

const style = {
  cursor: 'move',
}
const Profile = ({ id, text, index, moveCard, name, location, avatar_url, company, html_url, public_repos, repos_url, profilesCount, removeCard, created_at }) => {
  const ref = useRef(null)
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1
  drag(drop(ref));
  const handleIncrement = (e) => {
    e.preventDefault();
    moveCard(index, parseInt(index) + parseInt(e.target.value))
  };
  const handleRemoveProfile = indexed => e => {
    e.preventDefault();
    removeCard(indexed);
  };
  return (
    <div data-index={index} ref={ref} style={{ ...style, opacity }} className="profiles-profile">
      <div
        className="profiles-profile-remove"
        onClick={handleRemoveProfile(index)}
        >
        remove
      </div>
      <div className="position">{index+1}
        <span>
          {index !== 0 && <Increment handleClick={handleIncrement} increment={-1} text="&#8593;"/>}
          {profilesCount !== 1 && index < profilesCount -1 && <Increment handleClick={handleIncrement} increment={1} text="&#8595;" />}
        </span>
      </div>
      <a className="avatar_url" href={html_url} target="_blank" rel="noopener noreferrer">
        <img src={avatar_url} height="100px" width="100px" alt="User profile avatar"/>
      </a>
      <div className="info">
        {name ? <a className="name" href={html_url} target="_blank" rel="noopener noreferrer">{name}</a> : ''}
        {public_repos ? <a className="name" href={html_url + "?tab=repositories"} target="_blank" rel="noopener noreferrer">Repos: {public_repos}</a> : ''}
        {company ? <div className="company">{company}</div> : ''}
        {location ? <div className="location">{location}</div> : ''}
        <div className="created_at">{moment(created_at).format('L')}</div>
      </div>
    </div>
  )
}

export default Profile;
