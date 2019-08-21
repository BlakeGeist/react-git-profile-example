import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import moment from 'moment';
import ItemTypes from '../../ItemTypes';
import Increment from '../Increment';

const style = {
  cursor: 'move',
};
const Profile = ({
  avatarUrl,
  createdAt,
  company,
  id,
  index,
  htmlUrl,
  location,
  moveCard,
  name,
  profilesCount,
  publicRepos,
  removeCard,
  reposUrl
}) => {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  const handleIncrement = (e) => {
    e.preventDefault();
    moveCard(index, Number(index) + Number(e.target.value));
  };
  const handleRemoveProfile = (indexed) => (e) => {
    e.preventDefault();
    removeCard(indexed);
  };
  return (
    <div data-index={index} ref={ref} style={{ ...style, opacity }} className="profiles-profile">
      <button
        className="profiles-profile-remove"
        onClick={handleRemoveProfile(index)}
        type="button"
      >
        remove
      </button>
      <div className="position">
        {index + 1}
        <span>
          {index !== 0 && <Increment handleClick={handleIncrement} increment={-1} text="&#8593;" />}
          {profilesCount !== 1 && index < profilesCount - 1 && <Increment handleClick={handleIncrement} increment={1} text="&#8595;" />}
        </span>
      </div>
      <a className="avatar_url" href={htmlUrl} target="_blank" rel="noopener noreferrer">
        <img src={avatarUrl} height="100px" width="100px" alt="User profile avatar" />
      </a>
      <div className="info">
        {name ? <a className="name" href={htmlUrl} target="_blank" rel="noopener noreferrer">{name}</a> : ''}
        {publicRepos ? (
          <a className="name" href={`${htmlUrl}?tab=repositories`} target="_blank" rel="noopener noreferrer">
            Repos:
            {' '}
            {publicRepos}
          </a>
        ) : ''}
        {company ? <div className="company">{company}</div> : ''}
        {location ? <div className="location">{location}</div> : ''}
        <div className="created_at">{moment(createdAt).format('L')}</div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  company: PropTypes.string,
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  htmlUrl: PropTypes.string.isRequired,
  location: PropTypes.string,
  moveCard: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  profilesCount: PropTypes.number.isRequired,
  publicRepos: PropTypes.number.isRequired,
  removeCard: PropTypes.func.isRequired,
  reposUrl: PropTypes.string.isRequired,
};

Profile.defaultProps = {
  company: '',
  location: ''
};

export default Profile;
