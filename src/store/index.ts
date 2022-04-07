import {Commit, createStore} from 'vuex'
import {useRouter} from "vue-router";

export default createStore({
    state: {
        authenticated: false,
        userinfo: '',
        authroute: '',
        user: null,
        permissions: null
    },
    mutations: {
        SET_AUTH: (state: { authenticated: boolean }, auth: boolean) => state.authenticated = auth,
        SET_USERNAME: (state: { userinfo: string }, user_name: string) => state.userinfo = user_name,
        SET_AUTHROUTE: (state: { authroute: string }, auth_route: string) => state.authroute = auth_route,
        SET_USER(state,user){
            state.user = user
        },
        SET_PERMISSIONS(state,permissions){
            state.permissions = permissions
        }
    },
    actions: {
        setAuth: ({commit}: { commit: Commit }, auth: boolean) => commit('SET_AUTH', auth),
        setUserName: ({commit}: { commit: Commit }, user_name: string) => commit('SET_USERNAME', user_name),
        setAuthRoute: ({commit}: { commit: Commit }, auth_route: string) => commit('SET_AUTHROUTE', auth_route),
        async logout({commit},credentials){
            await fetch(process.env.VUE_APP_API_URL+'/api/logout', {
                method: 'POST',
                headers: { authorization: "Bearer " + localStorage.getItem('token') }
                }).then(data => {
                commit("SET_AUTH", false);
                commit("SET_USER", null);
                commit("SET_PERMISSIONS" , null);
                window.localStorage.clear();
               // console.log("Entre a asigar");
            }).catch(()=>{
                commit("SET_AUTH", false);
                commit("SET_USER", null);
                commit("SET_PERMISSIONS" , null);
            });
        },
        getUser({commit}){

            return new Promise((resolve, reject) => {
                 fetch(process.env.VUE_APP_API_URL+'/api/user', {
                        headers: { authorization: "Bearer " + localStorage.getItem('token') }
                })
                  .then((response) => {
                      if (response.status != 200) {
                        commit("SET_AUTH", false);
                        commit("SET_USER", null);
                        commit("SET_PERMISSIONS" , null);
                        resolve(false);
                      }    
                      return response.json();
                  })
                  .then(data => {
                    commit("SET_AUTH", true);
                    commit("SET_USER", data.name);
                    commit("SET_PERMISSIONS", (data.permissions == [] ? null : data.permissions));
                    resolve(true);
                  }).catch(()=>{
                    commit("SET_AUTH", false);
                    commit("SET_USER", null);
                    commit("SET_PERMISSIONS" , null);
                    reject(false);
                  });
            })
        },
        async can({dispatch},$route){
            let allow = false;
            const  routes_by_users = JSON.parse(JSON.stringify( this.state.permissions));
            //console.log("estandio desdes can");
            //console.log(routes_by_users == '');
            for (let i = routes_by_users.length - 1; i >= 0; i--) {
                if(routes_by_users[i].route == $route || (routes_by_users[i].role == 'Admin' && 
                 routes_by_users[i].route == null) ){
                  allow = true;
                }
            }
            return allow;
        },
        async myAction({dispatch},$route) {
            return new Promise((resolve, reject) => {
                const  routes_by_users = JSON.parse(JSON.stringify( this.state.permissions));
                for (let i = routes_by_users.length - 1; i >= 0; i--) {
                    if(routes_by_users[i].route == $route || (routes_by_users[i].role == 'Admin' && 
                     routes_by_users[i].route == null) ){
                      resolve(true);
                    }
                }
                reject(false);
            })
        },
        async canAllow({dispatch},$route){
            let allow = false;
            //console.log("Llego cannAllow");
            if(!this.state.permissions){
                //console.log("llegoas a antes del observadort");
                const response = await dispatch("getUser");
                if(!response){
                    allow = false;
                }else{
                    await dispatch("can",$route).then(function(result) {
                        allow = result;
                    });
                }
            }else{
                //console.log("llegoas a antes del que no es  observadort");
                await dispatch("can",$route).then(function(result) {
                    //console.log("LLEgo al que no es observador");
                    //console.log(result);
                    allow = result;
                });
            }
            //console.log("Ya voy a devolverer "+allow);
            return await allow;
        },
    },
    modules: {}
})