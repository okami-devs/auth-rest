<template>
  <div>
    <h1>Congratz {{data.user.token}}</h1>
    <h2>You have, {{message}} </h2>
  </div>
</template>

<script>
const axios = require('axios');

const TEST_URL = '/test';

export default {
  name: 'Main',
  data() {
    return {
      token: '',
      data: {
        user: {},
      },
      message: '',
      validToken: false,
    };
  },
  created() {
    this.token = sessionStorage.token;
    axios.get(TEST_URL, {
      headers: {
        Authorization: this.token,
      },
    }).then((res) => {
      this.data = res.data.data;
      this.message = res.data.message;
    }).catch(() => {
      this.$router.push({ name: 'Login' });
    });
  },
};
</script>
