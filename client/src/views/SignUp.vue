<template>
  <div class="jumbotron">
    <h1>Signup</h1>
    <div class="alert alert-dismissible alert-success" v-if="success">
      <button type="button"
        @click="success=false"
        class="close" data-dismiss="alert">&times;</button>
      <strong>Well done!</strong> You successfully created a 😎!
    </div>
    <div class="alert alert-dismissible alert-danger" v-if="!valid">
      <button type="button" @click="valid=true" class="close" data-dismiss="alert">&times;</button>
      <strong>Oh snap!</strong>
      {{error}}
    </div>
    <form @submit.prevent="signup">
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
        <div class="form-group">
          <label for="confirmPassword">Confirm password</label>
          <input
            type="password"
            class="form-control"
            id="confirmPassword"
            placeholder="Confirm you password"
            required
            v-model="user.confirmPassword"
          />
          <small
            id="passwordHelp"
            class="form-text text-muted"
          >Your password should be between 8 and 30 long and have at least 1 number</small>
        </div>
        <button type="submit" class="btn btn-primary">Signup</button>
      </fieldset>
    </form>
  </div>
</template>

<script>
const Joi = require('@hapi/joi');
const axios = require('axios');

const SIGNUP_URL = 'http://localhost:5000/auth/signup';
const userSchema = Joi.object({
  username: Joi.string().alphanum().min(6).max(20)
    .required(),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'))
    .required(),
  confirmPassword: Joi.ref('password'),
});

export default {
  name: 'signup',
  data() {
    return {
      valid: true,
      success: false,
      error: '',
      user: {
        username: '',
        password: '',
        confirmPassword: '',
      },
    };
  },
  methods: {
    signup() {
      if (this.validateUser()) {
        const body = {
          username: this.user.username,
          password: this.user.password,
        };
        axios.post(SIGNUP_URL, body)
          .then(() => {
            this.valid = true;
            this.success = true;
            this.$router.push({ name: 'Login' });
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
