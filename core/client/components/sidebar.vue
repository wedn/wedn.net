<template>
  <aside class="sidebar">
    <div class="search">
      <el-input placeholder="请输入内容">
        <el-button slot="append" icon="search"></el-button>
      </el-input>
    </div>
    <nav class="navbar">
      <ul class="nav">
        <li class="nav-item"><router-link to="/dashboard"><i class="el-icon-upload"></i> Dashboard</router-link></li>
        <li class="nav-item"><router-link to="/dashboard"><i class="el-icon-upload"></i> Dashboard</router-link></li>
        <li class="nav-item"><router-link to="/dashboard"><i class="el-icon-upload"></i> Dashboard</router-link></li>
        <li class="nav-item"><router-link to="/dashboard"><i class="el-icon-upload"></i> Dashboard</router-link></li>
      </ul>
    </nav>
    <div class="meta">
      <p>&copy; WEDN.NET</p>
    </div>
  </aside>
</template>

<script>
  export default {
    name: 'sidebar'
  }
</script>

<style lang="less">
  @bg-color: #373a3c;
  .sidebar {
    display: flex;
    flex-direction: column;
    width: 14rem;
    background-color: @bg-color;
    color: #fff;
    .search {
      padding: 1rem .6rem;
      border-bottom: .0625rem solid darken(@bg-color, 5%);
      .el-input__inner {
        color: #fff;
        background-color: lighten(@bg-color, 5%);
        border-color: darken(@bg-color, 5%);
      }
      .el-input-group__append {
        background-color: lighten(@bg-color, 5%);
        border-color: darken(@bg-color, 5%);
      }
    }
    .navbar {
      display: flex;
      flex: 1;
      .nav {
        flex: 1;
        margin: 0;
        padding: 0;
        .nav-item {
          border-bottom: .0625rem solid darken(@bg-color, 4%);
          a {
            display: block;
            color: rgba(255, 255, 255, .7);
            font-size: .875rem;
            line-height: 1.5;
            padding: .6rem 1rem;
            i {
              vertical-align: baseline;
              margin-right: .5rem;
            }
            &:hover {
              color: rgba(255, 255, 255, .9);
              background-color: darken(@bg-color, 2%);
            }
          }
        }
      }
    }
    .meta {
      color: #ccc;
      padding: 0 1rem;
      font-size: .8rem;
      line-height: 2;
      border-top: .0625rem solid darken(@bg-color, 5%);
    }
  }
</style>
