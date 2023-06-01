<script lang="ts" type="ts">
  import { onMount, onDestroy } from "svelte";
  import "./main.css";

  export let wrapperStyle = "";
  export let inputStyle = "";
  let otpNumber: string[] = [];

  let inputEleList: Array<HTMLInputElement> = [];

  export let setOtp: (val: string, paste?: boolean) => void = () => {};
  export let otpCount: number = 6;

  const handleInput = (index: number, value: string) => {
    const eleNext = inputEleList[index + 1];
    const eleCurr = inputEleList[index];
    value = value.replace(/[^1-9]/g, "");
    if (eleCurr) {
      eleCurr.value = value;
    }
    otpNumber[index] = value;
    setOtp(otpNumber.join(""));

    if (value !== "" && index < otpCount && eleNext) {
      eleNext.focus();
    }
  };

  const handleKeyDown = (index: number, event: KeyboardEvent) => {
    const elePrev = inputEleList[index - 1];
    const eleNext = inputEleList[index + 1];

    if (
      (event.key === "ArrowRight" || event.key === "Tab") &&
      index < otpCount &&
      eleNext
    ) {
      event.preventDefault();
      eleNext.focus();
    } else if (event.key === "ArrowLeft" && index > 0 && elePrev) {
      event.preventDefault();
      elePrev.focus();
    } else if (
      event.key === "Backspace" &&
      inputEleList[index]?.value === "" &&
      index > 0 &&
      elePrev
    ) {
      event.preventDefault();
      elePrev.focus();
    } else if (event.key === "v" && event.ctrlKey) {
      handlePaste(event);
    }
  };

  const handlePaste = (event: Event) => {
    event.preventDefault();
    const clipboardData = event?.clipboardData || window?.clipboardData;
    const pastedData = clipboardData?.getData("text");
    for (let i = 0; i < inputEleList.length; i++) {
      if (pastedData[i] && i < otpCount) {
        const value = pastedData[i].replace(/[^1-9]/g, "");
        inputEleList[i].value = value;
        otpNumber[i] = value;
        if (i < 5) {
          inputEleList[i + 1].focus();
        }
      }
    }
    setOtp(otpNumber.join("").trim(), true);
  };

  onMount(() => {
    setTimeout(() => {
      if (inputEleList.length > 0) {
        inputEleList.forEach((input) => {
          input.addEventListener("paste", handlePaste);
        });
        inputEleList[0].focus();
      }
    }, 100);
  });

  onDestroy(() => {
    if (inputEleList.length > 0) {
      inputEleList.forEach((input) => {
        input.removeEventListener("paste", handlePaste);
      });
    }
  });
  const countArray = new Array(otpCount);
</script>

<div class="otp_input_wrapper" style={wrapperStyle}>
  {#each countArray as i, inputCount}
    <input
      style={inputStyle}
      bind:this={inputEleList[inputCount]}
      type="text"
      class="otp_input"
      maxlength="1"
      on:input={(e) => handleInput(inputCount, e.currentTarget.value)}
      on:keydown={(e) => handleKeyDown(inputCount, e)}
    />
  {/each}
</div>
