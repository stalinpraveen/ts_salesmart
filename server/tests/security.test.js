import test from 'node:test'
import assert from 'node:assert/strict'
import { noSqlSanitize, preventHpp } from '../src/middleware/sanitize.js'

test('security: noSqlSanitize strips $ operators and dotted keys', () => {
  const req = {
    body: {
      username: 'admin',
      $where: 'sleep(1000)',
      nested: {
        $gt: 0,
        valid: 'ok',
        'deep.key': 'bad',
      },
    },
    query: {
      brand: { $ne: null },
      model: 'Premio',
    },
    params: {
      id: '123',
    },
  }

  noSqlSanitize(req, {}, () => {})

  assert.equal(req.body.username, 'admin')
  assert.equal(req.body.$where, undefined)
  assert.equal(req.body.nested.$gt, undefined)
  assert.equal(req.body.nested.valid, 'ok')
  assert.equal(req.body.nested['deep.key'], undefined)
  assert.deepEqual(req.query.brand, {})
  assert.equal(req.query.model, 'Premio')
})

test('security: preventHpp normalizes parameter pollution arrays into single scalar values', () => {
  const req = {
    query: {
      page: ['1', '2'],
      sort: ['newest', 'price_asc'],
      other: ['a', 'b'],
    },
  }

  preventHpp(['page', 'sort'])(req, {}, () => {})

  assert.equal(req.query.page, '1')
  assert.equal(req.query.sort, 'newest')
  assert.deepEqual(req.query.other, ['a', 'b'])
})
