export const add3Dots = (string: any, limit: any) => {
  var dots = "...";
  if (string.length > limit) {
    // you can also use substr instead of substring
    string = string.substring(0, limit) + dots;
  }

  return string;
};
