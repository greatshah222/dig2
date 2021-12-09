import { useMyContext } from '../../../contexts/StateHolder';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import { changePassword } from '../../../scripts/dataHandlers';
import { useForm } from '../../../Shared/Hooks/form-hook';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_PASSWORDMATCH,
  VALIDATOR_NONE,
} from '../../../Shared/Validation/Validator';
import { Input } from '../../../Shared/Input/Input';
import * as classes from '../../../Shared/Input/Input.module.css';
import ProfileHeader from '../ProfileHeader';

const ChangePassword = (props) => {
  // Bring stateholders from context
  const { organizationId, key, chosenMenuOptionProfile } = useMyContext();

  // Holds inform message for form
  const [formMessage, setFormMessage] = useState('');

  const [cookies] = useCookies('');

  // Setup translate function
  const { t } = useTranslation();

  // we need to import UseForm hook and pass the initial inputs and initialFormValidity to userform
  const [state, InputHandler] = useForm(
    {
      PASSWORD: {
        value: '',
        isValid: false,
      },
      PASSWORDCONFIRM: {
        value: '',
        isValid: false,
      },
      OLDPASSWORD: {
        value: '',
        isValid: false,
      },
    },
    false
    // the last false defines if the whole form is valid or not ( since we have set all isvalid to false so our total form validity will also be false)
  );

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    // Do the signUp/login process
    const response = await changePassword(
      organizationId,
      key,
      cookies?.userData?.userId,
      state.inputs.PASSWORD.value,
      state.inputs.PASSWORDCONFIRM.value,
      state.inputs.OLDPASSWORD.value,
      cookies?.userData?.userToken
    );

    console.log(response);

    response?.data?.status === 'ok'
      ? setFormMessage(t('changePassword.changedSuccessfully'))
      : setFormMessage(t('changePassword.somethingWrongTryAgain'));
  };

  return (
    <div className={classes.formProfilePrimary}>
      <div className={classes.formSecondary}>
        <form
          className={classes.formBlog}
          onSubmit={(e) => formSubmitHandler(e)}
        >
          <ProfileHeader showSubscriptions={props.showSubscriptions} />

          <Input
            id='OLDPASSWORD'
            label='OLDPASSWORD'
            placeholder={t('changePassword.askForOldPassword')}
            type='Password'
            element='input'
            validators={[VALIDATOR_NONE()]}
            errorText={t('changePassword.errorPasswordNotLongEnough', {
              count: '5',
            })}
            onInput={InputHandler}
            iconName='lock'
          />
          <Input
            id='PASSWORD'
            label='PASSWORD'
            placeholder={t('changePassword.askForNewPassword')}
            type='Password'
            element='input'
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText={t('changePassword.errorPasswordNotLongEnough', {
              count: '5',
            })}
            onInput={InputHandler}
            iconName='lock'
          />
          <Input
            id='PASSWORDCONFIRM'
            label='PASSWORD CONFIRM'
            placeholder={t('changePassword.askForConfirmPassword')}
            type='Password'
            element='input'
            validators={[
              VALIDATOR_PASSWORDMATCH(
                state.inputs.PASSWORD.value,
                state.inputs.PASSWORDCONFIRM.value
              ),
            ]}
            errorText={t("changePassword.errorPasswordsDontMatch")}
            onInput={InputHandler}
            iconName='lock'
          />

          <button className={classes.loginFormButton} disabled={!state.isValid}>
            {t('changePassword.save')}
          </button>

          <div className={classes.profileMessage}>{formMessage}</div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
