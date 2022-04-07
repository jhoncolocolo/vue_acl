<template>
  <div class="form-signin">
    <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

      <input v-model="data.email" type="email" class="form-control" placeholder="Email" required>

      <input v-model="data.password" type="password" class="form-control" placeholder="Password" required>

      <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
    </form>
  </div>
</template>

<script lang="ts">
import {reactive} from 'vue';
import {useRouter} from "vue-router";

export default {
  name: "Login",
  setup() {
    const data = reactive({
      email: '',
      password: ''
    });
    const router = useRouter();

    const submit = async () => {
      await fetch(process.env.VUE_APP_API_URL+'/api/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(data)
      }).then((response) => {
            if (response.status !== 200) {
                throw new Error(response.statusText);
            }    
            return response.json();
        })
        .then(data => {
            localStorage.setItem('token',data.message);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

      await router.push('/');
    }

    return {
      data,
      submit
    }
  }
}
</script>