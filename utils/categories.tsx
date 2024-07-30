export type CATEGORY = 'Electrical' | 'Mechanical' | 'Hand Tool';
export default (category: CATEGORY) => {
  if (category.toLowerCase() == 'electrical') {
    return require('~/assets/images/categories/electrical.png');
  }

  if (category.toLowerCase() == 'hand') {
    return require('~/assets/images/categories/hand.png');
  }
  if (category.toLowerCase() == 'mechanical') {
    return require('~/assets/images/categories/mechanical.png');
  }

  return require('~/assets/images/tool.png');
};
