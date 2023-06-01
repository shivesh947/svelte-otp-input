
# svelte-otp-inputs

one-time password input component for the web built with svelte.


## Installation

Install my-project with npm

```bash
 npm i react-otp-input
```


    
## Usage/Examples

```html

 <script type="ts">
    import OTPInput from 'svelte-otp-inputs';
    let otpNumber = ''
    const getOtp = (otp, paste)=>{ 
        otpNumber = otp;
    }

 </script>
 <OTPInput  setOtp={getOtp} otpCount={6} wrapperStyle={"background:white;"} inputStyle={"color:gray;"}/>
```

## Props

| **Name**     | **Type** | **Required** | **Default** |
|--------------|----------|:------------:|:-----------:|
| setOtp       | Function |     true     |      -      |
| otpCount     | number   |     false    |      6      |
| wrapperStyle | String   |     false    |      ""     |
| inputStyle   | String   |     false    |      ""     |
