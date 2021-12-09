import { useHistory } from 'react-router-dom';
import * as classes from './CategoryTitle2.module.css';
import { useMyContext } from '../../../../contexts/StateHolder';
import { useTranslation } from 'react-i18next';

const CategoryTitle2 = (props) => {
  const history = useHistory();
  const { setChosenCategory, organizationId, setChosenItem } = useMyContext();

  const { t } = useTranslation();

  const clickCategory = async (categoryObj) => {
      console.log(categoryObj);
    if (props?.routes?.viewAllRoute && props?.routes?.viewAllRoute !== "") {
      history.push(`/${props.routes.viewAllRoute}`);
    } else if (props.isSerie) {
      setChosenCategory(categoryObj);
      setChosenItem(null);
      return history.push(
        `/${props.routes.categories}/${organizationId}/${categoryObj.id}/${categoryObj.id}/${props.item.groupItems[0].id}`
      );
    } else {
      setChosenCategory(categoryObj);
      history.push(`/${props.routes.categories}/${categoryObj.id}`);
    }
  };

  return (
    <div className={classes.CategoryItem_main}>
      <div className={`${classes.CategoryItem_main_info} font-500 $`}>
        <div
          className={`${classes.CategoryItem_main_info_title} ${props.extraClassname ? 'font-700' : 'font-500'
            }`}
        >
          {props.showTitle !== false ? props.title : null}
        </div>

        {/* We will only show View All when their is some assets */}
        {props?.item?.length > 0 && (
          <div
            className={`${classes.CategoryItem_main_link} font-200`}
            onClick={() =>
              props.id
                ? clickCategory({ id: props.id, title: props.title })
                : () => false
            }
          >
            {t("categoryTitle.viewAllButton")}
          </div>
        )}

        {/* // for Serie Asset */}
        {props.showSerieViewAll && (
          <div
            className={`${classes.CategoryItem_main_link} font-200`}
            onClick={() =>
              props.id
                ? clickCategory({ id: props.id, title: props.title })
                : () => false
            }
          >
            {t("categoryTitle.viewAllButton")}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryTitle2;
