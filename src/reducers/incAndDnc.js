const StartValue = 0;

const changeNumber = (state = StartValue, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 5;

    case "DECREMENT":
      return state - 5;

    default:
      return state;
  }
};
export default changeNumber;



