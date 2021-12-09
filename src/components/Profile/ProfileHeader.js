import React from 'react';
import { useState } from 'react';
import * as classes from './ProfileHeader.module.css';
import { useTranslation } from 'react-i18next';
import { useMyContext } from '../../contexts/StateHolder';

export default function ProfileHeader(props) {
  const { t } = useTranslation();

  const { chosenMenuOptionProfile, setChosenMenuOptionProfile } =
    useMyContext();
  const profileMenuOptions = ['userDetails', 'changePassword'];
  
  if(props.showSubscriptions === true) {
    profileMenuOptions.push('subscriptions')
  }

  return (
    <>
      <div className={`${classes.ProfileHeader} font-600`}>
        {profileMenuOptions.map((el, i) => (
            <h2
              key={el + i}
              className={
                chosenMenuOptionProfile === el
                  ? 'activeProfileHeader font-600'
                  : 'inactiveProfileHeader font-600'
              }
              onClick={() => setChosenMenuOptionProfile(el)}
            >
              {t(`profileMenu.${el}`)}{' '}
              {profileMenuOptions.length - 1 !== i && '/'}
            </h2>
        ))}
      </div>
    </>
  );
}
