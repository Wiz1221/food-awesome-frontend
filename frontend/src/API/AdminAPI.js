export const setAdmin = (restaurants) => { //storing into local storage of the browser
  if(Array.isArray(restaurants)){ // to prevent error being saved into local storage
    localStorage.setItem('restaurants', JSON.stringify(restaurants)); // 1st arugment sets the name, 2nd arugment = item to store
  }
}

export const getAdmin = () => {
  const restaurantsJSON = localStorage.getItem('restaurants');    //calling from localStorage using the name
  let restaurants = [];
  try{
    restaurants = JSON.parse(restaurantsJSON);
  }catch(error){
    console.log("Error: could not decode restaurants's from localStorage")
  }
  return Array.isArray(restaurants) ? restaurants: [];
}

export const searchFunction = (thingToSearchIn,nameToSearch) => {
  nameToSearch = nameToSearch.toLowerCase();
  let thingToShow = thingToSearchIn.filter((elem,index) => {
    return elem.title.toLowerCase().includes(nameToSearch);
  })
  return thingToShow;
}
