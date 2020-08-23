<template>
    <section>
        <div class="h2 text-center">Регистрация</div>
        <form>
          <div class="form-group">
            <label for="reg-login">логин</label>
            <input type="text" 
                class="form-control" 
                id="reg-login" 
                v-model="login"
                @keyup.enter="registration">
          </div>
          <div class="form-group">
            <label for="reg-password">Пароль</label>
            <input type="password" 
                class="form-control" 
                id="reg-password" 
                v-model="password"
                @keyup.enter="registration"
            >
          </div>
          <div class="form-group">
            <label for="reg-passwordConfirm">Подтверждение пароля</label>
            <input type="password" 
                class="form-control" 
                id="reg-passwordConfirm" 
                v-model="passwordConfirm"
                @keyup.enter="registration"
            >
          </div>
          <div class="form-group">
            <label for="reg-name">Имя</label>
            <input type="text" 
                class="form-control" 
                id="reg-name" 
                v-model="name"
                @keyup.enter="registration"
            >
          </div>
          <div v-if="errorMessage" class="alert alert-danger" role="alert">{{ errorMessage }}</div>
          <input type="button" class="btn btn-primary" @click="registration" value="Зарегистрироваться" :disabled="!!errorMessage" />
      </form> 
    </section>      
</template>
<script>

export default {
    data() {
        return {
            login: null,
            password: null,
            passwordConfirm: null,
            name: null,
            errorMessage: null
        }
    },
    methods: {
        async registration(){
            if (!this.login ||
                !this.password ||
                !this.passwordConfirm ||
                !this.name
            ) {
                this.errorMessage = "Заполните все поля";
                return;
            }

            if( this.password !== this.passwordConfirm ) {
                this.errorMessage = "Пароли не совпадают";
                return;
            }

            this.errorMessage = '';

            const resp = await this.$rest.registration({
                 login: this.login,
                 password: this.password,
                 passwordConfirm: this.passwordConfirm,
                 name: this.name
            });

            if (resp.errorText)
                 this.errorMessage = resp.errorText;
            else this.$router.push({path: '/dashboard'});
         }   
    },
    watch: {
        login() {
            this.errorMessage = '';
        },
        password() {
            this.errorMessage = '';
        },
        passwordConfirm() {
            this.errorMessage = '';
        },
        name() {
            this.errorMessage = '';
        }
        
    }
}
</script>