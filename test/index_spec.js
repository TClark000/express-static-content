const { expect } = require('chai')
const chai = require('chai')
const { JSDOM } = require('jsdom')
chai.use(require('chai-dom'))
require('jsdom-global')()
const fs = require('fs')

describe('GET /', () => {

  it('should return a 200 response', (done) => {
    api.get('/')
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return an object', (done) => {
    api.get('/')
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

})

describe('GET /random-url', () => {
  it('should return a 404 response', (done) => {
    api.get('/random-url')
      .end((err, res) => {
        expect(res.status).to.eq(404)
        done()
      })
  }
  )
})

describe('test/index-test.html', () => {
  beforeEach((done) => {
    JSDOM.fromFile('test/index-test.html')
      .then((dom) => {
        global.document = dom.window.document
      })
      .then(done, done)
  })
  describe('Level 1 heading', () => {
    it('h1 element should say \'Hello World!\'', () => {
      const element = document.querySelector('h1')
      expect(element).to.have.text('Hello World!')
    })
  })
})

describe('test/index.md', () => {
  beforeEach((done) => {
    JSDOM.fromFile('test/index.md')
      .then((dom) => {
        global.document = dom.window.document
      })
      .then(done, done)
  })
  describe('Level 1 heading', () => {
    it('h1 element should say \'Hello World - md file\'', () => {
      const element = document.querySelector('h1')
      expect(element).to.have.text('Hello World - md file')
    })
  })
})