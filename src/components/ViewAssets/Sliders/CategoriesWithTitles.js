import { useMyContext } from '../../../contexts/StateHolder';
import RenderItem from '../RenderItems/RenderItem';
import CategoryTitle from '../CategoryTitles/CategoryTitle';
import CategoryTitle2 from '../CategoryTitles/CategoryTitle2/CategoryTitle2';
import { useEffect, useState } from 'react';
import {
  getAssets,
  getSubCategories,
  getRootSubCategories,
} from '../../../scripts/dataHandlers';
import { createToken, createGroupItemId } from '../../../scripts/utils';
import Carousel from 'react-multi-carousel';
import axios from 'axios';

// List of usable category components
const components = {
  CategoryTitle,
  CategoryTitle2,
};
/*
Fetch: getAssets with props.groupItemId
Renders: props categories with title and content in slick slider

*/
export default function RenderCategoriesWithTitles(props) {
  // Destructure props.settings
  const {
    id,
    mode,
    groupItemId,
    routes,
    slickSettings,
    assetProperty,
    categoryTitleComponent,
    itemImageComponent,
    itemTitleComponent,
    maintainImageAspectRatio,
  } = props.settings;

  const [groupItemIdString, setGroupItemIdString] = useState('');

  const [stateCategories, setStateCategories] = useState([]);

  const [allCategoryItems, setAllCategoryItems] = useState([]);

  // Bring stateholders from context
  const { allCategories, organizationId, key, language, user } = useMyContext(); // + allCategoryItems, setAllCategoryItems when using context

  // UseEffect that will check mode and context data by id, if component has already fetched items once
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const getDataFromAPI = async () => {
      try {
        /*
                mode 1: show listed categories in config or from request
                mode 2: read orgId from request or from config file, and list all top level categories of that organisation
                mode 3: read root categoryId from request or config file
                */

        let idString = '';

        if (mode === 'mode_1') {
          // idString is groupItemId imported in props (config settings)
          idString = groupItemId;

          const token = createToken(organizationId, groupItemId, key);

          const catList = await getSubCategories(
            organizationId,
            token,
            groupItemId,
            language,
            user,
            source
          );

          // Set fetched categorylist in stateCategories
          setStateCategories(catList);
        } else if (mode === 'mode_2') {
          if (allCategories.length > 0) {
            // Create idString from all categories (category[0].id,category[1].id...)
            idString = createGroupItemId(allCategories);

            setStateCategories(allCategories);
          }
        } else if (mode === 'mode_3') {
          // Get root category id from config and fetch list of subcategories
          const subCatList = await getRootSubCategories(
            organizationId,
            key,
            language,
            groupItemId,
            user,
            source
          );

          // Create groupItemId from list of subcategories
          idString = createGroupItemId(subCatList);

          // Set subcategory list in stateCategories
          setStateCategories(subCatList);
        }

        // Set idString in stateholder
        setGroupItemIdString(idString);

        // Call createToken function to create new token from given data
        const token = createToken(organizationId, idString, key);

        // Call getAssets datahandler to get list of all items from all categories
        const itemList = await getAssets(
          organizationId,
          idString,
          token,
          language,
          assetProperty,
          user,
          source
        );

        // Set allItems as newAllItems
        let newAllCategoryItems = { ...allCategoryItems };

        // Add fetched itemList to newAllItems key value (component id = key)
        newAllCategoryItems[id] = itemList;

        console.log(newAllCategoryItems);
        // Set newItems to allItems context stateholder
        setAllCategoryItems(newAllCategoryItems);
      } catch (err) {
        console.log(err);
      }
    };

    if (organizationId && groupItemId && key && language && slickSettings) {
      //  && !allCategoryItems[id]
      // If there's no held data in context by component id, get data from api
      getDataFromAPI();
    } /* else if (allCategoryItems[id]?.length > 0) {
            // If there's data available by id in context, get data from context
            getDataFromContext();
        }*/

    return () => source.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);
  let className1 = '';

  const renderCategories = () => {
    // Filter all categories with props.categories
    let categories = stateCategories.filter((category) =>
      groupItemIdString.includes(String(category.id))
    );

    return categories.map((item) => {
      // Filter all items with categoryId, leaving only item from requested category
      const categoryItems = allCategoryItems[id].filter((catItem) =>
        catItem.groupItemIds.includes(String(item.id))
      );

      // Choose child component for Title
      // react-multiple-carousel__arrow react-multiple-carousel__arrow--right
      const TitleComponent = components[categoryTitleComponent];
      return (
        <div
          className={`${className1} categoriesContainer`}
          key={`${id} ${item.id}`}
        >
          <TitleComponent
            id={item.id}
            title={item.title}
            routes={routes}
            item={categoryItems}
          />

          <Carousel {...slickSettings}>
            {categoryItems.map((item, i) => (
              <RenderItem
                key={`${id} ${i}`}
                item={item}
                routes={routes}
                itemImageComponent={itemImageComponent}
                itemTitleComponent={itemTitleComponent}
                showCategoryName={true}
                showPlayIcon={true}
                // whether to maintain aspect ratio 16/9
                maintainImageAspectRatio={maintainImageAspectRatio}
                showReleaseYear={true}
                showDuration={true}
                showStatus={true}
              />
            ))}
          </Carousel>
        </div>
      );
    });
  };
  return allCategoryItems[id]?.length > 0 &&
    stateCategories &&
    groupItemIdString
    ? renderCategories()
    : null;
}
