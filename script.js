const hero = document.getElementById("hero")
const featureTabContainer = document.getElementById("feature-tab-container")

document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.dataset.animation = "slide"
      if (entry.isIntersecting) observer.unobserve(entry.target)
    })
  },{
    threshold: 0.1
  })
  observer.observe(hero)
  observer.observe(featureTabContainer)
})

const bodyElment = document.body
const headerLogo = document.getElementById("header-logo")
const menuBtn = document.getElementById("menu-btn")
const navMenu = document.getElementById("nav-menu")
const navOptions = Array.from(document.getElementById("nav-options").children)
const menuBg = document.getElementById("menu-bg")

const closeNav = () => {
    bodyElment.dataset.overflow = "visible"
    headerLogo.dataset.state = "header"
    menuBtn.children[0].src = "./images/icon-hamburger.svg"
    menuBtn.setAttribute("aria-expanded", "false")
    navMenu.dataset.state = "loading"
    navMenu.dataset.animation = "fade-in-reverse"
    menuBg.dataset.animation = "fade-in-reverse"
}

menuBtn.addEventListener("click", () => {
  if(menuBtn.getAttribute("aria-expanded") === "false") {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
    bodyElment.dataset.overflow = "hidden"
    headerLogo.dataset.state = "navigation"
    menuBtn.children[0].src = "./images/icon-close.svg"
    menuBtn.setAttribute("aria-expanded", "true")
    menuBg.dataset.state = "visible"
    menuBg.dataset.animation = "fade-in"
    navMenu.dataset.state = "open"
    navMenu.dataset.animation = "fade-in"
  }
  else {
    closeNav()
  }
})

if(window.matchMedia("(max-width: 50rem)").matches) {
  navOptions.forEach((li) => {
    li.addEventListener("click", () => {
      closeNav()
    })
  })
}

navMenu.addEventListener("animationend", () => {
  navMenu.dataset.animation = "none"
  menuBg.dataset.animation = "none"
  if (navMenu.dataset.state === "loading") {
    navMenu.dataset.state = "close"
    menuBg.dataset.state = "hidden"
  }
})

const featureTabOptions = Array.from(document.getElementById("feature-tab").children)
const featureTabSection = document.getElementById("tab-section")
const featureTabImg = document.getElementById("feature-tab-img")
const featureTabTitle = document.getElementById("feature-tab-title")
const featureTabDescription = document.getElementById("feature-tab-description")

const loadData = async () => {
  
  const getJson = await fetch("./text.json")
  const data = await getJson.json()
  let value
  
  featureTabOptions.forEach((btn) => {
    btn.addEventListener("click", () => {
      value = btn.value
      featureTabOptions.forEach((butn) => {
        butn.children[0].dataset.state = "none"
        butn.disabled = true
      })
      btn.children[0].dataset.state = "selected"
      featureTabImg.src = data[value].image
      featureTabContainer.dataset.animation = "slide-right"
      featureTabSection.dataset.animation = "fade-out-scale"
    })
  })
  
  featureTabSection.addEventListener("animationend", () => {
    featureTabTitle.innerText = data[value].title
    featureTabDescription.innerText = data[value].description
    featureTabSection.dataset.animation = "fade-in-scale"
  })
  
  featureTabContainer.addEventListener("animationend",() => {
    featureTabContainer.dataset.animation = "none"
    featureTabSection.dataset.animation = "none"
    featureTabSection.dataset.state = "visible"
    featureTabOptions.forEach((btn) => {
      btn.disabled = false
    })
  })
}

loadData()

const faq = document.getElementById("faq")
const allDetails = Array.from(faq.children)

allDetails.forEach((details) => {
  details.addEventListener("click", (e) => {
    const div = details.children[1]
    
    if(!details.hasAttribute("open")) {
      details.dataset.open = "true"
      const startHeight = 0
      const endHeight = div.scrollHeight
      
      div.animate([
       { opacity: 0, height: `${startHeight}px` },
       { opacity: 1, height: `${endHeight}px` }
      ],{
        duration: 300, ease: "ease-in-out", fill: "forwards"
      })
    }
    else {
      e.preventDefault()
      details.dataset.open = "false"
      const startHeight = div.scrollHeight
      const endHeight = 0
      
      div.animate([
        { opacity: 1, height: `${startHeight}px` },
        { opacity: 0, height: `${endHeight}px` }
      ],{ 
        duration: 300, easing: 'ease-in-out', fill: 'forwards' 
      })
      
      setTimeout(() => {
        details.removeAttribute("open")
      },300)
    }
  })
})

const contactUsForm = document.getElementById("contact-us")
const emailContainer = document.getElementById("email-container")
const emailInput = document.getElementById("email-input")
const emailError = document.getElementById("email-error")
const emailErrorIcon = document.getElementById("email-error-icon")
const contactSuccess = document.getElementById("form-success")

const checkEmail = (email) => {
  const e_check = /^[\w-\.]+@[\w-]+\.+[\w-]{2,4}$/g
  
  if(!email) {
    return "please, Enter an email"
  }
  else if(!e_check.test(email)) {
    return "Whoops, make sure it's an email"
  }
}

const clearError = () => {
  emailInput.setAttribute("aria-invalide", "false")
  emailContainer.dataset.state = "hidden"
  emailErrorIcon.dataset.animation = "none"
  emailError.innerHTML = ""
}

contactUsForm.addEventListener("submit",(e) => {
  e.preventDefault()
  const error = checkEmail(emailInput.value)
  
  if(!error) {
    clearError()
    emailInput.value = ""
    contactSuccess.innerText = "Thank You for Joining Us."
    contactSuccess.dataset.state = "visible"
    contactSuccess.dataset.animation = "success"
  }
  else {
    emailInput.setAttribute("aria-invalide","true")
    emailContainer.dataset.state = "visible"
    emailErrorIcon.dataset.animation = "shake"
    emailError.innerText = error
  }
})

emailInput.addEventListener("input", clearError)

emailErrorIcon.addEventListener("animationend",() => {
  emailErrorIcon.dataset.animation = "none"
})

contactSuccess.addEventListener("animationend",() => {
  contactSuccess.dataset.state = "hidden"
  contactSuccess.dataset.animation = "none"
  contactSuccess.innerText = ""
})