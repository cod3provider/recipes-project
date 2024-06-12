import RecipeExtra from './RecipeExtra';
import cl from './recipeCard.module.scss';
import PropTypes from 'prop-types';

const RecipeCard = ({ recipe }, isFavorite = false) => {
  const { thumb, title, instructions, owner } = recipe;
  return (
    <>
      <li className={cl.recipeItem}>
        <img
          src={thumb}
          alt={title}
          className={`${cl.recipeImg} ${cl.skeleton}`}
        ></img>
        <h3 className={cl.recipeTitle}>{title} </h3>
        <p className={cl.recipeText}>{instructions}</p>
        <RecipeExtra owner={owner} isFavorite={isFavorite} />
      </li>
    </>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    thumb: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    instructions: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    }),
  }).isRequired,
  isFavorite: PropTypes.bool,
};

export default RecipeCard;
