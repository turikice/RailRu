const english = document.documentElement.lang === "en";
const menuLabel = open => english ? (open ? "Close menu" : "Open menu") : (open ? "Закрыть меню" : "Открыть меню");
const menuButton = document.querySelector(".menu-toggle")
const mobileNav = document.querySelector("#mobile-nav")

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true"
  menuButton.setAttribute("aria-expanded", String(!isOpen))
  menuButton.setAttribute("aria-label", menuLabel(!isOpen))
  mobileNav.hidden = isOpen
})

mobileNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.hidden = true
    menuButton.setAttribute("aria-expanded", "false")
    menuButton.setAttribute("aria-label", menuLabel(false))
  })
})

const cargoTapMode = window.matchMedia("(max-width: 900px), (hover: none)")
let revealedCargoCard = null
let cargoRevealTimer = null
document.querySelectorAll(".cargo-card").forEach((card) => {
  card.addEventListener("click", (event) => {
    if (!cargoTapMode.matches && event.pointerType !== "touch") return
    clearTimeout(cargoRevealTimer)
    if (revealedCargoCard) revealedCargoCard.classList.remove("is-revealed")
    revealedCargoCard = card
    card.classList.add("is-revealed")
    cargoRevealTimer = setTimeout(() => {
      card.classList.remove("is-revealed")
      revealedCargoCard = null
      cargoRevealTimer = null
    }, 2000)
  })
})

const fleetTabs = [...document.querySelectorAll(".fleet-tab")]
const fleetPanel = document.querySelector("#fleet-panel")
const fleetCount = document.querySelector("#fleet-count")
const fleetMetrics = fleetPanel.querySelectorAll(".fleet-visual__metric")
const fleetSpecifications = [
  ["66 т / грузоподъёмность", "109 м³ / объём"],
  ["Контейнеры ISO", "Фитинговые упоры"],
  ["Верхние загрузочные люки", "Нижняя выгрузка"],
  ["64 т / грузоподъёмность", "171 м³ / объём"],
  ["71 т / грузоподъёмность", "120 м³ / объём"],
  ["68,5 т / грузоподъёмность", "161 м³ / объём"],
]
const fleetSpecificationsEn = [
  ["66 t / load capacity", "109 m³ / volume"],
  ["ISO containers", "Container locks"],
  ["Top loading hatches", "Bottom discharge"],
  ["64 t / load capacity", "171 m³ / volume"],
  ["71 t / load capacity", "120 m³ / volume"],
  ["68.5 t / load capacity", "161 m³ / volume"],
]
let selectedFleetIndex = 0

function selectFleetTab(index) {
  if (index === selectedFleetIndex) return
  selectedFleetIndex = index
  fleetTabs.forEach((tab, tabIndex) => {
    const active = tabIndex === index
    tab.classList.toggle("is-active", active)
    if (!active) tab.classList.remove("is-tapped")
    tab.setAttribute("aria-selected", String(active))
    tab.tabIndex = active ? 0 : -1
  })
  const count = `${String(index + 1).padStart(2, "0")}/06`
  fleetCount.textContent = count
  fleetPanel.setAttribute("aria-labelledby", fleetTabs[index].id)
  fleetMetrics.forEach((metric, metricIndex) => {
    metric.textContent = (english ? fleetSpecificationsEn : fleetSpecifications)[index][metricIndex]
  })
  fleetPanel.dispatchEvent(new CustomEvent("fleet:change", { detail: { index } }))
}

fleetTabs.forEach((tab, index) => {
  tab.addEventListener("pointerenter", (event) => {
    if (event.pointerType === "mouse") selectFleetTab(index)
  })
  tab.addEventListener("click", (event) => {
    selectFleetTab(index)
    fleetTabs.forEach(item => item.classList.toggle("is-tapped", item === tab && event.pointerType === "touch"))
  })
  tab.addEventListener("keydown", (event) => {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return
    event.preventDefault()
    const next = event.key === "Home" ? 0
      : event.key === "End" ? fleetTabs.length - 1
      : (index + (event.key === "ArrowDown" ? 1 : -1) + fleetTabs.length) % fleetTabs.length
    selectFleetTab(next)
    fleetTabs[next].focus()
  })
})

const serviceTapMode = window.matchMedia("(max-width: 900px), (hover: none)")
let resetActiveServiceTap = null
document.querySelectorAll(".service-card").forEach((card) => {
  const fitArt = () => card.style.setProperty("--art-scale", Math.min(1, Math.max(0, card.clientWidth - 32) / 352))
  new ResizeObserver(fitArt).observe(card)
  fitArt()
  let illustrationTimer = null
  let playbackTimer = null
  let tapPlayback = false
  const showIllustration = () => {
    if (illustrationTimer !== null || card.classList.contains("is-illustrated")) return
    card.classList.add("is-expanded")
    illustrationTimer = setTimeout(() => {
      illustrationTimer = null
      card.classList.add("is-illustrated")
    }, 200)
  }
  const resetIllustration = () => {
    clearTimeout(illustrationTimer)
    clearTimeout(playbackTimer)
    illustrationTimer = null
    playbackTimer = null
    tapPlayback = false
    card.classList.remove("is-illustrated", "is-expanded")
    if (resetActiveServiceTap === resetIllustration) resetActiveServiceTap = null
  }
  card.addEventListener("pointerenter", (event) => {
    if (event.pointerType === "mouse" && !serviceTapMode.matches) showIllustration()
  })
  card.addEventListener("pointerleave", () => {
    if (!tapPlayback && !card.matches(":focus-visible")) resetIllustration()
  })
  card.addEventListener("focus", () => {
    if (card.matches(":focus-visible")) showIllustration()
  })
  card.addEventListener("blur", () => {
    if (!tapPlayback && !card.matches(":hover")) resetIllustration()
  })
  card.addEventListener("click", (event) => {
    if (!serviceTapMode.matches && event.pointerType !== "touch") return
    if (resetActiveServiceTap) resetActiveServiceTap()
    resetIllustration()
    tapPlayback = true
    resetActiveServiceTap = resetIllustration
    if (event.detail !== 0) card.blur()
    showIllustration()
    playbackTimer = setTimeout(resetIllustration, 2200)
  })
})

const mapViewport = document.querySelector(".map-viewport")
const mapIllustration = document.querySelector("#map-illustration")
const scaleMap = () => {
  const scale = Math.min(mapViewport.clientWidth / 1044, 1)
  mapIllustration.style.transform = `scale(${scale}) translateX(28px)`
  mapViewport.style.height = `${950 * scale}px`
}

new ResizeObserver(scaleMap).observe(mapViewport)
scaleMap()

const dialog = document.querySelector("#route-request")
document.querySelectorAll('a[href="#route-request"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault()
    dialog.showModal()
  })
})
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close()
})

const routeForm = document.querySelector("#route-form")
const routeResult = document.querySelector("#route-result")
const routeSummary = document.querySelector("#route-summary")
routeForm.addEventListener("submit", (event) => {
  event.preventDefault()
  const data = new FormData(routeForm)
  routeSummary.textContent = english ? `Route: ${data.get("from")} → ${data.get("to")}. Cargo: ${data.get("cargo")}.` : `Маршрут: ${data.get("from")} → ${data.get("to")}. Груз: ${data.get("cargo")}.`
  routeForm.hidden = true
  routeResult.hidden = false
})
dialog.addEventListener("close", () => {
  routeForm.hidden = false
  routeResult.hidden = true
})
