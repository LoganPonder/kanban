<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer>
    <div class="text-muted text-center p-4">
      Kanban &copy; 2021 || LLC
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}

</script>
<style lang="scss">
@import "/./assets/scss/main.scss";
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,400;0,800;1,200&family=Roboto&display=swap');

footer {
  background-color: $bg-dark;
}
</style>
