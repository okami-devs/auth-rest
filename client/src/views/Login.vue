<template>
  <div class="jumbotron">
    <h1>
      Login
    </h1>
    <div class="alert alert-dismissible alert-danger" v-if="!valid">
      <button type="button" @click="valid=true" class="close" data-dismiss="alert">&times;</button>
      <strong>Oh snap!</strong>
      {{error}}
    </div>
    <form @submit.prevent="login">
      <fieldset>
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            class="form-control"
            id="username"
            aria-describedby="emailHelp"
            placeholder="Enter username"
            required
            v-model="user.username"
          />
          <small
            id="usernameHelp"
            class="form-text text-muted"
          >Your user name must be at leat 6 character long</small>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Enter password"
            required
            v-model="user.password"
          />
          <small
            id="passwordHelp"
            class="form-text text-muted"
          >Your password should be between 8 and 30 long and have at least 1 number</small>
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      </fieldset>
    </form>
  </div>
</template>

<script>
const Joi = require('@hapi/joi');
const axios = require('axios');

const LOGIN_URL = '/auth/login';
const userSchema = Joi.object({
  username: Joi.string().alphanum().min(6).max(20)
    .required(),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'))
    .required(),
});

export default {
  name: 'Login',
  data() {
    return {
      valid: true,
      error: '',
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      if (this.validateUser()) {
        axios.post(LOGIN_URL, this.user)
          .then((res) => {
            this.valid = true;
            sessionStorage.setItem('token', res.data.token);
            this.$router.push({ name: 'Main' });
          }).catch((err) => {
            this.error = err.response.data.message;
            this.valid = false;
            throw err;
          });
      }
    },
    validateUser() {
      this.error = '';
      let valid = true;
      const { error } = userSchema.validate(this.user);
      if (error) {
        valid = false;
        this.valid = false;
        this.error = error;
      }
      return valid;
    },
  },
};
</script>
