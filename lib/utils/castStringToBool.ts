const castStringToBool = (val: string): boolean => {
  return val === 'true' ? true : val === 'false' ? false : !!val;
};

export default castStringToBool;
