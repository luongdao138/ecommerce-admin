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

export const findNodeById = (id, array) => {
  for (let cat of array) {
    if (cat._id === id) {
      return cat;
    } else {
      const result = findNodeById(id, cat.children);
      if (result) return result;
    }
  }
  return null;
};

export const getAllDescendantsOfOneNode = (node) => {
  let result = [];
  result.push({
    value: node._id,
    name: node.name,
    parentId: node.parentId ? node.parentId : '',
    type: node.type ? node.type : '',
    image: node.image,
  });
  for (let cat of node.children) {
    result = [...result, ...getAllDescendantsOfOneNode(cat)];
  }

  return result;
};
