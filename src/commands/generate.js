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
  choices: [ "hawk", "hawkModal", "hawkRemarkModal" ],
  name: 'projectType',
  message: 'Choose a template and kick it off',
  when: ({ confirm }) => confirm
  
}, {
  type: 'input',
  name: 'projectName',
  message: 'Your Route Name',
  default: () => 'untitled',
  when: ({ confirm, projectType }) => confirm && projectType === 'hawk'
}]

const copyJobs = {
  hawk: [{
    template: 'hawk/index.js.ejs', target: 'index.js'
  }, {
    template: 'hawk/index.scss.ejs', target: 'index.scss'
  }, {
    template: 'hawk/list.js.ejs', target: 'list.js'
  }, {
    template: 'hawk/components/tableConfig.js.ejs', target: '/components/tableConfig.js'
  }, {
    template: 'hawk/redux/index.js.ejs', target: '/redux/index.js'
  }, {
    template: 'hawk/redux/list.js.ejs', target: '/redux/list.js'
  }],
  hawkModal: [{
    template: 'hawkModal/modal.js.ejs', target: 'modal.js'
  }],
  hawkRemarkModal: [{
    template: 'hawkRemarkModal/remarkModal.js.ejs', target: 'remarkModal.js'
  }]
}

module.exports = Object.assign(COMMAND_BASE, { run: async (context) => {
  inquirer
    .prompt(questions)
    .then(async answers => {

      const { projectType, projectName } = answers

      const { parameters, template: { generate } } = context

      const project = projectName && projectName.charAt(0).toUpperCase()+projectName.slice(1);

      const copyJob = copyJobs[projectType]
      copyJob.forEach(async c => {
        const target = projectType === 'hawk'
          ? `${BASE_PATH}/${projectName}/${c.target}`
          : c.target
        await generate({
          template: c.template,
          target,
          props: { projectName, project }
        })
      })
    })
}})
