<template>
  <div>
    <header id="front_header" class="front-header">
      <div class="container">
        <div class="row align-items-center">
          <nav class="col-12 d-flex align-items-center">
            <a class="logo" href="https://dk.ge">
              <img src="../../assets/image/logo.svg" alt="logo">
            </a>
            <div class="menu ms-auto" :class="isActive == true ? 'active' : ''">
              <ul class="navbar-menu">
                <!-- <li class="nav-link"><a @click="navLinkForBody" href="https://dk.ge/FAQ">ვაკანსიის განთავსება</a></li>
                <li class="nav-link d-none"></li>
                <li class="nav-link"><a @click="navLinkForBody" href="https://dk.ge/Training">სასწავლო პროგრამები</a></li> -->
                <li><router-link to="/Signin">შესვლა</router-link></li>
                <li class="btn btn-primary w-100"><router-link class="text-white text-sm" to="/Signup">რეგისტრაცია</router-link></li>

              </ul>
              <!-- <ul class="navbar-menu-auth">
                <li class="nav-link-auth">გაქვთ ანგარიში? <router-link  @click="menu()" to="/Signin"><span>შესვლა</span></router-link> </li>
                <li class="nav-link-auth"><router-link @click="menu" to="/Signup"><button class="btn-auth">რეგისტრაცია</button></router-link></li>
              </ul> -->
            </div>
            <div class="burger-container" :class="{ active: isActive }" @click="menu">
              <div class="burger_main-line"></div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      isActive: false,
    }
  },
  methods: {
    menu() {
      this.isActive = !this.isActive;
      const body = document.body;
      body.classList.toggle('overflow-hidden');
    },
    navLinkForBody() {
      const body = document.body;
      body.classList.remove('overflow-hidden');
    }
  }
}
</script>

<style scoped>


/* Header */
.front-header {
  position: fixed;
  top:0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  height: 82px;
  background: #FFFFFF;
  border-bottom: 1px solid #F2F2F2;

  z-index: 1000;
}


.front-header .logo {
  /*font-family: var(--Second-Font);*/
  /*font-style: normal;*/
  /*font-weight: 700;*/
  /*font-size: 24px;*/
  /*line-height: 27px;*/

  /*color: var(--Second-Color);*/
  max-width: 250px;
}
.front-header .logo img {
  width: 100%;
}
.front-header .navbar-menu {
  list-style: none;
  display: flex;
  gap: 22px;
  align-items: center;
  margin:0;
  padding-top: 2px;
}
.front-header .navbar-menu .nav-link {
  padding: 0;
}
.front-header .navbar-menu li a {
  font-family: var(--First-Font);
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;

  color: var(--Second-Color);
  text-decoration: none;

  transition: 0.3s;
}
.front-header .navbar-menu li a:hover {
  color: var(--Second-Color-Menu-Hover);
}
.front-header .navbar-menu li:nth-child(4) a {
  background: var(--First-Color);
  height: 39px;
  border: 1px solid transparent;
  border-radius: 10px;
  padding: 11px 14px;
  margin-left: 3px;
  font-size: 14px;
  color: var(--Second-Color);
  transition: 0.3s;
}
.front-header .navbar-menu li:nth-child(4) a:hover {
  background: var(--Second-Color-Background-Btn-Hover);
}
.front-header .burger-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 25px;
  margin-left: auto;
  cursor: pointer;
}
.front-header .burger-container .burger_main-line {
  position: relative;
  width: 11.67px;
  height: 2px;
  background: var(--Second-Color);
  border-radius: 2px;
}
.front-header .burger-container .burger_main-line:before {
  position: absolute;
  content: '';
  width: 16.3px;
  height: 2px;
  background: var(--Second-Color);
  border-radius: 2px;
  top: -7.29px;
  transition: all 0.3s;
}
.front-header .burger-container .burger_main-line:after {
  position: absolute;
  content: '';
  width: 7px;
  height: 2px;
  background: var(--Second-Color);
  border-radius: 2px;
  bottom: -7.29px;
  transition: all 0.3s;
}
.front-header .burger-container.active {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 16px;
  margin-left: auto;
  cursor: pointer;
}
.front-header .burger-container.active .burger_main-line {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 0;
  height: 0;
  background: transparent;
}
.front-header .burger-container.active .burger_main-line:before {
  width: 14px;
  top:-1px;
  transform: rotate(45deg);
}
.front-header .burger-container.active .burger_main-line:after {
  width: 14px;
  transform: rotate(-45deg);
  bottom: -1px;
}

@media screen and (max-width: 991px) {
  .front-header {
    height: 57px;
  }
  .front-header .menu {
    position: fixed;
    flex-direction: column;
    top: 57px;
    right: -100%;
    bottom: 0;
    width: 100%;
    background: #FFFFFF;
    padding: 32px calc(var(--bs-gutter-x) * .5);
    z-index: 3;

    transition: all 0.3s;
    overflow: auto;
  }

  .front-header .menu.active {
    display: flex;
    right: 0;
  }
  .front-header .navbar-menu {
    flex-direction: column;
    align-items: start;
    padding: 0;
  }
  .front-header .navbar-menu li {
    font-family: var(--First-Font);
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;

    color: var(--Second-Color);
  }
  .front-header .navbar-menu li:nth-child(4) {
    display: none;
  }
  .front-header .navbar-menu-auth {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    list-style: none;
    padding: 0;
  }
  .front-header .navbar-menu-auth {
    list-style: none;
    padding: 0;
    margin-top: 350px;
    margin-bottom: 0;
  }
  .front-header .navbar-menu-auth li:nth-child(1) {
    display: flex;
    gap: 10px;
    font-family: var(--Third-Font);
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;

    color: var(--Second-Color);
  }
  .front-header .navbar-menu-auth li:nth-child(1) span {
    font-family: var(--Third-Font);
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    text-decoration: none;

    color: #31319D;
  }
  .front-header .navbar-menu-auth li:nth-child(1) span:hover {
    text-decoration-line: underline;
  }
  .front-header .navbar-menu-auth li:nth-child(2){
    width: 100%;
  }
  .front-header .navbar-menu-auth li:nth-child(2) button {
    width: 100%;
    height: 50px;

    background: var(--First-Color);
    border: 1px solid transparent;
    border-radius: 10px;

    font-family: var(--First-Font);
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;

    color: var(--Second-Color);
    transition: 0.3s;

  }
  .front-header .navbar-menu-auth li:nth-child(2) button:hover {
    border: 1px solid var(--Third-Color);
  }
  .front-header .logo {
    max-width: 180px;
  }
}
@media screen and (min-width: 991px) {
  .front-header .burger-container,
  .front-header .burger-container.active {
    display: none;
  }
  .navbar-menu-auth {
    display: none;
  }
}
</style>