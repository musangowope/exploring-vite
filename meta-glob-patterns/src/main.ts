const modules =  import.meta.glob('./modules/*.ts');

function init() {
    const button = document.getElementById('lazy-load-button')
    if(!button) return
    button.addEventListener('click', () => {
        Object.values(modules).forEach(module => {
            module().then((data) => {
                console.log(data);
            })
        })
    })
}

init()
