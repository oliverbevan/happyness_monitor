// main.js
const update = document.querySelector('#update-button')

const data = {
    name: 'Darth Vadar',
    quote: 'I find your lack of faith disturbing.'
}

update.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Darth Vadar',
            quote: 'I find your lack of faith disturbing.'
        })
    })
    console.log("clicked!")
})