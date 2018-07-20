const dangerNodesNames = [
  'shoes_season',
  'women_clothes_size',
  'men_clothes_size',
  'condition_required',
  'condition',
  'men_shoes_size',
  'women_shoes_size',
  'baby_clothes_season'
];

const dangerNodesHighlighting = () =>
  dangerNodesNames.forEach(name => {
    const nodeArr = document.getElementsByName(name);
    nodeArr.forEach(node => {
      if (node.value === '') {
        node.style.border = '1px solid red';
      }
    });
  });

export default dangerNodesHighlighting;
