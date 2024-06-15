import ButtonLink from '../../../ui/ButtonLink';
import cl from './recipeExtra.module.scss';
import PropTypes from 'prop-types';
import ButtonIcon from '../../../ui/ButtonIcon';
import authApi from '../../../../redux/auth/AuthApi';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const DEFAULT_AVATAR = '/images/user/avatar-3814049_640.webp';
const RecipeExtra = ({
  owner: { _id, name, avatar },
  recipeId,
  isFavorite = false,
}) => {
  const [favorite, setFavorite] = useState(isFavorite);
  const [addRecipeToFavoritesList] =
    authApi.useAddRecipeToFavoritesListMutation();
  const [removeRecipeFromFavoritesList] =
    authApi.useRemoveRecipeFromFavoritesListMutation();
  const user = useSelector(state => state.authSlice.user);

  const handleFavorite = ({ target }) => {
    target.blur();
    if (!user?._id) {
      toast.error('Please login to add recipes to your favorites');
      return;
    }
    if (!favorite) {
      setFavorite(true);
      addRecipeToFavoritesList(recipeId);
    } else {
      setFavorite(false);
      removeRecipeFromFavoritesList(recipeId);
    }
  };
  return (
    <div className={cl.recipeExtra}>
      <div className={cl.recipeOwner}>
        <ButtonLink to={`/user/${_id}`} addClass={cl.recipeOwner}>
          <img
            className={`${cl.recipeOwnerImg} ${cl.skeleton}`}
            src={avatar ? avatar : DEFAULT_AVATAR}
            alt={name}
          />
        </ButtonLink>
        <h4 className={cl.recipeOwnerName}>{name}</h4>
      </div>
      <div className={cl.recipeButtons} data-id={recipeId}>
        <ButtonIcon
          icon="heart"
          isActive={favorite}
          onClick={handleFavorite}
        ></ButtonIcon>
        <ButtonLink
          to={`/recipe/${recipeId}`}
          icon="arrow_up_right"
          addClass={cl.recipeLink}
        ></ButtonLink>
      </div>
    </div>
  );
};

RecipeExtra.propTypes = {
  owner: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    name: PropTypes.string.isRequired,
  }).isRequired,
  recipeId: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool,
  url: PropTypes.string,
};

export default RecipeExtra;
