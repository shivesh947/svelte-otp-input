<script lang="ts" type="ts">
  import { onMount } from "svelte";
  import "./main.css";

  let otpNumber: string[] = [];

  export let setOtp: (val: string, paste?: boolean) => void = () => {};
  export let otpCount: number = 6;
  export let wrapperStyle = "";
  export let inputStyle = "";

  const handleInput = (index: number, value: string) => {
    const eleNext = document.getElementById(
      "onramp_login_otp" + (index + 1)
    ) as HTMLInputElement;
    const eleCurr = document.getElementById(
      "onramp_login_otp" + index
    ) as HTMLInputElement;
    value = value.replace(/[^1-9]/g, "");
    if (eleCurr) {
      eleCurr.value = value;
    }
    otpNumber[index] = value;
    setOtp(otpNumber.join(""));

    if (value !== "") {
      if (index < otpCount && eleNext) {
        eleNext.focus();
      }
    }
  };

  const handleKeyDown = (index: number, event: KeyboardEvent) => {
    const elePrev = document.getElementById("onramp_login_otp" + (index - 1));
    const eleNext = document.getElementById("onramp_login_otp" + (index + 1));
    if (event.key === "ArrowRight" || event.key === "Tab") {
      event.preventDefault();
      if (index < otpCount && eleNext) {
        eleNext.focus();
      }
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      if (index > 1 && elePrev) {
        elePrev.focus();
      }
    } else if (
      event.key === "Backspace" &&
      document.getElementById("onramp_login_otp" + index)?.value === ""
    ) {
      event.preventDefault();
      if (index > 1 && elePrev) {
        elePrev.focus();
      }
    } else if (event.key === "v" && event.ctrlKey) {
      // Handle paste event
      handlePaste(event);
    }
  };

  const handlePaste = (event: KeyboardEvent) => {
    event.preventDefault();
    const clipboardData = event?.clipboardData || window?.clipboardData;
    const pastedData = clipboardData?.getData("text");
    const otpInputs = Array.from(
      document.querySelectorAll("input[type='text']")
    ) as HTMLInputElement[];

    for (let i = 0; i < otpInputs.length; i++) {
      if (pastedData[i] && i < otpCount) {
        const value = pastedData[i].replace(/[^1-9]/g, "");
        otpInputs[i].value = value;
        otpNumber[i] = value;
        if (i < 5) {
          otpInputs[i + 1].focus();
        }
      }
    }
    setOtp(otpNumber.join("").trim(), true);
  };

  onMount(() => {
    setTimeout(() => {
      const otpInputFields = Array.from(
        document.querySelectorAll("input[type='text']")
      ) as HTMLInputElement[];
      if (otpInputFields.length > 0) {
        otpInputFields.forEach((input) => {
          input.addEventListener("paste", handlePaste);
        });
        otpInputFields[0].focus();
      }
    }, 100);
  });

//   onDestroy(() => {
//     const otpInputFields = Array.from(
//       document.querySelectorAll("input[type='text']")
//     ) as HTMLInputElement[];
//     if (otpInputFields.length > 0) {
//       otpInputFields.forEach((input) => {
//         input.removeEventListener("paste", handlePaste);
//       });
//     }
//   });

  const countArray = new Array(otpCount);
</script>

<div class="otp_input_wrapper" style={wrapperStyle}>
  {#each countArray as i, inputCount}
    <input
      type="text"
      id={`onramp_login_otp${inputCount + 1}`}
      class="otp_input"
      maxlength="1"
      style={inputStyle}
      on:input={(e) => handleInput(inputCount + 1, e.currentTarget.value)}
      on:keydown={(e) => handleKeyDown(inputCount + 1, e)}
    />
  {/each}
</div>
