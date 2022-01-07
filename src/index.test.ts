import Fetch from '.'
import 'isomorphic-fetch'

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

    user
      .finally(value => f = value)
      .then(value => t = value)
      .catch(value => c = value)

    await user

    expect(f).toEqual(await user1)
    expect(t).toEqual(await user1)
    expect(c).toBe(undefined)
  })
  test('error', async () => {
    const user = new Fetch('https://reqres.in/api/login', {method: 'post', type: "json"})
    try { await user } catch (e) {}
    expect(user.value).toBe(undefined)
    expect(user.error).toEqual({error: 'Missing email or username'})
  })
  test('answer', async () => {
    const user = new Fetch('https://reqres.in/api/users/23')
    expect(user.answer).toBe(undefined)
    try { await user } catch (e) {}
    expect(user.answer.ok).toBe(false)
    expect(user.answer.status).toBe(404)
  })
  test('resolve', async () => {
    const user = new Fetch('https://reqres.in/api/users/1')
    user.resolve({data: {id: 2}})
    await user
    expect(user.value.data.id).toBe(2)

    user.update()

    await user

    expect(user.value.data.id).toBe(1)
  })
})
