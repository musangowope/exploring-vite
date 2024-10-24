import sampleImg from './sample-image.jpg'

function init() {
    const imageElement: HTMLImageElement | null = document.getElementById('sample-image') as HTMLImageElement | null
    if (!imageElement) return
    imageElement.src = sampleImg
}

init()