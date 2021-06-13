document.addEventListener(`DOMContentLoaded`, () => {
    pageLoaded()

    baguetteBox.run(`[data-toggle="lightbox"]`) // TODO: Fix lightbox

    const menuItems = document.querySelectorAll(`.menuitem`)
    menuItems.forEach(el => {
        el.addEventListener(`click`, evt => {
            if (evt.metaKey || evt.button === 1) return true
            if (evt.target !== el) {
                if (evt.target.hasAttribute(`data-location`)
                    || evt.target.hasAttribute(`href`)
                    || evt.target.hasAttribute(`src`)
                    || evt.target.hasAttribute(`onclick`)
                    || evt.target.tagName === `I`) return
            }
            evt.preventDefault()
            const contentDiv = el.querySelector(`.contentdiv`)
            menuItems.forEach(item => {
                if (el !== item) {
                    item.classList.remove(`toggled`)
                    item.querySelector(`.contentdiv`).classList.add(`hidden`)
                }
            })
            if (!el.classList.contains(`toggled`)) {
                history.pushState(null, null, el.getAttribute(`data-location`))
                el.classList.add(`toggled`)
                contentDiv.classList.remove(`hidden`)
            } else {
                history.pushState(null, null, `/`)
                el.classList.remove(`toggled`)
                contentDiv.classList.add(`hidden`)
            }
        })
    })

    const tabLinks = document.querySelectorAll(`.nav-link`)
    tabLinks.forEach(el => {
        el.addEventListener(`click`, evt => {
            if (evt.metaKey || evt.button === 1) return true
            evt.preventDefault()
            if (!el.classList.contains(`active`)) {
                history.pushState(null, null, el.getAttribute(`data-location`))
            }
        })
    })
})

function pageLoaded() {
    const page = location.pathname
    const hash = location.hash
    console.log(`${page}${hash}`)
    if (page !== `/`) {
        const activeItem = page.replace(`/`, ``)
        const content = document.getElementById(activeItem)
        if (content) {
            content.classList.add(`toggled`)
            if (content.querySelector(`.contentdiv`)) {
                content.querySelector(`.contentdiv`).classList.remove(`hidden`)
            }
        }
        if (hash.length > 2) {
            const activeHash = hash.replace(`#`, ``)
            const activeLinks = document.querySelectorAll(`.nav-link.active`)
            if (activeLinks) {
                activeLinks.forEach(el => {
                    el.classList.remove(`active`)
                })
            }
            const activeTabs = document.querySelectorAll(`.tab-pane.active.show`)
            if (activeTabs) {
                activeTabs.forEach(el => {
                    el.classList.remove(`active`, `show`)
                })
            }
            const activeElements = document.querySelectorAll(`[data-active-hash="${activeHash}"]`)
            if (activeElements) {
                activeElements.forEach(el => {
                    el.classList.add(`active`)
                    if (el.classList.contains(`tab-pane`)) {
                        el.classList.add(`show`)
                    }
                })
            }
        }
    }
}
