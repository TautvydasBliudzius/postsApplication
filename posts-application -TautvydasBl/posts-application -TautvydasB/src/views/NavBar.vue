<template>
  <div id="nav">
    <nav class="container navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="/">PostApp</a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="navbar-nav mr-auto">
          <router-link to="/" class="nav-item nav-link">Home</router-link>
          <router-link to="/authors" class="nav-item nav-link"
            >Authors</router-link
          >
          <router-link to="/posts" class="nav-link">Posts</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<style>
#nav {
  text-align: center;
  margin: 0;
}
.container-fluid {
  max-width: 100vw;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  padding-left: 1rem;
}

#nav a.router-link-exact-active {
  color: whitesmoke;
  background: rgb(129, 128, 129);
  border-radius: 0.5rem;
}
#navbarSupportedContent {
  justify-content: right;
}


</style>
