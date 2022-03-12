<template>
  <div class="container px-4 px-lg-5">
            <!-- Heading Row-->
            <div class="row gx-4 gx-lg-5 align-items-center my-5">
                <div class="col-lg-7">
                  <MainMessages :message="messageMain"></MainMessages>
                </div>
                  <div class="col-lg-5">
                      <h1 class="font-weight-light" style="font-size:2em;">{{user_name}}</h1>
                      <p>This Route Nos Exists</p>
                      <a class="btn btn-primary" @click="$router.go(-1)">Call to Action!</a>
              </div>
            </div>
        </div>
</template>

<script lang="ts">
import {useStore} from "vuex";
import {computed,ref} from 'vue';
import MainMessages from "../components/Messages/Main.vue";
import {useRouter} from "vue-router";
export default {
  components: {MainMessages},
  name: "NotExists",
  setup() {
    const router = useRouter();
    const store = useStore();
    const user_name = computed(() => store.state.user)
    const messageMain = ref('NOT EXISTS');
    return {
      messageMain,
      user_name
    }
  }
}
</script>