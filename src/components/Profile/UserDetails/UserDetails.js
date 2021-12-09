import { useState, useEffect } from 'react';
import { useMyContext } from '../../../contexts/StateHolder';
import { countries } from '../../../scripts/countries';
import { useTranslation } from 'react-i18next';
import { useForm } from '../../../Shared/Hooks/form-hook';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_NONE,
} from '../../../Shared/Validation/Validator';
import { Input } from '../../../Shared/Input/Input';
import { updateUser, getUser } from '../../../scripts/dataHandlers';
import { useCookies } from 'react-cookie';
import * as classes from '../../../Shared/Input/Input.module.css';
import ProfileHeader from '../ProfileHeader';

const UserDetails = (props) => {
  // Bring stateholders from context
  const { user, organizationId, key, language, chosenMenuOptionProfile } =
    useMyContext();

  // Holds inform message for form
  const [formMessage, setFormMessage] = useState('');

  const [cookies] = useCookies('');

  // Setup translate function
  const { t } = useTranslation();

  // we need to import UseForm hook and pass the initial inputs and initialFormValidity to userform
  const [state, InputHandler] = useForm(
    {
      FIRSTNAME: {
        value: '',
        isValid: true,
      },
      LASTNAME: {
        value: '',
        isValid: true,
      },
      EMAIL: {
        value: '',
        isValid: true,
      },
      PHONE: {
        value: '',
        isValid: true,
      },
      CITY: {
        value: '',
        isValid: true,
      },
      COUNTRY: {
        value: '',
        isValid: true,
      },
    },
    true
    // the last false defines if the whole form is valid or not ( since we have set all isvalid to false so our total form validity will also be false)
  );

  // Holder for profileData
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    city: '',
    country: '',
    countryId: '',
    address: '',
    postalCode: '',
    regionId: '',
  });

  // Fetch userdata from API and set it to profileData
  useEffect(() => {
    async function getUserData() {
      try {
        const response = await getUser(
          cookies?.userData?.userToken,
          organizationId
        );
        console.log(response);

        const newData = {
          firstName: response.data.firstName,
          lastName:
            !response.data.lastName === 'x' ? response.data.lastName : '',
          phone: !response.data.phone === 'x' ? response.data.phone : '',
          email: response.data.emailAddress,
          city: !response.data.city === 'x' ? response.data.city : '',
          country: !response.data.country === 'x' ? response.data.country : '',
          countryId:
            !response.data.countryId === 'x' ? response.data.countryId : '',
          address: !response.data.address === 'x' ? response.data.address : '',
          postalCode:
            !response.data.postalCode === 'x' ? response.data.postalCode : '',
          regionId:
            !response.data.regionId === 'x' ? response.data.regionId : '',
        };
        setProfileData({ ...newData });
      } catch (err) {
        console.log(err);
      }
    }

    if (user.userId !== 0) {
      getUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      // Update user data
      const response = await updateUser(
        user.userId,
        cookies?.userData?.userToken,
        organizationId,
        key,
        state.inputs.FIRSTNAME.value,
        state.inputs.LASTNAME.value,
        state.inputs.PHONE.value,
        profileData.countryId,
        profileData.regionId,
        state.inputs.CITY.value,
        profileData.postalCode,
        state.inputs.EMAIL.value
      );

      console.log(response);

      response?.data?.status === 'ok'
        ? setFormMessage(t('userDetails.profileUpdated'))
        : setFormMessage(t('userDetails.somethingWrongTryAgain'));
    } catch (err) {
      console.log(err);
      setFormMessage(t('userDetails.somethingWrongTryAgain'));
    }
  };

  // If email (required value) is there and userId is set, render input fields with initial values from profileData
  if (profileData.email !== '' && user.userId !== 0) {
    return (
      <div className={classes.formProfilePrimary}>
        <div className={classes.formSecondary}>
          <form className={classes.formBlog} onSubmit={formSubmitHandler}>
            <ProfileHeader showSubscriptions={props.showSubscriptions} />
            {props.fields.firstName ? (
              <Input
                id='FIRSTNAME'
                label='FIRST NAME'
                placeholder={t('userDetails.inputPlaceholderFirstName')}
                type='text'
                element='input'
                validators={[VALIDATOR_NONE()]}
                errorText={t('userDetails.askForFirstName')}
                onInput={InputHandler}
                iconName='user'
                initialValid={true}
                initialValue={profileData.firstName}
                // style={{ margin: '15px auto' }}
              />
            ) : null}

            {props.fields.lastName ? (
              <Input
                id='LASTNAME'
                label='LAST NAME'
                placeholder={t('userDetails.inputPlaceholderLastName')}
                type='text'
                element='input'
                validators={[VALIDATOR_NONE()]}
                errorText={t('userDetails.askForLastName')}
                onInput={InputHandler}
                iconName='user'
                initialValid={true}
                initialValue={profileData.lastName}
                // style={{ margin: '15px auto' }}
              />
            ) : null}

            {props.fields.email ? (
              <Input
                id='EMAIL'
                label='EMAIL'
                placeholder={t('userDetails.inputPlaceholderEmail')}
                type='text'
                element='input'
                validators={[VALIDATOR_EMAIL()]}
                errorText={t('userDetails.incorrectEmailAddress')}
                onInput={InputHandler}
                iconName='envelope'
                initialValid={true}
                initialValue={profileData.email}
                disabled={true}
                // style={{ margin: '15px auto' }}
              />
            ) : null}

            {props.fields.phone ? (
              <Input
                id='PHONE'
                label='PHONE'
                placeholder={t('userDetails.inputPlaceholderPhone')}
                type='text'
                element='input'
                validators={[VALIDATOR_NONE()]}
                errorText={t('userDetails.askForPhone')}
                onInput={InputHandler}
                iconName='phone'
                initialValid={true}
                initialValue={profileData.phone}
                // style={{ margin: '15px auto' }}
              />
            ) : null}

            {props.fields.address ? (
              <Input
                id='ADDRESS'
                label='ADDRESS'
                placeholder={t('userDetails.inputPlaceholderAddress')}
                type='text'
                element='input'
                validators={[VALIDATOR_NONE()]}
                errorText={t('userDetails.askForAddress')}
                onInput={InputHandler}
                iconName='map-pin'
                initialValid={true}
                initialValue={profileData.address}
                // style={{ margin: '15px auto' }}
              />
            ) : null}

            {props.fields.city ? (
              <Input
                id='CITY'
                label='CITY'
                placeholder={t('userDetails.inputPlaceholderCity')}
                type='text'
                element='input'
                validators={[VALIDATOR_NONE()]}
                errorText={t('userDetails.askForCity')}
                onInput={InputHandler}
                iconName='building'
                initialValid={true}
                initialValue={profileData.city}
                // style={{ margin: '15px auto' }}
              />
            ) : null}

            {props.fields.country ? (
              <Input
                id='COUNTRY'
                label='COUNTRY'
                placeholder={t('userDetails.inputPlaceholderCountry')}
                type='text'
                selectData={countries.map((country) => country.name)}
                element='select'
                validators={[VALIDATOR_NONE()]}
                errorText={t('userDetails.askForCountry')}
                onInput={InputHandler}
                iconName={['fas', 'globe-europe']}
                initialValid={true}
                initialValue={profileData.country}
                // style={{ margin: '15px auto' }}
              />
            ) : null}

            <button
              className={classes.loginFormButton}
              disabled={!state.isValid}
            >
              {t('userDetails.saveChanges')}
            </button>

            <div className={classes.profileMessage}>{formMessage}</div>
          </form>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default UserDetails;

/*

import { useState, useEffect } from "react";
import { useMyContext } from "../../contexts/StateHolder";
import { countries } from "../../scripts/countries";
import { useTranslation } from "react-i18next";
import { useForm } from '../../Shared/Hooks/form-hook';
import {
    VALIDATOR_EMAIL,
    VALIDATOR_NONE,
} from '../../Shared/Validation/Validator';
import { Input } from '../../Shared/Input/Input';
import * as classes from '../../Shared/Input/Input.module.css';
import { updateUser, getUser } from "../../scripts/dataHandlers";

const UserDetails = (props) => {

    // Bring stateholders from context
    const { user, organizationId, key, language } = useMyContext();

    // Holds inform message for form
    const [formMessage, setFormMessage] = useState("");

    // Setup translate function
    const { t } = useTranslation();

    // we need to import UseForm hook and pass the initial inputs and initialFormValidity to userform
    const [state, import ProfileHeader from '../ProfileHeader';
InputHandler, setFormData] = useForm(
        {
            FIRSTNAME: {
                value: '',
                isValid: true,
            },
            LASTNAME: {
                value: '',
                isValid: true,
            },
            EMAIL: {
                value: '',
                isValid: true,
            },
            PHONE: {
                value: '',
                isValid: true,
            },
            CITY: {
                value: '',
                isValid: true,
            },
            COUNTRY: {
                value: '',
                isValid: true,
            },
            COUNTRYID: {
                value: '',
                isValid: true,
            },
            ADDRESS: {
                value: '',
                isValid: true,
            }
        },
        true
        // the last false defines if the whole form is valid or not ( since we have set all isvalid to false so our total form validity will also be false)
    );

    // Fetch userdata from API and set it to profileData
    useEffect(() => {
        async function getUserData() {
            try {
                const response = await getUser(user.userId, organizationId);

                setFormData(
                    {
                        FIRSTNAME: {
                            value: response.data.firstName,
                            isValid: true,
                        },
                        LASTNAME: {
                            value: response.data.lastName,
                            isValid: true,
                        },
                        EMAIL: {
                            value: response.data.emailAddress,
                            isValid: true,
                        },
                        PHONE: {
                            value: response.data.phone,
                            isValid: true,
                        },
                        CITY: {
                            value: response.data.city,
                            isValid: true,
                        },
                        COUNTRY: {
                            value: response.data.country,
                            isValid: true,
                        },
                        COUNTRYID: {
                            value: response.data.countryId,
                            isValid: true,
                        },
                        ADDRESS: {
                            value: response.data.address,
                            isValid: true,
                        }
                    })

            } catch (err) {
                console.log(err);
            }
        }

        if (user.userId !== 0) {
            getUserData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language]);

    const formSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            // Update user data
            const response = await updateUser(user.userId, organizationId, key, state.inputs.FIRSTNAME.value, state.inputs.LASTNAME.value, state.inputs.PHONE.value, state.inputs.COUNTRYID.value, "regionId", state.inputs.CITY.value, "postalCode", state.inputs.EMAIL.value);

            console.log(response);

            response?.data?.status === "ok" ? setFormMessage(t("Profile updated")) : setFormMessage(t("Something went wrong, please try again"));
        } catch (err) {
            console.log(err);
            setFormMessage(t("Something went wrong, please try again"));
        }
    };

        return (
            <div className={classes.formProfilePrimary}>
                <div className={classes.formProfileSecondary}>
                    <form className={classes.formProfile} onSubmit={formSubmitHandler}>
                        <h2 className={classes.formHeader}>{t("User details")}</h2>

                        <Input
                            id='FIRSTNAME'
                            label='FIRST NAME'
                            placeholder={t('First name')}
                            type='text'
                            element='input'
                            validators={[VALIDATOR_NONE()]}
                            errorText={t("Please enter your first name here")}
                            onInput={InputHandler}
                            iconName='user'
                            initialValid={true}
                            initialValue={state.inputs.FIRSTNAME.value}
                        />
                        <Input
                            id='LASTNAME'
                            label='LAST NAME'
                            placeholder={t('Last name')}
                            type='text'
                            element='input'
                            validators={[VALIDATOR_NONE()]}
                            errorText={t("Please enter your last name here")}
                            onInput={InputHandler}
                            iconName='user'
                            initialValid={true}
                            initialValue={state.inputs.LASTNAME.value}
                        />
                        <Input
                            id='EMAIL'
                            label='EMAIL'
                            placeholder={t('Email')}
                            type='text'
                            element='input'
                            validators={[VALIDATOR_EMAIL()]}
                            errorText={t("IncorrectEmailAddress")}
                            onInput={InputHandler}
                            iconName='envelope'
                            initialValid={true}
                            initialValue={state.inputs.EMAIL.value}
                        />

                        <Input
                            id='PHONE'
                            label='PHONE'
                            placeholder={t('Phone')}
                            type='text'
                            element='input'
                            validators={[VALIDATOR_NONE()]}
                            errorText={t("Please enter the phone number")}
                            onInput={InputHandler}
                            iconName='phone'
                            initialValid={true}
                            initialValue={state.inputs.PHONE.value}
                        />

                        <Input
                            id='ADDRESS'
                            label='ADDRESS'
                            placeholder={t('Address')}
                            type='text'
                            element='input'
                            validators={[VALIDATOR_NONE()]}
                            errorText={t("Please enter the address")}
                            onInput={InputHandler}
                            iconName='map-marked'
                            initialValid={true}
                            initialValue={state.inputs.ADDRESS.value}
                        />

                        <Input
                            id='CITY'
                            label='CITY'
                            placeholder={t('City')}
                            type='text'
                            element='input'
                            validators={[VALIDATOR_NONE()]}
                            errorText={t("Please enter the city")}
                            onInput={InputHandler}
                            iconName='city'
                            initialValid={true}
                            initialValue={state.inputs.CITY.value}
                        />

                        <Input
                            id='COUNTRY'
                            label='COUNTRY'
                            placeholder={t('Country')}
                            type='text'
                            selectData={countries}
                            element='select'
                            validators={[VALIDATOR_NONE()]}
                            errorText={t("Please select the country")}
                            onInput={InputHandler}
                            iconName='globe'
                            initialValid={true}
                            initialValue={state.inputs.COUNTRY.value}
                        />

                        <button
                            className="profileFormBTN"
                            disabled={!state.isValid}
                        >
                            {t("Save")}
                        </button>

                        <div className="profileMessage">{formMessage}</div>

                    </form>
                </div>
            </div>
        )
}

export default UserDetails;



*/
