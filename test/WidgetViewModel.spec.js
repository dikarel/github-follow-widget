import {describe, it, beforeEach} from 'mocha'
import Profile from '../src/models/Profile'
import WidgetViewModel from '../src/view-models/WidgetViewModel'
import {LoadingState, IdleState, ErrorState} from '../src/models/States'
import Promise from 'bluebird'
import List from 'immutable'
import expect from 'expect'

describe('WidgetViewModel', () => {
  describe('tryAgain', () => {
    it('reloads profiles that have an error state', () => {
      const userProfileService = {
        getRandomProfile: Promise.method(() => new Profile({name: 'hello world'}))
      }

      const widgetVm = new WidgetViewModel(userProfileService, 2, true)
      widgetVm._store.set('profileStates', List.fromJS([IdleState, ErrorState]))

      widgetVm.tryAgain()
      expect(widgetVm.profileStates.get(0)).toBe(IdleState)
      expect(widgetVm.profileStates.get(1)).toBe(LoadingState)
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
  })

  describe('reload', () => {
    describe('when loading', () => {
      it('sets state to Loading', () => {
        const userProfileService = {
          getRandomProfile: () => Promise.delay(5000)
        }

        const widgetVm = new WidgetViewModel(userProfileService, 1, true)
        widgetVm.reload(0)
        expect(widgetVm.profileStates.get(0)).toBe(LoadingState)
      })
    })

    describe('if there is an error', () => {
      it('sets state to Error', () => {
        const userProfileService = {
          getRandomProfile: Promise.method(() => { throw new Error() })
        }

        const widgetVm = new WidgetViewModel(userProfileService, 1, true)
        return widgetVm
          .reload(0)
          .then(() => expect(widgetVm.profileStates.get(0)).toBe(ErrorState))
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
