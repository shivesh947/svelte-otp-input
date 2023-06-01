<script type="ts">
    import OTPInput from "../lib/svelte-otp-input.svelte";
    const getOtp = (val, paste=false)=>{}
 </script>

<OTPInput setOtp={getOtp} otpCount={6} />
<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
