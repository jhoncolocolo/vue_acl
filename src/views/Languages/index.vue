<template>
    <div class="row" style="margin: 0% 20%;">
        <div class="col-12">             
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead class="bg-primary text-white">
                                <tr>
                                    <th>Name English</th>
                                    <th>Name Spanish</th>
                                    <th>Meaning English</th>
                                    <th>Meaning Spanish</th>
                                    <th><router-link :to='{name:"languages.create"}' class="btn btn-success">Create</router-link></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="language in languages" :key="language.id">
                                    <td>{{ language.name_en }}</td>
                                    <td>{{ language.name_es }}</td>
                                    <td>{{ language.meaning_name_en }}</td>
                                    <td>{{ language.meaning_name_es }}</td>
                                    <td>
                                    <router-link :to='{name:"languages.edit",params:{id:language.id}}' class="btn btn-info">&#9997;</router-link>
                                    <a type="button" @click="deleteLanguage(language.id)" class="btn btn-danger">&#9940;</a>
                                    </td>
                                </tr>
                            </tbody>
                            
                        </table>
                    </div>                          
        </div>
    </div>
</template>

<script>
export default {
    name:"LanguageIndex",
    data(){
        return {
            languages:[]
        }
    },
    mounted(){
        this.showLanguages()
    },
    methods:{
         showLanguages(){
          fetch(process.env.VUE_APP_API_URL+'/api/languages', {
                headers: { authorization: "Bearer " + localStorage.getItem('token') }
              })
          .then((response) => {
              if (response.status != 200) {
                  alert("Error: " + response.statusText);
              }    
              return response.json();
          })
          .then(data => {
            this.languages = data;
          });
        },
        async deleteLanguage(id){
            if(confirm("¿Confirm That Tou Wish Delete This Registry?")){
                try {
                  await fetch(`http://localhost:8000/api/languages/${id}`, {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
                  });
                  await this.showLanguages()
                } catch (e) {
                  console.log(e)
                }
            }
        }
    }
}
</script>