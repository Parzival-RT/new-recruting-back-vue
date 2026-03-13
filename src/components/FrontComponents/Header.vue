<template>
  <div>
    <header id="front_header" class="front-header">
      <div class="container">
        <div class="row align-items-center">
          <nav class="col-12 d-flex align-items-center">
            <a class="logo" href="https://jobs.dk.ge">
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

/* ── Header bar ── */
.front-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  height: 82px;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  z-index: 1000;
  box-shadow: 0 1px 8px -2px rgba(0,0,0,0.06);
}

/* ── Logo ── */
.front-header .logo {
  max-width: 250px;
  flex-shrink: 0;
}
.front-header .logo img {
  width: 100%;
  display: block;
}

/* ── Nav menu (desktop) ── */
.front-header .navbar-menu {
  list-style: none;
  display: flex;
  gap: 8px;
  align-items: center;
  margin: 0;
  padding: 0;
}

.front-header .navbar-menu li a {
  font-size: 0.9375rem;
  font-weight: 500;
  color: #374151;
  text-decoration: none;
  transition: color 0.15s;
}
.front-header .navbar-menu li a:hover {
  color: #2563eb;
}

/* ── Register button (Bootstrap .btn.btn-primary in nav) ── */
.front-header .navbar-menu .btn.btn-primary {
  background: #2563eb !important;
  border-color: #2563eb !important;
  border-radius: 0.625rem !important;
  /* padding: 0 !important; */
  line-height: 1 !important;
  box-shadow: none !important;
}
.front-header .navbar-menu .btn.btn-primary a {
  display: block;
  padding: 0.5rem 1rem;
  color: #fff !important;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
}
.front-header .navbar-menu .btn.btn-primary:hover {
  background: #1d4ed8 !important;
  border-color: #1d4ed8 !important;
}

/* ── Burger icon ── */
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
  background: #374151;
  border-radius: 2px;
}
.front-header .burger-container .burger_main-line:before {
  position: absolute;
  content: '';
  width: 16.3px;
  height: 2px;
  background: #374151;
  border-radius: 2px;
  top: -7.29px;
  transition: all 0.3s;
}
.front-header .burger-container .burger_main-line:after {
  position: absolute;
  content: '';
  width: 7px;
  height: 2px;
  background: #374151;
  border-radius: 2px;
  bottom: -7.29px;
  transition: all 0.3s;
}
.front-header .burger-container.active {
  width: 28px;
  height: 16px;
}
.front-header .burger-container.active .burger_main-line {
  width: 0;
  height: 0;
  background: transparent;
}
.front-header .burger-container.active .burger_main-line:before {
  width: 14px;
  top: -1px;
  transform: rotate(45deg);
}
.front-header .burger-container.active .burger_main-line:after {
  width: 14px;
  transform: rotate(-45deg);
  bottom: -1px;
}

/* ── Mobile ── */
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
    background: #ffffff;
    padding: 32px calc(var(--bs-gutter-x, 12px) * .5);
    z-index: 3;
    transition: all 0.3s;
    overflow: auto;
    border-top: 1px solid #e5e7eb;
  }
  .front-header .menu.active {
    display: flex;
    right: 0;
  }
  .front-header .navbar-menu {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    padding: 0;
  }
  .front-header .navbar-menu li a {
    font-size: 1rem;
    color: #111827;
  }
  .front-header .navbar-menu .btn.btn-primary {
    width: 100%;
  }
  .front-header .navbar-menu .btn.btn-primary a {
    padding: 0.6rem 1rem;
    width: 100%;
    text-align: center;
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
}
</style>