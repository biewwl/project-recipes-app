function getCurrentDate() {
  const date = new Date();
  const day = date.getDate();
  const nine = 9;
  const month = date.getMonth() + 1 <= nine
    ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export default getCurrentDate;
