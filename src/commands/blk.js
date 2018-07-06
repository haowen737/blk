module.exports = {
  name: 'blk',
  run: async (context) => {
    const { print, parameters, template: { generate } } = context

    print.info('Welcome to Blk')
  }
}
