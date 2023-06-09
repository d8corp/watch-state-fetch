
<a href="https://www.npmjs.com/package/watch-state">
  <img src="https://raw.githubusercontent.com/d8corp/watch-state/v3.3.3/img/logo.svg" align="left" width="90" height="90" alt="Watch-State logo by Mikhail Lysikov">
</a>

# &nbsp; @watch-state/fetch

&nbsp;

[![NPM](https://img.shields.io/npm/v/@watch-state/fetch.svg)](https://www.npmjs.com/package/@watch-state/fetch)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/@watch-state/fetch)](https://bundlephobia.com/result?p=@watch-state/fetch)
[![downloads](https://img.shields.io/npm/dm/@watch-state/fetch.svg)](https://www.npmtrends.com/@watch-state/fetch)
[![changelog](https://img.shields.io/badge/changelog-⋮-brightgreen)](https://changelogs.xyz/@watch-state/fetch)
[![license](https://img.shields.io/npm/l/@watch-state/fetch)](https://github.com/d8corp/watch-state-fetch/blob/main/LICENSE)

Fetch with [watch-state](https://www.npmjs.com/package/watch-state)  
Based on [@watch-state/async](https://www.npmjs.com/package/@watch-state/async)

[![stars](https://img.shields.io/github/stars/d8corp/watch-state-fetch?style=social)](https://github.com/d8corp/watch-state-fetch/stargazers)
[![watchers](https://img.shields.io/github/watchers/d8corp/watch-state-fetch?style=social)](https://github.com/d8corp/watch-state-fetch/watchers)

### Install

npm
```bash
npm i @watch-state/fetch
```

yarn
```bash
yarn add @watch-state/fetch
```

### Usage

`Fetch` is a `Promise` like class.

`Fetch` extends [@watch-state/async](https://www.npmjs.com/package/@watch-state/async)

```javascript
import Fetch from '@watch-state/fetch'

const user = await new Fetch('https://reqres.in/api/users/1')
```

### then, catch, finally

Use `then`, `catch` and `finally` like with `Promise`

```javascript
const user = new Fetch('https://reqres.in/api/users/1')
user
  .then(data => console.log('then', data))
  .catch(error => console.log('catch', error))
  .finally(() => console.log('finally'))
```

### loading

You may check status of the request with `loading` field,
it's `true` when data is loading. This field is observable.

```javascript
const user = new Fetch('https://reqres.in/api/users/1')
// user.loading === true
// but request does not happen

await user
// await triggers request
// user.loading === false
```

### loaded

You may check status of the request with `loaded` field,
it's `true` if the data is loaded at least one time.
This is an observable field.

```javascript
const user = new Fetch('https://reqres.in/api/users/1')
// user.loaded === false

await user
// user.loaded === true
```

### value

You may get result with `value`.
This is an observable field.

```javascript
const user = new Fetch('https://reqres.in/api/users/1')

new Watch(() => console.log(user.loading ? 'loading...' : user.value))
// Watch from watch-state
```

### error

You may handle errors or responses with error status by `error` field.  
This is an observable field.

```javascript
const user = new Fetch('https://reqres.in/api/users/23')
// returns 404 user not found

new Watch(() => console.log(
  user.loading ? 'loading...' : user.error || user.value
))
```

### type

You can convert the response to `json` | `text` | `blob` | `arrayBuffer` | `formData`.

```javascript
const user = new Fetch('https://reqres.in/api/users/1', {
  type: 'text'
})
```

### default value

You may provide default `value` for `Fetch`

Option of `type` equals *`json` by default*

```javascript
const user = new Fetch('https://reqres.in/api/users/1', {
  defaultValue: {
    data: { id: null }
  }
})

// user.value.data.id === null

await user
// user.value.data.id === 1
```

### update

Unlike a `Promise`, you may reuse `Fetch` with `update` method

```javascript
const user = new Fetch('https://reqres.in/api/users/1')

await user
// request to https://reqres.in/api/users/1

user.update()

await user
// request to https://reqres.in/api/users/1
```

You can set timeout to make update only after some time.
```javascript
const user = new Fetch('https://reqres.in/api/users/1')

await user
// request to https://reqres.in/api/users/1

user.update(1000)
// nothing happends

await user
// nothing happends

await new Promise(resolve => setTimeout(resolve, 1000))
// nothing happends

// 1 second passed, if use 1000ms it triggers update
user.update(1000)

await user
// request to https://reqres.in/api/users/1
```

### response

If you want to know the status of the response or headers you can use `response` field.

```javascript
const user = new Fetch('https://reqres.in/api/users/23')

// user.response === undefined

await user

// user.response.ok === false
// user.response.status === 404
```

It's better if you extend `Fetch` class to get it.
```typescript
import { cache } from '@watch-state/decorators'
import Fetch from '@watch-state/fetch'

class StatusFetch extends Fetch {
  @cache get status () {
    return this.response?.status
  }
}

const user = new StatusFetch('https://reqres.in/api/users/23')

// user.status === undefined

await user

// user.status === 404
```

## Issues

If you find a bug, please file an issue on [GitHub](https://github.com/d8corp/watch-state-fetch/issues)  

[![issues](https://img.shields.io/github/issues-raw/d8corp/watch-state-fetch)](https://github.com/d8corp/watch-state-fetch/issues)
