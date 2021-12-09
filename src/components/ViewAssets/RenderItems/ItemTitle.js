import { removePunctuation } from '../../../scripts/utils';

// Renders title of props item
const ItemTitle = (props) => {
  return (
    <div
      className='categoryItemTitle'
      title={props.item.isSerie ? props.item.serie.title : props.item.name}
    >
      {props.item.isSerie
        ? removePunctuation(props.item.serie.title.toUpperCase())
        : removePunctuation(props.item.name.toUpperCase())}
    </div>
  );
};

export default ItemTitle;
