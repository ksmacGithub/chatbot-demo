import * as React from 'react';
// import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const TextInput = (props) => {
  return (
    <TextField
      fullWidth={true}
      label={props.label}
      margin={'dense'}
      multiline={props.multiline}
      rows={props.rows}
      value={props.value}
      type={props.type}
      onChange={props.onChange}
      />
    )
}

export default TextInput