export const displayNewGameButton = (actions) => {
  if (hasStand(actions)) {
    return false;
  }
  const result = actions.filter((action) => action === 'new game');
  if (result.length > 0) {
    return true;
  }
  return false;
};

export const displayBetButton = (actions) => {
  if (hasStand(actions)) {
    return true;
  }
  //dependent action hasnt been run
  if (!displayNewGameButton(actions)) {
    return true;
  }
  //action has already been performed
  const result = actions.filter((action) => action === 'bet');
  if (result.length > 0) {
    return true;
  }
  return false;
};

export const displayDealButton = (actions) => {
  if (hasStand(actions)) {
    return true;
  }
  //dependent action hasnt been run
  if (!displayBetButton(actions) || !displayNewGameButton(actions)) {
    return true;
  }
  //action has already been performed
  const result = actions.filter((action) => action === 'deal');
  if (result.length > 0) {
    return true;
  }
  return false;
};

export const displayHitButton = (actions) => {
  if (hasStand(actions)) {
    return true;
  }
  //dependent action hasnt been run
  if (
    !displayBetButton(actions) ||
    !displayNewGameButton(actions) ||
    !displayDealButton(actions)
  ) {
    return true;
  }
  //will not check whether already hit because you can hit multiple times
  return false;
};

export const displayDoubleButton = (actions) => {
  if (hasStand(actions)) {
    return true;
  }
  if (
    !displayBetButton(actions) ||
    !displayNewGameButton(actions) ||
    !displayDealButton(actions)
  ) {
    //dependent action hasnt been run
    return true;
  }
  //action has already been performed. Also, if already hit, you cant double
  const result = actions.filter(
    (action) => action === 'double' || action === 'hit',
  );
  if (result.length > 0) {
    return true;
  }
  return false;
};

export const displayStandButton = (actions) => {
  //dependent action hasnt been run
  if (
    !displayBetButton(actions) ||
    !displayNewGameButton(actions) ||
    !displayDealButton(actions)
  ) {
    return true;
  }
  const result = actions.filter((action) => action === 'stand');
  if (result.length > 0) {
    return true;
  }
  //will not check whether already hit because you can hit multiple times
  return false;
};

export const hasStand = (actions) => {
  const result = actions.filter((action) => action === 'stand');
  return result.length > 0;
};
