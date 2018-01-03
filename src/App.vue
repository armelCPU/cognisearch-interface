<template>
    <div id="app">
          <transition
              :duration="100"
              name="custom-classes-transition"
              enter-active-class="animated fadeIn">
              <router-view></router-view>
          </transition>
      </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
    @import './assets/sass/app';
</style>
