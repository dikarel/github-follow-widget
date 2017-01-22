import ImmutableStore from 'immutable-js-store'
import {List} from 'immutable'
import Promise from 'bluebird'

export const LoadingState = Symbol('loading')
export const ErrorState = Symbol('error')
export const IdleState = Symbol('idle')

const emptyPromise = Promise.method(() => {})

export default class WidgetViewModel {
  constructor (userProfileService, numProfiles, disableLogging) {
    this._numProfiles = numProfiles
    this._userProfileService = userProfileService
    this._disableLogging = disableLogging
    this._store = new ImmutableStore({
      profiles: new List(new Array(numProfiles)),
      states: new List(new Array(numProfiles))
    })
  }

  // Return a list of profiles
  get profiles () {
    return this._store.get('profiles')
  }

  // Return a list of states for each profile (LoadingState/ErrorState/IdleState)
  get states () {
    return this._store.get('states')
  }

  // Reload all profiles
  // Returns a promise to indicate completion
  reloadAll () {
    const promises = []

    for (let i = 0; i < this._numProfiles; i++) {
      promises.push(this.reload(i))
    }

    return Promise.all(promises)
  }

  // Reload a specific profile (by index)
  // Returns a promise to indicate completion
  reload (index) {
    const states = this._store.get('states')
    const state = states.get(index, IdleState)
    if (state === LoadingState) return emptyPromise()

    if (!this._disableLogging) console.log('Reloading', index)

    this._store.set('states', states.set(index, LoadingState))

    return this._userProfileService
      .getRandomProfile()
      .then((profile) => {
        if (!this._disableLogging) console.log('Success reloading', index)

        const profiles = this._store.get('profiles')
        this._store.set('profiles', profiles.set(index, profile))
        const states = this._store.get('states')
        this._store.set('states', states.set(index, IdleState))
      })
      .catch((err) => {
        if (!this._disableLogging) console.error('Error reloading', index, err)

        const states = this._store.get('states')
        this._store.set('states', states.set(index, ErrorState))
      })
  }

  // Subscribe to changes on this view-model
  subscribe (onChange) {
    return this._store.subscribe(onChange)
  }
}
