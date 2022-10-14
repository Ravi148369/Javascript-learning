export default function MeasureTextWidth(text, font) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    ctx.font = font
    return ctx.measureText(text).width
}