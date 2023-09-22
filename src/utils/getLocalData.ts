const getLocalData = (key: string) => {
  const localData = localStorage.getItem(key);
  const parseData = localData && JSON.parse(localData);

  return parseData;
};

export default getLocalData;
