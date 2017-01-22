import ImmutableStore from 'immutable-js-store'
import {LoadingState, ErrorState, IdleState, GithubThrottledState, PossiblyOfflineState} from '../models/States'
import {List} from 'immutable'
import Promise from 'bluebird'

const emptyPromise = Promise.method(() => {})

export default class WidgetViewModel {
  constructor (userProfileService, numProfiles, disableLogging) {
    this._numProfiles = numProfiles
    this._userProfileService = userProfileService
    this._disableLogging = disableLogging
    this._store = new ImmutableStore({
      profiles: new List(new Array(numProfiles)),
      profileStates: new List(new Array(numProfiles)),
      state: IdleState
    })
  }

  // Return a list of profiles
  get profiles () {
    return this._store.get('profiles')
  }

  // Return a list of states for each profile (LoadingState/ErrorState/IdleState)
  get profileStates () {
    return this._store.get('profileStates')
  }

  // Return overall state (IdleState/GithubThrottledState/PossiblyOfflineState)
  get state () {
    return this._store.get('state')
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
    const profileStates = this._store.get('profileStates')
    const state = profileStates.get(index, IdleState)
    if (state === LoadingState) return emptyPromise()

    if (!this._disableLogging) console.log('Reloading', index)

    this._store.set('profileStates', profileStates.set(index, LoadingState))

    return this._userProfileService
      .getRandomProfile()
      .then((profile) => {
        if (!this._disableLogging) console.log('Success reloading', index)

        const profiles = this._store.get('profiles')
        this._store.set('profiles', profiles.set(index, profile))
        const profileStates = this._store.get('profileStates')
        this._store.set('profileStates', profileStates.set(index, IdleState))
        this._store.set('state', IdleState)
      })
      .catch((err) => {
        if (!this._disableLogging) console.error('Error reloading', index, err)

        const profileStates = this._store.get('profileStates')
        this._store.set('profileStates', profileStates.set(index, ErrorState))

        if (err.status === 403) {
          this._store.set('state', GithubThrottledState)
        } else if (err.status === 0) {
          this._store.set('state', PossiblyOfflineState)
        } else {
          this._store.set('state', IdleState)
        }
      })
  }

  // Subscribe to changes on this view-model
  subscribe (onChange) {
    return this._store.subscribe(onChange)
  }
}
