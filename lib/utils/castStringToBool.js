const castStringToBool = (val) =>
  val === 'true' ? true : val === 'false' ? false : val;

export default castStringToBool;
