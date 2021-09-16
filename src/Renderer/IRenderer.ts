import { WebGLRenderer } from "three"

export default interface IRenderer{
  instance : WebGLRenderer
  Resize : () => void
}