const express = require('express')
const app = express()

const fs = require('fs')
const marked = require('marked')

const PORT = process.env.PORT || 5000

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use(express.json())

module.exports = app

//  content.json lists md files within the ./content directory
let mdJSONFiles = ''
fs.readFile('db/data/content.json', (err, data) => {
  if (err) throw err
  mdJSONFiles = JSON.parse(data)
})

const templateFile = fs.readFileSync('views/template/template.html', 'utf8')

// console logging
app.use((req, res, next) => {
  console.log(`🤖 Incoming Request: Method: ${req.method}  URL: ${req.url}`)
  next()
})

// default display of content.json file
app.get('/', (req, res) => {
  try {
    res.status(200).render('index.ejs', { mdFiles: mdJSONFiles })
  } catch (err) {
    res.status(404).render('404.ejs')
  }
})

// incoming requests routed to  path index.md otherwise sends a 404
// template.html merged with index.md 
app.use(function(req, res) {
  try {
    const mdPath = __dirname + req.url + '/index.md'
    const mdFile = fs.readFileSync(mdPath, 'utf8')
    const mergeStr = templateFile.toString().replace(/{{content}}/g, marked(mdFile.toString()))
    res.status(200).send(mergeStr)

  } catch (err) {
    res.status(404).render('404.ejs')
  }
})

app.listen(PORT, () => console.log(`Listening on port ${PORT} 🐝`))