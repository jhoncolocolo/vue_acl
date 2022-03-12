<template>
  <div class="row" style="margin: 0% 15%;">
        <div class="col-12">
            <div class="card">
                <div class="card-header"><h4>Create New Language</h4></div>
                <div class="card-body">
                    <form @submit.prevent="create">
                        <div class="row">
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Name In English</label>
                                    <input type="text" class="form-control" v-model="language.name_en">
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="form-group">
                                    <label>Name In Spanish</label>
                                    <input type="text" class="form-control" v-model="language.name_es">
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                 <div class="form-floating">
                                    <textarea class="form-control" id="floatingTextarea2" v-model="language.meaning_name_en" style="height: 100px"></textarea>
                                    <label for="floatingTextarea2">Meaning Word In English</label>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="form-floating">
                                    <textarea class="form-control" id="floatingTextarea2" v-model="language.meaning_name_es" style="height: 100px"></textarea>
                                    <label for="floatingTextarea2">Meaning Word In Spanish</label>
                                </div>
                            </div>
                            <div class="col-12">
                                <button type="submit" class="btn btn-primary">Save</button>
                            </div>
                        </div>                        
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "LanguageCreate",
  data(){
        return {
            language:{
                name_en:"",
                name_es:"",
                meaning_name_en:"",
                meaning_name_es:""
            }
        }
    },
    methods:{
        create(){
            fetch('http://localhost:8000/api/languages', {
                method:"POST",
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body:JSON.stringify(this.language)
                })
            .then((response) => {
                if (response.status != 200) {
                    alert("Error: " + response.statusText);
                }    
                return response.json();
            })
            .then(data => {
              this.$router.push({name:"languages.index"})
            });
        }
    }
}
</script>