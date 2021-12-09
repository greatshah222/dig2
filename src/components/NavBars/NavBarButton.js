import { NavLink } from 'react-router-dom';
import * as classes from './NavBarButton.module.css';
import { useMyContext } from '../../contexts/StateHolder';
import { FaSearch } from 'react-icons/fa';

const NavBarButton = (props) => {
  const { closeHamMenu } = useMyContext();

  return (
    <li className='menu-item'>
      {' '}
      <NavLink
        key={props.name}
        style={props?.styles?.navBarBTN}
        to={`/${props.route}`}
        exact
        activeClassName={classes.activeSelected}
        onClick={closeHamMenu}
        className={classes.navBarSearch}
      >
        {props.icon === 'FaSearch' ? (
          <FaSearch className={classes.FaIcon} />
        ) : null}
        <div>{props.name}</div>
      </NavLink>
    </li>
  );
};

export default NavBarButton;
