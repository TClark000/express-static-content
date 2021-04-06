// Script deletes the file resultJSON and then creates a new resultJSON 

const fs = require('fs')
const dirTree = require('directory-tree')
const resultJSON = './db/data/content.json'

let oldResultStr = ''
let newResultStr = ''

// resultJSON delete
try {
  fs.unlinkSync(resultJSON)
  console.info(`Previous ${resultJSON} deleted`)
} catch (err) {
  if (err && err.code === 'ENOENT') {
    console.log(`No previous file found for ${resultJSON}`)
  } else if (err) {
    console.error('Error occurred while trying to remove file')
  }
}

// Directory content searched for md files, create/append resultJSON
const tree = dirTree('./content', { extensions: /\.md$/ }, (item) => {
  const data = JSON.stringify(item, null, 2)
  fs.appendFileSync(resultJSON, data + ', ')
})

// resultJSON reformat for json
fs.readFile(resultJSON, 'utf8' , (err, data) => {
  if (err) throw err
  oldResultStr = data.replace(/\/index.md/g, '')
  newResultStr = '[' + oldResultStr.slice(0, oldResultStr.length - 2 ) + ']'
  fs.writeFileSync(resultJSON, newResultStr)
})

console.info(`Seed complete, new file saved at ${resultJSON}`)