import { useMyContext } from '../../contexts/StateHolder';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';

// Renders contentRatings of chosen item
const Login = (props) => {
  // Bring stateholders from context
  const { user, setUser, closeHamMenu, isResponsiveclose } = useMyContext();

  const { t } = useTranslation();

  const [cookies, removeCookie] = useCookies('');

  const logOut = () => {
    closeHamMenu();

    let usr = { ...user };

    usr = {};

    setUser(usr);

    if (cookies?.userData) {
      removeCookie('userData');
    }
  };

  return (
    <div className='loginContainer'>
      {user.loggedIn ? (
        <>
          <NavLink
            className='loginBTN'
            onClick={closeHamMenu}
            to={`/${props.routes.profile}`}
          >
            {user.loggedIn
              ? t('login.profileButton')
              : t('login.profileButton')}
          </NavLink>
          {!props.hideLogoutSmallScreen && (
            <div className='navBarSiteLogoMobile-lgScreen'>
              <div className='' style={{ marginRight: '5px' }}>
                {'| '}
              </div>

              <NavLink
                className='loginBTN'
                onClick={() => {
                  logOut();
                }}
                to={`/${props.routes.login}`}
                style={{ color: user.loggedIn && `#D2DCDF` }}
              >
                {user.loggedIn
                  ? t('login.logOutButton')
                  : t('login.loginButton')}
              </NavLink>
            </div>
          )}
        </>
      ) : (
        <NavLink
          className='loginBTN'
          onClick={closeHamMenu}
          to={`/${props.routes.login}`}
        >
          {user.loggedIn ? t('login.logOutButton') : t('login.loginButton')}
        </NavLink>
      )}
    </div>
  );
};

export default Login;
