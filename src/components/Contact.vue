<template>
  <div>
    <Header/>
    <div class="main" :class="this.$store.state.showTopMenu== true ? 'collapsed ' : 'uncollapsed'">
      <div class="container-fluid p-4">
        <div class="card">
          <div class="card-body py-4">
            <h5 class="card-title">მარიამ ჩარგეიშვილი</h5>
            <p class="card-text mb-4">დაუკავშირდით მარიამს კითხვების შემთხვევაში.</p>
            <a href="tel:+995598335837" class="btn btn-success me-1 mb-2"><i class="tio-call"></i> +995 598-33-58-37</a>
            <a href="mailto:ma.chargeishvili@gmail.com" class="btn btn-outline-primary mb-2"><i class="tio-email"></i> ma.chargeishvili@gmail.com</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Header from '@/components/Header.vue'

export default {
  name: "Contact",
  data () {
    return {
      showTopMenu: false
    }
  },
  components: {
    Header
  }
}
</script>

<style scoped>
.main {
  position: relative;
  background: radial-gradient(900px 500px at 0% 0%, #f2f6ff 0%, #f8fafc 55%, #ffffff 100%);
  font-family: "Manrope", "Segoe UI", sans-serif;
  color: #0f172a;
}

.main::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 12% 8%, rgba(59, 130, 246, 0.10), transparent 35%),
    radial-gradient(circle at 88% 20%, rgba(16, 185, 129, 0.10), transparent 40%);
  pointer-events: none;
}

.main .container-fluid {
  position: relative;
  z-index: 1;
}

.card {
  border: 1px solid #e5e7eb;
  border-radius: 18px;
  background: linear-gradient(180deg, #ffffff 0%, #fbfcff 100%);
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.10);
}

.card-body {
  padding: 28px 24px;
}

.card-title {
  font-weight: 800;
  letter-spacing: 0.2px;
  color: #0f172a;
  margin-bottom: 6px;
}

.card-text {
  color: #475569;
  font-size: 15px;
}

.btn {
  border-radius: 10px;
  font-weight: 600;
  padding: 10px 14px;
}

.btn-success {
  background-color: #16a34a;
  border-color: #16a34a;
  box-shadow: 0 8px 16px rgba(22, 163, 74, 0.18);
}

.btn-outline-primary {
  color: #1d4ed8;
  border-color: #cbd5e1;
  background: #ffffff;
}

.btn-outline-primary:hover {
  color: #1d4ed8;
  border-color: #93c5fd;
  background: #f8fafc;
}

@media (max-width: 576px) {
  .card-body {
    padding: 22px 18px;
  }
}
</style>
