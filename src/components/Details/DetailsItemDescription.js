import { useMyContext } from '../../contexts/StateHolder';
import * as classes from './RenderItemDescription.module.css';
import clip from 'text-clipper';

const RenderItemDescription = (props) => {
  const { chosenItem } = useMyContext();

  const renderItemDescription = (desc) => {
    let modifiedDesc =
      desc?.length > 150 && !props.isClicked && !props.showAll
        ? `${clip(desc, 140, { html: true, maxLines: 4 })}`
        : desc;

    return (
      <div
        className={`${classes.itemDescription} font-400 ${props.extraClassName}`}
        dangerouslySetInnerHTML={{ __html: modifiedDesc }}
      />
    );
  };

  return renderItemDescription(
    props.desc ? props.desc : chosenItem.description
  );
};

export default RenderItemDescription;
