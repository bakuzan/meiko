const getSingleObjectProperty = (o) => (!!o ? o[Object.keys(o)[0]] : null);

export default getSingleObjectProperty;
