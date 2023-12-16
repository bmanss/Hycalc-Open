const recipe = await (await fetch(`https://raw.githubusercontent.com/kr45732/skyblock-plus-data/main/InternalNameMappings.json`)).json();
const items = await (await fetch(`https://api.slothpixel.me/api/skyblock/bazaar`)).json();

const minions = Object.keys(recipe)
  .filter((key) => key.includes("GENERATOR"))
  .reduce((acc, key) => {
    acc[key] = recipe[key];
    return acc;
  }, {});

const getMinionPrices = (minionSet) => {
  const minionPrices = {};

  // loop through all the minions
  for (const [minion, data] of Object.entries(minionSet)) {
    // skip minions without recipe
    if (!data.recipe) continue;

    const recipeIngredients = {};
    minionPrices[minion] = {};
    // get all items in the recipe
    for (const [_, slotdata] of Object.entries(data.recipe)) {
      const [item, amount] = slotdata.split(":");
      const filterdItem = item.replace("-", ":");

      // if item is already in recipeIngredients add to current value else set to this amount
      recipeIngredients[filterdItem] = recipeIngredients[filterdItem] ? recipeIngredients[filterdItem] + Number(amount) : Number(amount);
    }
    minionPrices[minion].recipeIngredients = recipeIngredients;
  }

  // sort to avoid condition where the recipe requires another tier not calculated
  const sortedList = Object.keys(minionPrices).sort((a, b) => {
    const numA = parseInt(a.split("_").pop());
    const numB = parseInt(b.split("_").pop());
    return numA - numB;
  });

  // create cache for minions whose cost is already found
  const cachedMinion = {};

  // loop through all minions in order
  for (const minion of sortedList) {
    const ingredients = minionPrices[minion].recipeIngredients;
    let total = 0;
    for (const [item, amount] of Object.entries(ingredients)) {
      // if another minion is an ingredient the cost should already be found due to sorting so add that
      if (item in cachedMinion) {
        total += cachedMinion[item];
      }
      // find each price in the bazaar
      else {
        const itemPrice = items[item]?.quick_status?.buyPrice;
        if (itemPrice) total += itemPrice * amount;
      }
    }

    // add minion to the cached minions
    cachedMinion[minion] = total;

    // update
    minionPrices[minion].cost = total;
  }

  return minionPrices;
};

console.log(getMinionPrices(minions));