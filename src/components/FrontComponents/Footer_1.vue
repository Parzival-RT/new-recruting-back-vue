<script setup></script>
<template>
  <div>
    <!-- Footer -->
    <footer id="contact" class="footer bg-dark-blue mt-5">
      <div class="container">
        <div class="row g-5 justify-content-center align-items-center">
          <div class="col-md-5 col-lg-4 text-center">
            <img
              class="w-50"
              src="../../assets/image/jobs_footer_logo.svg"
              alt="logo"
            />
          </div>
          <div
            class="col-md-7 col-lg-5 d-flex justify-content-center justify-content-lg-end"
          >
            <div>
              <h4
                class="text-white custom-fs-1 FiraGO-Medium font-feature-case-on mb-2"
              >
                კონტაქტი
              </h4>
              <p class="text-white custom-fs-5 FiraGO-Regular">
                m.chargeishvili@dk.ge
              </p>
              <p class="text-white custom-fs-5 FiraGO-Regular">
                ელიზბარ მინდელის 7ბ, Tbilisi, Georgia
              </p>
              <div class="d-flex align-items-center gap-3">
                <a
                  target="_blank"
                  href="https://www.facebook.com/KENCHADZE.Jobs1"
                >
                  <img
                    class="w-px-50"
                    src="../../assets/image/fb.svg"
                    alt="facebook"
                  />
                </a>
                <a
                  target="_blank"
                  href="https://www.linkedin.com/company/kenchadze-jobs/"
                >
                  <img
                    class="w-px-50"
                    src="../../assets/image/linkedin.svg"
                    alt="linkedin"
                  />
                </a>
                <!-- <a
                  target="_blank"
                  href="https://www.instagram.com/kenchadze.developers/"
                >
                  <img
                    class="w-px-50"
                    src="@/assets/image/icons/Insta.svg"
                    alt="instagram"
                  />
                </a>
                <a
                  target="_blank"
                  href="https://www.tiktok.com/@kenchadze.developers?_t=ZS-8t6nChs8OE4&_r=1"
                >
                  <img
                    class="w-px-50"
                    src="@/assets/image/icons/Tik-Tok.svg"
                    alt="tiktok"
                  />
                </a> -->
                <a target="_blank" href="https://linktr.ee/davidkenchadze">
                  <img
                    class="w-100 h-px-30 object-fit-contain"
                    src="../../assets/image/linketree_white.png"
                    alt="linktree"
                  />
                </a>
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
  padding: 3rem 0;
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
</style>
