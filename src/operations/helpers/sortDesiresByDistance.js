const sortDesiresByDistance = (fish, school, cheese) => {
    let desires = school
      .slice(0)
      .filter(val => val !== fish)
      .concat(cheese.slice(0));
  
    desires.forEach((val, index, array) => (array[index] = { x: val.x, y: val.y, source: val }));
  
    desires.sort((nodeA, nodeB) => {
      return (nodeA.x - fish.x) ** 2 + (nodeA.y - fish.y) ** 2 <
        (nodeB.x - fish.x) ** 2 + (nodeB.y - fish.y) ** 2
        ? -1
        : 1;
    });
  
    desires.forEach((val, index, array) => (array[index] = val.source));
  
    return desires;
  };

  export default sortDesiresByDistance;