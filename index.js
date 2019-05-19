const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const colourOrder = ['white', 'black']
const directions = [{ x: 0, y: 1 }, { x: 0, y: -1 }, { x: 1, y: 0 }, { x: -1, y: 0 }]
const radiusScaleRate = 0.4145

ctx.fillStyle = 'black'

function recursiveDraw(pos, radius, maxDepth, depth = 0) {
    ctx.fillStyle = colourOrder[depth % colourOrder.length]

    ctx.beginPath()
    ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI)
    ctx.fill()

    if (depth < maxDepth) {
        for (let dir of directions) {
            const childRadius = radius * radiusScaleRate
            const childPos = {
                x: pos.x + dir.x * radius - dir.x * childRadius,
                y: pos.y + dir.y * radius - dir.y * childRadius
            }
            recursiveDraw(childPos, childRadius, maxDepth, depth + 1)
        }
    }
}

function run() {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    recursiveDraw({ x: canvas.width / 2, y: canvas.height / 2 }, canvas.width / 2, 5)

    requestAnimationFrame(run)
}

run()
