<template>
  <q-page>
    <div class="game-header">
      <div class="container">
        <div class="game-header__wrapper">
          <div class="game-header__user user">
            <img ref="questionFocus"  class="user__icon" :src="avatar_image" alt="User icon">
            <div class="user__status"> {{question_set['name']}}</div>
            <div class="user__name"> {{ username }} </div>
          </div>
          <div class="game-header__status-bar status-bar">
            <div class="status-bar__card">
              <img src="../img/money2.png" alt="Money" class="status-bar__image">
              <div class="status-bar__title"> {{ json['S']['res_money'] }} </div>
              <div class="status-bar__points"> {{ money }} <span class="status-bar__changes"
                  :class="{ 'status-bar__changes--red' : parseInt(money_change) < 0, 'status-bar__changes--green' : parseInt(money_change) > 0, 'status-bar__changes--none' : parseInt(money_change) == 0 }"
                  >{{ money_change }}</span> </div>
            </div>
            <div class="status-bar__card">
              <img src="../img/nerve2.png" alt="Nerve" class="status-bar__image">
              <div class="status-bar__title"> {{ json['S']['res_nerves'] }} </div>
              <div class="status-bar__points"> {{ nerves }} <span class="status-bar__changes"
                  :class="{ 'status-bar__changes--red' : parseInt(nerves_change) < 0, 'status-bar__changes--green' : parseInt(nerves_change) > 0, 'status-bar__changes--none' : parseInt(nerves_change) == 0 }"
                  >{{ nerves_change }}</span></div>
            </div>
            <div class="status-bar__card">
              <img src="../img/legal2.png" alt="Legal" class="status-bar__image">
              <div class="status-bar__title"> {{ json['S']['res_legal'] }} </div>
              <div class="status-bar__points"> {{ legal }} <span class="status-bar__changes"
                  :class="{ 'status-bar__changes--red' : parseInt(legal_change) < 0, 'status-bar__changes--green' : parseInt(legal_change) > 0, 'status-bar__changes--none' : parseInt(legal_change) == 0 }"
                  >{{ legal_change }}</span></div>
            </div>
            <div class="status-bar__card">
              <img src="../img/reputation2.png" alt="Reputation" class="status-bar__image">
              <div class="status-bar__title"> {{ json['S']['res_reputation'] }} </div>
              <div class="status-bar__points"> {{ reputation }} <span class="status-bar__changes"
                  :class="{ 'status-bar__changes--red' : parseInt(reputation_change) < 0, 'status-bar__changes--green' : parseInt(reputation_change) > 0, 'status-bar__changes--none' : parseInt(reputation_change) == 0 }"
                  >{{ reputation_change }}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="game-body">
      <div class="container">
        <div class="game-body__content">
          <div class="game-body__question">
            <a @click="restartFromTree()" href="#" class="game-body__back"> <q-icon name="west" /> {{ json['S']['back_to_tree'] }} </a>
            <div class="game-body__numbered-question">
              <span>{{ question_number }}/5</span>
            </div>
            <h2 class="game-body__title"> {{ question_set[question_number]['title'] }} </h2>
            <div class="game-body__text">
              <p> {{ question_set[question_number]['question'] }} </p>
            </div>
          </div>
          <div class="game-body__image">
            <transition name="fade">
            <img :key="situation_image" :src="situation_image" alt="Game image">
            </transition>
          </div>
        </div>
        <ul class="game-body__answers">
          <li>
            <a @click="setChoice(1)" href="#"> {{ question_set[question_number]['choices']['1']['action'] }} </a>
          </li>
          <li>
            <a @click="setChoice(2)" href="#"> {{ question_set[question_number]['choices']['2']['action'] }}</a>
          </li>
          <li>
            <a @click="setChoice(3)" href="#"> {{ question_set[question_number]['choices']['3']['action'] }} </a>
          </li>
          <li>
            <a @click="setChoice(4)" href="#"> {{ question_set[question_number]['choices']['4']['action'] }} </a>
          </li>
        </ul>
      </div>
    </div>
    <result
    :json='json'
    v-if="openModal"
    :open-modal="openModal"
    :choice = "choice"
    :question_set = "question_set"
    :question_number = "question_number"
    @next-question = "nextQuestion"
    ></result>
    <win
    :json='json'
    v-if="openWin"
    :openWin="openWin"
    :winText="question_set.finish"
    :money="money"
    :nerves="nerves"
    :legal="legal"
    :reputation="reputation"
    :username="username"
    :char_selected="char_selected"
    :chars_available="chars_available"
    :db="db"
    @restart-from-tree="restartFromTree"
    @add-class-b="addClassB"
    @add-class-c="addClassC"
    @add-class-d="addClassD"
    @add-class-e="addClassE"
    @start-feedback="startFeedback"
    ></win>
    <lost
    :json='json'
    v-if="openLost"
    :db="db"
    :username="username"
    :lost_image="lost_image"
    :char_selected="char_selected"
    :openLost="openLost"
    :lost="openLost"
    :lostText="lostText"
    @restart-from-tree="restartFromTree"
    ></lost>
    <feedback
    :json='json'
    v-if="openFeedback"
    @restart-from-tree="restartFromTree"
    :db="db"
    :username="username"
    :openFeedback="openFeedback"
    ></feedback>
  </q-page>
