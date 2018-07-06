const inquirer = require('inquirer')
const fs = require('fs')

const COMMAND_BASE = { name: 'generate', alias: ['g'] }
const BASE_PATH = process.cwd()
const BASE_WARNING = 'Blk will generate bilorplate file at current path'
const questions = [{
  type: 'confirm',
  name: 'confirm',
  message: `Generate at ---> ${BASE_PATH}`,
}, {
  type: 'list',
  choices: [ "hawk", "xxx", "ccc" ],
  name: 'projectType',
  message: 'Your Generate Type',
  when: ({ confirm }) => confirm
  
}, {
  type: 'input',
  name: 'projectName',
  message: 'Your Route Name',
  default: () => 'untitled',
  when: ({ confirm }) => confirm
}]

const copyJobs = [{
  template: 'hawk/index.js.ejs', target: 'index.js'
}, {
  template: 'hawk/list.js.ejs', target: 'list.js'
}, {
  template: 'hawk/components/tableConfig.js.ejs', target: '/components/tableConfig.js'
}, {
  template: 'hawk/redux/index.js.ejs', target: '/redux/index.js'
}, {
  template: 'hawk/redux/list.js.ejs', target: '/redux/list.js'
}]

module.exports = Object.assign(COMMAND_BASE, { run: async (context) => {
  inquirer
    .prompt(questions)
    .then(async answers => {

      const { projectType, projectName } = answers

      const { parameters, template: { generate } } = context

      const project = projectName.charAt(0).toUpperCase()+projectName.slice(1);
      copyJobs.forEach(async c => {
        await generate({
          template: c.template,
          target: `${BASE_PATH}/${projectName}/${c.target}`,
          props: { projectName, project }
        })
      })
    })
}})
