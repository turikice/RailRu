(() => {
  const hero = document.querySelector(".hero")
  if (!hero) return
  const background = hero.querySelector(".hero__background")
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
  const compactScreen = window.matchMedia("(max-width: 900px)")
  let frame = null
  let inView = true

  const update = () => {
    frame = null
    const bounds = hero.getBoundingClientRect()
    const progress = reducedMotion.matches ? 0 : Math.min(1, Math.max(0, -bounds.top / bounds.height))
    const fade = Math.min(1, Math.max(0, (progress - 0.15) / 0.7))
    const travel = compactScreen.matches ? 0.08 : 0.14
    hero.style.setProperty("--hero-image-shift", `${(progress * bounds.height * travel).toFixed(2)}px`)
    hero.style.setProperty("--hero-scroll-scale", (1 + progress * 0.045).toFixed(4))
    hero.style.setProperty("--hero-copy-shift", `${(-progress * 64).toFixed(2)}px`)
    hero.style.setProperty("--hero-bottom-shift", `${(-progress * 32).toFixed(2)}px`)
    hero.style.setProperty("--hero-copy-opacity", (1 - fade * fade).toFixed(4))
  }
  const schedule = () => {
    if (frame === null) frame = requestAnimationFrame(update)
  }

  if (!reducedMotion.matches) {
    hero.classList.add("hero--animated", "hero--entering")
    const photo = new Image()
    const revealCamera = () => hero.classList.add("hero--camera-ready")
    photo.src = "./assets/d6f89.png"
    if (typeof photo.decode === "function") photo.decode().then(revealCamera, revealCamera)
    else if (photo.complete) revealCamera()
    else {
      photo.addEventListener("load", revealCamera, { once: true })
      photo.addEventListener("error", revealCamera, { once: true })
    }
    background.addEventListener("animationend", () => {
      hero.classList.remove("hero--entering")
    }, { once: true })
  }

  new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting
    hero.classList.toggle("hero--in-view", inView && !reducedMotion.matches)
    if (inView) schedule()
  }).observe(hero)
  window.addEventListener("scroll", () => {
    if (inView && !reducedMotion.matches) schedule()
  }, { passive: true })
  window.addEventListener("resize", schedule, { passive: true })
  window.addEventListener("pageshow", schedule)
  reducedMotion.addEventListener("change", () => {
    hero.classList.toggle("hero--in-view", inView && !reducedMotion.matches)
    schedule()
  })
  update()
})()
