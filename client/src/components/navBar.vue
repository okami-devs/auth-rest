<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand" :to="{ name: 'Home' }" >
      Basic Login
    </router-link>
    <div class="collapse navbar-collapse" id="navbarColor01">
      <ul class="navbar-nav mr-auto my-2 my-lg-0">
        <li class="nav-item active">
          <router-link
            class="nav-link"
            v-if="!logedIn"
            :to="{name:'Signup'}">
            Signup
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            v-if="!logedIn"
            :to="{name:'Login'}">
            Login
          </router-link>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            v-if="logedIn"
            href="#"
            @click.once="logout">
            Logout
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      logedIn: false,
    };
  },
  methods: {
    logout() {
      sessionStorage.removeItem('token');
      this.logedIn = false;
      this.$router.go('/');
    },
  },
  created() {
    if (sessionStorage.token) {
      this.logedIn = true;
    }
  },
};
</script>
