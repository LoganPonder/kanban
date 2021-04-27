<template>
  <div class="home flex-grow-1 d-flex flex-column">
    <div class="row">
      <div class="d-flex flex-column">
        <h1>LOGIN PAGE</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      boards: computed(() => AppState.boards)
    })
    return { state }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}

*{
  outline:1px solid red;
}
</style>
