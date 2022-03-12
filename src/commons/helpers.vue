<template>
    <div class="col-md-4 mb-5" v-if="can('roles.index')">
        <div class="card h-100">
            <div class="card-body">
                <h2 class="card-title">Roles</h2>
                <p class="card-text">Module to show who are the Registered Roles in the System</p>
            </div>
            <div class="card-footer"><a class="btn btn-primary btn-sm" href="#!">Go Roles</a></div>
        </div>
    </div>          
</template>

<script  lang="ts">
import {useStore} from "vuex";
import {computed,onMounted, ref} from 'vue';

export default {
  name: "RoutesInfo",
  setup() {
    const store = useStore();
    const auth_route = computed(() => store.state.authroute);
    const allowRoutes = ref([]);
    store.watch((state) => state.authroute, (oldValue, newValue) => {
        if(oldValue != ''){
          //console.log(JSON.parse(oldValue));
          allowRoutes.value= JSON.parse(oldValue);
          console.log(allowRoutes.value);
        }
    })

    const showInfoTest = async ($routeSearch=null) => {
      var allow = false;
      let routes_by_users = JSON.parse(JSON.stringify( allowRoutes.value));
      for (var i = routes_by_users.length - 1; i >= 0; i--) {
        console.log(routes_by_users[i]);
        if(routes_by_users[i].route == $routeSearch || (routes_by_users[i].role == 'Admin' && 
         routes_by_users[i].route == null) ){
          allow = true;
        }
      }
      return allow;
    }
    
    const can = ($routeSearch=null) => {
      var allow = false;
      let routes_by_users = JSON.parse(JSON.stringify( allowRoutes.value));
      for (var i = routes_by_users.length - 1; i >= 0; i--) {
       if(routes_by_users[i].route == $routeSearch  || (routes_by_users[i].role == 'Admin' &&  routes_by_users[i].route == null) ){
          allow = true;
        }
      }
      return allow;
    }

    return {
      can,
      showInfoTest,
      allowRoutes
    }
  }
}
</script>