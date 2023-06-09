import 'isomorphic-fetch'

import Fetch from '.'

const user1 = fetch('https://reqres.in/api/users/1').then(data => data.json())

describe('Ajax', () => {
  test('simple', async () => {
    expect(await new Fetch('https://reqres.in/api/users/1')).toEqual(await user1)
  })
  test('loading', async () => {
    const ajax = new Fetch('https://reqres.in/api/users/1')
    expect(ajax.loading).toBe(true)
    await ajax
    expect(ajax.loading).toBe(false)
  })
  test('loaded', async () => {
    const ajax = new Fetch('https://reqres.in/api/users/1')
    expect(ajax.loaded).toBe(false)
    await ajax
    expect(ajax.loaded).toBe(true)
  })
  test('value', async () => {
    const ajax = new Fetch('https://reqres.in/api/users/1')
    expect(ajax.value).toBe(undefined)
    await ajax
    expect(ajax.value).toEqual(await user1)
  })
  test('then catch finally', async () => {
    const user = new Fetch('https://reqres.in/api/users/1')
    let f, t, c

    await user
      .then(value => {
        t = value
      })
      .catch(value => {
        c = value
      })
      .finally(() => {
        f = true
      })

    expect(f).toEqual(true)
    expect(t).toEqual(await user1)
    expect(c).toBe(undefined)
  })
  test('error', async () => {
    const user = new Fetch('https://reqres.in/api/login', { method: 'post', type: 'json' })
    try { await user } catch (e) {}
    expect(user.value).toBe(undefined)
    expect(user.error).toEqual({ error: 'Missing email or username' })
  })
  test('answer', async () => {
    const user = new Fetch('https://reqres.in/api/users/23')
    expect(user.response).toBe(undefined)
    try { await user } catch (e) {}
    expect(user.response.ok).toBe(false)
    expect(user.response.status).toBe(404)
  })
})
