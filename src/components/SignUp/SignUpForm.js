import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import { useMyContextFunctions } from '../../contexts/ContextFunctions';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from '../../Shared/Hooks/form-hook';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_PASSWORDMATCH,
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from '../../Shared/Validation/Validator';
import { Input } from '../../Shared/Input/Input';
import * as classes from '../../Shared/Input/Input.module.css';
import { countries } from '../../scripts/countries';
import { ToastContainer, toast } from 'react-toastify';

// Renders contentRatings of chosen item
const SignUpForm = (props) => {
  const { fields, redirectRoute } = props.settings;

  const [cookies] = useCookies('');

  const [infoMessage, setInfoMessage] = useState('');

  // Bring functions from context
  const { authProcess, registerProcess } = useMyContextFunctions();

  const { t } = useTranslation();

  const history = useHistory();

  // we need to import UseForm hook and pass the initial inputs and initialFormValidity to userform
  const [state, InputHandler] = useForm(
    {
      EMAIL: {
        value: '',
        isValid: false,
      },
      PASSWORD: {
        value: '',
        isValid: false,
      },
      PASSWORDCONFIRM: {
        value: '',
        isValid: false,
      },
      FIRSTNAME: {
        value: '',
        isValid: fields.firstName ? false : true,
      },
      LASTNAME: {
        value: '',
        isValid: fields.lastName ? false : true,
      },
      PHONE: {
        value: '',
        isValid: fields.phone ? false : true,
      },
      CITY: {
        value: '',
        isValid: fields.city ? false : true,
      },
      ADDRESS: {
        value: '',
        isValid: fields.address ? false : true,
      },
      COUNTRY: {
        value: '',
        isValid: fields.country ? false : true,
      },
      DATEOFBIRTH: {
        value: '',
        isValid: fields.dataOfBirth ? false : true,
      },
    },
    false
    // the last false defines if the whole form is valid or not ( since we have set all isvalid to false so our total form validity will also be false)
  );

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(state.inputs.EMAIL.value, state.inputs.PASSWORD.value);

    try {
      //**** REGISTERATION *****/ // TODO: Can registeration do authentication at the same time and return the token?

      // Do the signUp/login process
      const response = await registerProcess(
        state.inputs.EMAIL.value,
        state.inputs.PASSWORD.value
      );

      if (response.data.status === 'error') {
        console.log(response.data);
        setInfoMessage(response.message);
        return toast.error(response.data.message, {
          autoClose: 10000,
          position: 'top-center',
          closeOnClick: true,
          draggable: true,

          theme: 'dark',
        });
      } else if (response.data.status === 'ok') {
        //****AUTHENTICATION *****/

        // If everything was fine on registering, continue to authentication
        const authResponse = await authProcess(
          state.inputs.EMAIL.value,
          state.inputs.PASSWORD.value
        );

        if (authResponse.data.status === 'ok') {
          // Change user to redirect route (if given to component configs) or to home route
          history.push(redirectRoute || props.routes.home);
        } else {
          setInfoMessage(authResponse.data.message);
          console.log(infoMessage);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={classes.signUpFormContainer}
      // style={props.styles.signUpFormContainer}
    >
      <div className={classes.formPrimary}>
        <div className={classes.formSecondary}>
          <form className={classes.formBlog} onSubmit={formSubmitHandler}>
            <ToastContainer />

            <h2 className={`${classes.formHeader} font-600`}>
              {t('signUpForm.title')}
            </h2>

            {/* <div className='signUpStepText'>{t('signUpText')}</div> */}

            <Input
              id='EMAIL'
              label='EMAIL'
              placeholder={t('signUpForm.inputPlaceholderEmail')}
              type='text'
              element='input'
              validators={[VALIDATOR_EMAIL()]}
              errorText={t('signUpForm.incorrectEmailAddress')}
              onInput={InputHandler}
              iconName='envelope'
              initialValue={cookies?.userData?.eMail || ''}
              initialValid={cookies?.userData?.eMail ? true : false}
            />

            {fields.firstName ? (
              <Input
                id='FIRSTNAME'
                label='FIRST NAME'
                placeholder={t('signUpForm.firstName')}
                type='text'
                element='input'
                validators={[VALIDATOR_REQUIRE()]}
                errorText={t('signUpForm.askForFirstName')}
                onInput={InputHandler}
                iconName='user'
              />
            ) : null}

            {fields.lastName ? (
              <Input
                id='LASTNAME'
                label='LAST NAME'
                placeholder={t('signUpForm.lastName')}
                type='text'
                element='input'
                validators={[VALIDATOR_REQUIRE()]}
                errorText={t('signUpForm.askForLastName')}
                onInput={InputHandler}
                iconName='user'
              />
            ) : null}

            {fields.phone ? (
              <Input
                id='PHONE'
                label='PHONE'
                placeholder={t('signUpForm.phone')}
                type='text'
                element='input'
                validators={[VALIDATOR_REQUIRE()]}
                errorText={t('signUpForm.askForPhone')}
                onInput={InputHandler}
                iconName='phone'
              />
            ) : null}

            {fields.address ? (
              <Input
                id='ADDRESS'
                label='ADDRESS'
                placeholder={t('signUpForm.address')}
                type='text'
                element='input'
                validators={[VALIDATOR_REQUIRE()]}
                errorText={t('signUpForm.askForAddress')}
                onInput={InputHandler}
                iconName='map-marked'
              />
            ) : null}

            {fields.city ? (
              <Input
                id='CITY'
                label='CITY'
                placeholder={t('signUpForm.city')}
                type='text'
                element='input'
                validators={[VALIDATOR_REQUIRE()]}
                errorText={t('signUpForm.askForCity')}
                onInput={InputHandler}
                iconName='city'
              />
            ) : null}

            {fields.country ? (
              <Input
                id='COUNTRY'
                label='COUNTRY'
                placeholder={t('signUpForm.country')}
                type='text'
                selectData={countries.map((country) => country.name)}
                element='select'
                validators={[VALIDATOR_REQUIRE()]}
                errorText={t('signUpForm.askForCountry')}
                onInput={InputHandler}
                iconName='globe'
              />
            ) : null}

            {fields.dateOfBirth ? (
              <Input
                id='DATEOFBIRTH'
                label='DATEOFBIRTH'
                placeholder={t('signUpForm.dateOfBirth')}
                type='text'
                element='input'
                validators={[VALIDATOR_REQUIRE()]}
                errorText={t('signUpForm.askForDateOfBirth')}
                onInput={InputHandler}
                iconName='birthday-cake'
              />
            ) : null}

            <Input
              id='PASSWORD'
              label='PASSWORD'
              placeholder={t('signUpForm.askForPassword')}
              type='Password'
              element='input'
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText={t('signUpForm.errorPasswordNotLongEnough', {
                count: '5',
              })}
              onInput={InputHandler}
              iconName='lock'
            />

            <Input
              id='PASSWORDCONFIRM'
              label='PASSWORD CONFIRM'
              placeholder={t('signUpForm.askForConfirmPassword')}
              type='Password'
              element='input'
              validators={[
                VALIDATOR_PASSWORDMATCH(
                  state.inputs.PASSWORD.value,
                  state.inputs.PASSWORDCONFIRM.value
                ),
              ]}
              errorText={t('signUpForm.errorPasswordsDontMatch')}
              onInput={InputHandler}
              iconName='lock'
            />

            <div className={`${classes.signUpConditionsRow} font-100`}>
              <Link to={`${props.routes.tos}`}>
                {t('signUpForm.agreeOnTerms')}
              </Link>
            </div>

            <button
              className={classes.loginFormButton}
              disabled={!state.isValid}
            >
              {t('signUpForm.submitButton')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
