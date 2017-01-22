import { List, Record } from 'immutable'

const ProfilesToShow = 3
const FakeDelay = 2000
const FakeUserData = {
  realName: 'Alex Matchneer',
  username: '@machty',
  profileUrl: 'https://github.com/dikarel',
  avatarUrl: 'http://placekitten.com/g/200/300'
}

export const ProfileSuggestion = Record({
  realName: '',
  username: '',
  profileUrl: '',
  avatarUrl: '',
  reloading: false
})

export default class FollowSuggestionsVM {
  constructor () {
    this.profiles = List()
    this.requestingFreshData = false
    this.dataChanged = null
    this.error = false

    // Populate with empty profile suggestions
    for (let i = 0; i < ProfilesToShow; i++) {
      this.profiles = this.profiles.push(null)
    }
  }

  // Reload all profiles
  reloadAll () {
    this.profiles.forEach((_, i) => this.reloadProfile(i))
  }

  // Mark a profile as 'reloading' and request fresh data
  reloadProfile (index) {
    const profile = this.profiles.get(index)

    if (profile) {
      this.profiles = this.profiles.set(index, profile.set('reloading', true))
    }

    this.requestFreshData()
    this.notifyDataChange()
  }

  // Request a data reload
  requestFreshData () {
    if (this.requestingFreshData) return
    this.requestingFreshData = true
    this.notifyDataChange()

    setTimeout(() => {
      // Swap out profiles that are empty or marked as 'reloading' with fresh data
      this.profiles.forEach((profile, i) => {
        if (profile && !profile.reloading) return
        // TODO: Implement for real
        this.profiles = this.profiles.set(i, new ProfileSuggestion(FakeUserData))
      })

      this.error = false
      this.requestingFreshData = false
      this.notifyDataChange()
    }, FakeDelay)
  }

  // Notify listener that data changed
  notifyDataChange () {
    if (this.dataChanged) this.dataChanged()
  }
}
