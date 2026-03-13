<script setup></script>
<template>
  <div>
    <!-- Footer -->
    <footer id="contact" class="footer bg-dark-blue">
      <div class="container">
        <div class="row g-5 justify-content-center align-items-center">
          <div class="col-md-5 col-lg-4 text-center">
            <img
              class="w-75"
              src="../../assets/image/new_white_logo.svg"
              alt="logo"
            />
            <p class="text-white mt-4">შენი დასაქმების სააგენტო</p>
          </div>
          <div
            class="col-md-7 col-lg-5 d-flex justify-content-center justify-content-lg-end"
          >
            <div>
              <h4
                class="text-white fs-5 mb-2"
              >
                საკონტაქტი
              </h4>
              <p class="d-flex align-items-center gap-2 text-white  FiraGO-Regular mb-2">
                <svg style="width: 20px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                m.chargeishvili@dk.ge
              </p>
              <p class="d-flex align-items-center gap-2 text-white  FiraGO-Regular mb-3">
                <svg style="width: 20px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> 

                ელიზბარ მინდელის 7ბ, Tbilisi, Georgia
              </p>
              <div class="d-flex gap-3">
                <a href="https://www.facebook.com/share/18FDhocqSV/" target="_blank" class="social-icon-btn">
                  <svg class="social-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://www.linkedin.com/company/kenchadze-jobs/posts/?feedView=all" target="_blank" class="social-icon-btn">
                  <svg class="social-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="https://linktr.ee/davidkenchadze" target="_blank" class="social-icon-btn">
                 <svg width="36" height="26" viewBox="0 0 36 26" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path d="M19.881 6.34096L24.2196 1.88105L26.7378 4.45991L22.1869 8.79846H28.5885V12.3785H22.1565L26.7378 16.8283L24.2196 19.3566L18 13.1067L11.7804 19.3566L9.26221 16.8384L13.8435 12.3886H7.4115V8.79846H13.8131L9.26221 4.45991L11.7804 1.88105L16.1189 6.34096V0H19.881V6.34096ZM16.1189 17.5059H19.881V26.001H16.1189V17.5059Z" fill="#246bf6"></path></g><defs><clipPath id="clip0"><rect width="36" height="26" fill="#246bf6"></rect></clipPath></defs></svg></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Footer */
.footer {
  padding: 4rem 0;
  background-color: var(--Fourth-Color) !important;
}
.w-px-50 {
  width: 100%;
  max-width: 50px;
}
.h-px-30 {
  height: 30px;
}

.custom-fs-1 {
  font-size: calc(1.4125rem + 1.95vw) !important;
}
.custom-fs-5 {
  font-size: 1.125rem !important;
}
.font-feature-case-on {
  font-feature-settings: "case" on !important;
}

.FiraGO-Medium {
  font-family: var(--First-Font);
}

.FiraGO-Regular {
  font-family: var(--Third-Font);
}

/* ── Social icon buttons ── */
.social-icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #ffffff;
  border-radius: 0.5rem;
  color: #246bf6;
  text-decoration: none;
  transition: background 0.15s;
  flex-shrink: 0;
}
.social-icon-btn:hover {
  background: #dbeafe;
  color: #246bf6;
}
.social-icon {
  width: 20px;
  height: 20px;
}
</style>
