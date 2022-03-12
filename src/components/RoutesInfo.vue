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
    <div class="col-md-4 mb-5" v-if="can('users.index')">
        <div class="card h-100">
            <div class="card-body">
                <h2 class="card-title">Users</h2>
                <p class="card-text">Module to show who are the Registered Users in the System</p>
            </div>
            <div class="card-footer"><a class="btn btn-primary btn-sm" href="#!">Go Users</a></div>
        </div>
    </div>
    <div class="col-md-4 mb-5" v-if="can('permissions.index')">
        <div class="card h-100">
            <div class="card-body">
                <h2 class="card-title">Permissions</h2>
                <p class="card-text">Module to show what are the routes in the system</p>
            </div>
            <div class="card-footer"><a class="btn btn-primary btn-sm" href="#!">Go Permissions</a></div>
        </div>
    </div>
    <div class="col-md-4 mb-5" v-if="can('roles_by_users.index')">
        <div class="card h-100">
            <div class="card-body">
                <h2 class="card-title">Roles By User</h2>
                <p class="card-text">Module to show which Roles Have every User Registered in the System</p>
            </div>
            <div class="card-footer"><a class="btn btn-primary btn-sm" href="#!">Go Roles By Users</a></div>
        </div>
    </div>
    <div class="col-md-4 mb-5" v-if="can('permission_by_roles.index')">
        <div class="card h-100">
            <div class="card-body">
                <h2 class="card-title">Permissions By Roles</h2>
                <p class="card-text">Module to show which Permissions Have every Role Registered in the System</p>
            </div>
            <div class="card-footer"><a class="btn btn-primary btn-sm" href="#!">Go Permisions By Roles</a></div>
        </div>
    </div>
    <div class="col-md-4 mb-5" v-if="can('languages.index')">
        <div class="card h-100">
            <div class="card-body">
                <h2 class="card-title">Languages</h2>
                <p class="card-text">Module to Show An Practical Funcionality of How Works the Roles And Permissions System
                </p>
            </div>
            <div class="card-footer">
                <router-link to="/languages" class="btn btn-primary btn-sm">Go Languages</router-link>
            </div>
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
    const allowRoutes = ref([]);
    const permissions = computed(() => store.state.permissions)

    // For Futures Knowledges In this momment is not necesary
    /*store.watch((state) => state.permissions, (oldValue, newValue) => {
        if(oldValue != ''){
          //console.log(JSON.parse(oldValue));
          allowRoutes.value= JSON.parse(oldValue);
          console.log(allowRoutes.value);
        }
    })*/

    const showInfoTest =  ($routeSearch=null) => {
      var allow = false;
      let response = store.dispatch("can",$routeSearch).then(function(result) {
        allow = result;
        
      });
      //setTimeout(() => console.log(allow), 2000);
      console.log(allow);
    }
    
    const can = ($routeSearch=null) => {
      var allow = false;
      let routes_by_users = JSON.parse(JSON.stringify( permissions.value));
      for (var i = routes_by_users.length - 1; i >= 0; i--) {
        if(routes_by_users[i].route == $routeSearch || (routes_by_users[i].role == 'Admin' && 
         routes_by_users[i].route == null) ){
          allow = true;
        }
      }
      return allow;
    }

    return {
      can,
      showInfoTest
    }
  }
}
</script>