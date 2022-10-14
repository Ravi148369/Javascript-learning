import MeasureTextWidth from "./MeasureTextWidth.js";

export default function SetFontSize(text, fontSize, canvas)  {
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = MeasureTextWidth(text, `${fontSize}px verdana`) + 20
    canvas.height = fontSize
    ctx.font = `${fontSize}px verdana`
    ctx.fillText(text, 10, fontSize-2)
}