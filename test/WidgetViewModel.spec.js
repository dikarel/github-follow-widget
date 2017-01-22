import {describe, it, beforeEach} from 'mocha'
import Profile from '../src/models/Profile'
import WidgetViewModel, {LoadingState, IdleState, ErrorState} from '../src/view-models/WidgetViewModel'
import Promise from 'bluebird'
import expect from 'expect'

describe('WidgetViewModel', () => {
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
        expect(widgetVm.states.get(0)).toBe(LoadingState)
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
          .then(() => expect(widgetVm.states.get(0)).toBe(ErrorState))
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
        expect(widgetVm.states.get(0)).toBe(IdleState)
      })

      it('loads in a new profile', () => {
        expect(widgetVm.profiles.get(0).name).toBe('hello world')
      })
    })
  })
})
