export const setActiveRestaurant = (restaurant) => { //storing into local storage of the browser
  if(restaurant._id){ // to prevent error being saved into local storage
    localStorage.setItem('restaurant', JSON.stringify(restaurant)); // 1st arugment sets the name, 2nd arugment = item to store
  }else{
    localStorage.setItem('userStatus', JSON.stringify({}));
  }
}

export const getActiveRestaurant = () => {
  const restaurantJSON = localStorage.getItem('restaurant');    //calling from localStorage using the name
  let restaurant = {};
  try{
    restaurant = JSON.parse(restaurantJSON);
  }catch(error){
    console.log("Error: could not decode restaurant from localStorage")
  }
  return typeof(restaurant)=== 'object' ? restaurant: {};
}

export const searchFunction = (thingToSearchIn,nameToSearch) => {
  nameToSearch = nameToSearch.toLowerCase();
  let thingToShow = thingToSearchIn.filter((elem,index) => {
    return elem.title.toLowerCase().includes(nameToSearch);
  })
  return thingToShow;
}
