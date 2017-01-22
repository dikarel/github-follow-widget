import {describe, it, beforeEach} from 'mocha'
import {List} from 'immutable'
import {LoadingState, IdleState, ErrorState, GithubThrottledState, PossiblyOfflineState} from '../../src/models/States'
import expect from 'expect'
import Profile from '../../src/models/Profile'
import Promise from 'bluebird'
import WidgetViewModel from '../../src/view-models/WidgetViewModel'

// TODO: Refactor (simplify)

describe('WidgetViewModel', () => {
  describe('tryAgain', () => {
    it('reloads profiles that have an error state', () => {
      const userProfileService = {
        getRandomProfile: Promise.method(() => new Profile({name: 'hello world'}))
      }

      const widgetVm = new WidgetViewModel(userProfileService, 2, true)
      widgetVm._store.set('profileStates', List.of(IdleState, ErrorState))

      widgetVm.tryAgain()
      expect(widgetVm.profileStates.get(0)).toBe(IdleState)
      expect(widgetVm.profileStates.get(1)).toBe(LoadingState)
    })

    it('resets overall state to IdleState', () => {
      const userProfileService = {
        getRandomProfile: Promise.method(() => new Profile({name: 'hello world'}))
      }

      const widgetVm = new WidgetViewModel(userProfileService, 2, true)
      widgetVm._store.set('state', ErrorState)

      widgetVm.tryAgain()
      expect(widgetVm.state).toBe(IdleState)
    })
  })

  describe('reloadAll', () => {
    it('reloads all profiles', () => {
      const userProfileService = {
        getRandomProfile: Promise.method(() => new Profile({name: 'hello world'}))
      }

      const widgetVm = new WidgetViewModel(userProfileService, 2, true)
      return widgetVm
        .reloadAll()
        .then(() => {
          expect(widgetVm.profiles.get(0).name).toBe('hello world')
          expect(widgetVm.profiles.get(1).name).toBe('hello world')
        })
    })

    it('resets overall state to IdleState', () => {
      const userProfileService = {
        getRandomProfile: Promise.method(() => new Profile({name: 'hello world'}))
      }

      const widgetVm = new WidgetViewModel(userProfileService, 2, true)
      widgetVm._store.set('state', ErrorState)

      widgetVm.reloadAll()
      expect(widgetVm.state).toBe(IdleState)
    })
  })

  describe('reload', () => {
    describe('when loading', () => {
      it('sets profile state to Loading', () => {
        const userProfileService = {
          getRandomProfile: () => Promise.delay(5000)
        }

        const widgetVm = new WidgetViewModel(userProfileService, 1, true)
        widgetVm.reload(0)
        expect(widgetVm.profileStates.get(0)).toBe(LoadingState)
      })

      it('resets overall state to IdleState', () => {
        const userProfileService = {
          getRandomProfile: Promise.method(() => new Profile({name: 'hello world'}))
        }

        const widgetVm = new WidgetViewModel(userProfileService, 1, true)
        widgetVm._store.set('state', ErrorState)

        widgetVm.reload(0)
        expect(widgetVm.state).toBe(IdleState)
      })
    })

    describe('if there is an error', () => {
      it('sets profile state to Error', () => {
        const userProfileService = {
          getRandomProfile: Promise.method(() => { throw new Error() })
        }

        const widgetVm = new WidgetViewModel(userProfileService, 1, true)
        return widgetVm
          .reload(0)
          .then(() => expect(widgetVm.profileStates.get(0)).toBe(ErrorState))
      })

      it('sets overall state to Error', () => {
        const userProfileService = {
          getRandomProfile: Promise.method(() => { throw new Error() })
        }

        const widgetVm = new WidgetViewModel(userProfileService, 1, true)
        return widgetVm
          .reload(0)
          .then(() => expect(widgetVm.state).toBe(ErrorState))
      })
    })

    describe('if throttled by GitHub', () => {
      it('sets overall state to GithubThrottledState', () => {
        const userProfileService = {
          getRandomProfile: Promise.method(() => {
            const err = new Error()
            err.status = 403
            throw err
          })
        }

        const widgetVm = new WidgetViewModel(userProfileService, 1, true)
        return widgetVm
          .reload(0)
          .then(() => expect(widgetVm.state).toBe(GithubThrottledState))
      })
    })

    describe('if there was a connection issue', () => {
      it('sets overall state to PossiblyOfflineState', () => {
        const userProfileService = {
          getRandomProfile: Promise.method(() => {
            const err = new Error()
            err.status = 0
            throw err
          })
        }

        const widgetVm = new WidgetViewModel(userProfileService, 1, true)
        return widgetVm
          .reload(0)
          .then(() => expect(widgetVm.state).toBe(PossiblyOfflineState))
      })
    })

    describe('after loading', () => {
      let widgetVm = null

      beforeEach(() => {
        const userProfileService = {
          getRandomProfile: Promise.method(() => new Profile({name: 'hello world'}))
        }

        widgetVm = new WidgetViewModel(userProfileService, 1, true)
        return widgetVm
          .reload(0)
      })

      it('sets state to Idle', () => {
        expect(widgetVm.profileStates.get(0)).toBe(IdleState)
      })

      it('loads in a new profile', () => {
        expect(widgetVm.profiles.get(0).name).toBe('hello world')
      })
    })
  })
})
