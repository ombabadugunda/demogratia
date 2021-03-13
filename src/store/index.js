import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state: {
      user: {
        username: '11',
        char_selected: '',
        question_number: '',
        money: 0,
        nerves: 0,
        legal: 0,
        reputation: 0,
        chars_available: 'A',
        game_stage: 'welcome'
      }
    },

    mutations: {
      updateName1 (state, payload) {
        state.user.username = '00'
      }
    }
  })

  return Store
}
