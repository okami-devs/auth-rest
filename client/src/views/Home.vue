<template>
  <div class="jumbotron">
    <h1 class="display-3">
      Auth app!
    </h1>
    <p class="lead">This is the basic Auth app!</p>
    <hr class="my-4" />
    <p class="lead">
      <router-link class="btn btn-primary btn-lg"
        :to="{ name:'Signup' }" role="button">Sign Up!
      </router-link>
    </p>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {},
};
</script>
