<template>
<body>
    <header class="index-header">
      <div class="container">
        <nav class="nav">
          <ul>
            <!-- <li>
              <a href="#" class="nav__link nav__link--active"> {{ json['S']['menu_main'] }} </a>
            </li> -->
            <li>
              <a href="#about" class="nav__link"> {{ json['S']['menu_how'] }} </a>
            </li>
            <li>
              <a href="#footer" class="nav__link"> {{ json['S']['menu_about'] }} </a>
            </li>
            <li>
              <a v-if="lang == 'UA'" href="#" class="nav__link" @click="changeLanguage('EN')"> English version </a>
              <a v-if="lang == 'EN'" href="#" class="nav__link" @click="changeLanguage('UA')"> Українська версія </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    <div class="intro">
      <div class="container">
        <div class="intro__wrapper">
          <div class="intro__content">
            <a href="#" class="intro__logo logo">
              <img src="../img/logo.svg" alt="Civil Activity Quest">
            </a>
            <h1 v-if="lang == 'UA'" class="intro__title title title--main"> Демо<span style="color: #5c9393">гра</span>тія </h1>
            <h1 v-if="lang == 'EN'" class="intro__title title title--main"> Demo<span style="color: #5c9393">gra</span>tia </h1>
            <div class="intro__text">
              <p> {{ json['S']['first_game_description'] }}</p>
            </div>
            <div class="intro__button">
              <a href="#about" class="button"> {{ json['S']['main_to_rules'] }} </a>
            </div>
          </div>
          <div class="intro__image">
            <img src="../img/intro-image.svg" alt="Civil Activity Intro Image">
          </div>
        </div>
      </div>
    </div>
    <div class="about" id="about">
      <svg width="1440" height="80" viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 48.0661C0 48.0661 241.5 7.78223e-05 720 0C1198.5 -7.78221e-05 1440 48.0661 1440 48.0661V811H0V48.0661Z" fill="url(#paint0_radial)" />
        <defs>
          <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(218) rotate(48.0052) scale(1387.76 2287.34)">
            <stop stop-color="#8A3FB7" />
            <stop offset="1" stop-color="#501176" />
          </radialGradient>
        </defs>
      </svg>
      <div class="container">
        <div class="about__wrapper">
          <a >
          <h2 class="about__title title title--white"> {{ json['S']['main_rules'] }} </h2>
          </a>
          <div class="about__info">
            <p> {{ json['S']['second_game_description'] }}
            </p>
            <p> {{ json['S']['main_rules_description'] }} </p>
          </div>
          <div class="about__cards-wrapper">
            <div class="about__card">
              <img src="../img/money.png" alt="Money">
              <h3> {{ json['S']['res_money'] }} </h3>
            </div>
            <div class="about__card">
              <img src="../img/nerve.png" alt="Nerve">
              <h3> {{ json['S']['res_nerves'] }} </h3>
            </div>
            <div class="about__card">
              <img src="../img/legal.png" alt="Legal">
              <h3> {{ json['S']['res_legal'] }} </h3>
            </div>
            <div class="about__card">
              <img src="../img/reputation.png" alt="Reputation">
              <h3> {{ json['S']['res_reputation'] }} </h3>
            </div>
          </div>
          <div class="about__button">
            <a href="#" @click="readyToPlay" class="button button--white"> {{ json['S']['main_to_game'] }} </a>
          </div>
        </div>
      </div>
    </div>
    <footer class="footer" id="footer">
      <div class="container">
        <div class="footer__inner-wrapper">
          <h2 class="footer__title title"> {{ json['S']['main_about_title'] }} </h2>
          <div class="footer__description"> {{ json['S']['main_about_1'] }} <a target="_blank" href="https://demcourse.theworkademy.com/"> {{ json['S']['main_about_2'] }}</a>
          </div>
          <div class="footer__info"> {{ json['S']['main_about_3'] }} </div>
          <ul class="footer__logo-list">
            <li class="footer__logo">
              <a href="#">
                <img height=200 src="../img/footer-logo-1.png" alt="USAID">
              </a>
            </li>
            <li class="footer__logo">
              <a href="#">
                <img height=200 src="../img/footer-logo-2.png" alt="Canada">
              </a>
            </li>
            <li class="footer__logo">
              <a href="#">
                <img height=200 src="../img/footer-logo-3.png" alt="ukaid">
              </a>
            </li>
            <li class="footer__logo">
              <a href="#">
                <img height=200 src="../img/footer-logo-4.png" alt="МФВС">
              </a>
            </li>
            <li class="footer__logo">
              <a href="#">
                <img height=200 src="../img/footer-logo-5.svg" alt="ДЕМОКРАТІЯ">
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  </body>
</template>

<script>

export default {
  props: ['openWin', 'winText', 'money', 'nerves', 'legal', 'reputation', 'username', 'char_selected', 'db', 'chars_available', 'json'],
  data () {
    return {
      lang: 'UA'
    }
  },
  methods: {
    changeLanguage (l) {
      this.$emit('change-language', l)
      this.lang = l
    },
    readyToPlay () {
      this.$emit('ready-to-play', this.username)
    }
  }
}
</script>
