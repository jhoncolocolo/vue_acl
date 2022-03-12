<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">Home</router-link>
      <div>
        <ul class="navbar-nav me-auto mb-2 mb-md-0" v-if="!auth">
          <li class="nav-item">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link">Register</router-link>
          </li>
        </ul>

        <ul class="navbar-nav me-auto mb-2 mb-md-0" v-if="auth">
          <li class="nav-item">
            <div class="nav-link">{{user_name}}</div> 
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link" @click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import {computed} from 'vue';
import {useStore} from "vuex";
import {useRouter} from "vue-router";

export default {
  name: "Navigation",
  setup() {
    const store = useStore();
    const router = useRouter();
    const auth = computed(() => store.state.authenticated)
    const user_name = computed(() => store.state.user)
    const auth_route = computed(() => store.state.permissions)

    const logout = async () => {
     await store.dispatch("logout");
     await router.push('/login');
    }

    const showInfo = async () => {
      let response = store.dispatch("can","languages.index").then(function(result) {
        console.log(result);
      });
    }

    return {
      auth,
      showInfo,
      logout,
      user_name
    }
  }
}
</script>
