import { useMyContext } from '../../../contexts/StateHolder';
import RenderItem from '../RenderItems/RenderItem';
import CategoryTitle from '../CategoryTitles/CategoryTitle';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { getSimiliar } from '../../../scripts/dataHandlers';
import { createToken } from '../../../scripts/utils';

// List of usable category components
const components = {
  CategoryTitle,
};

const CategoryContentSimiliar = (props) => {
  // Destructure props.settings
  const {
    routes,
    slickSettings,
    assetProperty,
    categoryTitleComponent,
    itemImageComponent,
    itemTitleComponent,
  } = props.settings;


  // Bring stateholders from context
  const { chosenItem, key, language, organizationId, user } = useMyContext();

  const { t } = useTranslation();

  const [items, setItems] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        console.log(chosenItem);

        // Create token for items
        const token = createToken(organizationId, chosenItem.groupItemIds, key);

        // Call getSimiliar datahandler to get list of items from categories
        const response = await getSimiliar(
          organizationId,
          chosenItem.groupItemIds,
          token,
          language,
          assetProperty,
          user
        );

        // Set items in holder
        setItems(response);
      } catch (err) {
        console.log(err);
      }
    }

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenItem, language]);

  const renderCategoryContent = () => {
    console.log(items);
    // Map through category of items, showing clickable image of each item
    return items.map((item, i) => {
      return (
        <RenderItem
          key={i}
          item={item}
          routes={routes}
          itemImageComponent={itemImageComponent}
          itemTitleComponent={itemTitleComponent}
        />
      );
    });
  };

  const renderSimiliar = () => {
    // Copy slick settings
    let settings = { ...slickSettings };

    // If there's less than 3 items in category, set slick infinite to false to prevent duplicates (slick bug)
    if (items && items.length < 3) {
      settings.infinite = false;
    }

    // Choose child component for title
    const TitleComponent = components[categoryTitleComponent];

    return (
      <div className='similiarContainer'>
        <TitleComponent title={t('similiarSlider.title')} />

        <div className={'similiarCategoryContent'} >
          <Slider {...slickSettings}>{renderCategoryContent()}</Slider>
        </div>
      </div>
    );
  };

  return items ? renderSimiliar() : null;
};

export default CategoryContentSimiliar;
