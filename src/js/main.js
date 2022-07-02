import baguetteBox from "baguettebox.js";

document.addEventListener(`DOMContentLoaded`, () => {
    pageLoaded()

    baguetteBox.run(`.art-gallery`)

    initMenuItems();

    // const codingDiv = document.getElementById(`coding`)
    // codingDiv.addEventListener(`mouseenter`, e => {
    //     codingDiv.querySelector(`.subcontentdiv`).style.willChange = `width, padding, opacity, min-width, max-width`
    // })
    // codingDiv.addEventListener(`transitionend`, e => {
    //     codingDiv.querySelector(`.subcontentdiv`).style.willChange = `auto`
    // })

    const techCards = document.querySelectorAll(`.card-body`)
    techCards.forEach(el => {
        el.addEventListener(`click`, e => {
            e.stopImmediatePropagation()
            e.stopPropagation()
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

    const imageLinks = document.querySelectorAll(`[data-image-href]`)
    if (imageLinks) {
        imageLinks.forEach(el => {
            el.addEventListener(`click`, () => {
                window.open(el.dataset.imageHref, `_blank`)
            })
        })
    }

    fetchLocale(location.hostname === `xn--7k8hc83f.ws` ? `emoji` : `en`)

    const langToggles = document.querySelectorAll(`[data-language-toggle]`)
    if (langToggles) {
        langToggles.forEach(el => {
            if (el.getAttribute(`href`) !== "http://🎧💻🎨.ws") {
                el.addEventListener(`click`, evt => {
                    evt.preventDefault()
                    fetchLocale(el.dataset.languageToggle)
                    langToggles.forEach(other => {
                        other.classList.remove(`locale-active`)
                    })
                    el.classList.add(`locale-active`)
                })
            }
        })
    }
})

window.addEventListener(`popstate`, () => {
    pageLoaded()
})

function pageLoaded() {
    const overlay = document.getElementById(`page-loading`)
    const parts = location.hash.indexOf(`-`) !== -1 ? location.hash.replace(`#`, ``)
        .split(`-`, 2) : [location.hash.replace(`#`, ``), ``]
    const page = parts[0]
    const hash = parts[1]
    // console.log(`#${page}-${hash}`)
    document.querySelectorAll(`.contentdiv, .subcontentdiv`).forEach(el => {
        el.classList.add(`hidden`)
    })
    const submenuItems = document.querySelectorAll(`.submenu-item`);
    const menuItems = document.querySelectorAll(`.menuitem`);
    menuItems.forEach(el => {
        el.classList.remove(`toggled`)
        el.classList.remove(`fullscreen`)
        el.classList.remove(`collapsed`)
    })
    submenuItems.forEach(el => {
        el.classList.remove(`toggled`)
        el.classList.remove(`collapsed`)
    })
    if (page.length > 1) {
        const content = document.getElementById(page)
        overlay.classList.add(`loading`);
        setTimeout(function() {
            overlay.classList.remove(`loading`);
            overlay.classList.add(`loaded`);
            setTimeout(function() {
                overlay.remove();
            }, 300);
        }, 300);
        if (content) {
            if (content.classList.contains(`submenu-item`)) {
                subMenuItemToggle(content, submenuItems, menuItems, false)
            } else if (content.classList.contains(`menuitem`)) {
                menuItemToggle(content, submenuItems, menuItems, false)
            }
        }
    } else {
        overlay.remove();
    }
}

function initMenuItems() {
    const menuItems = document.querySelectorAll(`.menuitem`);
    const submenuItems = document.querySelectorAll(`.submenu-item`);
    menuItems.forEach(el => {
        el.addEventListener(`click`, evt => {
            if (evt.metaKey || evt.button === 1)
                return true;
            if (evt.target !== el) {
                if (evt.target.hasAttribute(`data-location`)
                    || evt.target.hasAttribute(`href`)
                    || evt.target.hasAttribute(`src`)
                    || evt.target.hasAttribute(`onclick`)
                    || evt.target.hasAttribute(`data-gallery`)
                    || evt.target.hasAttribute(`data-image-href`)
                    || evt.target.classList.contains(`subcontentdiv`)
                    || evt.target.tagName === `H2`
                    || evt.target.tagName === `I`)
                    return;
            }
            evt.preventDefault();
            menuItemToggle(el, submenuItems, menuItems);
        });
    });
    submenuItems.forEach(el => {
        el.addEventListener(`click`, evt => {
            if (evt.metaKey || evt.button === 1)
                return true;
            if (evt.target !== el) {
                if (evt.target.hasAttribute(`data-location`)
                    || evt.target.hasAttribute(`href`)
                    || evt.target.hasAttribute(`src`)
                    || evt.target.hasAttribute(`onclick`)
                    || evt.target.hasAttribute(`data-gallery`)
                    || evt.target.hasAttribute(`data-image-href`)
                    || evt.target.tagName === `I`)
                    return;
            }
            evt.preventDefault();
            subMenuItemToggle(el, submenuItems, menuItems);
        });
    });
}

function subMenuItemToggle(el, submenuItems, menuItems, push = true) {
    const subContentDiv = el.querySelector(`.subcontentdiv`);
    const workItem = document.getElementById(`work`);
    submenuItems.forEach(item => {
        if (el.id !== item.id) {
            item.classList.remove(`toggled`);
            item.querySelector(`.subcontentdiv`).classList.add(`hidden`);
        }
    });
    if (!el.classList.contains(`toggled`)) {
        if (push) { history.pushState(null, null, el.getAttribute(`data-location`)) };
        el.classList.add(`toggled`);
        subContentDiv.classList.remove(`hidden`);
        subContentDiv.classList.add(`transitioning`);
        el.classList.add(`opening`);
        setTimeout(function() {
            subContentDiv.classList.remove(`transitioning`);
            el.classList.remove(`opening`);
        }, 500);

        workItem.querySelector(`.contentdiv`).classList.remove(`hidden`);
        workItem.classList.add(el.id);

        menuItems.forEach(item => {
            if (item.id !== workItem.id) {
                item.classList.add(`collapsed`);
            }
        });
        submenuItems.forEach(item => {
            if (item.id !== el.id) {
                item.classList.add(`collapsed`);
            }
        });
        workItem.classList.add(`fullscreen`);
        workItem.classList.add(`toggled`);
    } else {
        if (push) { history.pushState(null, null, `#work`); }
        el.classList.remove(`toggled`);
        subContentDiv.classList.add(`hidden`);
        subContentDiv.classList.add(`transitioning`);
        el.classList.add(`closing`);
        setTimeout(function() {
            subContentDiv.classList.remove(`transitioning`);
            el.classList.remove(`closing`);
        }, 400);

        menuItems.forEach(item => {
            item.classList.remove(`collapsed`);
        });
        submenuItems.forEach(item => {
            item.classList.remove(`collapsed`);
        });
        workItem.classList.remove(`fullscreen`);
        workItem.classList.remove(el.id);
    }
}

function menuItemToggle(el, submenuItems, menuItems, push = true) {
    const contentDiv = el.querySelector(`.contentdiv`);
    menuItems.forEach(item => {
        if (el.id !== item.id) {
            item.classList.remove(`toggled`);
            item.querySelector(`.contentdiv`).classList.add(`hidden`);
        }
    });
    if (!el.classList.contains(`toggled`)) {
        if (push) { history.pushState(null, null, el.getAttribute(`data-location`)) };
        el.classList.add(`toggled`);
        contentDiv.classList.remove(`hidden`);
        // if (el.id === `work`) {
        //     adjustHeight();
        // }
    } else {
        if (push) { history.pushState(null, null, `/`); }
        el.classList.remove(`toggled`);
        contentDiv.classList.add(`hidden`);

        if (el.id === `work`) {
            submenuItems.forEach(item => {
                item.classList.remove(`toggled`);
                item.classList.remove(`collapsed`);
                item.querySelector(`.subcontentdiv`).classList.add(`hidden`);
                el.classList.remove(item.id)
            });
        }
        menuItems.forEach(item => {
            item.classList.remove(`collapsed`, `fullscreen`);
        });
    }
}

async function fetchLocale(lang = `en`) {
    const formData = new FormData()
    formData.append(`lang`, lang)
    const response = await fetch(`/get-locale.php`, {
        method: `POST`,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
        },
        body: formData
    })
    const res = await response.json()
    const localeNodes = document.querySelectorAll(`[data-locale-key]`)
    localeNodes.forEach(el => {
        const key = el.getAttribute(`data-locale-key`)
        // console.log(key)
        const translation = resolve(key, res)
        // console.log(translation)
        el.innerHTML = translation
    })
}

function resolve(path, obj) {
    return path.split('.').reduce(function(prev, curr) {
        return prev ? prev[curr] : null
    }, obj || self)
}
