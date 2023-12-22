import { TextField } from "@mui/material"

type Props={
    name:string,
    label:string,
    type:string
}

const CustomizedInput = (props:Props) => {
  return <TextField 
  name={props.name} 
  label={props.label} 
  type={props.type}
  InputLabelProps={{style:{color:"white"}}}
  InputProps={{style:{width:"400px", borderRadius:10, fontSize:20, color:"white", marginBottom:20}}}
  />
}

export default CustomizedInput