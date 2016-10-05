<template>
  <header class="header">
    <nav class="navbar">
      <h1 class="brand"><router-link to="/">WEDN.NET</router-link></h1>
      <ul class="nav">
        <li class="nav-item"><router-link to="/dashboard">Dashboard</router-link></li>
        <li class="nav-item"><router-link to="/demo">Demo</router-link></li>
      </ul>
      <ul class="nav nav-right">
        <li class="nav-item"><router-link to="/about">About</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
  export default {
    name: 'header'
  }
</script>

<style lang="less">
  @bg-color: #373a3c;
  .header .navbar {
    display: flex;
    height: 3.5rem;
    padding: 0 1rem;
    border-bottom: .0625rem solid darken(@bg-color, 5%);
    background-color: @bg-color;
    color: #fff;
    .brand {
      margin: 0;
      // height: 3.5rem;
      font-size: 1.2rem;
      a {
        display: inline-block;
        padding: 1rem 0;
        line-height: 1.5rem;
        color: rgba(255, 255, 255, .9);
        &:hover {
          color: #fff;
        }
      }
    }
    .nav {
      display: flex;
      flex: 1;
      padding: 0;
      margin: 0 0 0 .5rem;
      list-style: none;
      &-right {
        flex: 0;
      }
      &-item {
        margin-left: 1rem;
        a {
          display: inline-block;
          padding: 1rem 0;
          line-height: 1.5rem;
          color: rgba(255, 255, 255, .5);
        }
        &:hover a,
        a.router-link-active {
          color: rgba(255, 255, 255, .9);
        }
      }
    }
  }
</style>
