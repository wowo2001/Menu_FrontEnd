
<template>
    <p>Login</p>
    <input v-model="username" placeholder="用户名">
    <input v-model="password" type="password" placeholder="密码">
    <div>
        <button @click="passwordLogin">Login</button>
    </div>
</template>

<script>
    import config from '.././config';
    import axios from 'axios';
    
    export default {
        data() {
            return {
                username: '',  // Bind username input
                password: '',  // Bind password input
            };
        },
        async mounted() {
            await this.tokenLogin();
        },
        methods: {
            async tokenLogin() {
                if (localStorage.getItem('authToken') != null) {
                    const apiHost = config.authentication_url;
                    const response = await axios.post(`${apiHost}/authentication/tokenLogin`, {
                        token: localStorage.getItem('authToken'),
                    });
                    if ((response.status === 200) && (response.data.status === "success")) {
                        localStorage.setItem('authToken', response.data.token);
                        this.$store.commit('setAuthenticated', true);
                        this.$router.push('/plan'); // Redirect to protected page},
                    }
                }
               
            },
            async passwordLogin() {
                const apiHost = config.authentication_url;
                const response = await axios.post(`${apiHost}/authentication/passwordLogin`, {
                    username: this.username,
                    password: this.password,
                });
                if ((response.status === 200) && (response.data.status === "success")) {

                    localStorage.setItem('authToken', response.data.token);
                    this.$store.commit('setAuthenticated', true);
                    this.$router.push('/plan'); // Redirect to protected page
                }
                else {
                    alert("登陆失败");
                }
      
    },
  },
};
</script>

