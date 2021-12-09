import React, { useEffect, useState } from 'react';
import * as classes from '../ItemImage1/ItemImage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { convertDuration } from '../../../../scripts/utils';

export default function ItemTitle1(props) {
  const [text, setText] = useState(null);
  const [lengthOfText, setLengthOfText] = useState(null);
  useEffect(() => {
    if (props.item) {
      let textVal = props.item.isSerie
        ? props.item.serie.title
        : props.item.name || props.item.title;
      setText(textVal);
      setLengthOfText(textVal.length);
    }
  }, [props.item]);
  return (
    text && (
      <div
        className={classes.ViewedSectionSecondary__3videos__text}
        onClick={props.onClick && props.onClick}
      >
        <div
          className={classes.ViewedSectionSecondary__3videos__text_description}
          style={props.style}
        >
          <div
            className={`${classes.ViewedSectionSecondary__3videos__text_description_heading} font-300`}
            style={props.textStyle}
          >
            {lengthOfText > 22
              ? `${text.replace(/^(.{22}[^\s]*).*/, '$1')} ...`
              : text}
          </div>
          <div
            className={`${classes.ViewedSectionSecondary__3videos__text_description_duration} font-100`}
          >
            {props.showCategoryName && (
              <div className={classes.post_cateogory}>Category Name</div>
            )}
            {convertDuration(props.item.duration)}
          </div>

          {props.showStatus && (
            <div
              className={`${classes.ViewedSectionSecondary__3videos__text_description_status} font-000
             `}
            >
              Available
            </div>
          )}
        </div>
        {props.showActions && (
          <div
            className={classes.ViewedSectionSecondary__3videos__text_actions}
          >
            <p>
              {' '}
              <FontAwesomeIcon icon='eye' /> {props.views}k Views
            </p>
            <p>
              <FontAwesomeIcon icon='comment' /> {props.comments}
            </p>
          </div>
        )}
      </div>
    )
  );
}
