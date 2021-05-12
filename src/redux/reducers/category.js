import initState from '../initState';

import * as types from '../types/category';

const createNewList = (list, newCategory) => {
  if (!newCategory.parentId) {
    list.push({ ...newCategory, children: [] });
    return list;
  }

  for (let category of list) {
    if (category._id === newCategory.parentId) {
      category.children.push({ ...newCategory, children: [] });
    } else {
      createNewList(category.children, newCategory);
    }
  }

  return list;
};

const categoryReducer = (state = initState.category, action) => {
  switch (action.type) {
    case types.SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case types.REMOVE_LOADING:
      return {
        ...state,
        loading: false,
      };
    case types.GET_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        errorMessage: null,
        list: action.payload,
      };
    case types.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        errorMessage: null,
        list: createNewList([...state.list], action.payload),
      };
    case types.ADD_CATEGORY_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;
