export const createCategoriesList = (categories, options = []) => {
  for (let category of categories) {
    options.push({
      value: category._id,
      name: category.name,
      parentId: category.parentId ? category.parentId : '',
      type: category.type ? category.type : '',
      image: category.image,
    });
    if (category.children.length > 0) {
      createCategoriesList(category.children, options);
    }
  }

  return options;
};
