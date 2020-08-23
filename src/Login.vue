<template>
    <section>
        <form>
          <div class="form-group">
            <label for="auth-login">Логин</label>
            <input type="text" 
                class="form-control" 
                id="auth-login" 
                @keyup.enter="auth"
                v-model="login">
          </div>
          <div class="form-group">
            <label for="auth-password">Пароль</label>
            <input type="password" 
                class="form-control" 
                id="auth-password" 
                v-model="password"
                @keyup.enter="auth"
            >
          </div>
          <div v-if="errorMessage" class="alert alert-danger" role="alert">{{ errorMessage }}</div>
          <input type="button" class="btn btn-primary" @click="auth" value="Вход" :disabled="!!errorMessage" />
          <input type="button" class="btn btn-primary" @click="reg" value="Регистрация" />
      </form> 
    </section>      
</template>
<script>
export default {
    data() {
        return {
            login: 'admin1',
            password: '123456',
            errorMessage: null
        }
    },
    methods: {
        async auth() {
            if (!this.login || !this.password) {
                this.errorMessage = "Заполните все поля!"
                return;
            }

            const resp = await this.$rest.login({
                login: this.login,
                password: this.password,
            });

            if (resp.errorText) {
                this.errorMessage = resp.errorText;
            } else {
                this.$router.push({path: 'dashboard'});                
            }                
        },         
        reg() {
            this.$router.push({path: '/reg'})
        }
    },
    watch: {
        login() {
            this.errorMessage = '';
        },
        password() {
            this.errorMessage = '';
        }
    }
}
</script>