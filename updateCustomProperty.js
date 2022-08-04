export function getCustomeProperty(elem, prop){
  // console.log(elem);
  // console.log(prop);
  // console.log('gets');
  // console.log(getComputedStyle(elem));
  // console.log(getComputedStyle(elem).getPropertyValue(prop));

  return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0;
}

export function setCustomProperty(elem, prop, value){
  elem.style.setProperty(prop, value)

}

export function incrementCustomProperty(elem,prop, inc){
  setCustomProperty(elem, prop, getCustomeProperty(elem, prop) + inc)

}
