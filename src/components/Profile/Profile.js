import { useMyContext } from '../../contexts/StateHolder';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ChangePassword from './ChangePassword/ChangePassword';
import UserDetails from './UserDetails/UserDetails';
import CurrentSubscription from './Subscriptions/CurrentSubscription';
import * as classes from './Profile.module.css';

const Profile = (props) => {
  const { fields, showSubscriptions } = props.settings;

  // Bring stateholders from context
  const { user, chosenMenuOptionProfile } = useMyContext();

  // Setup translate function
  const { t } = useTranslation();

  console.log(chosenMenuOptionProfile);
  // Render view, depending on selected menu option
  const renderOptions = () => {
    if (chosenMenuOptionProfile === 'userDetails') {
      return (
        <UserDetails fields={fields} showSubscriptions={showSubscriptions} />
      );
    } else if (chosenMenuOptionProfile === 'subscriptions') {
      return <CurrentSubscription showSubscriptions={showSubscriptions} />;
    } else if (chosenMenuOptionProfile === 'changePassword') {
      return <ChangePassword showSubscriptions={showSubscriptions} />;
    }
  };

  if (user.loggedIn) {
    return (
      <div className={classes.profileContainer}>
        {/* <div className={classes.profileMenu}>
          <div
            className={
              chosenMenuOption === 'userDetails'
                ? classes.profileMenuOptionSelected
                : classes.profileMenuOption
            }
            onClick={() => setChosenMenuOption('userDetails')}
          >
            {t('User details')}
          </div>
          {showSubscriptions ? (
            <div
              className={
                chosenMenuOption === 'subscriptions'
                  ? classes.profileMenuOptionSelected
                  : classes.profileMenuOption
              }
              onClick={() => setChosenMenuOption('subscriptions')}
            >
              {t('Subscriptions')}
            </div>
          ) : null}

          <div
            className={
              chosenMenuOption === 'changePassword'
                ? classes.profileMenuOptionSelected
                : classes.profileMenuOption
            }
            onClick={() => setChosenMenuOption('changePassword')}
          >
            {t('Change password')}
          </div>
        </div> */}
        <div className={classes.profileOptionView}>
          <div>{renderOptions()}</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={classes.profileContainer}>
        <div className={classes.profileMessage}>
          {t('profileMenu.loginFirst')}
        </div>
      </div>
    );
  }
};

export default Profile;
