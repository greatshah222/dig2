import { useMyContext } from '../../contexts/StateHolder';
import DetailsFolderNames from './DetailsFolderNames';
import DetailsContentRatings from './DetailsContentRatings';
import DetailsInfoData from './DetailsInfoData';
import DetailsItemDescription from './DetailsItemDescription';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  createAssetIdToken,
  createToken,
  removePunctuation,
} from '../../scripts/utils';
import {
  getAsset,
  getAssets,
  getSubCategories,
} from '../../scripts/dataHandlers';
import DetailsAssetBanner from './DetailsAssetBanner';
import DetailsShare from './DetailsShare';
import * as classes from './DetailsVideo.module.css';
import Loader from 'react-loader-spinner';
import axios from 'axios';

const DetailsVideo = (props) => {
  // Bring stateholders from context
  const {
    chosenItem,
    setChosenItem,
    language,
    key,
    organizationId,
    user,
    loading,
    setLoading,
  } = useMyContext();

  const { asset } = useParams();

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    async function fetchAsset() {
      setChosenItem(null);
      console.log(1);
      setLoading(true);
      try {
        // Call createToken function to create new token from given data
        let token = createAssetIdToken(organizationId, asset, language, key);

        const assetResponse = await getAsset(
          organizationId,
          asset,
          token,
          language,
          undefined, // TODO: MOVE TO COMPONENT CONFIG
          user,
          source
        );
        console.log(`assetResponse`, assetResponse);

        setChosenItem(assetResponse);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }

    const fetchSerieCategoryAsset = async () => {
      setChosenItem(null);

      console.log(2);
      setLoading(true);

      try {
        let token3 = createToken(organizationId, asset, key);

        const response3 = await getSubCategories(
          organizationId,
          token3,
          asset,
          language,
          user,
          source
        );
        console.log(`response3`, response3);

        setChosenItem(response3[0]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    if (language) {
      props.isSerieCategory ? fetchSerieCategoryAsset() : fetchAsset();
    }

    return () => source.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asset, key, language, organizationId, props.isSerieCategory, user]);

  const renderDetails = () => {
    return (
      <div className='detailsContainer'>
        {!props.hideBanner && chosenItem?.bannerImageSmall ? (
          <DetailsAssetBanner routes={props.routes} hideCta={props.hideCta} />
        ) : null}

        <div className={classes.details_description_container}>
          <div className={classes.detailsDescriptionTitleContainer}>
            <div className={classes.details_description_title_left}>
              <div
                className={`${classes.details_description_title_name} font-800`}
              >
                {`${removePunctuation(
                  chosenItem?.name
                    ? chosenItem.name.toUpperCase()
                    : chosenItem.title.toUpperCase()
                )}`}
              </div>
              {/* {chosenItem.folders ? (
                <DetailsFolderNames routes={props.routes} />
              ) : null} */}
            </div>
            <div className={classes.details_description_title_right}>
              {chosenItem.contentRatings ? <DetailsContentRatings /> : null}
            </div>
          </div>
          <div className='details-description-info-container'>
            <div className='detailsDescriptionContainer'>
              <DetailsItemDescription
                extraClassName='font-200'
                showAll={true}
                desc={
                  chosenItem.ingress ||
                  chosenItem?.description ||
                  chosenItem?.serie?.description
                }
              />
            </div>

            {!props.hideInfoData ? (
              <div className='detailsInfoContainer'>
                <DetailsInfoData item={chosenItem} />
              </div>
            ) : null}
          </div>

          <DetailsShare
            chosenItem={chosenItem}
            isSerieCategory={props.isSerieCategory}
          />
        </div>
      </div>
    );
  };

  // TODO: If /detailsVideo, take parameters and render loading while fetching data or something like that
  return chosenItem
    ? renderDetails()
    : !chosenItem && loading && (
        <div className='display-flex-center'>
          <Loader type='TailSpin' color='#dfdfdf' height={50} width={50} />
        </div>
      );
};

export default DetailsVideo;
