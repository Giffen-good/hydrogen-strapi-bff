export const getAttributes = (root) => {
  if (hasIn(root, 'data') && hasIn(root.data, 'attributes'))
    return root.data.attributes;
  return;
};
export const hasIn = (object, key) => {
  return object != null && key in Object(object);
};
