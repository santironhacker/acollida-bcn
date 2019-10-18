<template>
  <b-container fluid style="max-width: 100%">
    <b-row id="back-color">
      <b-col class="p-3 header-title title">
        <span>Acollida de Barcelona</span>
      </b-col>
      <b-navbar-toggle target="nav-collapse">
        <b-button class="p-1,5 default-button">
          <font-awesome-icon class="mr-2" icon="bars" />
          <span>MENÚ</span>
        </b-button>
      </b-navbar-toggle>
    </b-row>

    <b-row>
      <b-col>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar class="nav-dropdown-items float-right" toggleable="lg" type="light">
            <b-img
              class="m-2"
              :src="require('../assets/img/logo-acollida.png')"
              fluid
              alt="Logo acollida Barcelona"
              style="height: 6rem"
            ></b-img>
            <b-navbar-nav>
              <b-dropdown-item>
                <router-link to="/home">Inici</router-link>
              </b-dropdown-item>
              <b-dropdown-item>
                <router-link to="/about">Qui som</router-link>
              </b-dropdown-item>
              <b-dropdown-item>
                <router-link to="/campaigns">Campanyes</router-link>
              </b-dropdown-item>
              <b-dropdown-item>
                <router-link to="/prayers">Pregàries</router-link>
              </b-dropdown-item>
            </b-navbar-nav>
          </b-navbar>
        </b-collapse>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'AppHeader',
  props: {},
  data: function() {
    return {
      ex: 'This message',
      isTod: true
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav-dropdown-items {
  border: solid 1px black;
  margin-top: 1rem;
}

.nav-dropdown-items a {
  color: rgba(20, 19, 19, 0.842);
}

.nav-dropdown-items a.router-link-exact-active {
  color: #c0470b;
}

.header-title {
  text-transform: uppercase;
  color: white;
}
</style>