</template>

<script>
import { Notify } from 'quasar'
import json from '../pages/json/data.json'

export default {
  data () {
    return {
      avatar_image: this.char_selected + '.png',
      situation_image: this.char_selected + 1 + '.png',
      question_number: 1,
      money: 30,
      nerves: 30,
      legal: 30,
      reputation: 30,
      choice: 1,
      openModal: false,
      openFeedback: false,
      openWin: false,
      openLost: false,
      money_change: '',
      nerves_change: '',
      legal_change: '',
      reputation_change: '',
      lostText: '',
      lost_image: ''
    }
  },
  props: ['username', 'question_set', 'char_selected', 'char_name', 'chars_available', 'db', 'json'],
  methods: {
    startFeedback () {
      this.openFeedback = true
      this.openModal = false
    },
    setChoice (value) {
      this.choice = value
      this.openModal = true
      this.$refs.questionFocus.focus()
    },
    nextQuestion () {
      this.openModal = false
      this.money_change = this.question_set[this.question_number].choices[this.choice].reaction_params.money
      this.money += this.money_change
      this.nerves_change = this.question_set[this.question_number].choices[this.choice].reaction_params.nerves
      this.nerves += this.nerves_change
      this.legal_change = this.question_set[this.question_number].choices[this.choice].reaction_params.legal
      this.legal += this.legal_change
      this.reputation_change = this.question_set[this.question_number].choices[this.choice].reaction_params.reputation
      this.reputation += this.reputation_change
      if (this.money <= 0) {
        this.lostText = json.S.no_money
        this.openLost = true
        this.lost_image = 'money_lost.png'
      }
      if (this.nerves <= 0) {
        this.lostText = json.S.no_nerves
        this.openLost = true
        this.lost_image = 'nerves_lost.png'
      }
      if (this.legal <= 0) {
        this.lostText = json.S.no_legal
        this.openLost = true
        this.lost_image = 'legal_lost.png'
      }
      if (this.reputation <= 0) {
        this.lostText = json.S.no_reputation
        this.openLost = true
        this.lost_image = 'reputation_lost.png'
      }
      if (this.question_number !== 5) {
        if (this.money <= 15) {
          Notify.create({
            type: 'warning',
            timeout: 6000,
            position: 'top-right',
            message: '<span style="font-size:20px">' + json.S.low_money + '<span/>',
            html: true
          })
        }
        if (this.nerves <= 15) {
          Notify.create({
            type: 'warning',
            timeout: 6000,
            position: 'top-right',
            message: '<span style="font-size:20px">' + json.S.low_nerves + '<span/>',
            html: true
          })
        }
        if (this.legal <= 15) {
          Notify.create({
            type: 'warning',
            timeout: 6000,
            position: 'top-right',
            message: '<span style="font-size:20px">' + json.S.low_legal + '<span/>',
            html: true
          })
        }
        if (this.reputation <= 15) {
          Notify.create({
            type: 'warning',
            timeout: 6000,
            position: 'top-right',
            message: '<span style="font-size:20px">' + json.S.low_reputation + '<span/>',
            html: true
          })
        }
        this.question_number++
      } else {
        this.openWin = true
      }
      this.situation_image = this.char_selected + this.question_number + '.png'
    },
    restartFromTree () {
      this.$emit('restart-from-tree')
      this.question_number = 1
      this.money = 30
      this.nerves = 30
      this.legal = 30
      this.reputation = 30
    },
    addClassB () {
      this.$emit('add-b')
    },
    addClassC () {
      this.$emit('add-c')
    },
    addClassD () {
      this.$emit('add-d')
    },
    addClassE () {
      this.$emit('add-e')
    },
    secondClassWin (char) {
      this.$emit('second-class-win', char)
    }
  },
  components: {
    result: require('components/Modal.vue').default,
    win: require('components/Win.vue').default,
    lost: require('components/Lost.vue').default,
    feedback: require('components/Feedback.vue').default
  }
}

</script>
