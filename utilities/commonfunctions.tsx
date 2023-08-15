export const add3Dots = (string: any, limit: any) => {
  var dots = "...";
  if (string.length > limit) {
    // you can also use substr instead of substring
    string = string.substring(0, limit) + dots;
  }

  return string;
};


export function getInitials(input: string): string {
  const words = input.split(' ');

  const initials = words
    .filter(word => word.length > 0)
    .map(word => word[0].toUpperCase())
    .join('');

  return initials;
}
