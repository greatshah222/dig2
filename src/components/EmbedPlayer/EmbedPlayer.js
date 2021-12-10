import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMyContext } from '../../contexts/StateHolder';
import { getAsset } from '../../scripts/dataHandlers';
import { createAssetIdToken } from '../../scripts/utils';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import AssetVideoPlayer from '../VideoPlayer/AssetVideoPlayer';

export default function EmbedPlayer({ routes }) {
  const { asset, orgId } = useParams();
  console.log(asset, orgId);

  const { chosenItem, setChosenItem, language, key, user } = useMyContext();

  useEffect(() => {
    let fetchAsset;
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    fetchAsset = async () => {
      const token = createAssetIdToken(orgId, asset, language, key);
      const res = await getAsset(
        orgId,
        asset,
        token,
        language,
        '',
        user,
        source
      );
      console.log(res);
      setChosenItem(res);
    };

    if (asset) {
      fetchAsset();
    }
    return () => source.cancel();
  }, [asset, key, language, orgId, user, setChosenItem]);

  return chosenItem ? (
    chosenItem.series?.length > 0 ? (
      <>
        <AssetVideoPlayer
          backRoute={'hidden'}
          playerAutoStart={true}
          backButton={false}
          isSerie={true}
          embedPlayer={true}
          routes={routes}
        />
      </>
    ) : (
      <AssetVideoPlayer
        backRoute={'/'}
        playerAutoStart={true}
        embedPlayer={true}
        routes={routes}
      />
    )
  ) : (
    <div className='display-flex-center'>
      <Loader type='TailSpin' color='#dfdfdf' height={50} width={50} />
    </div>
  );
}
