<template>
  <div class="container px-4 px-lg-5">
            <!-- Heading Row-->
            <div class="row gx-4 gx-lg-5 align-items-center my-5">
                <div class="col-lg-7">
                  <MainMessages :message="messageMain"></MainMessages>
                </div>
                <div class="col-lg-5">
                    <p style="font-size:2em;text-align: center;" v-if="auth"><b>Welcome</b></p>
                    <h1 class="font-weight-light" style="font-size:1.8em;text-align: center;" v-if="auth">{{ user_name }}</h1>
                    <p style="font-size:1.6em;text-align: center;" v-if="auth"> You are in <b>Home Page</b></p>
                    <p style="font-size:1.4em;text-align: center;"> This is the system Of Roles And Permissions!</p>
                </div>
            </div>
            <!-- Content Row-->
            <div v-if="permissions != null" class="row gx-4 gx-lg-5">
                <RoutesInfo></RoutesInfo>
            </div>
        </div>
</template>

<script lang="ts">
import {onMounted, ref,computed} from 'vue';
import {useStore} from "vuex";
import MainMessages from "../components/Messages/Main.vue";
import RoutesInfo from "../components/RoutesInfo.vue";
import {useRouter} from "vue-router";

export default {
  components: {MainMessages,RoutesInfo},
  name: "Home",
  setup() {
    const router = useRouter();
    const message = ref('You are not logged in!');
    const messageMain = ref('DEFAULT');
    const store = useStore();
    const user_name = computed(() => store.state.user)
    const permissions = computed(() => store.state.permissions);
    const auth = computed(() => store.state.authenticated)

    onMounted(async () => {
        let response = await store.dispatch("getUser");
        if(!response){
          await console.log("No estoy aut");
          //await router.push('/login');
        }else{
          messageMain.value = `ALLOW`;
          console.log(" estoy aut");
        }
    });
    return {
      message,
      messageMain,
      user_name,
      permissions,
      auth
    }
  }
}
</script>