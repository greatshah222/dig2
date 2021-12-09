//import { useMyContext } from "../../contexts/StateHolder";
//import { useState } from "react";
import { useTranslation } from "react-i18next";
//import { changePassword, updateUser } from "../../scripts/dataHandlers";
import ProfileHeader from "../ProfileHeader";
import * as classes from '../../../Shared/Input/Input.module.css';

const CurrentSubscription = (props) => {

    // Bring stateholders from context
    //const { user, setUser, organizationId, key } = useMyContext();

    // Setup translate function
    const { t } = useTranslation();

    return (
        <>
            <div className={classes.formProfilePrimary}>
                <div className={classes.formSecondary}>
                    <form className={classes.formBlog}>
                        <ProfileHeader showSubscriptions={props.showSubscriptions} />
                        <div>{`${t("subscriptions.title")}:`}</div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CurrentSubscription;
