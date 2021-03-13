<template>
  <q-page>
      <q-dialog v-model="openModal" persistent transition-show="flip-down" transition-hide="flip-up">
        <q-card>
            <div class="popup__wrapper">
                <div class="popup">
                <h2 class="popup__title"> {{ text }} </h2>
                <div class="game-body__text popup__text" v-html="question_set[question_number]['choices'][choice]['reaction_text']"> </div>
                    <div class="popup__status-bar">
                        <div class="game-header__status-bar status-bar">
                            <div class="status-bar__card">
                            <img src="../img/money2.png" alt="Money" class="status-bar__image">
                            <div class="status-bar__title"> {{ json['S']['res_money'] }} </div>
                            <div class="status-bar__points" :class="{ 'status-bar__points__red' : parseInt(question_set[question_number]['choices'][choice]['reaction_params']['money']) < 0, 'status-bar__changes--green' : parseInt(question_set[question_number]['choices'][choice]['reaction_params']['money']) > 0}"> {{ question_set[question_number]['choices'][choice]['reaction_params']['money'] }} </div>
                            </div>
                            <div class="status-bar__card">
                            <img src="../img/nerve2.png" alt="Nerve" class="status-bar__image">
                            <div class="status-bar__title"> {{ json['S']['res_nerves'] }} </div>
                            <div class="status-bar__points" :class="{ 'status-bar__points__red' : parseInt(question_set[question_number]['choices'][choice]['reaction_params']['nerves']) < 0, 'status-bar__changes--green' : parseInt(question_set[question_number]['choices'][choice]['reaction_params']['nerves']) > 0}"> {{ question_set[question_number]['choices'][choice]['reaction_params']['nerves'] }} </div>
                            </div>
                            <div class="status-bar__card">
                            <img src="../img/legal2.png" alt="Legal" class="status-bar__image">
                            <div class="status-bar__title"> {{ json['S']['res_legal'] }} </div>
                            <div class="status-bar__points" :class="{ 'status-bar__points__red' : parseInt(question_set[question_number]['choices'][choice]['reaction_params']['legal']) < 0, 'status-bar__changes--green' : parseInt(question_set[question_number]['choices'][choice]['reaction_params']['legal']) > 0}"> {{ question_set[question_number]['choices'][choice]['reaction_params']['legal'] }} </div>
                            </div>
                            <div class="status-bar__card">
                            <img src="../img/reputation2.png" alt="Reputation" class="status-bar__image">
                            <div class="status-bar__title"> {{ json['S']['res_reputation'] }} </div>
                            <div class="status-bar__points" :class="{ 'status-bar__points__red' : parseInt(question_set[question_number]['choices'][choice]['reaction_params']['reputation']) < 0, 'status-bar__changes--green' : parseInt(question_set[question_number]['choices'][choice]['reaction_params']['reputation']) > 0}"> {{ question_set[question_number]['choices'][choice]['reaction_params']['reputation'] }} </div>
                            </div>
                        </div>
                    </div>
                    <div class="popup__button">
                        <button class="button" @click="acceptChanges">
                            <span> {{ json['S']['next'] }} </span>
                        </button>
                    </div>
                </div>
            </div>
        </q-card>
    </q-dialog>
  </q-page>
</template>

<script>

export default {
  data () {
    return {
      textEntries: [
        this.json.S.modal_title_1,
        this.json.S.modal_title_2,
        this.json.S.modal_title_3
      ],
      text: 'Що ж сталося далі?'
    }
  },
  props: ['open-modal', 'choice', 'question_set', 'question_number', 'money-change', 'json'],
  methods: {
    acceptChanges () {
      this.$emit('next-question')
      this.text = this.textEntries[Math.trunc(Math.random() * this.textEntries.length)]
    }
  }
}

</script>
