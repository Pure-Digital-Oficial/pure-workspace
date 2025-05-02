export const scrollToService = (path: string) => {
  document.getElementById(path)?.scrollIntoView({ behavior: 'smooth' });
};
