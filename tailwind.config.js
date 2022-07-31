module.exports = {
  mode: 'jit',
  content: ['./views/*.twig', './views/**/*.twig', './svg/**/*.twig'],
  theme: {
    extend: {},
    container: {
      center: true,
    },
  },
  plugins: [],
};
