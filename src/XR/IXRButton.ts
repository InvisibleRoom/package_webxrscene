interface IXRButton{
  IsSupported:()=>Promise<boolean>
  Enable:(features:[string]) => Promise<any>
  Disable():Promise<boolean>
}

export default IXRButton;