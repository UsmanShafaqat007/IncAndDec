const StartValue = 0;

const changeNumber2 = (state = StartValue, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 2;

    case "DECREMENT":
      return state - 2;
    default:
      return state;
  }
};
export default changeNumber2;