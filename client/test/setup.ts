import Chai from 'chai'
import Sinon from 'sinon'
import SinonChai from 'sinon-chai'
import 'chai/register-expect'

Chai.use(SinonChai)

Object.assign(global, {
  Sinon,
  stub: Sinon.stub,
})
